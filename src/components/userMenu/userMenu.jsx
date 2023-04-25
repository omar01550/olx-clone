import { Link } from "react-router-dom";
import "./userMenu.css";
import userImgSrc from '../../images/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png'
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { authContext, userContext } from "../../App";


function UserMenu({ userName }) {

    const [user, setUser] = useContext(userContext)
    const auth = useContext(authContext)

    function Logout() {
        signOut(auth).then((res) => {
            console.log(res);
            setUser(null);

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="user-menu">
            <div className="menu-header">
                <img className="user-img" src={user.photoURL} alt="User" />
                <span className="username">{user.displayName}</span>
            </div>
            <ul>
                <li>
                    <Link to="/dashboard">ملفى</Link>
                </li>

                <li>
                    <Link to="/settings">المفضلة</Link>
                </li>
                <li>
                    <Link to="/" onClick={Logout}>تسجيل الخروج</Link>


                </li>
            </ul>
        </div>
    );
}

export default UserMenu;