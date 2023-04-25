import React from 'react';
import './error.css';

const ErrorPage = ({ message }) => {
    return (
        <div className="error-container">
            <h1>Oops!</h1>
            <p>{message}</p>
        </div>
    );
};

export default ErrorPage;