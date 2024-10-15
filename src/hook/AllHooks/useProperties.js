import { useDispatch } from "react-redux";
import { setPage, setProperty } from "../../store/propertyActions";
import { useError } from "../../ErrorContext";

import apiRequest from "../useApi";

const useUserProperties = () => {
    const { handleError } = useError();

    const dispatch = useDispatch();

    async function fetchProperties(page, setLoading, setApiCallStatus, setHasMore) {
        console.log("hii")
        try {
            await apiRequest({
                requestType: 'get',
                url: `${process.env.REACT_APP_URI}properties`,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus("Properties fetched successfully");
                    // setProperties((prevProperties) => [...prevProperties, ...data.properties]);
                    dispatch(setProperty(data.properties));
                    // dispatch(setPage(page + 1))
                    setHasMore(data.properties.length > 0);
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error getting properties.');
        }
    }
    async function fetchPropertiesByPageNo(pageNo, setLoading, setApiCallStatus, setProperties) {
        console.log("hii")
        try {
            await apiRequest({
                requestType: 'get',
                url: `${process.env.REACT_APP_URI}properties/page/${pageNo}`, // Adjust limit as needed
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus("Properties fetched successfully");
                    // setProperties((prevProperties) => [...prevProperties, ...data.properties]);
                    setProperties(data.properties);
                    // dispatch(setPage(page + 1))

                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error getting properties.');
        }
    }

    return { fetchProperties, fetchPropertiesByPageNo }

}

export default useUserProperties