// src/store/profileReducer.js
const initialState = {
    userId: null,
    userData: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload.userId,
                userData: action.payload.userData, // Store user data if needed
            };
        case 'CLEAR_USER':
            return initialState;
        default:
            return state;
    }
};

export default profileReducer;
