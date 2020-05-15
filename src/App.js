import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import './reset.css';
import './app.css';


import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import {fetchWeather, loading} from "./redux/actions/actions";


function App({dispatch}) {
    const weather = useSelector(state => state.weather); console.log(weather);
    const isLoad = useSelector(state => state.loading);

    // Получаем координаты пользователя и записываем их в localStorage
    navigator.geolocation.getCurrentPosition( position => {
        let coords = { lat: position.coords.latitude, lng: position.coords.longitude };

        // Проверяем есть ли координаты в localStorage
        let storagePosition = localStorage.getItem('position');

        // Если координат нет, сохраняем их в localStorage и запрашиваем погоду
        if (!storagePosition) {
            localStorage.setItem('position', JSON.stringify(coords));
            console.log('Новое место');
            // Запрашиваем погоду
            dispatch(fetchWeather());
            return;
        }

        // Если координаты есть, проверяем совподают ли они с полученными из navigator
        storagePosition = JSON.parse(storagePosition);

        if (storagePosition.lat === coords.lat && storagePosition.lng === coords.lng) {
            console.log('То же место');

            // Проверяем прошли ли 2 часа с момента последнего обновления погоды
            let lastDate = parseInt(localStorage.getItem('lastWeatherQuery') + '000');
            let now = Date.now();

            if ( (now - lastDate) > 7200000 ) {
                dispatch(fetchWeather());
                console.log('Нужно обновиться');
            }
            else {
                console.log('Прошло не так много времени');
            }
        }

        // Проверяем совпадают ли координаты с координатама в localStorage

        // console.log(coords, localStorage.getItem('position'));



        dispatch(loading(false));

        // OpenWeather KEY
        const KEY = '1cc70ab40065531978208c146bd12990';

    } );

    if (isLoad) {
        return <Loader />
    }

    return (
        <div className="weather__wrapper">
            <Header />
        </div>
    );
}

export default connect()(App);
