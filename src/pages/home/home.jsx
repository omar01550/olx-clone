import React from 'react';
import './home.css';
import Slider from '../../components/slider/slider';
import Products from '../products/products';

function Home() {


    const slides = [
        {
            image: 'https://via.placeholder.com/300x150?text=Slide+1',
            title: 'Slide 1',
        },
        {
            image: 'https://via.placeholder.com/300x150?text=Slide+2',
            title: 'Slide 2',
        },
        {
            image: 'https://via.placeholder.com/300x150?text=Slide+3',
            title: 'Slide 3',
        },
    ];



    return (
        <div className="home">
            {<Slider slides={slides} />}
            <Products />
        </div>
    );
}

export default Home;
