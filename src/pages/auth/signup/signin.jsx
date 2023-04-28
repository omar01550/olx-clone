// Signup.js

import React, { useContext, useRef, useState } from 'react';
import { appContext, authContext, userContext, userDetailsContext } from '../../../App';
import './signup.css';
import { createUserWithEmailAndPassword, getMultiFactorResolver, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
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
    const [userDetails, setUserDetails] = useContext(userDetailsContext);
    const app = useContext(appContext);
    const db = getFirestore(app);
    const userImageInput = useRef();
    const storage = getStorage(app)

    // const route = useNavigate("");

    async function uploadImage(user) {
        let imageName = `ad/${Math.floor(Math.random() * 1000000)}.jpg`;
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, userImageInput.current.files[0]);


        uploadTask.on('state_changed',
            (snapshot) => {

            },
            (error) => {

            },
            () => {

                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {

                        console.log(downloadURL);

                        updateUserProfile(user, downloadURL || "");



                    }).catch(() => {
                        updateUserProfile(user, null);
                        console.log('image not uploaded');
                    })
            }
        );




    }

    function updateUserProfile(user, image) {
        updateProfile(user, {
            displayName: userName,
            photoURL: image || "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-7fe5c.appspot.com/o/ad%2Fomar%2F958092.jpg?alt=media&token=0bca8dde-0133-4975-a434-4499ee2c5e53"
        }).then(() => {
            addUserToDb(user)
        }).catch(() => {
            console.log("ipdate profile for user not done");
        })
    }

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
            setUserDetails({
                displayName: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
                date: Date.now(),
                email: user.email,
                ufavs: []
            });



        }).catch(() => {

        })


    }

    const addUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                let user = res.user;

                setUser(user);
                uploadImage(user)





            })
            .catch((err) => {
                alert(err)
            })

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


                <div className="form-group">
                    <label htmlFor="image">ادخل صوره</label>
                    <input type="file" id="image" ref={userImageInput} />
                </div>

                <button type="submit" style={{
                    pointerEvents: validation ? '' : ""

                }}>{submitBtn} </button>
            </form>
        </div>
    );
}


export default Signup;


