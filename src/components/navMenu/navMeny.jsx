import React from 'react';
import './navMenu.css';
import homeImg from '../../images/about-us.png'
import closeerImg from '../../images/close-white.png'

function NavigationMenu(props) {
    const { userName, userImage, onClose, links } = props;

    return (
        <div className="navigation-menu">
            <div className="user-info">
                <img src={homeImg} alt="User avatar" />
                <span>omar</span>
            </div>
            <ul className="navigation-links">
                {/* {links.map(link => (
                    <li key={link.id}>
                        <a href={link.url}>{link.label}</a>
                    </li>
                ))} */}
            </ul>
            <button className="close-button" onClick={onClose}>
                <img src={closeerImg} alt="Close icon" />
            </button>
        </div>
    );
}

export default NavigationMenu;