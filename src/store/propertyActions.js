export const setProperty = (data) => {
    console.log(data)
    return {
        type: 'SET_PROPERTIES',
        payload: data,
    };
}
export const setPage = (data) => {
    console.log(data)
    return {
        type: 'SET_PAGE',
        payload: data,
    };
}