import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import './reset.css';

import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { fetchWeather, loading, saveCityNameInState, saveWeatherInState } from "./redux/actions/actions";
import Weather from "./components/Weather/Weather";


function App({dispatch}) {
    const isLoading = useSelector(state => state.loading);
    const source = useSelector(state => state.source);

    // Обработка координат, если получилось их получить из navigator
    const geoSuccess = position => {
        let coords = { lat: position.coords.latitude, lng: position.coords.longitude };

        // Проверяем есть ли координаты в localStorage
        let storagePosition = localStorage.getItem('position');

        // Если координат нет, сохраняем их в localStorage и запрашиваем погоду
        if (!storagePosition) {
            localStorage.setItem('position', JSON.stringify(coords));
            console.log('Новое место');
            // Запрашиваем погоду
            dispatch(fetchWeather({ source, coords }));
            return;
        }

        // Если координаты есть, проверяем совподают ли они с полученными из navigator
        storagePosition = JSON.parse(storagePosition);

        if (storagePosition.lat === coords.lat && storagePosition.lng === coords.lng) {
            console.log('То же место');

            // Проверяем прошли ли 2 часа с момента последнего обновления погоды
            let lastDate = parseInt(localStorage.getItem('lastWeatherQuery'));
            let now = Date.now();

            if ( (now - lastDate) > 7200000 ) {
                dispatch(fetchWeather({ source, coords }));
                console.log('Нужно обновиться');
            }
            else {
                console.log('Прошло не так много времени');
                dispatch(loading(false));
                if (localStorage.getItem('cityName')) {
                    dispatch(saveCityNameInState(localStorage.getItem('cityName')));
                }
            }
        }
        // Если получены координаты нового места, запрашиваем погоду
        else {
            dispatch(fetchWeather({ source, coords }));
        }

        // Проверяем есть ли в localStorage погода
        // Если нет, то запрашиваем, если да то то диспатчим её в стор
        if (localStorage.getItem('weather')) {
            // console.log(JSON.parse(localStorage.getItem('weather')));
            dispatch(saveWeatherInState( JSON.parse(localStorage.getItem('weather')) ));
        }
        else {
            dispatch(fetchWeather({ source, coords }));
        }

    };

    const geoError = error => {
        dispatch(loading(false));
        console.log(error);
    };

    // Получаем координаты пользователя и записываем их в localStorage
    navigator.geolocation.getCurrentPosition( geoSuccess, geoError, { timeout: 10 * 1000 } );

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="weather__wrapper">
            <Header />
            <Weather />
        </div>
    );
}

export default connect()(App);
