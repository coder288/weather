export const loading = value => ({
    type: 'LOADING',
    payload: value
});

export const fetchWeather = (args) => ({
    type: 'FETCH_WEATHER',
    args
});

export const saveWeatherInState = weather => ({
    type: 'SAVE_WEATHER_TO_STATE',
    payload: weather
});