import React, { useEffect, useState } from "react"
import { WeatherData, WeatherProps } from "../weather"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Loading from "./Loading"

export default function FullForecastWeather(props: WeatherProps) {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=kr&cnt=24`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Number(data.cod) !== 200) {
          setError(true)
          setLoading(false)
          return
        }

        const weatherList: WeatherData[] = []

        for (let item of data.list) {
          const { temp } = item.main
          const { main: weather, icon } = item.weather[0]
          const { dt_txt } = item
          const time = new Date(dt_txt)

          weatherList.push({
            temp,
            time,
            weather,
            icon
          })
        }

        setWeatherList(weatherList)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // TODO
  const weatherElements = weatherList.map((data, index) => (
    <div style={{ marginBottom: 50 }} key={index}>
      <div style={{ color: "lightgray" }}>
        {data.time?.toLocaleDateString("ko-KR", { month: "numeric", day: "2-digit" })}
        <br />
        {data.time?.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })}
      </div>
      <img
        style={{ width: 80, height: 80 }}
        className="icon"
        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="icon"
      />
      <div>{data.weather}</div>
      <div style={{ fontSize: 20 }}>{data.temp}&#8451;</div>
    </div>
  ))

  return loading ? (
    <div>
      예상 날씨 정보 불러오는 중...
      <Loading></Loading>
    </div>
  ) : error ? (
    <div>
      <h1>예상 날씨 정보</h1>
      날씨 정보를 불러올 수 없습니다.
    </div>
  ) : (
    <div>
      <h1>예상 날씨 정보</h1>
      <WeatherList>{weatherElements}</WeatherList>
      <Link to="/" className="button">
        뒤로
      </Link>
    </div>
  )
}

const WeatherList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 90vw;
  flex-wrap: wrap;
`
