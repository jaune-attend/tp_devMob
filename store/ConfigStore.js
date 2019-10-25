import { createStore } from 'redux';
import ReduxWeatherService from './reducer/reduxWeather'

export default createStore(ReduxWeatherService);