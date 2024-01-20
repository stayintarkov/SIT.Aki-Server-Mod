import { inject, injectable } from "tsyringe";

import { WeatherGenerator } from "@spt-aki/generators/WeatherGenerator";
import { ApplicationContext } from "@spt-aki/context/ApplicationContext";
import { ContextVariableType } from "@spt-aki/context/ContextVariableType";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { IWeather, IWeatherData } from "@spt-aki/models/eft/weather/IWeatherData";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { TimeUtil } from "@spt-aki/utils/TimeUtil";

@injectable()
export class CoopWeatherGenerator extends WeatherGenerator
{
    
    constructor
    (
        @inject("WeightedRandomHelper") protected weightedRandomHelper: WeightedRandomHelper,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("RandomUtil") protected randomUtil: RandomUtil,
        @inject("TimeUtil") protected timeUtil: TimeUtil,
        @inject("ApplicationContext") protected applicationContext: ApplicationContext,
        @inject("ConfigServer") protected configServer: ConfigServer,
    )
    {
        super(weightedRandomHelper, logger, randomUtil, timeUtil, applicationContext, configServer)
    }

    public override calculateGameTime(data: IWeatherData, sessionId?:string): IWeatherData
    {
        this.logger.info("Multiplayer Weather Generator Reached: calculateGameTime")
        this.logger.info("calculateGameTime, sessionId: " + sessionId);
        const computedDate = new Date();
        const formattedDate = this.timeUtil.formatDate(computedDate);

        data.date = formattedDate;
        data.time = this.getBsgFormattedInRaidTime(computedDate, sessionId);
        data.acceleration = this.weatherConfig.acceleration;

        return data;
    }
    
    protected override getBsgFormattedInRaidTime(currentDate: Date, sessionId?:string): string
    {
        this.logger.info("Multiplayer Weather Generator Reached: getBsgFormattedInRaidTime")
        this.logger.info("getBsgFormattedInRaidTime, sessionId: " + sessionId);
        const clientAcceleratedDate = this.getInRaidTime(currentDate, sessionId, false);

        return this.getBSGFormattedTime(clientAcceleratedDate);
    }

    public recordKeys<K extends PropertyKey, T>(object: Record<K, T>) : K[] 
    {
        return Object.keys(object) as (K)[];
    }

    public override getInRaidTime(currentDate: Date, sessionId?:string, logMe?: boolean): Date 
    {
        this.logger.info("Multiplayer Weather Generator Reached: getInRaidTime")
        // Get timestamp of when client connected to server
        const contextVariable = this.applicationContext.getLatestValue(ContextVariableType.CLIENT_START_TIMESTAMP);
        const timestampRecord = contextVariable.getValue<Record<string, number>>()
        const gameStartTimeStampMS = timestampRecord[sessionId];

        if (logMe) 
        {
            this.logger.info("getInRaidTime, sessionId: " + sessionId);
            this.logger.info("contextVariable: " + typeof contextVariable);
            this.logger.info("timestampRecord: " + typeof timestampRecord);
            this.logger.info("entries timestampRecord: " + this.recordKeys(timestampRecord).length.toString());
            this.recordKeys(timestampRecord).forEach((key) => this.logger.info(key));
            this.logger.info("getInRaidTime, timestampRecord Attempt: " 
                + sessionId + ", " 
                + gameStartTimeStampMS)
        }

        // Get delta between now and when client connected to server in milliseconds
        const deltaMSFromNow = currentDate.getTime() - gameStartTimeStampMS;
        const acceleratedMS = deltaMSFromNow * (this.weatherConfig.acceleration);

        // Match client side time calculations which start from the current date + connection time, not current time
        const locationTime = new Date(gameStartTimeStampMS);
        locationTime.setFullYear(currentDate.getFullYear());
        locationTime.setMonth(currentDate.getMonth());
        locationTime.setDate(currentDate.getDate());

        const clientAcceleratedDate = new Date(locationTime.getTime() + acceleratedMS);
        
        if (logMe) 
        {
            this.logger.info("Server Time Sync Values:");

            const connectionTime = new Date(gameStartTimeStampMS);

            let connectionDiff = deltaMSFromNow;
            const connectionTimeH = Math.floor(connectionDiff / (1000 * 60 * 60));
            connectionDiff -= connectionTimeH * (1000 * 60 * 60);
            const connectionTimeM = Math.floor(connectionDiff / (1000 * 60));
            connectionDiff -= connectionTimeM * (1000 * 60);
            const connectionTimeS = Math.floor(connectionDiff / (1000));
            connectionDiff -= connectionTimeS * (1000);

            let acceleratedDiff = acceleratedMS;
            const acceleratedTimeH = Math.floor(acceleratedDiff / (1000 * 60 * 60));
            acceleratedDiff -= acceleratedTimeH * (1000 * 60 * 60);
            const acceleratedTimeM = Math.floor(acceleratedDiff / (1000 * 60));
            acceleratedDiff -= acceleratedTimeM * (1000 * 60);
            const acceleratedTimeS = Math.floor(acceleratedDiff / (1000));
            acceleratedDiff -= acceleratedTimeS * (1000);

            this.logger.info(
                "Now: " + currentDate.toDateString() + " "
                    + currentDate.toLocaleTimeString("en-US", { hour12: false })
                    + ", Connection Time: " + connectionTime.toDateString() + " "
                    + connectionTime.toLocaleTimeString("en-US", { hour12: false })
                    + ", Delta: " + connectionTimeH
                    + ":" + connectionTimeM + ":" + connectionTimeS.toString()
            );
            this.logger.info(
                "Today/Location Time: " + locationTime.toDateString() + " "
                    + locationTime.toLocaleTimeString("en-US", { hour12: false }) + ", Accelerated Delta: "
                    + acceleratedTimeH.toString() + ":"
                    + acceleratedTimeM.toString() + ":" + acceleratedTimeS.toString()
            );
            this.logger.info(
                "Accelerated Time:" + clientAcceleratedDate.toDateString() + " "
                    + clientAcceleratedDate.toLocaleTimeString("en-US", { hour12: false }) + ", "
                    + "Acceleration: " + this.weatherConfig.acceleration.toString()
            );
        }

        return clientAcceleratedDate;
    }

    public override generateWeather(sessionId?:string): IWeather
    {
        this.logger.info("Multiplayer Weather Generator Reached: generateWeather")
        this.logger.info("generateWeather, sessionId: " + sessionId);
        const rain = this.getWeightedRain();

        const result: IWeather = {
            cloud: this.getWeightedClouds(),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            wind_speed: this.getWeightedWindSpeed(),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            wind_direction: this.getWeightedWindDirection(),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            wind_gustiness: this.getRandomFloat("windGustiness"),
            rain: rain,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            rain_intensity: (rain > 1) ? this.getRandomFloat("rainIntensity") : 0,
            fog: this.getWeightedFog(),
            temp: this.getRandomFloat("temp"),
            pressure: this.getRandomFloat("pressure"),
            time: "",
            date: "",
            timestamp: 0,
        };

        this.setCurrentDateTime(result, sessionId);

        return result;
    }

    protected override setCurrentDateTime(weather: IWeather, sessionId?:string): void
    {
        this.logger.info("Multiplayer Weather Generator Reached: setCurrentDateTime")
        this.logger.info("setCurrentDateTime, sessionId: " + sessionId);
        const currentDate = this.getInRaidTime(new Date(), sessionId, true);
        const normalTime = this.getBSGFormattedTime(currentDate);
        const formattedDate = this.timeUtil.formatDate(currentDate);
        const datetime = `${formattedDate} ${normalTime}`;

        weather.timestamp = Math.floor(currentDate.getTime() / 1000); // matches weather.date
        weather.date = formattedDate; // matches weather.timestamp
        weather.time = datetime; // matches weather.timestamp
    }
}