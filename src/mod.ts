import { DependencyContainer } from "tsyringe";
import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import type {DynamicRouterModService} from "@spt-aki/services/mod/dynamicRouter/DynamicRouterModService";
import type {StaticRouterModService} from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
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

    public constructor(inData: any) {
        this.CreatedDateTime = new Date(Date.now());
    }
    
}

class Mod implements IPreAkiLoadMod
{
    // A Dictonary of Coop Matches. The Key is the Account Id of the Player that created it
    CoopMatches: Record<string, CoopMatch> = {}; 

    public preAkiLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const dynamicRouterModService = container.resolve<DynamicRouterModService>("DynamicRouterModService");
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        
        // Hook up a new dynamic route
        // dynamicRouterModService.registerDynamicRouter(
        //     "MyDynamicModRouter",
        //     [
        //         {
        //             url: "/coop/start-server",
        //             action: (url, info, sessionId, output) => 
        //             {
        //                 logger.info("Start a Coop Server")
        //                 return JSON.stringify({response: "OK"});
        //             }
        //         }
        //     ],
        //     "custom-dynamic-my-mod"
        // );
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
                    action: (url, info: any, sessionId, output) => 
                    {
                        logger.info("Start a Coop Server")
                        console.log(info);
                        this.CoopMatches[info] = new CoopMatch(info);
                        output = JSON.stringify(this.CoopMatches[info]);
                        return output;
                    }
                },
                {
                    url: "/coop/server/read",
                    action: (url, info, sessionId, output) => {
                        if(info === undefined || info.serverId === undefined) {
                            console.error("/coop/server/read -- no info or serverId provided");
                            output = JSON.stringify({ response: "ERROR" });
                            return JSON.stringify({ response: "ERROR" });
                        }

                        output = JSON.stringify(this.CoopMatches[info.serverId]);
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
                        
                        console.log(info);
                        this.CoopMatches[info.serverId].LastData[info.m] = info;

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
                }
                ,
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
            "aki"
        );
        
    }
}
module.exports = {mod: new Mod()}