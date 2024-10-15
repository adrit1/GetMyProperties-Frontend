// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileReducer';
import userReducer from './userReducer';
import propertyReducer from './propertyReducer';
import tourReducer from './tourReducer';
const store = configureStore({
    reducer: {
        profile: profileReducer,
        user: userReducer,
        properties: propertyReducer,
        tourRequests: tourReducer
        // You can add other reducers here
    },
});

export default store;
