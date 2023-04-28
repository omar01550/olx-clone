import React, { useEffect, useState } from 'react';
import './alert.css';

const Alert = ({ type, message }) => {
    const [display, setDesplay] = useState("block");
    useEffect(() => {
        setTimeout(() => {
            setDesplay("none")
        }, 3000);
    }, [])
    return (
        <div className={`alert ${type}`} style={{
            display: display
        }}>
            <p>{message}</p>
        </div >
    );
};

export default Alert;