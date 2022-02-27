import { useEffect, useState } from "react";
import './CurrentTemp.css';

const CurrentTemp = () => {
    const [forecast, setForecast] = useState({});
    const [currentTemp, setCurrentTemp] = useState('');


    useEffect(() => {
        getRealTimeReading();
        get24hourForecast();
    }, []);

    async function getRealTimeReading() {
        const response = await fetch("https://api.data.gov.sg/v1/environment/air-temperature");
        const result = await response.json();

        const data = result.items[0].readings[5];
        setCurrentTemp(data.value);
    }
    async function get24hourForecast() {
        const response = await fetch("https://api.data.gov.sg/v1/environment/24-hour-weather-forecast");
        const result = await response.json();
        //console.log(result);
        const data = result.items[0];
        const forecastData = {
            id: Math.random().toString(),
            forecast: data.general.forecast,
            relative_humidity_high: data.general.relative_humidity.high,
            relative_humidity_low: data.general.relative_humidity.low,
            temperature_low: data.general.temperature.low,
            temperature_high: data.general.temperature.high,
            wind_direction: data.general.wind.direction,
            speed_low: data.general.wind.speed.low,
            speed_high: data.general.wind.speed.high,
        };
        //console.log(forecastData);
        setForecast(forecastData);
    }

    function getCurrentDay()
    {
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    }


    return (
        <div className='weather-main'>
            <div className='weather-main__forecast'>{forecast.forecast}</div>

            <div className='weather-main__temp'>{currentTemp}</div>
            <div className='weather-main__day'>
                <div>{getCurrentDay()}</div>
                <div>H: {forecast.temperature_high}  L: {forecast.temperature_low} </div>
            </div>
            <div className='weather-main__break'></div>
            <div className='weather-main__row'>
                <div className='weather-main__details'>
                    <div>Humidity</div>
                    <div>
                        {forecast.relative_humidity_high} / {forecast.relative_humidity_low}
                    </div>
                </div>

                <div className='weather-main__details'>
                    <div>Wind Direction</div>
                    <div>{forecast.wind_direction}</div>
                </div>
                <div className='weather-main__details'>
                    <div>Wind Speed</div>
                    <div>{forecast.speed_high} / {forecast.speed_low} km/h</div>
                </div>
            </div>

        </div>);
};

export default CurrentTemp;