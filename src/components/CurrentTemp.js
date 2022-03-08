import { useEffect, useState } from "react";
import './CurrentTemp.css';

const CurrentTemp = () => {
    const [forecast, setForecast] = useState({});
    const [currLowTemp, setCurrLowTemp] = useState({});
    const [currHighTemp, setCurrHighTemp] = useState({});
    const [updatedTimestamp, setUpdatedTimestamp] = useState();
    useEffect(() => {
        getRealTimeReading();
        get24hourForecast();
    }, []);

    function getStationName(stations, station_id) {
        for (let i = 0; i < stations.length; ++i) {
            if (stations[i].id === station_id)
                return stations[i].name;
        }
    }
    async function getRealTimeReading() {
        const response = await fetch("https://api.data.gov.sg/v1/environment/air-temperature");
        const result = await response.json();
        console.log("getRealTimeReading", result);

        const stationsMeta = result.metadata.stations;
        //console.log('stationsMeta', stationsMeta);

        let readings = result.items[0].readings;
        const date = new Date(result.items[0].timestamp);

        setUpdatedTimestamp(date.toLocaleTimeString('en-US'));
        let high = { id: 1, station_id: '', value: 0 };
        let low = { id: 2, station_id: '', value: 100 };

        for (let i = 0; i < readings.length; i++) {
            if (parseInt(readings[i].value) > high.value) {
                high.value = parseInt(readings[i].value);
                high.station_id = getStationName(stationsMeta, readings[i].station_id);
            }


            if (parseInt(readings[i].value) < low.value) {
                low.value = parseInt(readings[i].value);
                low.station_id = getStationName(stationsMeta, readings[i].station_id);
            }


            //console.log('reading values: ', readings[i].value);
        }
        setCurrHighTemp(high);
        setCurrLowTemp(low);

        //console.log('high values: ', high);
        //console.log('low values: ', low);

    }
    async function get24hourForecast() {
        const response = await fetch("https://api.data.gov.sg/v1/environment/24-hour-weather-forecast");
        const result = await response.json();
        console.log("get24hourForecast", result);
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

    function getCurrentDay() {
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    }


    return (
        <div className='weather-main'>
            <div className='weather-main__forecast'>{forecast.forecast}</div>
            <div className='weather-main__day'>
                Current high and low as of <strong>{updatedTimestamp}</strong>
            </div>
            <div className='weather-main__break'></div>
            <div className='weather-main__temp_row'>
                <div className='weather-main__temp'>
                    <div>
                        {currHighTemp.value + '\u00B0'} 
                    </div>
                    <div className='weather-main__temp_station'>
                        {currHighTemp.station_id}
                    </div>
                </div>
                <div className='weather-main__temp'>
                    <div>
                        {currLowTemp.value + '\u00B0'}
                    </div>
                    <div className='weather-main__temp_station'>
                        {currLowTemp.station_id}
                    </div>                </div>
            </div>

            <div className='weather-main__day'>
                <div>{getCurrentDay()}</div>
                <strong>H: {forecast.temperature_high}  L: {forecast.temperature_low} </strong>
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