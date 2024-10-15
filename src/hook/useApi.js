import axios from 'axios';

const apiRequest = async ({ requestType, url, data = null, headers = {}, onSuccess, onError, setLoading, setError }) => {
    setLoading(true); // Start the loading state

    try {
        let response;
        switch (requestType.toLowerCase()) {
            case 'get':
                response = await axios.get(url, { headers });
                break;
            case 'post':
                response = await axios.post(url, data, { headers });
                break;
            case 'put':
                response = await axios.put(url, data, { headers });
                break;
            case 'delete':
                response = await axios.delete(url, { headers });
                break;
            default:
                throw new Error(`Unsupported request type: ${requestType}`);
        }

        if (onSuccess) {
            onSuccess(response.data); // Call the success callback if provided
            setLoading(false);
        }
        setLoading(false);
    } catch (err) {
        console.log(err)
        if (setError)
            setError(err);
        if (onError) {
            console.log(onError)
            onError(err);
        }
    } finally {
        // Stop the loading state
        setLoading(false);
    }
};

export default apiRequest;
