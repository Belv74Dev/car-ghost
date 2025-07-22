import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const resizeHandler = () => setSize([window.innerWidth, window.innerHeight]);
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return size;
};
