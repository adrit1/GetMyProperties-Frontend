import React, { useState, useEffect } from "react";
import ExpandStructure from "../../components/UI/Expand/ExpandStructure";
import useUserApiCalls from "../../Api/useUserApiCalls";
import { useSelector } from "react-redux";
import Loading from "../../components/UI/Loading/Loading";

const ActiveProperties = ({ user }) => {
    const { fetchActiveProperties } = useUserApiCalls();
    const activeProperties = useSelector(state => state.user.activeProperties);
    const [properties, setProperties] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchActiveProperties1 = async () => {
        if (!hasFetched) {
            setLoading(true);
            await fetchActiveProperties(activeProperties, setProperties, setHasFetched);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetched) {
            fetchActiveProperties1();
        }
    }, [hasFetched]);

    return (
        <>
            <ExpandStructure title="Active Properties" onExpand={fetchActiveProperties1}>
                {loading && <Loading loading={loading} />}
                {!loading && properties.length > 0 && properties.map((data, idx) => (
                    <div key={idx}>
                        <p>{data.description}</p>
                        <p>{data.Location}</p>
                    </div>
                ))}
            </ExpandStructure>
        </>
    );
};

export default ActiveProperties;
