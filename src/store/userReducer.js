const initialState = {
    userId: null,
    profileImage: '',
    profileData: null,
    postedProperties: [],
    activeProperties: [],
    tourRequests: [],
    contactRequests: [],
    tourApplies: [],
    contactApplies: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload.userId,
                profileImage: action.payload.profileImage,
                profileData: action.payload.profileData,
                postedProperties: action.payload.postedProperties,
                activeProperties: action.payload.activeProperties,
                tourRequests: action.payload.tourRequests,
                contactRequests: action.payload.contactRequests,
                tourApplies: action.payload.tourApplies,
                contactApplies: action.payload.contactApplies,
            };

        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                profileImage: action.payload,
            };


        case 'ADD_POSTED_PROPERTY':
            return {
                ...state,
                postedProperties: [...state.postedProperties, action.payload],
            };

        case 'REMOVE_POSTED_PROPERTY':
            return {
                ...state,
                postedProperties: state.postedProperties.filter(
                    (id) => id !== action.payload
                ),
            };

        case 'ADD_TOUR_REQUEST':
            return {
                ...state,
                tourRequests: [...state.tourRequests, action.payload],
            };

        case 'REMOVE_TOUR_REQUEST':
            console.log("Action Payload:", action.payload);  // Log the payload
            console.log("Current Tour Requests:", JSON.stringify(state.tourRequests, null, 2));  // Log current tour requests

            const filteredTourRequests = state.tourRequests.filter((id) => id !== action.payload);

            console.log("Filtered Tour Requests:", JSON.stringify(filteredTourRequests, null, 2));  // Log the result after filtering

            return {
                ...state,
                tourRequests: filteredTourRequests
            };


        case 'ADD_CONTACT_REQUEST':

            return {
                ...state,
                contactRequests: [...state.contactRequests, action.payload],
            };
        case 'REMOVE_CONTACT_REQUEST':
            console.log("Action Payload:", action.payload);  // Log the payload
            console.log("Current Contact Requests:", JSON.stringify(state.contactRequests, null, 2));  // Log current contact requests

            const filteredContactRequests = state.contactRequests.filter((id) => id !== action.payload);

            console.log("Filtered contact Requests:", JSON.stringify(filteredContactRequests, null, 2));
            return {
                ...state,
                contactRequests: filteredContactRequests
            };

        case 'SET_TOUR_APPLIES':
            return {
                ...state,
                tourApplies: action.payload,
            };

        case 'SET_CONTACT_APPLIES':
            return {
                ...state,
                contactApplies: action.payload,
            };

        case 'LOGOUT_USER':
            return initialState;

        default:
            return state;
    }
};

export default userReducer;
