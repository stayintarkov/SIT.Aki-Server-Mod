import { WindDirection } from "../../../models/enums/WindDirection";
export interface IWeatherData {
    acceleration: number;
    time: string;
    date: string;
    weather?: IWeather;
}
export interface IWeather {
    pressure: number;
    temp: number;
    fog: number;
    rain_intensity: number;
    rain: number;
    wind_gustiness: number;
    wind_direction: WindDirection;
    wind_speed: number;
    cloud: number;
    time: string;
    date: string;
    timestamp: number;
}
