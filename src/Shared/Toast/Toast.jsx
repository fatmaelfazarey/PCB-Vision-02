import React, { useState, useEffect } from 'react';
import './Toast.css'

const Toast = ({ message, duration = 4000, onClose }) => {
    const [visible, setVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClosing(true);
            setTimeout(() => {
                setVisible(false);
                onClose();
            }, 500);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className={`fixed top-10 right-4 z-50 bg-second dark:bg-second-dark dark:text-second text-second-dark px-4 py-5 w-80 rounded-lg shadow-lg  border-b-2 border-main ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}>
            <p>{message}</p>
        </div>
    );
};

export default Toast;