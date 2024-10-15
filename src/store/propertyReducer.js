// src/store/propertyReducer.js
const initialState = {
    properties: [],
    page: 1
};

const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROPERTIES':
            console.log("hiii")
            console.log(action.payload)
            return {
                ...state,
                properties: [...action.payload]
            };
        case 'CLEAR_PROPERTIES':
            return initialState;

        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload
            }
        default:
            return state;
    }
};

export default propertyReducer;
