// userActions.js
import {
    SET_USER,
    SET_PROFILE_IMAGE,
    ADD_POSTED_PROPERTY,
    REMOVE_POSTED_PROPERTY,
    ADD_TOUR_REQUEST,
    REMOVE_TOUR_REQUEST,
    ADD_CONTACT_REQUEST,
    REMOVE_CONTACT_REQUEST,
    SET_TOUR_APPLIES,
    SET_CONTACT_APPLIES,
    LOGOUT_USER,
} from './userActionTypes';

// Action to set the user information
export const setUser =
    (
        userId,
        profileImage,
        profileData,
        postedProperties,
        activeProperties,
        tourRequests,
        contactRequests,
        tourApplies,
        contactApplies
    ) => ({
        type: SET_USER,
        payload: { userId, profileImage, profileData, postedProperties, activeProperties, tourRequests, contactRequests, tourApplies, contactApplies },
    });

// Action to set the user's profile image
export const setProfileImage = (profileImage) => ({
    type: SET_PROFILE_IMAGE,
    payload: profileImage,
});


// Action to add a posted property
export const addPostedProperty = (propertyId) => ({
    type: ADD_POSTED_PROPERTY,
    payload: propertyId,
});

// Action to remove a posted property
export const removePostedProperty = (propertyId) => ({
    type: REMOVE_POSTED_PROPERTY,
    payload: propertyId,
});

// Action to add a tour request
export const addTourRequest = (tourRequestId) => ({
    type: ADD_TOUR_REQUEST,
    payload: tourRequestId,
});

// Action to remove a tour request
export const removeTourRequest = (tourRequestId) => ({
    type: REMOVE_TOUR_REQUEST,
    payload: tourRequestId,
});

// Action to add a contact request
export const addContactRequest = (contactRequestId) => ({
    type: ADD_CONTACT_REQUEST,
    payload: contactRequestId,
});

// Action to remove a contact request
export const removeContactRequest = (contactRequestId) => ({
    type: REMOVE_CONTACT_REQUEST,
    payload: contactRequestId,
});

// Action to set the list of tour applies
export const setTourApplies = (tourApplies) => ({
    type: SET_TOUR_APPLIES,
    payload: tourApplies,
});

// Action to set the list of contact applies
export const setContactApplies = (contactApplies) => ({
    type: SET_CONTACT_APPLIES,
    payload: contactApplies,
});

// Action to log out the user
export const logoutUser = () => ({
    type: LOGOUT_USER,
});
