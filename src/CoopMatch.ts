import type { ILogger } from "@spt-aki/models/spt/utils/ILogger";

export class CoopMatch {

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
    // All characters in the game. Including AI
    Characters: any[] = [];
    LastData: Record<string, Record<string, any>> = {};
    LastMoves: Record<string, any> = {};
    LastRotates: Record<string, any> = {};
    DamageArray: any[] = [];

    public constructor(inData: any) {
        this.CreatedDateTime = new Date(Date.now());
        this.LastUpdateDateTime = new Date(Date.now());
    }

    public ProcessData(info: any, logger: ILogger) {

        if(typeof(info) === undefined)
            return;

        if(JSON.stringify(info).charAt(0) === "[") {

            for(var indexOfInfo in info) {
                const _info = info[indexOfInfo];
                this.ProcessData(_info, logger);
            }

            return;
        }

        // logger.info(`Update a Coop Server [${info.serverId}][${info.m}]`);
        this.LastData[info.m] = info;
        
        if(info.m == "Move") {
            // console.log(info);
            this.LastMoves[info.accountId] = info;
        }
        else if(info.m == "PlayerSpawn") {
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
    }


    
}