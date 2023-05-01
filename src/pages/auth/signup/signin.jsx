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
    const [uploadText, setUploadText] = useState("ضع صوره")
    const [userImage, setUserImg] = useState(null);
    // validation
    const [emailValidation, setEmailValidation] = useState({
        status: false, message: ""
    });
    const [passwordValidation, setPasswordValidation] = useState({
        status: false,
        message: ""

    });


    const app = useContext(appContext);
    const db = getFirestore(app);
    const userImageInput = useRef();
    const storage = getStorage(app)

    // const route = useNavigate("");



    async function uploadImage(file) {
        let imageName = `ad/${Math.floor(Math.random() * 1000000)}.jpg`;
        const storageRef = ref(storage, imageName);

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',

            (snapshot) => {
                setUploadText("...انتظر")
            },
            (error) => {

            },
            () => {

                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...

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
                alert(err)
            })


    }



    return (
        <div className="signup-container">
            <h2> انشا حسابك الان </h2>
            <form onSubmit={(e) => {
                e.preventDefault()

                // check validation
                if (emailValidation.status && passwordValidation.status) {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((res) => {
                            let user = res.user;
                            setUser(user);

                            updateProfile(user, {
                                displayName: userName,
                                photoURL: userImage
                            }).then(() => {

                                addUserToDb(auth.currentUser).then(() => {

                                }).catch((err) => {
                                    alert(err)
                                })

                                setUser(auth.currentUser)



                            }).catch(() => {

                            })

                        })

                        .catch((err) => {
                            alert(err)
                            setSubmitBtn("اشتراك")
                        })


                    setSubmitBtn("جارى التسجيل");

                } else {
                    alert("خطا فى البريد او كلمهة السر")
                }



            }}>
                <div className="form-group">
                    <label htmlFor="user-name"> اسمك</label>
                    <input type="text" id="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder='enter your user name' />
                </div>

                <div className="form-group">

                    <label htmlFor="email">الايميل</label>
                    <span className="validaion-message email-validation">{emailValidation.message}</span>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='enter your email' onBlur={() => {
                        let regxp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if (regxp.test(email)) {
                            setEmailValidation({ status: true, message: "" })
                        } else {
                            setEmailValidation({ status: false, message: "البريد الالكترونى غير صالح" });
                        }

                    }} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">كلمه المرور</label>
                    <span className='validaion-message password-validation'>{passwordValidation.message}</span>
                    <input type={passwordType} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='add your password' onBlur={() => {
                        let regxp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

                        if (regxp.test(password)) {
                            setPasswordValidation({ status: true, message: "" })
                        } else if (password.length <= 7) {
                            setPasswordValidation({ status: false, message: "يحب الا تقل كلمه المرور عن 8 احرف    " });
                        }
                        else {
                            setPasswordValidation({ status: false, message: "اضف احرف كبيره وصغيره" });
                        }

                    }} />

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
                        <p className='upload-text'>{uploadText}</p>
                        <img src={userImage || UploadImage} alt="not found" className='upload-image-icon' style={{
                            width: userImage != null ? "200px" : "80px",
                            height: userImage != null ? "200px" : "80px"
                        }} />
                    </div>
                    <input type="file" id="image" ref={userImageInput} onChange={(e) => {
                        // setUploadText(e.target.files[0] ? e.target.files[0].name : "");

                        if (e.target.files) {

                            uploadImage(e.target.files[0]);
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


