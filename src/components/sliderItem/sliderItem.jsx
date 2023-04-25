import React from 'react';
import './sliderItem.css';

const SliderItem = ({ image, title }) => {
    return (
        <div className="slider-item">
            <img src="https://images.olx.com.eg/thumbnails/19751806-800x600.webp" alt={title} className="slider-item__image" />
            <h3 className="slider-item__title">{title}</h3>
        </div>
    );
};

export default SliderItem;