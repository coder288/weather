export const loading = value => ({
    type: 'LOADING',
    payload: value
});

export const fetchWeather = () => ({
    type: 'FETCH_WEATHER'
});

export const saveWeatherInState = weather => ({
    type: 'SAVE_WEATHER_TO_STATE',
    payload: weather
});