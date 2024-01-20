import { DependencyContainer } from "tsyringe";

import { WeatherCallbacks } from "@spt-aki/callbacks/WeatherCallbacks";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { IWeatherData } from "@spt-aki/models/eft/weather/IWeatherData";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

import { CoopWeatherController } from "../Extentions/CoopWeatherController";

export class WeatherCallbacksOverride
{
    container: DependencyContainer;

    logger: ILogger;
    httpResponse: HttpResponseUtil;
    weatherController: CoopWeatherController;
    
    constructor
    (
        container: DependencyContainer
    )
    {
        this.container = container;
        this.httpResponse = container.resolve<HttpResponseUtil>("HttpResponseUtil");
        this.weatherController = container.resolve<CoopWeatherController>("CoopWeatherController");
        this.logger = container.resolve<ILogger>("WinstonLogger");
    }

    public override(): void 
    {
        this.container.afterResolution("WeatherCallbacks", (_t, result: WeatherCallbacks) => 
        {
            result.getWeather = (url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IWeatherData> => 
            {
                this.logger.info("Multiplayer Weather Callback Reached")
                return this.httpResponse.getBody(this.weatherController.generate(sessionID));
            }
        }, {frequency: "Always"});
    }
}