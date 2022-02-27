import './Weather.css';
import CurrentTemp from './CurrentTemp';
const Weather = () => {
    return (
        <div className='weather'>
            <div className='weather-title'>
                <label>Singapore</label>
                <CurrentTemp />
            </div>
        </div>

    );
}

export default Weather;