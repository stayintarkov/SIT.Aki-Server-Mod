import { DialogueController } from "@spt-aki/controllers/DialogueController";
import { IGetFriendListDataResponse } from "@spt-aki/models/eft/dialog/IGetFriendListDataResponse";
import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type { DynamicRouterModService } from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { DependencyContainer, injectable } from "tsyringe";
// import type { SITMatching } from "./sitmatching";

class CoopMatch {

    /** The time the match was created. Useful for clearing out old matches. */
    CreatedDateTime: Date = new Date();
    /** The state of the match. */
    State: any;
    /** The IP of the match. */
    Ip: string;
    /** The Port of the match. */
    Port: string;

    ExpectedNumberOfPlayers: number = 1;
    // All characters in the game. Including AI
    Characters: any[] = [];
    LastData: Record<string, Record<string, any>> = {};
    LastMoves: Record<string, any> = {};
    LastRotates: Record<string, any> = {};

    public constructor(inData: any) {
        this.CreatedDateTime = new Date(Date.now());
    }

    
}

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

    public getCoopMatch(serverId: string) : CoopMatch {

        if(serverId === undefined) {
            console.error("getCoopMatch -- no serverId provided");
            return null;
        }

        if(this.CoopMatches[serverId] === undefined) {
            console.error(`getCoopMatch -- no server of ${serverId} exists`);
            return null;
        }

        return this.CoopMatches[serverId];
    } 

    public preAkiLoad(container: DependencyContainer): void {

        Mod.container = container;
        const logger = container.resolve<ILogger>("WinstonLogger");
        const dynamicRouterModService = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        
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
                    url: "/coop/server/read",
                    action: (url, info, sessionId, output) => {
                        
                        let coopMatch = this.getCoopMatch(info.serverId);
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
                        output = JSON.stringify(coopMatch.Characters);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read/lastActions",
                    action: (url, info, sessionId, output) => {

                        // ---------------------------------------------------------------------------------------------------
                        // Send's lastData without player spawns etc

                        let coopMatch = this.getCoopMatch(info.serverId);
                        output = JSON.stringify(coopMatch.LastData);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read/lastMoves",
                    action: (url, info, sessionId, output) => {
                        let coopMatch = this.getCoopMatch(info.serverId);
                        output = JSON.stringify(coopMatch.LastMoves);
                        return output;
                    }
                },
                {
                    url: "/coop/server/update",
                    action: (url, info, sessionId, output) => {
                        // logger.info("Update a Coop Server");
                        if(info === undefined || info.serverId === undefined) {
                            console.error("/coop/server/update -- no info or serverId provided");
                            output = JSON.stringify({ response: "ERROR" });
                            return JSON.stringify({ response: "ERROR" });
                        }

                        // console.log(info);
                        
                        this.CoopMatches[info.serverId].LastData[info.m] = info;

                        if(info.m == "Move") {
                            // console.log(info);
                            this.CoopMatches[info.serverId].LastMoves[info.accountId] = info;
                        }
                        else {

                        }

                        output = JSON.stringify(info);
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
                {
                    url: "/client/match/group/exit_from_menu",
                    action: (url: string, info: any, sessionID: string, output: string): any => 
                    {
                        logger.info("exit_from_menu")
                        output = JSON.stringify({});
                        return output;
                    }
                }

                
                
            ],
            "sit-coop"
            // "aki"
        );

        // Hook up to existing AKI dynamic route
        // dynamicRouterModService.registerDynamicRouter(
        //     "DynamicRoutePeekingAki",
        //     [
        //         {
        //             url: "/client/menu/locale/",
        //             action: (url, info, sessionId, output) => 
        //             {
        //                 logger.info("/client/menu/locale/ data was: " + JSON.stringify(output))
        //                 return output;
        //             }
        //         }
        //     ],
        //     "aki"
        // );
        
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
                // ,
                // {
                //     url:  "/client/game/profile/search",
                //     action: (url: string, info: any, sessionID: string, output: string): any => 
                //     {
                //         var result = [
                //             {
                //                 _id: "",
                //                 Info: {
                //                     Level: 1,
                //                     Side: "Bear",
                //                     Nickname: info.nickname
                //                 }
                //             }
                //         ]
                //         logger.info("custom /client/game/profile/search")
                //         output = JSON.stringify(result);
                //         return output;
                //     }
                // }
                // ,
                // {
                //     url: "client/friend/list",
                //     action: (url: string, info: any, sessionID: string, output: string): any => 
                //     {
                //         var friendList = {
                //             "Friends": [],
                //             "Ignore": [],
                //             "InIgnoreList": []
                //         };
                //         logger.info("get friend list")
                //         output = JSON.stringify(friendList);
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
        return {
            "Friends": [],
            "Ignore": [],
            "InIgnoreList": []
        };
    }
}
module.exports = {mod: new Mod()}