import { takeEvery, put, call } from 'redux-saga/effects';
import {saveWeatherInState, loading, saveCityNameInState, saveCoords, fetchWeather} from "../actions/actions";


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

// Обратное геокодирование для получения названия города
const geocoder = ({args}) => {
    return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=783836a5-c84b-49f6-a36c-018dfb67e707&geocode=${args.coords.lng},${args.coords.lat}&format=json`)
        .then(resp => resp.json());
};

function* workerFetchWeather(args) {
    try {
        const responseWeather = yield call( () => fetchWeatherFn(args) );
        yield put(saveWeatherInState(responseWeather));

        if (responseWeather.success) {
            const cityName = yield call( () => geocoder(args) );
            const city = cityName.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(',')[0];
            yield put(saveCityNameInState(city));

            // Записываем название города в localStorage
            localStorage.setItem('cityName', city);
            // Записываем погоду в localStorage
            localStorage.setItem('weather', JSON.stringify(responseWeather));
            // Записываем время записи погоды в localStorage
            localStorage.setItem('lastWeatherQuery', responseWeather.now.toString());
        }

        yield put(loading(false));
    }
    catch (error) {
        console.log(error);
        yield put(loading(false));
    }

}

export function* watchFetchWeather() {
    yield takeEvery('FETCH_WEATHER', workerFetchWeather);
}


// Получение координат по названию города
const getCoords = (args) => {
    return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=783836a5-c84b-49f6-a36c-018dfb67e707&geocode=${args.city}&format=json`)
        .then(resp => resp.json());
};

function* workerGetCoords(args) {
    put(loading(true));
    try {
        const responseGetCoords = yield call( () => getCoords(args) );
        const coords = {
            lat: responseGetCoords.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1],
            lng: responseGetCoords.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0]
        };
        yield put(saveCoords(coords));
        yield put(fetchWeather({ source: args.source, coords }));
        yield put(loading(false));
    }
    catch (error) {
        console.log(error);
        yield put(loading(false));
    }
}

export function* watcherGetCoords() {
    yield takeEvery('GET_COORDS', workerGetCoords);
}