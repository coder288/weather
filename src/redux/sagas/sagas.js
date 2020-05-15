import { takeEvery, put, call } from 'redux-saga/effects';
import {saveWeatherInState, loading} from "../actions/actions";


// Запрашиваем погоду
const fetchWeatherFn = () => {

    let formData = new FormData();
    formData.append('coords', JSON.stringify({
        lat: 55.18367385864258,
        lng: 30.20479011535645
    }));

    return fetch(`http://beta.mikron.by/w1/`, {
        method: 'post',
        body: formData
    })
        .then(resp => resp.json());
};

function* workerFetchWeather() {
    const responseWeather = yield call(fetchWeatherFn);
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