import React, { useEffect, useState } from "react";
import { WeatherProps, WeatherData } from "./weather";
import styled from "styled-components";

const initialState: WeatherData = {
	temp: 0,
	weather: "",
	description: "",
	icon: ""
};

function CurrentWeather(props: WeatherProps) {
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
			}).catch(() => {
				setError(true);
				setLoading(false);
			});
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
				<MainWeather>
					<div>
						<div style={{ fontSize: 35 }}>{weatherData.temp}&#8451;</div>
					</div>
					<img style={{ width: 80, height: 80, marginLeft: 20 }} src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="icon"></img>
					<div>
						<div style={{ fontSize: 25 }}>{weatherData.weather}</div>
						<div>{weatherData.description}</div>
					</div>
				</MainWeather>
			</div>
		);
}

const MainWeather = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default CurrentWeather;