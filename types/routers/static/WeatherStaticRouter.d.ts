import { WeatherCallbacks } from "../../callbacks/WeatherCallbacks";
import { StaticRouter } from "../../di/Router";
export declare class WeatherStaticRouter extends StaticRouter {
    protected weatherCallbacks: WeatherCallbacks;
    constructor(weatherCallbacks: WeatherCallbacks);
}
