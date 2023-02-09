import React, { useEffect, useState } from "react";
import "./CurrentWeather.css";

interface CurrentWeatherProps {
	lat: number;
	lon: number;
}

interface WeatherData {
	temp?: number;
	weather?: string;
	description?: string;
	icon?: string;
}

const initialState: WeatherData = {
	temp: 0,
	weather: "",
	description: "",
	icon: ""
};

function CurrentWeather(props: CurrentWeatherProps) {
	const [weatherData, setWeatherData] = useState(initialState);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=kr`)
			.then((res) => res.json())
			.then((data) => {
				if (Number(data.cod) !== 200) {
					setError(true);
					setLoading(false);
					return;
				}

				const { temp } = data.main;
				const { main: weather, description, icon } = data.weather[0];

				setWeatherData({ temp, weather, description, icon });
				setLoading(false);
			}).catch(() => setError(true));
	}, []);

	return loading ? (<div>현재 날씨 정보 불러오는 중...</div>) :
		error ? (
			<div>
				<h1>현재 날씨</h1><br />
				날씨 정보를 불러올 수 없습니다.
			</div>
		) : (
			<div>
				<h1>현재 날씨</h1>
				<div className="weather">
					<div>
						<div className="temp">{weatherData.temp}&#8451;</div>
					</div>
					<img className="icon" src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="icon"></img>
					<div>
						<div className="weather-main">{weatherData.weather}</div>
						<div className="weather-desc">{weatherData.description}</div>
					</div>
				</div>
			</div>
		);
}

export default CurrentWeather;