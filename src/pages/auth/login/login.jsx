import React, { useContext, useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import eyeImg from '../../../images/eye.png'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authContext, userContext } from '../../../App';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [user, setUser] = useContext(userContext);
    const route = useNavigate()
    const auth = useContext(authContext)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            setUser(user);
            route("/")
        })
        // Perform login logic here
    };

    return (
        <div className="page login-page">
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <h2>تسجيل الدخول</h2>
                    <div className="form-group">
                        <label htmlFor="email">الايميل</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />


                    </div>
                    <div className="form-group">
                        <label htmlFor="password">كلمه المرور</label>
                        <input
                            type={passwordType}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />

                        <img src={eyeImg} alt="" className='show-password-icon' onClick={() => {
                            if (passwordType == 'password') {
                                setPasswordType("text")
                            } else {
                                setPasswordType("password")
                            }
                        }} />
                    </div>
                    <button type="submit">تسجيل</button>

                </form>
                <Link to="/signup" className='sign-up-btn'>
                    انشاء حساب جديد
                </Link>
            </div>
        </div>

    );
}

export default Login;
