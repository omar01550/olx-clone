// Signup.js

import React, { useContext, useState } from 'react';
import { appContext, authContext, userContext } from '../../../App';
import './signup.css';
import { createUserWithEmailAndPassword, getMultiFactorResolver, updateProfile } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
import { addDoc, collection, getFirestore, setDoc, doc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import eyeImg from '../../../images/eye.png'


function Signup() {


    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validation, setValidation] = useState(false);
    const [submitBtn, setSubmitBtn] = useState("اشتراك")
    const auth = useContext(authContext);
    const [user, setUser] = useContext(userContext)
    const app = useContext(appContext);
    const db = getFirestore(app);

    const route = useNavigate("");


    const addUserToDb = async (user) => {
        let userId = user.uid;
        const docRef = doc(db, "users", user.uid);

        setDoc(docRef, {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            date: Date.now(),
            email: user.email,
            ufavs: []

        }).then(() => {
            console.log("user addde to db");
        }).catch(() => {
            console.log('user not added to db');
        })


    }

    const addUser = async () => {
        let res = await createUserWithEmailAndPassword(auth, email, password);
        let user = res.user;
        console.log('user added to auth');
        updateProfile(user, {
            displayName: userName,
            photoURL: "https://avatars.githubusercontent.com/u/107444038?v=4"
        }).then(() => {
            console.log('profile updated');

            addUserToDb(user);
            setSubmitBtn(" اشتراك")

        }).catch(() => {
            console.log("profile not updateed");
        })


        // addUserToDb(user)
        // updateProfile(user, {
        //     displayName: userName,
        //     photoURL: "https://avatars.githubusercontent.com/u/107444038?v=4"


        // }).then((user) => {
        //     setUser(user);
        //     setEmail("");
        //     setPassword("");
        //     setUserName("")

        // });



        // route("/");
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitBtn("جارى التسجيل")

        addUser()

    };

    return (
        <div className="signup-container">
            <h2> انشا حسابك الان </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="user-name"> اسمك</label>
                    <input type="text" id="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder='enter your user name' />
                </div>

                <div className="form-group">
                    <label htmlFor="email">الايميل</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='enter your email' />
                </div>

                <div className="form-group">
                    <label htmlFor="password">كلمه المرور</label>
                    <input type={passwordType} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='add your password' />
                    <img src={eyeImg} alt="" className='show-password-icon' onClick={() => {
                        if (passwordType == 'password') {
                            setPasswordType("text")
                        } else {
                            setPasswordType("password")
                        }
                    }} />

                </div>




                <button type="submit" style={{
                    pointerEvents: validation ? '' : ""

                }}>{submitBtn} </button>
            </form>
        </div>
    );
}


// setDoc(docRef, doc(usersCollection, user.uid, {
//     displayName: userName,
//     photoURL: "https://avatars.githubusercontent.com/u/107444038?v=4",
//     uid: user.uid,
//     date: Date.now(),
//     emial: user.email,
//     acssesToken: user.accessToken
// }))

export default Signup;