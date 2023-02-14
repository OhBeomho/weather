export interface WeatherProps {
	lat: number;
	lon: number;
}

export interface WeatherData {
	temp: number;
	time?: Date;
	weather: string;
	description?: string;
	icon: string;
}
