import { inject, injectable } from "tsyringe";

import { WeatherController } from "@spt-aki/controllers/WeatherController";
import { IWeatherData } from "@spt-aki/models/eft/weather/IWeatherData";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";

import { CoopWeatherGenerator } from "./CoopWeatherGenerator";

@injectable()
export class CoopWeatherController extends WeatherController
{    
    constructor(
        @inject("WeatherGenerator") protected weatherGenerator: CoopWeatherGenerator,
        @inject("WinstonLogger") protected logger: ILogger,
        @inject("ConfigServer") protected configServer: ConfigServer
    )
    {
        super(weatherGenerator, logger, configServer)
    }

    /** Handle client/weather */
    public override generate(sessionId?: string): IWeatherData
    {
        this.logger.info("Multiplayer Weather Controller Reached")
        let result: IWeatherData = { acceleration: 0, time: "", date: "", weather: null };

        result = this.weatherGenerator.calculateGameTime(result, sessionId);
        result.weather = this.weatherGenerator.generateWeather(sessionId);

        return result;
    }
}