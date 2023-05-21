import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { WebSocketHandler } from "./WebSocketHandler";

export enum CoopMatchStatus {
    Loading,
    InGame,
    Complete
}

export class CoopMatch {

    ServerId: string;
    /** The time the match was created. Useful for clearing out old matches. */
    CreatedDateTime: Date = new Date();
    LastUpdateDateTime: Date = new Date();

    /** The state of the match. */
    State: any;
    /** The IP of the match. */
    Ip: string;
    /** The Port of the match. */
    Port: string;

    ExpectedNumberOfPlayers: number = 1;
    public ConnectedPlayers: string[] = [];

    // All characters in the game. Including AI
    public Characters: any[] = [];
    LastDataByAccountId: Record<string, Record<string, Record<string, any>>> = {};
    LastDataReceivedByAccountId: Record<string, number> = {};
    LastData: Record<string, Record<string, any>> = {};
    LastMoves: Record<string, any> = {};
    LastRotates: Record<string, any> = {};
    DamageArray: any[] = [];
    Status: CoopMatchStatus = CoopMatchStatus.Loading;
    Settings: any = {};
    Loot: any = {};
    Location: string;
    Time: string;
    WeatherSettings: any;

    // A Dictonary of Coop Matches. The Key is the Account Id of the Player that created it
    public static CoopMatches: Record<string, CoopMatch> = {}; 

    public constructor(inData: any) {

        this.ServerId = inData.serverId;
        this.Location = inData.settings.location;
        this.Time = inData.settings.timeVariant;
        this.WeatherSettings = inData.settings.timeAndWeatherSettings;
        this.Status = CoopMatchStatus.Loading;
        this.CreatedDateTime = new Date(Date.now());
        this.LastUpdateDateTime = new Date(Date.now());

        if(CoopMatch.CoopMatches[inData.serverId] !== undefined) {
            delete CoopMatch.CoopMatches[inData.serverId];
        }

        let cm = this;
        setInterval(() => {

            // for(const key in cm.LastDataByAccountId) {
            //     WebSocketHandler.Instance.sendToWebSockets(this.ConnectedPlayers, JSON.stringify(cm.LastDataByAccountId[key]));
            // }

        }, 1000);

        setInterval(() => {

            WebSocketHandler.Instance.sendToWebSockets(this.ConnectedPlayers, JSON.stringify({ ping: Date.now() }));

        }, 2000);
    }

    public ProcessData(info: any, logger: ILogger) {

        if(info === undefined)
            return;

        if(JSON.stringify(info).charAt(0) === "[") {

            for(var indexOfInfo in info) {
                const _info = info[indexOfInfo];
                this.ProcessData(_info, logger);
            }

            return;
        }


        if(info.accountId !== undefined)
            this.PlayerJoined(info.accountId);

        if(info.m === undefined) { 
            this.LastUpdateDateTime = new Date(Date.now());
            return;
        }
            
        // logger.info(`Update a Coop Server [${info.serverId}][${info.m}]`);

        if(info.m !== "PlayerSpawn") {
            // this.LastData[info.m] = info;

            if(this.LastDataByAccountId[info.accountId] === undefined)
                this.LastDataByAccountId[info.accountId] = {};

            this.LastDataByAccountId[info.accountId][info.m] = info;
        }
        
        // if(info.m == "Move") {
        //     // console.log(info);
        //     this.LastMoves[info.accountId] = info;
        // }
        // else
        
        if(info.m == "PlayerSpawn") {
            // console.log(info);
            let foundExistingPlayer = false;
            for(var c of this.Characters) {
                if(info.accountId == c.accountId) {
                    foundExistingPlayer = true;
                    break;
                }
            }
            if(!foundExistingPlayer)
                this.Characters.push(info);
        }

        this.LastUpdateDateTime = new Date(Date.now());

        WebSocketHandler.Instance.sendToWebSockets(this.ConnectedPlayers, JSON.stringify(info));
    }

    public UpdateStatus(inStatus: CoopMatchStatus) {
        this.Status = inStatus;
    }

    public PlayerJoined(accountId: string) {
        if(this.ConnectedPlayers.findIndex(x => x == accountId) === -1) {
            this.ConnectedPlayers.push(accountId);
            console.log(`${this.ServerId}: ${accountId} has joined`);
        }
    }

    public PlayerLeft(accountId: string) {
        this.ConnectedPlayers = this.ConnectedPlayers.filter(x => x != accountId);
        console.log(`${this.ServerId}: ${accountId} has left`);
    }

    
}