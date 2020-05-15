let initialState = {
    loading: true,
    weather: {},
    coords: {
        lat: 55.18367385864258,
        lng: 30.20479011535645
    }
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return Object.assign({}, state, { loading: action.payload });
        // case 'FETCH_WEATHER':
        //     return Object.assign({}, state, { weather: action.payload });
        case 'SAVE_WEATHER_TO_STATE':
            return Object.assign({}, state, { weather: action.payload });
        default:
            return state;
    }
};