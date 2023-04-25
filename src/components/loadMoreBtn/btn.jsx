import React from 'react';
import './btn.css';

const LoadMoreButton = ({ onClick, isLoading }) => {
    return (
        <button className="load-more-btn" onClick={onClick} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
        </button>
    );
};

export default LoadMoreButton;