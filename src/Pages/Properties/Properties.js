import React, { useEffect, useState, useRef, useCallback } from 'react';
import AnimatedButton from '../../components/UI/Button/AnimatedButton';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import apiRequest from '../../hook/useApi';
import { useError } from '../../ErrorContext';
import Loading from '../../components/UI/Loading/Loading';
import useUserApiCalls from '../../Api/useUserApiCalls';
import { setPage } from '../../store/propertyActions';
import AllProperties from '../../components/AllProperties/AllProperties.js';
import PropertyCard from '../../components/PropertyCard/PropertyCard.js';
const Properties = () => {
    const [proerties1, setProperties1] = useState([]);

    const { fetchProperties, fetchPropertiesByPageNo } = useUserApiCalls();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.profile.userData);
    const properties = useSelector((state) => state.properties.properties);
    const pageNo = useSelector((state) => state.properties.page);
    console.log(pageNo)
    const [loading, setLoading] = useState(false);
    const [apiCallStatus, setApiCallStatus] = useState('');
    const [page, setPage1] = useState(pageNo);
    const [hasMore, setHasMore] = useState(true);

    const { handleError } = useError();

    // console.log(properties)
    const navigate = useNavigate();

    const observer = useRef();

    // Fetch properties with page and limit as query parameters
    const fetchPropertiesCall = async (pageNo) => {
        await fetchProperties(pageNo, setLoading, setApiCallStatus, setHasMore);
        // dispatch(setPage(pageNo + 1))
    };

    useEffect(() => {

        fetchPropertiesCall(pageNo);
        // fetchPropertiesByPageNo("1", setLoading, setApiCallStatus, setProperties1)
        // console.log(proerties1)


    }, [pageNo]);

    // Infinite scrolling logic with IntersectionObserver
    const lastPropertyRef = useCallback(node => {
        if (loading) return; // Prevent new fetches while loading
        if (observer.current) observer.current.disconnect(); // Disconnect previous observer
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage1(prevPage => prevPage + 1); // Load next page
                dispatch(setPage(pageNo + 1))
            }
        });
        if (node) observer.current.observe(node); // Observe last element
    }, [loading, hasMore]);

    // Handle property deletion
    const onDelete = async (_id) => {
        try {
            await apiRequest({
                requestType: 'delete',
                url: `${process.env.REACT_APP_URI}properties/delete/${_id}`,
                setLoading: setLoading,
                onSuccess: (data) => {
                    setApiCallStatus("Properties deleted successfully");
                    // setProperties(prevProperties => prevProperties.filter(property => property._id !== _id));
                },
                onError: (error) => handleError(error)
            });
        } catch (error) {
            setApiCallStatus('Error deleting property.');
        }
    };

    const handleClickProperty = (data) => {
        navigate('single-property', { state: { propertyData: data } });
    };

    // if (loading) return <Loading loading={loading} />;

    return (
        <div>
            <h2>Properties Page</h2>

            <AnimatedButton title="Add Property" color="green" onClick={() => navigate("/add-property")} />

            <AllProperties data={properties} />

            {/* {properties.map((data, idx) => {
                console.log(data)
                if (idx === properties.length - 1) {
                    return (
                        <div ref={lastPropertyRef} key={data._id} style={{ border: '1px solid' }} onClick={() => handleClickProperty(data)}>
                            <PropertyCard data={data} />
                            {user && user.role === 'broker' && (
                                <>
                                    <AnimatedButton title="Update" color="blue" onClick={() => navigate("/add-verified-property", { state: { propertyData: data } })} />
                                    <AnimatedButton title="Delete" color="red" onClick={() => onDelete(data._id)} />
                                </>
                            )}
                        </div>
                    );
                } else {
                    return (
                        <div key={data._id} style={{ border: '1px solid' }} onClick={() => handleClickProperty(data)}>
                            <PropertyCard data={data} />
                            {user && user.role === 'broker' && (
                                <>
                                    <AnimatedButton title="Update" color="blue" onClick={() => navigate("/add-verified-property", { state: { propertyData: data } })} />
                                    <AnimatedButton title="Delete" color="red" onClick={() => onDelete(data._id)} />
                                </>
                            )}
                        </div>
                    );
                }
            })} */}
            {loading && <Loading loading={loading} />}
            {/* {(apiCallStatus) && <p>Status: {apiCallStatus}</p>} */}
        </div>
    );
};

export default Properties;
