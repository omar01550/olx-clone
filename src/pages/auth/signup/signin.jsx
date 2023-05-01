// Signup.js
import UploadImage from '../../../images/folder.png';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { appContext, authContext, userContext, userDetailsContext } from '../../../App';
import './signup.css';
import { createUserWithEmailAndPassword, getMultiFactorResolver, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getFirestore, setDoc, doc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import eyeImg from '../../../images/eye.png';
import avatarImg from '../../../images/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png';





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
    const [uploadText, setUploadText] = useState("upload Image")
    const [userImage, setUserImg] = useState(null);
    const app = useContext(appContext);
    const db = getFirestore(app);
    const userImageInput = useRef();
    const storage = getStorage(app)

    // const route = useNavigate("");

    useEffect(() => {
        console.log(userImage);
        console.log('user image changed');
    }, userImage)

    useEffect(() => {
        console.log('rrender');
    })


    async function uploadImage(file) {
        let imageName = `ad/${Math.floor(Math.random() * 1000000)}.jpg`;
        const storageRef = ref(storage, imageName);

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
            (snapshot) => {

            },
            (error) => {

            },
            () => {

                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                setUploadText("...انتظر")
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {

                        setUserImg(downloadURL)
                        setUploadText(" تم رفع الصوره")






                    }).catch(() => {
                        // updateUserProfile(user, null);
                        setUploadText("  لم يتم النشر ")
                        setUserImg(avatarImg)
                    })
            }
        );




    }


    const addUserToDb = async (user) => {
        let userId = user.uid;
        console.log(userId);
        const docRef = doc(db, "users", userId);
        setDoc(docRef, {
            displayName: userName,
            uid: userId,
            photoURL: userImage,
            date: Date.now(),
            email: user.email,
            ufavs: []

        })
            .then(() => {
                setUserDetails({
                    displayName: user.displayName,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    date: Date.now(),
                    email: user.email,
                    ufavs: []
                });



            }).catch((err) => {
                console.log(err);
            })


    }



    return (
        <div className="signup-container">
            <h2> انشا حسابك الان </h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("clicked");
                createUserWithEmailAndPassword(auth, email, password)
                    .then((res) => {
                        let user = res.user;
                        setUser(user);

                        updateProfile(user, {
                            displayName: userName,
                            photoURL: userImage
                        }).then(() => {

                            addUserToDb(auth.currentUser).then(() => {
                                console.log('user added to db');
                            }).catch((err) => {
                                console.log('user not added');
                                console.log(err);
                            })

                            setUser(auth.currentUser)



                        }).catch(() => {
                            console.log("ipdate profile for user not done");
                        })

                    })

                    .catch((err) => {
                        alert(err)
                        setSubmitBtn("اشتراك")
                    })


                setSubmitBtn("جارى التسجيل");


                console.log(userImageInput.current.files[0]);

            }}>
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
                    <div onClick={() => {
                        userImageInput.current.click()
                    }} className='custom-image-uploader'>
                        <p>{uploadText}</p>
                        <img src={userImage || UploadImage} alt="not found" className='upload-image-icon' />
                    </div>
                    <input type="file" id="image" ref={userImageInput} onChange={(e) => {
                        setUploadText(e.target.files[0] ? e.target.files[0].name : "");

                        if (e.target.files) {
                            console.log('start uploading');
                            uploadImage(e.target.files[0]);
                        } else {
                            console.log('files in empty');
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


export default Signup;


