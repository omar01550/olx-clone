import React from 'react';
import './footer.css';
import facebookImg from '../../images/facebook.png'
import gitHubImg from '../../images/github.png'
import instagramImg from '../../images/instagram.jpeg'

const Footer = () => {
    return (
        <footer className="footer container">
            <div className="social-links">
                <a href="https://www.facebook.com">
                    <img src={facebookImg} alt="Facebook" />
                </a>
                <a href={gitHubImg}>
                    <img src={gitHubImg} alt="Twitter" />
                </a>
                <a href="https://www.instagram.com">
                    <img src={instagramImg} alt="Instagram" />
                </a>
            </div>
            <p className="copy-right">omar medhat. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;