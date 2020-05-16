import { takeEvery, put, call } from 'redux-saga/effects';
import {saveWeatherInState, loading} from "../actions/actions";


// Запрашиваем погоду
const fetchWeatherFn = ({args}) => {

    let formData = new FormData();
    formData.append('coords', JSON.stringify(args.coords));

    return fetch(`http://beta.mikron.by/w${args.source}/`, {
        method: 'post',
        body: formData
    })
        .then(resp => resp.json());
};

function* workerFetchWeather(args) {
    const responseWeather = yield call( () => fetchWeatherFn(args));
    yield put(saveWeatherInState(responseWeather));
    // Записываем погоду в localStorage
    localStorage.setItem('weather', JSON.stringify(responseWeather));
    // Записываем время записи погоды в localStorage
    localStorage.setItem('lastWeatherQuery', responseWeather.now.toString());
    yield put(loading(false));
}

export function* watchFetchWeather() {
    yield takeEvery('FETCH_WEATHER', workerFetchWeather);
}