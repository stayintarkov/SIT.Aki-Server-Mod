export class CoopMatch {

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