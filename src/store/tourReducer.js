
const initialState = {
    tours: []
};

const tourReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOUR':
            return {
                ...state,
                tours: action.payload
            };
        case 'CLEAR_TOUR':
            return initialState;
        default:
            return state;
    }
};

export default tourReducer;
