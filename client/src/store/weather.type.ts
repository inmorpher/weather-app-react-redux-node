export interface IWeatherData {
	city: string;
	country: string;
	countryCode: string;
	state?: string;
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: CurrentWeather;
	minutely: MinutelyWeather[];
	hourly: HourlyWeather[];
	daily: DailyWeather[];
	isPrecipitation: boolean;
}

export interface CurrentWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point?: number;
	air_pollution: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	weather: Weather[];
	aqi?: number;
}

export interface MinutelyWeather {
	dt: number;
	precipitation: number;
}

export interface HourlyWeather {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];

	pop: number;
}

export interface DailyWeather {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	summary: string;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];
	clouds: number;
	pop: number;
	rain?: number;
	snow?: number;
	uvi: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export type WeatherTemp = {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
};
