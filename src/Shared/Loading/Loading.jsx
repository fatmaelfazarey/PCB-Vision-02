import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="hash-loader">
            <div className="hash-loader-spinner"></div>
            <span className='dark:text-second text-second-dark text-base'>Loading...</span>
        </div>
    );
};

export default Loading;