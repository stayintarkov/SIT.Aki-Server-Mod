"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import type { SITMatching } from "./sitmatching";
class CoopMatch {
    constructor(inData) {
        /** The time the match was created. Useful for clearing out old matches. */
        this.CreatedDateTime = new Date();
        this.ExpectedNumberOfPlayers = 1;
        // All characters in the game. Including AI
        this.Characters = [];
        this.LastData = {};
        this.CreatedDateTime = new Date(Date.now());
    }
}
class Mod {
    constructor() {
        // A Dictonary of Coop Matches. The Key is the Account Id of the Player that created it
        this.CoopMatches = {};
    }
    preAkiLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const dynamicRouterModService = container.resolve("DynamicRouterModService");
        const staticRouterModService = container.resolve("StaticRouterModService");
        staticRouterModService.registerStaticRouter("Web-Page-Router", [
            {
                url: "/",
                action: (url, info, sessionId, output) => {
                    output = JSON.stringify({ response: "HELLO" });
                    return output;
                }
            },
        ], "sit-first-page");
        // Hook up a new static route
        staticRouterModService.registerStaticRouter("MyStaticModRouter", [
            {
                url: "/coop/server/create",
                action: (url, info, sessionId, output) => {
                    logger.info("Start a Coop Server");
                    console.log(info);
                    this.CoopMatches[info] = new CoopMatch(info);
                    output = JSON.stringify(this.CoopMatches[info]);
                    return output;
                }
            },
            {
                url: "/coop/server/read",
                action: (url, info, sessionId, output) => {
                    if (info === undefined || info.serverId === undefined) {
                        console.error("/coop/server/read -- no info or serverId provided");
                        output = JSON.stringify({ response: "ERROR" });
                        return JSON.stringify({ response: "ERROR" });
                    }
                    if (this.CoopMatches[info.serverId] === undefined) {
                        console.error(`/coop/server/read -- no server of ${info.serverId} exists`);
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
                    if (info === undefined || info.serverId === undefined) {
                        console.error("/coop/server/update -- no info or serverId provided");
                        output = JSON.stringify({ response: "ERROR" });
                        return JSON.stringify({ response: "ERROR" });
                    }
                    // console.log(info);
                    this.CoopMatches[info.serverId].LastData[info.m] = info;
                    // output = JSON.stringify(info);
                    // return output;

                    output = JSON.stringify(this.CoopMatches[info.serverId]);
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
                action: (url, info, sessionID, output) => {
                    logger.info("Getting Coop Server Invites");
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
                action: (url, info, sessionId, output) => {
                    logger.info("Getting Coop Server Match Status");
                    return "";
                }
            },
            {
                url: "/client/match/group/exit_from_menu",
                action: (url, info, sessionID, output) => {
                    logger.info("exit_from_menu");
                    output = JSON.stringify({});
                    return output;
                }
            },
            {
                url: "client/friend/list",
                action: (url, info, sessionID, output) => {
                    var friendList = {
                        "Friends": [],
                        "Ignore": [],
                        "InIgnoreList": []
                    };
                    logger.info("get friend list");
                    output = JSON.stringify(friendList);
                    return output;
                }
            }
        ], "sit-coop"
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
        staticRouterModService.registerStaticRouter("MatchStaticRouter-SIT", [
            {
                url: "/client/match/group/status",
                action: (url, info, sessionID, output) => {
                    logger.info("/client/match/group/status");
                    logger.info("Getting Coop Server Match Status");
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
                action: (url, info, sessionID, output) => {
                    logger.info("exit_from_menu");
                    output = JSON.stringify({});
                    return output;
                }
            }
        ], "aki");
    }
}
module.exports = { mod: new Mod() };
