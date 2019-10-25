import axios from "axios";


const initialState = {cities_info: {}};


function ReduxWeatherService(state = initialState, action){
    let nextState;
    const city = action.value;
    const key = '3d13d25c0c34fa3c3db183ad6b8cdff4';
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric`;
    const resp = axios.get(`${url}&q=${city}`);

    switch(action.type){
        case 'WEATHER':
                const city = action.value;
                    nextState = {
                        ...state,
                        cities_info: resp.data
                    }
                return nextState;
        default:
            return state;
    }
}

export default ReduxWeatherService;