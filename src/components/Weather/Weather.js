import React from 'react';
import './weather.css';

import { connect } from 'react-redux';

const Weather = () => {
    return(
        <div className='weather'>
            <div className="weather__title">Погода в Городе</div>
            <div className="weather__days">
                <div className="weather__day">
                    <div className="weather__date"></div>
                </div>
            </div>
        </div>
    );
};