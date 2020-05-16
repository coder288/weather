import { takeEvery, put, call } from 'redux-saga/effects';
import { saveWeatherInState, loading, saveCityNameInState } from "../actions/actions";


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

        const cityName = yield call( () => geocoder(args) );
        yield put(saveCityNameInState(cityName.response.GeoObjectCollection.featureMember[2].GeoObject.name));

        // Записываем погоду в localStorage
        localStorage.setItem('weather', JSON.stringify(responseWeather));
        // Записываем время записи погоды в localStorage
        localStorage.setItem('lastWeatherQuery', responseWeather.now.toString());
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