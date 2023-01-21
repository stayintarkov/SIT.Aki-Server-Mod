export interface BotGenerationDetails {
    /** Should the bot be generated as a PMC */
    isPmc: boolean;
    /** assault/pmcBot etc */
    role: string;
    /** Side of bot */
    side: string;
    /** Active players current level */
    playerLevel: number;
    /** Delta of highest level of bot */
    botRelativeLevelDeltaMax: number;
    /** How many to create and store */
    botCountToGenerate: number;
    /** Desired difficulty of the bot */
    botDifficulty: string;
    /** Will the generated bot be a player scav */
    isPlayerScav: boolean;
}
