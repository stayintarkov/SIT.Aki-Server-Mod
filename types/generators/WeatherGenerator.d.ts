import { ApplicationContext } from "../context/ApplicationContext";
import { WeightedRandomHelper } from "../helpers/WeightedRandomHelper";
import { IWeather, IWeatherData } from "../models/eft/weather/IWeatherData";
import { WindDirection } from "../models/enums/WindDirection";
import { IWeatherConfig } from "../models/spt/config/IWeatherConfig";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class WeatherGenerator {
    protected weightedRandomHelper: WeightedRandomHelper;
    protected logger: ILogger;
    protected randomUtil: RandomUtil;
    protected timeUtil: TimeUtil;
    protected applicationContext: ApplicationContext;
    protected configServer: ConfigServer;
    protected weatherConfig: IWeatherConfig;
    constructor(weightedRandomHelper: WeightedRandomHelper, logger: ILogger, randomUtil: RandomUtil, timeUtil: TimeUtil, applicationContext: ApplicationContext, configServer: ConfigServer);
    calculateGameTime(data: IWeatherData): IWeatherData;
    /**
     * Get server uptime seconds multiplied by a multiplier and add to current time as seconds
     * Format to BSGs requirements
     * @param currentDate current date
     * @returns formatted time
     */
    protected getBsgFormattedInRaidTime(currentDate: Date): string;
    /**
     * Get the current in-raid time
     * @param currentDate (new Date())
     * @returns Date object of current in-raid time
     */
    getInRaidTime(currentDate: Date): Date;
    /**
     * Get current time formatted to fit BSGs requirement
     * @param date date to format into bsg style
     * @returns
     */
    protected getBSGFormattedTime(date: Date): string;
    /**
     * Return randomised Weather data with help of config/weather.json
     * @returns Randomised weather data
     */
    generateWeather(): IWeather;
    /**
     * Set IWeather date/time/timestamp values to now
     * @param weather Object to update
     */
    protected setCurrentDateTime(weather: IWeather): void;
    protected getWeightedWindDirection(): WindDirection;
    protected getWeightedWindSpeed(): number;
    protected getWeightedFog(): number;
    protected getWeightedRain(): number;
    protected getRandomFloat(node: string): number;
}
