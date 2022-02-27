import { useEffect, useState } from 'react';
import './DailyWeather.css';


const DailyWeather = () => {
    const [dailyResult, setDailyResult] = useState([]);

    useEffect(() => {
        fetchNext4DayForecast();
    }, []);

    function converToDisplayDate(currentDate) {
        const newDate = new Date(currentDate);

        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(newDate);
    }
    function convertToDisplayForecast(currentForecast) {
        if (currentForecast.includes('showers'))
            return 'Raining';
        if (currentForecast.includes('cloudy'))
            return 'Cloudy';
    }
    async function fetchNext4DayForecast() {
        const response = await fetch('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        const result = await response.json();


        const transformResult = result.items[0].forecasts.map(data => {

            return {
                id: Math.random().toString(),
                date: converToDisplayDate(data.date),
                forecast: convertToDisplayForecast(data.forecast),
                relative_humidity_high: data.relative_humidity.high,
                relative_humidity_low: data.relative_humidity.low,
                temperature_low: data.temperature.low,
                temperature_high: data.temperature.high,
                wind_direction: data.wind.direction,
                wind_speed_high: data.wind.speed.high,
                wind_speed_low: data.wind.speed.low,
            }
        });
        setDailyResult(transformResult);
        //console.log(dailyResult);
    }

    return (
        <div className='daily-weather-main'>
            <h2>Next 4 days</h2>

            {dailyResult.map(data => (
                <div key={data.id} className='daily-weather-list'>
                    <div className='daily-weather-list__day'>{data.date}</div>
                    <div className='daily-weather-list__weather'>
                        <div>{data.forecast}</div>
                        <div className='daily-weather-list__temp'>
                            <div className='daily-weather-list__temp_high'>{data.temperature_high}</div>
                            <div className='daily-weather-list__temp_low'>{data.temperature_high}</div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default DailyWeather;
