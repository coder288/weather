let initialState = {
    loading: true,
    weather: {},
    coords: {
        lat: 55.18367385864258,
        lng: 30.20479011535645
    },
    city: '',
    openSources: false,
    source: 1
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return Object.assign({}, state, { loading: action.payload });
        case 'SAVE_WEATHER_TO_STATE':
            return Object.assign({}, state, { weather: action.payload });
        case 'SAVE_CITY_NAME_IN_STATE':
            return Object.assign({}, state, { city: action.payload });
        case 'TRIGGER_SOURCES':
            return Object.assign({}, state, { openSources: action.payload });
        case 'CHANGE_SOURCE':
            return Object.assign({}, state, { source: action.payload });
        default:
            return state;
    }
};