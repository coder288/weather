export const loading = value => ({
    type: 'LOADING',
    payload: value
});

export const fetchWeather = args => ({
    type: 'FETCH_WEATHER',
    args
});

export const saveWeatherInState = weather => ({
    type: 'SAVE_WEATHER_TO_STATE',
    payload: weather
});

export const fetchCityName = args => ({
    type: 'FETCH_CITY_NAME',
    args
});

export const saveCityNameInState = city => ({
    type: 'SAVE_CITY_NAME_IN_STATE',
    payload: city
});

export const triggerSources = choice => ({
    type: 'TRIGGER_SOURCES',
    payload: choice
});

export const changeSource = source => ({
    type: 'CHANGE_SOURCE',
    payload: source
});