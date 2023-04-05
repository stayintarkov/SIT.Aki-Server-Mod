import { DependencyContainer, injectable } from "tsyringe";

import { DialogueController } from "@spt-aki/controllers/DialogueController";
import { SaveServer } from "@spt-aki/servers/SaveServer";

import { Friend, IGetFriendListDataResponse } from "@spt-aki/models/eft/dialog/IGetFriendListDataResponse";
import { MemberCategory } from "@spt-aki/models/enums/MemberCategory";
import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { CoopMatch } from "./CoopMatch";

@injectable()
class Mod implements IPreAkiLoadMod
{
    constructor(
    )
    { 

    }

    private static container: DependencyContainer;

    // A Dictonary of Coop Matches. The Key is the Account Id of the Player that created it
    CoopMatches: Record<string, CoopMatch> = {}; 
    saveServer: SaveServer;

    public getCoopMatch(serverId: string) : CoopMatch {

        if(serverId === undefined) {
            console.error("getCoopMatch -- no serverId provided");
            return undefined;
        }

        if(this.CoopMatches[serverId] === undefined) {
            console.error(`getCoopMatch -- no server of ${serverId} exists`);
            return undefined;
        }

        return this.CoopMatches[serverId];
    } 

    public preAkiLoad(container: DependencyContainer): void {

        Mod.container = container;
        const logger = container.resolve<ILogger>("WinstonLogger");
        const dynamicRouterModService = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        this.saveServer = container.resolve<SaveServer>("SaveServer");

        staticRouterModService.registerStaticRouter(
            "Web-Page-Router",
            [
                {
                    url: "/",
                    action: (url, info, sessionId, output) => 
                    {
                        output =  JSON.stringify({response: "HELLO"});
                        return output;
                    }
                },

            ],
            "sit-first-page"
        );

        // Hook up a new static route
        staticRouterModService.registerStaticRouter(
            "MyStaticModRouter",
            [
                {
                    url: "/coop/server/create",
                    action: (url, info: any, sessionId, output) => {
                        logger.info("Start a Coop Server")
                        console.log(info);
                        if(this.CoopMatches[info.serverId] !== undefined) {
                            delete this.CoopMatches[info.serverId];
                        }

                        this.CoopMatches[info.serverId] = new CoopMatch(info.serverId);
                        output = JSON.stringify(this.CoopMatches[info.serverId]);
                        return output;
                    }
                },
                {
                    url: "/coop/server/exist",
                    action: (url, info, sessionId, output) => {
                        logger.info(url);
                        logger.info(info);
                        logger.info(sessionId);
                        
                        let coopMatch: CoopMatch = null;
                        for(let cm in this.CoopMatches)
                        {
                            if(this.CoopMatches[cm].LastUpdateDateTime > new Date(Date.now() - (1000 * 60)))
                                coopMatch = this.CoopMatches[cm];
                        }
                        logger.info(coopMatch != null ? "match exists" : "match doesn't exist!");

                        output = JSON.stringify(coopMatch);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read",
                    action: (url, info, sessionId, output) => {
                        
                        let coopMatch = this.getCoopMatch(info.serverId);
                        if(coopMatch == null || coopMatch == undefined)
                        {
                            output = JSON.stringify({});
                            return output; 
                        }
                        output = JSON.stringify(coopMatch);
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
                            output = JSON.stringify({});
                            return output; 
                        }

                        //
                        let charactersToSend:any[] = [];
                        let playersToFilterOut:string[] = info.pL;
                        for(var c of coopMatch.Characters) {
                            if(!playersToFilterOut.includes(c.accountId)) {
                                charactersToSend.push(c);
                            }
                        }

                        output = JSON.stringify(charactersToSend);
                        // console.log(output);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read/lastActions",
                    action: (url, info, sessionId, output) => {

                        // ---------------------------------------------------------------------------------------------------
                        // Send's lastData without player spawns etc

                        let coopMatch = this.getCoopMatch(info.serverId);
                        if(coopMatch == null || coopMatch == undefined)
                        {
                            output = JSON.stringify({});
                            return output; 
                        }
                        output = JSON.stringify(coopMatch.LastData);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read/lastMoves",
                    action: (url, info, sessionId, output) => {
                        let coopMatch = this.getCoopMatch(info.serverId);
                        if(coopMatch == null || coopMatch == undefined)
                        {
                            output = JSON.stringify({});
                            return output; 
                        }
                        output = JSON.stringify(coopMatch.LastMoves);
                        return output;
                    }
                },
                {
                    url: "/coop/server/update",
                    action: (url, info, sessionId, output) => {
                        if(info === undefined || info.serverId === undefined) {
                            console.error("/coop/server/update -- no info or serverId provided");
                            output = JSON.stringify({ response: "ERROR" });
                            return JSON.stringify({ response: "ERROR" });
                        }

                        // console.log(info);
                        let coopMatch = this.getCoopMatch(info.serverId);
                        if(coopMatch == null || coopMatch == undefined)
                        {
                            console.error("/coop/server/update -- no coopMatch found to update");

                            output = JSON.stringify({});
                            return output; 
                        }
                        
                        // logger.info(`Update a Coop Server [${info.serverId}][${info.accountId}][${info.m}]`);
                        logger.info(`Update a Coop Server [${info.serverId}][${info.m}]`);
                        this.CoopMatches[info.serverId].LastData[info.m] = info;
                        
                        if(info.m == "Move") {
                            // console.log(info);
                            this.CoopMatches[info.serverId].LastMoves[info.accountId] = info;
                        }
                        else if(info.m == "PlayerSpawn") {
                            // console.log(info);
                            let foundExistingPlayer = false;
                            for(var c of coopMatch.Characters) {
                                if(info.accountId == c.accountId) {
                                    foundExistingPlayer = true;
                                    break;
                                }
                            }
                            if(!foundExistingPlayer)
                                this.CoopMatches[info.serverId].Characters.push(info);
                        }
                        else {

                        }

                        this.CoopMatches[info.serverId].LastUpdateDateTime = new Date(Date.now());
                        // output = JSON.stringify(this.CoopMatches[info.serverId].LastData);
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
                            "players": [{}, {}],
                            "invite": [],
                            "group": []
                        };
                        output = JSON.stringify(obj);
                        return output;
                    }
                },
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
                //,
                // {
                //     url: "/client/profile/status",
                //     action: (url: string, info: any, sessionID: string, output: string): any => 
                //     {
                //         console.log(url);
                //         console.log(info);
                //         console.log(sessionID);
                //         const response = {
                //             maxPveCountExceeded: false,
                //             profiles: [
                //                 {
                //                     "profileid": `scav${sessionID}`,
                //                     profileToken: null,
                //                     "status": "Free",
                //                     "sid": "",
                //                     "ip": "",
                //                     "port": 0,
                //                     version: "live",
                //                     location: "bigmap",
                //                     raidMode: "Local",
                //                     mode: "deathmatch",
                //                     shortId: "xxx1x1"
                
                //                 },
                //                 {
                //                     "profileid": `pmc${sessionID}`,
                //                     profileToken: null,
                //                     "status": "Free",
                //                     "sid": "",
                //                     "ip": "",
                //                     "port": 0,
                //                     // "raidMode": "Local",
                //                     // location: "bigmap",
                //                     // version: "live",
                //                     // mode: "deathmatch",
                //                     // shortId: "xxx1x1"
                //                 }
                //             ]
                //         };
                //         output = JSON.stringify(response);
                //         return output;
                //     }
                // }
               
            ],
            "aki"
        );

        container.afterResolution("DialogueController", (_t, result: DialogueController) => 
        {
            // We want to replace the original method logic with something different
            result.getFriendList = (sessionID: string) => 
            {
                return this.getFriendsList(sessionID);
            }
            // The modifier Always makes sure this replacement method is ALWAYS replaced
        }, {frequency: "Always"});
        
    }

    public getFriendsList(sessionID: string): IGetFriendListDataResponse
    {
        console.log("getFriendsList");
        const friends = this.getFriendsForUser(sessionID);

        return {
            "Friends": friends,
            "Ignore": [],
            "InIgnoreList": []
        };
    }

    public getFriendsForUser(sessionID: string): Friend[]
    {
        const allAccounts = this.saveServer.getProfiles();
		const myAccount = this.saveServer.getProfile(sessionID);
		if(myAccount === undefined) { 
			console.log("own account cannot be found");
			return null;
		}
        let friendList: Friend[] = [];
        // console.log(allAccounts);
        for (const id in allAccounts)
        {
            if(id == sessionID)
                continue;
            let accountProfile = this.saveServer.getProfile(id);
            let friend: Friend = {
                _id: accountProfile.info.id,
                Info: {
                    Level: accountProfile.characters.pmc.Info.Level,
                    Nickname: accountProfile.info.username,
                    Side: accountProfile.characters.pmc.Info.Side,
                    MemberCategory: MemberCategory.DEFAULT
                }
            };
            friendList.push(friend);
        }

        return friendList;
    }
}
module.exports = {mod: new Mod()}