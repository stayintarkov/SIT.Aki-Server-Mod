import { WindDirection } from "../../../models/enums/WindDirection";
import { MinMax } from "../../common/MinMax";
import { IBaseConfig } from "./IBaseConfig";
export interface IWeatherConfig extends IBaseConfig {
    kind: "aki-weather";
    acceleration: number;
    weather: Weather;
}
export interface Weather {
    clouds: MinMax;
    windSpeed: WeatherSettings<number>;
    windDirection: WeatherSettings<WindDirection>;
    windGustiness: MinMax;
    rain: WeatherSettings<number>;
    rainIntensity: MinMax;
    fog: WeatherSettings<string>;
    temp: MinMax;
    pressure: MinMax;
}
export interface WeatherSettings<T> {
    values: T[];
    weights: number[];
}
