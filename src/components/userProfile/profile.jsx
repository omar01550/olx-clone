import { useContext, useEffect, useState } from "react";
import "./profile.css";
import userProfileImg from '../../images/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png';
import dropDownImg from '../../images/dropDown.svg';
import UserMenu from "../userMenu/userMenu";
import { Link } from "react-router-dom";
import { OperationType } from "firebase/auth";
import { userContext } from "../../App";

function UserProfile() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useContext(userContext);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="user-profile">
            <div className="provifle-images">
                <Link to="browes-user" onClick={() => {
                    window.localStorage.browseUser = user.uid;

                }}>
                    <img className="user-img" src={user.photoURL != null ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-7fe5c.appspot.com/o/ad%2Fomar%2F958092.jpg?alt=media&token=0bca8dde-0133-4975-a434-4499ee2c5e53"} alt="User" />

                </Link>
                <img className="drop-dom-img" src={dropDownImg} alt="User" onClick={handleMenuClick} style={{
                    transform: `rotate(${menuOpen ? "180deg" : "0deg"})`
                }} />
            </div>
            {menuOpen && (
                <UserMenu />
            )}
        </div>
    );
}

export default UserProfile;

