import tsyringe = require("tsyringe");

import { SaveServer } from "@spt-aki/servers/SaveServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";

import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";

import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

import { IGetLocationRequestData } from "@spt-aki/models/eft/location/IGetLocationRequestData";
import { CoopConfig } from "./CoopConfig";
import { CoopMatch, CoopMatchEndSessionMessages, CoopMatchStatus } from "./CoopMatch";
import { WebSocketHandler } from "./WebSocketHandler";

import { RouteAction } from "@spt-aki/di/Router";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";

import { SITConfig } from "./SITConfig";
import moment = require("moment");
import AzureWAH = require("./AzureWebAppHelper");

// -------------------------------------------------------------------------
// Custom Traders (needs to be refactored into SITCustomTraders.ts)
import { CoopMatchResponse } from "./CoopMatchResponse";
import { friendlyAI } from "./FriendlyAI";
// -------------------------------------------------------------------------

// Overrides ---------------------------------------------------------------
import { BundleLoaderOverride } from "./Overrides/BundleLoaderOverride";
import { LauncherControllerOverride } from "./Overrides/LauncherControllerOverride";
import { GameControllerOverride } from "./Overrides/GameControllerOverride";
// -------------------------------------------------------------------------

// Controllers -------------------------------------------------------------
import { LocationController } from "@spt-aki/controllers/LocationController";
// -------------------------------------------------------------------------

// Callbacks ---------------------------------------------------------------
import { BundleCallbacks } from "@spt-aki/callbacks/BundleCallbacks";
import { InraidCallbacks } from "@spt-aki/callbacks/InraidCallbacks";
import { P2PConnectionHandler } from "./P2PConnectionHandler";
// -------------------------------------------------------------------------

@tsyringe.injectable()
export class StayInTarkovMod implements IPreAkiLoadMod, IPostDBLoadMod
{
    public static Instance: StayInTarkovMod;
    private static container: tsyringe.DependencyContainer;

    saveServer: SaveServer;
    protected httpResponse: HttpResponseUtil;
    databaseServer: DatabaseServer;
    public webSocketHandler: WebSocketHandler;
    public p2pConnectionHandler: P2PConnectionHandler;
    public coopConfig: CoopConfig;
    public sitConfig: SITConfig;
    configServer: ConfigServer;
    httpConfig: any;
    bundleCallbacks: BundleCallbacks;
    locationController: LocationController;
    inraidCallbacks: InraidCallbacks;

    public traders: any[] = [];

    public getCoopMatch(serverId: string) : CoopMatch {

        if(serverId === undefined) {
            console.error("getCoopMatch -- no serverId provided");
            return undefined;
        }

        if(CoopMatch.CoopMatches[serverId] === undefined) {
            console.error(`getCoopMatch -- no server of ${serverId} exists`);
            return undefined;
        }

        return CoopMatch.CoopMatches[serverId];
    }

    private InitializeVariables(container: tsyringe.DependencyContainer): void { 
        // ----------------------------------------------------------------
        // Initialize & resolve variables
        StayInTarkovMod.container = container;
        StayInTarkovMod.Instance = this;

        const logger = container.resolve<ILogger>("WinstonLogger");
        this.saveServer = container.resolve<SaveServer>("SaveServer");
        this.configServer = container.resolve<ConfigServer>("ConfigServer");
        this.locationController = container.resolve<LocationController>("LocationController");
        this.bundleCallbacks = container.resolve<BundleCallbacks>("BundleCallbacks");
        this.inraidCallbacks = container.resolve<InraidCallbacks>("InraidCallbacks");
        this.httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");

        CoopMatch.saveServer = this.saveServer;
        CoopMatch.locationController = this.locationController;
        CoopMatch.routeHandler(container);

        // get http.json config
        this.httpConfig = this.configServer.getConfig(ConfigTypes.HTTP);
        this.coopConfig = new CoopConfig();
        this.sitConfig = new SITConfig();
        this.sitConfig.routeHandler(container);
        
        // Relay server
        this.webSocketHandler = new WebSocketHandler(this.coopConfig.webSocketPort, logger);

        // P2P connection helper
        this.p2pConnectionHandler = new P2PConnectionHandler(this.coopConfig.p2pConnectionHelperPort, logger);

        // this.traders.push(new SITCustomTraders(), new CoopGroupTrader(), new UsecTrader(), new BearTrader());
        // this.traders.push(new SITCustomTraders());
    }

    public preAkiLoad(container: tsyringe.DependencyContainer): void {

        const logger = container.resolve<ILogger>("WinstonLogger");
        const dynamicRouterModService = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");

        this.InitializeVariables(container);

        // Initialize Custom Traders
        for(const t of this.traders) {
            t.preAkiLoad(container);
        }

        // ----------------------- Bundle Loader overrides ------------------------------------------------
        const bundleLoaderOverride = new BundleLoaderOverride(container);
        bundleLoaderOverride.override();

        // ----------------------- Game Controller overrides -------------------------------------------------
        const gameControllerOverride = new GameControllerOverride(container);
        gameControllerOverride.override();

        // ----------------------- Launcher Controller overrides -------------------------------------------------
        const launcherControllerOverride = new LauncherControllerOverride(container, gameControllerOverride);
        launcherControllerOverride.override();

        // ----------------------- TODO: Azure WebApp Helper (trying to fix this ASAP) ------------------------------------------------
        new AzureWAH.AzureWebAppHelper(this.configServer);

        // Connect to this module
        staticRouterModService.registerStaticRouter(
            "ConnectionRouter",
            [
                {
                    url: "/coop/connect",
                    action: (url: string, info: any, sessionID: string, output: string): any => {
                        output = JSON.stringify({});
                        return output;
                    }
                },
            ],"aki");

        dynamicRouterModService.registerDynamicRouter(
            "sit-coop-loot",
            [
                // Re-implementation of /client/location/getLocalloot for SIT Coop.
                // Single player uses the default route.
                new RouteAction(
                    "/coop/location/getLoot",
                    (url: string, info: any, sessionID: string, output: string): any =>
                    {
                        const coopMatch = this.getCoopMatch(info.serverId);

                        if(coopMatch === undefined)
                        {
                            console.error(`Cannot retrieve LocationData for unknown ServerId: ${info.serverId}!`);
                            return this.httpResponse.nullResponse();
                        }

                        if(coopMatch.LocationData === undefined)
                        {
                            console.error(`No LocationData found in server ${coopMatch.ServerId}!`);
                            return this.httpResponse.nullResponse();
                        }

                        this.inraidCallbacks.registerPlayer(url, info, sessionID);

                        return this.httpResponse.getBody(coopMatch.LocationData);
                    }
                ),
                new RouteAction(
                    "/coop/server/spawnPoint",
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (url: string, info: any, sessionID: string, output: string): any =>
                    {

                        const splitUrl = url.split("/");
                        const matchId = splitUrl.pop();

                        var spawnPoint = { x: 0, y: 0, z: 0 };
                        if(matchId !== undefined) {
                            // console.log("matchId:" + matchId);
                            const coopMatch = this.getCoopMatch(matchId);
                            if(coopMatch !== undefined)
                                spawnPoint = coopMatch.SpawnPoint;
                        }


                        output = JSON.stringify(spawnPoint);
                        return output;
                    }
                ),
                new RouteAction(
                    "/coop/server/friendlyAI",
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (url: string, info: any, sessionID: string, output: string): any =>
                    {

                        const splitUrl = url.split("/");
                        const matchId = splitUrl.pop();

                        var friendlyAI: friendlyAI;
                        if(matchId !== undefined) {
                            // console.log("matchId:" + matchId);
                            const coopMatch = this.getCoopMatch(matchId);
                            if(coopMatch !== undefined)
                            friendlyAI = coopMatch.friendlyAI;
                        }


                        output = JSON.stringify(friendlyAI);
                        return output;
                    }
                ),
                /* Fix for downloading bundle files with extension not ending with .bundle */
                new RouteAction(
                    "/files/bundle",
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (url: string, info: any, sessionID: string, output: string): any =>
                    {
                        return this.bundleCallbacks.getBundle(url, info, sessionID);
                    }
                )
            ]
            ,"aki"
        )

        staticRouterModService.registerStaticRouter(
            "MyStaticModRouter",
            [
                {
                    url: "/coop/server/getAllForLocation",
                    action: (url, info: any, sessionId: string, output) => {
                        // console.log(info);
                        const matches : CoopMatchResponse[] = [];
                        const profiles = this.saveServer.getProfiles();
                        for(let itemKey in CoopMatch.CoopMatches) {

                            // Get Instance of CoopMatch
                            const m = CoopMatch.CoopMatches[itemKey];

                            // Filter out Raids that have Not Started or Empty

                            // TEMP FOR UDP TESTING
                            //if(m.ConnectedPlayers.length === 0)
                                //continue;

                            // Filter out Raids that are on a different time
                            if (m.Time != info.timeVariant)
                                continue;

                            // Filter out Raids that are in a different location
                            if (m.Location != info.location)
                                continue;

                            // Create the custom CoopMatchResponse with the exact Json values needed by the Client
                            const matchResponse = new CoopMatchResponse();
                            // Account Id / Server Id
                            matchResponse.HostProfileId = itemKey;

                            let hostName = "";
                            // Player's name for the Host Name
                            for(let profileKey in profiles) {
                                if(profiles[profileKey].characters.pmc._id === itemKey) {
                                    hostName = profiles[profileKey].characters.pmc.Info.Nickname;
                                    break;
                                }
                            }
                            matchResponse.HostName = hostName;
                            // Raid Settings
                            matchResponse.Settings = m.Settings;
                            // Number of Players Connected
                            matchResponse.PlayerCount = m.ConnectedUsers.length;
                            // Numebr of Players Expected
                            matchResponse.ExpectedPlayerCount = m.ExpectedNumberOfPlayers;
                            // Location Instance
                            matchResponse.Location = m.Location;
                            // Passworded
                            matchResponse.IsPasswordLocked = m.Password !== undefined && m.Password !== "";
                            // Game Version
                            matchResponse.GameVersion = m.GameVersion;
                            // SIT Version
                            matchResponse.SITVersion = m.SITVersion;
                            // Server Id
                            matchResponse.ServerId = itemKey;

                            matches.push(matchResponse);
                        }
                        output = JSON.stringify(matches);
                        return output;
                    }
                },
                {
                    url: "/coop/server/create",
                    action: (url, info: any, sessionId, output) => {
                        logger.info(`Start a Coop Server ${info.serverId}`);
                        // logger.info("Coop Data:_________");
                        logger.info(info);
                        // logger.info("___________________");
                        let currentCoopMatch = CoopMatch.CoopMatches[info.serverId];
                        if(currentCoopMatch !== undefined && currentCoopMatch !== null) {
                            currentCoopMatch.endSession(CoopMatchEndSessionMessages.HOST_SHUTDOWN_MESSAGE);
                            delete CoopMatch.CoopMatches[info.serverId];
                            currentCoopMatch = undefined;
                        }

                        CoopMatch.CoopMatches[info.serverId] = new CoopMatch(info);
                        CoopMatch.CoopMatches[info.serverId].Timestamp = info.timestamp;
                        CoopMatch.CoopMatches[info.serverId].Location = info.settings.location;
                        CoopMatch.CoopMatches[info.serverId].Time = info.settings.timeVariant;
                        CoopMatch.CoopMatches[info.serverId].WeatherSettings = info.settings.timeAndWeatherSettings;
                        CoopMatch.CoopMatches[info.serverId].ExpectedNumberOfPlayers = info.expectedNumberOfPlayers;
                        CoopMatch.CoopMatches[info.serverId].GameVersion = info.gameVersion;
                        CoopMatch.CoopMatches[info.serverId].SITVersion = info.sitVersion;
                        CoopMatch.CoopMatches[info.serverId].Password = info.password !== undefined ? info.password : undefined;
                        CoopMatch.CoopMatches[info.serverId].AuthorizedUsers.push(info.serverId);
                        output = JSON.stringify(
                            { 
                            serverId:  info.serverId,
                            serverType: CoopMatch.CoopMatches[info.serverId].ServerType,
                            serverPort: CoopMatch.CoopMatches[info.serverId].ServerUdpPort,
                        });
                        return output;
                    }
                },
                {
                    url: "/coop/server/exist",
                    action: (url, info, sessionId, output) => {
                        
                        let coopMatch: CoopMatch = null;
                        for (let cm in CoopMatch.CoopMatches)
                        {
                            // logger.info(JSON.stringify(this.CoopMatches[cm]));

                            if (CoopMatch.CoopMatches[cm].Location != info.location)
                                continue;

                            if(CoopMatch.CoopMatches[cm].Time != info.timeVariant)
                                continue;

                            if (CoopMatch.CoopMatches[cm].Status == CoopMatchStatus.Complete)
                                continue;

                            // Player starting the server has 5 minutes to load into a raid
                            if (CoopMatch.CoopMatches[cm].LastUpdateDateTime < new Date(Date.now() - ((1000 * 60) * 5)))
                                continue;

                            if (CoopMatch.CoopMatches[cm].Password !== "")
                            {
                                if(info.password == "")
                                {
                                    output = JSON.stringify(
                                        {
                                            passwordRequired: true
                                        }
                                    )
                                    return output;
                                }
                                
                                if(CoopMatch.CoopMatches[cm].Password !== info.password)
                                {
                                    output = JSON.stringify(
                                        {
                                            invalidPassword: true
                                        }
                                    )
                                    return output;
                                }
                            } 

                            coopMatch = CoopMatch.CoopMatches[cm];
                        }
                        logger.info(coopMatch !== null ? "match exists" : "match doesn't exist!");

                        output = JSON.stringify(coopMatch !== null ? 
                            { 
                                ServerId: coopMatch.ServerId
                                , timestamp: coopMatch.Timestamp
                                , expectedNumberOfPlayers: coopMatch.ExpectedNumberOfPlayers 
                                , sitVersion: coopMatch.SITVersion 
                                , gameVersion: coopMatch.GameVersion
                            } : null);
                        return output;
                    }
                },
                {
                    url: "/coop/server/join",
                    action: (url, info, sessionId, output) => {
                        
                        let coopMatch: CoopMatch = CoopMatch.CoopMatches[info.serverId];
                        logger.info(coopMatch !== null ? "match exists" : "match doesn't exist!");

                        if(coopMatch === null || coopMatch === undefined) {

                            output = JSON.stringify(null);
                            return output;
                        }

                        if (coopMatch.Password !== "") {
                            if(info.password == "")
                            {
                                output = JSON.stringify(
                                    {
                                        passwordRequired: true
                                    }
                                )
                                return output;
                            }
                            
                            if(coopMatch.Password !== info.password)
                            {
                                output = JSON.stringify(
                                    {
                                        invalidPassword: true
                                    }
                                )
                                return output;
                            }
                        }
                        
                        if(coopMatch.ConnectedUsers.findIndex(x => x == info.profileId) !== -1)
                        {
                            if(WebSocketHandler.Instance.webSockets[info.profileId] !== undefined)
                            {
                                if(WebSocketHandler.Instance.webSockets[info.profileId].readyState == WebSocket.OPEN)
                                {
                                    logger.info(`JoinMatch failed: ${info.profileId} is already connected!`);
                                    
                                    output = JSON.stringify(
                                        {
                                            alreadyConnected: true
                                        }
                                    )
                                    
                                    return output;
                                }
                            }
                        }

                        if(coopMatch.AuthorizedUsers.findIndex(x => x == info.profileId) === -1)
                        {
                            coopMatch.AuthorizedUsers.push(info.profileId);
                            logger.info(`Added authorized user: ${info.profileId} in server: ${coopMatch.ServerId}`);
                        }

                        output = JSON.stringify(coopMatch !== null ? 
                            { 
                                serverId: coopMatch.ServerId,
                                serverType: coopMatch.ServerType,
                                serverPort: coopMatch.ServerUdpPort,
                                timestamp: coopMatch.Timestamp,
                                expectedNumberOfPlayers: coopMatch.ExpectedNumberOfPlayers,
                                sitVersion: coopMatch.SITVersion,
                                gameVersion: coopMatch.GameVersion,
                            } : null);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read/players",
                    action: (url, info, sessionId, output) => {
                        
                        // ---------------------------------------------------------------------------------------------------
                        // This call requires the client to pass what players/bots it knows about to filter the response back!

                        let coopMatch = this.getCoopMatch(info.serverId);
                        if(coopMatch == null || coopMatch == undefined)
                        {
                            output = JSON.stringify([{ notFound: true }]);
                            return output; 
                        }

                        //
                        let charactersToSend:any[] = [];
                        let playersToFilterOut:string[] = info.pL;
                        for(var c of coopMatch.Characters) {
                            if(!playersToFilterOut.includes(c.profileId)) {
                                charactersToSend.push(c);
                            }
                        }

                        output = JSON.stringify(charactersToSend);
                        // console.log(output);
                        return output;
                    }
                },
                {
                    url: "/coop/server/update",
                    action: (url, info, sessionId, output) => {
                        if(info === undefined || info.serverId === undefined) {

                            if(JSON.stringify(info).charAt(0) === '[') {
                                for(var item of info) {
                                    let coopMatch = this.getCoopMatch(item.serverId);
                                    if(coopMatch === undefined)
                                        break;

                                    coopMatch.ProcessData(item, logger);
                                }
                                output = JSON.stringify({});
                                return output; 
                            }

                            console.error("/coop/server/update -- no info or serverId provided");
                            output = JSON.stringify({ response: "ERROR" });
                            return JSON.stringify({ response: "ERROR" });
                        }

                        // let timeCheck = Date.now();

                        // console.log(info);
                        let coopMatch = this.getCoopMatch(info.serverId);
                        if(coopMatch == null || coopMatch == undefined)
                        {
                            console.error("/coop/server/update -- no coopMatch found to update");

                            output = JSON.stringify({});
                            return output; 
                        }

                        coopMatch.ProcessData(info, logger);
                        

                        // 
                        // console.log(Date.now() - timeCheck);


                        output = JSON.stringify({});
                        return output;
                    }
                },
                {
                    url: "/coop/server/delete",
                    action: (url, info, sessionId, output) => {
                        // logger.info("Update a Coop Server");
                        console.log(info);
                        output = JSON.stringify({ response: "OK" });
                        return JSON.stringify({ response: "OK" });
                    }
                },
                {
                    url: "/coop/get-invites",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        logger.info("Getting Coop Server Invites")
                        const obj = {
                            "players": [{}, {}],
                            "invite": [],
                            "group": []
                        };

                        output = JSON.stringify(obj);
                        return output;
                    }
                },
                {
                    url: "/coop/server-status",
                    action: (url, info, sessionId, output) => 
                    {
                        logger.info("Getting Coop Server Match Status")
                        return "";
                    }
                },
            ],
            "sit-coop"
            // "aki"
        );
        
        // Hook up to existing AKI static route
        staticRouterModService.registerStaticRouter(
            "MatchStaticRouter-SIT",
            [
                {
                    url: "/client/match/group/status",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        logger.info("/client/match/group/status")
                        logger.info("Getting Coop Server Match Status")
                        const obj = {
                            "players": [],
                            "invite": [],
                            "group": []
                        };
                        output = JSON.stringify(obj);
                        return output;
                    }
                },
                // {
                //     url: "/client/match/group/current",
                //     action: (url: string, info: any, sessionID: string, output: string): any => 
                //     {
                //         logger.info("/client/match/group/current")
                //         logger.info("TODO: Look into Getting Group Current")

                //         const myAccount = this.saveServer.getProfile(sessionID);
                //         if(myAccount === undefined) { 
                //             console.log("own account cannot be found");
                //             return null;
                //         }
                //         let squadList: Friend[] = [];
                //         // console.log(allAccounts);
                //         // {
                //         //     let squadMember: Friend = {
                //         //         _id: myAccount.info.id,
                //         //         Info: {
                //         //             Level: myAccount.characters.pmc.Info.Level,
                //         //             Nickname: myAccount.info.username,
                //         //             Side: myAccount.characters.pmc.Info.Side,
                //         //             MemberCategory: MemberCategory.DEFAULT
                //         //         }
                //         //     };
                //         //     squadList.push(squadMember);
                //         // }


                //         const obj = {
                //             squad: squadList,
                //             raidSettings: {}
                //         };
                //         output = JSON.stringify({ data: obj, err: 0, errmsg: null });
                //         return output;
                //     }
                // },
                {
                    url: "/client/match/group/exit_from_menu",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        logger.info("exit_from_menu")
                        output = JSON.stringify({});
                        return output;
                    }
                }
                ,{
                    url: "/client/match/group/exit_from_menu",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        logger.info("exit_from_menu")
                        output = JSON.stringify({});
                        return output;
                    }
                },
                {
                    url: "/client/raid/person/killed",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        logger.info("Person has been Killed!")
                        console.log(info);
                        output = JSON.stringify(info);
                        return output;
                    }
                },
                {
                    url: "/client/raid/createFriendlyAI",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        // logger.info("Person has been Killed!")
                        console.log(info);
                        output = JSON.stringify(info);
                        return output;
                    }
                },
                {
                    url: "/client/match/raid/ready",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        console.log(url);
                        console.log(info);
                        console.log(sessionID);
                        output = JSON.stringify({});
                        return output;
                    }
                },
                {
                    url: "/client/match/raid/not-ready",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        console.log(url);
                        console.log(info);
                        console.log(sessionID);
                        output = JSON.stringify({});
                        return output;
                    }
                },
                {
                    url: "/client/match/group/invite/cancel-all",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        console.log(url);
                        console.log(info);
                        console.log(sessionID);
                        output = JSON.stringify({});
                        return output;
                    }
                },
                {
                    url: "/client/match/available",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        console.log(url);
                        console.log(info);
                        console.log(sessionID);
                        output = JSON.stringify(false);
                        return output;
                    }
                }
            ],
            "aki"
        );

        /**
         * WIP/UNUSED FEATURE: GET FRIENDS LIST
         */
        // container.afterResolution("DialogueController", (_t, result: DialogueController) => 
        // {
        //     // We want to replace the original method logic with something different
        //     result.getFriendList = (sessionID: string) => 
        //     {
        //         return this.getFriendsList(sessionID);
        //     }
        //     // The modifier Always makes sure this replacement method is ALWAYS replaced
        // }, {frequency: "Always"});
        
        /**
         * MUST HAVE: REPLACE GAME CONFIG SO IP CAN BE EXTERNAL
         */
    }

    // public getFriendsList(sessionID: string): IGetFriendListDataResponse
    // {
    //     console.log("getFriendsList");
    //     const friends = this.getFriendsForUser(sessionID);

    //     return {
    //         "Friends": friends,
    //         "Ignore": [],
    //         "InIgnoreList": []
    //     };
    // }

    // public getFriendsForUser(sessionID: string): Friend[]
    // {
    //     const allAccounts = this.saveServer.getProfiles();
	// 	const myAccount = this.saveServer.getProfile(sessionID);
	// 	if(myAccount === undefined) { 
	// 		console.log("own account cannot be found");
	// 		return null;
	// 	}
    //     let friendList: Friend[] = [];
    //     // console.log(allAccounts);
    //     for (const id in allAccounts)
    //     {
    //         if(id == sessionID)
    //             continue;
    //         let accountProfile = this.saveServer.getProfile(id);
    //         let friend: Friend = {
    //             _id: accountProfile.info.id,
    //             Info: {
    //                 Level: accountProfile.characters.pmc.Info.Level,
    //                 Nickname: accountProfile.info.username,
    //                 Side: accountProfile.characters.pmc.Info.Side,
    //                 MemberCategory: MemberCategory.MemberCategory.DEFAULT
    //             }
    //         };
    //         friendList.push(friend);
    //     }

    //     return friendList;
    // }

    postDBLoad(container: tsyringe.DependencyContainer): void {
        StayInTarkovMod.container = container;

        const dbTables = StayInTarkovMod.container.resolve<DatabaseServer>("DatabaseServer").getTables();
        dbTables.locales.global["en"]["Attention! This is a Beta version of Escape from Tarkov for testing purposes."] 
            = "Welcome to Stay in Tarkov. The OFFLINE Coop mod for SPT-Aki.";

        dbTables.locales.global["en"]["NDA free warning"] 
            = "To Host/Join a game. You must select a map and go to the last screen to use the Server Browser. Have fun!";
            
        const locations = dbTables.locations;

        // Open All Exfils. This is a SIT >mod< feature. Has nothing to do with the Coop module. Can be turned off in config/SITConfig.json
        if(this.sitConfig.openAllExfils === true) {
            console.log("Opening all Exfils");
            this.updateExtracts(locations);
        }

         // Initialize Custom Traders
         for(const t of this.traders) {
            t.postDBLoad(container);
        }
    }

    private updateExtracts(locations: any):void
    {
        // Initialize an array of all of the location names
        const locationNames = [
            "bigmap",
            "factory4_day",
            "factory4_night",
            "interchange",
            "laboratory",
            "lighthouse",
            "rezervbase",
            "shoreline",
            "tarkovstreets",
            "woods",
            "sandbox"
        ];
        
        // Loop through each location
        for (const location of locationNames)
        {
            // Loop through each extract
            for (const extract in locations[location].base.exits)
            {
                const extractName = locations[location].base.exits[extract].Name;

                // Make extracts available no matter what side of the map you spawned.
                const newEntryPoint = this.getEntryPoints(locations[location].base.Id);
                if (locations[location].base.exits[extract].EntryPoints !== newEntryPoint)
                {
                    locations[location].base.exits[extract].EntryPoints = newEntryPoint;
                }
                
                    
                // If this is a train extract... Move on to the next extract.
                if (locations[location].base.exits[extract].PassageRequirement === "Train")
                {
                    continue;
                }

                if (locations[location].base.exits[extract].PassageRequirement === "ScavCooperation")
                {
                    locations[location].base.exits[extract].PassageRequirement = "TransferItem";
                    locations[location].base.exits[extract].RequirementTip = "EXFIL_Item";
                }

                locations[location].base.exits[extract].ExfiltrationType = "Individual";
                locations[location].base.exits[extract].PlayersCount = 0;
            }
        }
    }

    private getEntryPoints(location:string):string
    {
        switch (location) {
            case "bigmap":
                return "Customs,Boiler Tanks";
            case "factory4_day":
                return "Factory";
            case "factory4_night":
                return "Factory";
            case "Interchange":
                return "MallSE,MallNW";
            case "laboratory":
                return "Common";
            case "Lighthouse":
                return "Tunnel,North";
            case "RezervBase":
                return "Common";
            case "Shoreline":
                return "Village,Riverside";
            case "TarkovStreets":
                return "E1_2,E6_1,E2_3,E3_4,E4_5,E5_6,E6_1"
            case "Woods":
                return "House,Old Station";
            case "Sandbox":
                return "east,west";
            default:
                return "";
        }
    }

}
module.exports = {mod: new StayInTarkovMod()}
