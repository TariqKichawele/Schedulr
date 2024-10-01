import { useState } from 'react';

const useFetch = (cb) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const res = await cb(...args);
            setData(res);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fn, data, error, loading };
};

export default useFetch;