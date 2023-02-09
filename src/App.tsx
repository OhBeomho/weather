import React, { useEffect, useState } from 'react';
import './App.css';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';

function App() {
	const [loading, setLoading] = useState(true);
	const [coords, setCoords] = useState({ lat: 0, lon: 0 });
	const [city, setCity] = useState("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const { latitude: lat, longitude: lon } = pos.coords;

			setLoading(false);
			setCoords({ lat, lon });

			fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ko`)
				.then((res) => res.json())
				.then((data) => {
					const { administrative } = data.localityInfo;
					const cityName = administrative[administrative.length - 1].name;
					setCity(cityName);
				}).catch((err) => console.error(err));
		});
	}, []);

	const { lat, lon } = coords;
	return loading ? (
		<div className="App">위치 정보 가져오는 중...</div>
	) : (
		<div className="App">
			<div className="title">날씨 정보 - {city}</div>
			<CurrentWeather lat={lat} lon={lon} />
			<ForecastWeather lat={lat} lon={lon} />
		</div>
	);
}

export default App;
