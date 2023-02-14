import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import FullForecastWeather from './FullForecastWeather';

function App() {
	const [loading, setLoading] = useState(true);
	const [pos, setPos] = useState({ lat: 0, lon: 0, city: "" });

	useEffect(() => {
		document.title = "Weather app";

		navigator.geolocation.getCurrentPosition((pos) => {
			const { latitude: lat, longitude: lon } = pos.coords;

			fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ko`)
				.then((res) => res.json())
				.then((data) => {
					const { administrative } = data.localityInfo;
					const city = administrative[administrative.length - 1].name;
					setLoading(false);
					setPos({ lat, lon, city });
				}).catch((err) => console.error(err));
		});
	}, []);

	const { lat, lon, city } = pos;
	return loading ? (
		<div className="App">위치 정보 가져오는 중...</div>
	) : (
		<div className="App">
			<div className="title">날씨 정보 - {city}</div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<>
						<CurrentWeather lat={lat} lon={lon} />
						<ForecastWeather lat={lat} lon={lon} />
					</>}></Route>
					<Route path="/forecast" element={<FullForecastWeather lat={lat} lon={lon}></FullForecastWeather>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
