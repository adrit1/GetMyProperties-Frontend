// src/hooks/index.js
import useAuth from '../hook/AllHooks/useAuth';
import useUserProfile from '../hook/AllHooks/useUserProfile';
import useUserPostedProperties from '../hook/AllHooks/useUserPostedProperties';
import useTours from '../hook/AllHooks/useTours';
import useContacts from '../hook/AllHooks/useContacts';
import useProperties from '../hook/AllHooks/useProperties';

const useUserApiCalls = () => {
    return {
        ...useAuth(),
        ...useUserProfile(),
        ...useUserPostedProperties(),
        ...useTours(),
        ...useContacts(),
        ...useProperties()
    };
};

export default useUserApiCalls;