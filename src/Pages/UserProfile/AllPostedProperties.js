import React, { useEffect, useState } from "react";
import ExpandStructure from "../../components/UI/Expand/ExpandStructure";
import PostedProperties from "./PostedProperties/PostedProperties";
import { useError } from "../../ErrorContext";
import useUserApiCalls from "../../Api/useUserApiCalls";
import { useSelector } from "react-redux";
import Loading from "../../components/UI/Loading/Loading";

const AllPostedProperties = () => {
    const { fetchPostedProperties } = useUserApiCalls();
    const { handleError } = useError();
    const [upProperties, setUPProperties] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [loading, setLoading] = useState(false);

    const postedProperties = useSelector(state => state.user.postedProperties);

    // Fetch properties when postedProperties state changes
    useEffect(() => {
        const fetchProperties = async () => {

            setLoading(true);
            await fetchPostedProperties(
                postedProperties,
                setUPProperties,
                setHasFetched,
                handleError
            );
            setLoading(false);

        };

        fetchProperties();
    }, [postedProperties, hasFetched]);



    return (
        <>
            <ExpandStructure title="Posted Properties">
                {loading && <Loading loading={loading} />}
                {!loading && <PostedProperties data={upProperties} />}
            </ExpandStructure>
        </>
    );
};

export default AllPostedProperties;
