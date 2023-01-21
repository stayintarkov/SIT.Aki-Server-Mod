import { BotAmount } from "../../enums/BotAmount";
import { BotDifficulty } from "../../enums/BotDifficulty";
export interface IStartOfflineRaidRequestData {
    locationName: string;
    /** Current time, not in-game time */
    startTime: number;
    /** CURR = am, past = pm */
    dateTime: "CURR" | "PAST";
    gameSettings: GameSettings;
}
export interface GameSettings {
    timeAndWeatherSettings: TimeAndWeatherSettings;
    botsSettings: BotsSettings;
    wavesSettings: WavesSettings;
}
export interface TimeAndWeatherSettings {
    isRandomTime: boolean;
    isRandomWeather: boolean;
}
export interface BotsSettings {
    isEnabled: boolean;
    isScavWars: boolean;
    botAmount: BotAmount;
}
export interface WavesSettings {
    botDifficulty: BotDifficulty;
    isBosses: boolean;
    isTaggedAndCursed: boolean;
    wavesBotAmount: BotAmount;
}
