// src/store/profileActions.js
export const setUser = (userId, userData) => {
    return {
        type: 'SET_USER',
        payload: { userId, userData },
    };
};

export const clearUser = () => {
    return {
        type: 'CLEAR_USER',
    };
};
