import './Weather.css';
import CurrentTemp from './CurrentTemp';
import DailyWeather from './DailyWeather';
const Weather = () => {
    return (
        <div className='weather'>
            <div className='weather-title'>
                <label>Singapore</label>
                <CurrentTemp />
                <DailyWeather/>
            </div>
        </div>

    );
}

export default Weather;