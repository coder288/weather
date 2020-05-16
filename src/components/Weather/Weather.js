import React from 'react';
import { useSelector } from 'react-redux';
import './weather.css';

const Weather = () => {

    let weatherData = useSelector(state => state.weather);
    let city = useSelector(state => state.city);

    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    let condition = {
        'clear': 'ясно',
        'partly-cloudy': 'малооблачно',
        'cloudy': 'облачно с прояснениями',
        'overcast': 'пасмурно',
        'partly-cloudy-and-light-rain': 'небольшой дождь',
        'partly-cloudy-and-rain': 'дождь',
        'overcast-and-rain': 'сильный дождь',
        'overcast-thunderstorms-with-rain': 'сильный дождь, гроза',
        'cloudy-and-light-rain': 'небольшой дождь',
        'overcast-and-light-rain': 'небольшой дождь',
        'cloudy-and-rain': 'дождь',
        'overcast-and-wet-snow': 'дождь со снегом',
        'partly-cloudy-and-light-snow': 'небольшой снег',
        'partly-cloudy-and-snow': 'снег',
        'overcast-and-snow': 'снегопад',
        'cloudy-and-light-snow': 'небольшой снег',
        'overcast-and-light-snow': 'небольшой снег',
        'cloudy-and-snow': 'снег'
    };

    if (!weatherData.days) {
        return(
            <div className='weather__alert'>Возникла ошибка!<br /><br />Попробуйте обновить страницу.</div>
        );
    }

    return(
        <div className='weather'>
            <div className="weather__title">Погода {city ? `${city}` : '' }</div>
            <div className="weather__days">
                <div className="wth__descr-wrap">
                    <div className="wth__descr-items">
                        <div className="wth__descr wth__descr--day">День</div>
                        <div className="wth__descr wth__descr--night">Ночь</div>
                    </div>
                </div>
                {
                    weatherData.days && weatherData.days.map(day => {
                        return(
                            <div className="wth__day" key={day.date}>

                                {/* блок с датой */}
                                <div className="wth__col wth__col--date">
                                    <div className="wth__date">{new Date(day.date).getDate()}</div>
                                    <div className="wth__meta-date">
                                        <div className="wth__month">{months[new Date(day.date).getMonth()]}</div>
                                        <div className="wth__week">{new Date(day.date).getFullYear()}</div>
                                    </div>
                                </div>
                                {/* / блок с датой */}



                                {/* иконки для мобильной версии */}
                                <div className="wth__col wth__col--icon">
                                    <i className={`wth__icon wth__icon--${day.day.condition}`} />
                                </div>
                                {/* иконки для мобильной версии */}

                                {/* колонка с погодой утром */}
                                <div className="wth__col wth__col--morning">
                                    <div className="wth__time">Утро</div>
                                    <div className={`wth__temp wth__temp--${day.morning.condition}`}>{day.morning.temp}</div>
                                    <div className="wth__text-descr">{condition[day.morning.condition]}</div>
                                </div>
                                {/* колонка с погодой утром */}


                                {/* колонка с погодой днём */}
                                <div className="wth__col wth__col--day">
                                    <div className="wth__time">День</div>
                                    <div className={`wth__temp wth__temp--${day.day.condition}`}>{day.day.temp}</div>
                                    <div className="wth__text-descr">{condition[day.day.condition]}</div>
                                </div>
                                {/*/ колонка с погодой днём*/}


                                {/*колонка с погодой вечером*/}
                                <div className="wth__col wth__col--evening">
                                    <div className="wth__time">Вечер</div>
                                    <div className={`wth__temp wth__temp--${day.evening.condition}`}>{day.evening.temp}</div>
                                    <div className="wth__text-descr">{condition[day.evening.condition]}</div>
                                </div>
                                {/*/ колонка с погодой вечером*/}


                                {/*колонка с погодой ночью*/}
                                <div className="wth__col wth__col--night">
                                    <div className="wth__time">Ночь</div>
                                    <div className={`wth__temp wth__temp--${day.night.condition}`}>{day.night.temp}</div>
                                    <div className="wth__text-descr">{condition[day.night.condition]}</div>
                                </div>
                                {/*/ колонка с погодой ночью*/}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Weather;