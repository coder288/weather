import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './header.css';
import {changeSource, fetchWeather, loading, triggerSources} from "../../redux/actions/actions";

const Header = () => {

    const dispatch = useDispatch();

    const sourcesOpen = useSelector(state => state.openSources);
    const source = useSelector(state => state.source);
    const coords = useSelector(state => state.coords);

    // Обработчик клика на странице
    let clickHandler = event => {

        // Клик по точкам (открываем список источников)
        if (event.target.closest('.header__source-ico')) {

            if (sourcesOpen) {
                dispatch(triggerSources(false));
            }
            else {
                dispatch(triggerSources(true));
            }
        }

        // Клик не на источники, а список источников открыт — закрываем список
        if (!event.target.closest('.header__source') && sourcesOpen) {
            dispatch(triggerSources(false));
        }

        // Выбираем источник получения погоды
        if (event.target.closest('.header__source-item')) {
            dispatch(loading(true));
            dispatch(triggerSources(false));
            dispatch(changeSource(parseInt(event.target.dataset.id)));
            dispatch(fetchWeather({ source: parseInt(event.target.dataset.id), coords }));
        }
    };

    useEffect( () => {
        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [sourcesOpen, source]);

    return(
        <div className='header__wrapper'>
            <div className='header'>
                <div className="header__source">
                    <i className="header__source-ico" />
                    <div className={sourcesOpen ? 'header__source-items header__source-items--select' : 'header__source-items'}>
                        <div className="header__source-item" data-id='1'>Яндекс</div>
                        <div className="header__source-item" data-id='2'>OpenWeatherMap</div>
                    </div>
                </div>
                <div className="header__title">Weather</div>
            </div>
        </div>
    );
};

export default Header;