import React, { useEffect, useReducer, useRef } from 'react';
import './slider.css';

const Slider = ({ }) => {
    const items = [
        { title: "ali", imageUrl: "https://images.olx.com.eg/thumbnails/52992736-800x600.webp" },
        { title: "hossam", imageUrl: "https://images.olx.com.eg/thumbnails/19751806-800x600.webp" },
        { title: "omar", imageUrl: "https://images.olx.com.eg/thumbnails/19751810-800x600.webp" }
    ];

    const sliderItemRef = useRef();
    const [activeIndex, setActiveIndex] = React.useState(1);
    const numItems = items.length;

    const slideLeft = () => {
        setActiveIndex(activeIndex === 0 ? numItems - 1 : activeIndex - 1);
    };

    const slideRight = () => {
        setActiveIndex(activeIndex === numItems - 1 ? 0 : activeIndex + 1);
    };

    useEffect(() => {
        sliderItemRef.current.style.visibility = "none";
        setTimeout(() => {
            sliderItemRef.current.style.display = "block";
        }, 100)
    }, [activeIndex])

    return (
        <div className="slider conatiner">
            <div className="slider-items">

                <div className="active slider-item" id="99" ref={sliderItemRef}>
                    <img src={items[activeIndex].imageUrl} alt={items[activeIndex].title} />
                    <h2>{items[activeIndex].title}</h2>
                </div>

            </div>
            <button className="slider-left" onClick={slideLeft}>
                &#10094;
            </button>
            <button className="slider-right" onClick={slideRight}>
                &#10095;
            </button>
        </div>
    );
};

export default Slider;