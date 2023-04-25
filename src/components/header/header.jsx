import { Link } from "react-router-dom";
import "./header.css";
import SearchImg from '../../images/search.png';
//components
import UserProfile from "../userProfile/profile";

import notavigationImg from '../../images/notavigation.svg';
import sailImg from '../../images/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg'
import BarsImg from '../../images/bars.png';
import { useContext } from "react";
import { userContext } from "../../App";



function Header() {

    const [user, setUserName] = useContext(userContext)

    return (
        <header className="header container">
            <h1 className="logo">
                اعلانى
            </h1>
            <div className="header-right">

                <Link to="/search">
                    <img src={SearchImg} className="search-icon" />
                </Link>

                <Link to="/notifications">
                    <img className="nav-icon" src={notavigationImg} alt="Navigation" />
                </Link>


                {
                    user
                        ? <UserProfile userName={user.displayName} />
                        : <Link to="/login">
                            تسجيل الدخول
                        </Link>
                }

                <Link to="/add-ads" className="sail">
                    <img src={sailImg} alt="not found" />
                    <span>بيع   +</span>
                </Link>



            </div>


            <img src={BarsImg} alt="not found" className="bars-icon" />

        </header>
    );
}

export default Header;