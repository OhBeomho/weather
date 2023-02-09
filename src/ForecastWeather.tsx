import React, { useEffect, useState } from "react";
import "./ForecastWeather.css";

interface ForecastWeatherProps {
	lat: number;
	lon: number;
}

interface WeatherData {
	temp: number;
	time: Date;
	weather: string;
	icon: string;
}

const initialState: WeatherData[] = [];

function ForecastWeather(props: ForecastWeatherProps) {
	const [weatherData, setWeatherData] = useState(initialState);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=kr&cnt=10`)
			.then((res) => res.json())
			.then((data) => {
				if (Number(data.cod) !== 200) {
					setError(true);
					setLoading(false);
					return;
				}

				const weatherList: WeatherData[] = [];

				for (let item of data.list) {
					const { temp } = item.main;
					const { main: weather, icon } = item.weather[0];
					const { dt_txt } = item;
					const time = new Date(dt_txt);

					// if (time < new Date(Date.now())) {
					// 	continue;
					// }

					weatherList.push({
						temp,
						time: new Date(dt_txt),
						weather,
						icon
					});
				}

				setWeatherData(weatherList);
				setLoading(false);
			}).catch(() => setError(true));
	}, []);

	const weatherElements = weatherData.map((data, index) => (
		<div key={index}>
			<div className="time">
				{data.time.toLocaleDateString("ko-KR", { month: "numeric", day: "2-digit" })}<br />
				{data.time.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })}
			</div>
			<img className="icon" src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="icon" />
			<div>{data.weather}</div>
			<div className="temp">{data.temp}&#8451;</div>
		</div>
	));
	return loading ? (<div>예상 날씨 정보 불러오는 중...</div>) :
		error ? (
			<div>
				<h1>예상 날씨</h1><br />
				날씨 정보를 불러올 수 없습니다.
			</div>
		) : (
			<div>
				<h1>예상 날씨</h1>
				<div className="weathers">
					{weatherElements}
				</div>
			</div>
		);
}

export default ForecastWeather;