import React, { useContext, useDebugValue, useEffect, useState } from 'react';
import './add.css';
import { appContext, authContext, userContext } from '../../App';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, addImageToStorage, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useRef } from 'react';
// input phone number
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


function AddAds() {

    const [title, setTitle] = useState("");
    const [categoty, setcategory] = useState("");
    const [price, setPrice] = useState("");
    const [keywords, setKeyWords] = useState([]);
    const [description, setDescription] = useState("");
    const [site, setSite] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submitBtn, setSubmitBtn] = useState("انشاء الاعلان")
    const imageInputRef = useRef();
    const [image, setImage] = useState(null);

    const keywordsInput = useRef();



    const app = useContext(appContext);
    const [user, setUser] = useContext(userContext);
    const Route = useNavigate()
    const db = getFirestore(app);
    const storage = getStorage(app);

    const addNewAds = async (e) => {
        e.preventDefault()
        setSubmitBtn("جارى انشاء الاعلان")
        let adsCollection = collection(db, "ads")



        await uploadImage()



    }


    async function uploadImage() {
        let imageName = `ad/${user.displayName}/${Math.floor(Math.random() * 1000000)}.jpg`;
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, imageInputRef.current.files[0]);


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
                        setImage(downloadURL);
                        //  add ads to db
                        addDoc(collection(db, "ads"), {

                            title: title,
                            image: downloadURL,
                            categoty: categoty,
                            price: price,
                            keywords: keywords,
                            description: description,
                            site: site,
                            phoneNumber: phoneNumber,
                            views: 0,
                            likes: 0,
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL



                        }).then(() => {
                            console.log('ads added');

                            Route("/")
                        }).catch(() => {
                            console.log('ads not added');
                        }).finally(() => {
                            setSubmitBtn("انشاء الاعلان")
                        })


                    });
            }
        );




    }


    return (
        <div className="add-ads-container">
            <h3 className="add-ads-title">اعلان جديد</h3>
            <form className="add-ads-form" onSubmit={addNewAds}>
                <label htmlFor="ads-name">العنوان</label>
                <input type="text" id="ads-name" name="ads-name" required onKeyUp={e => setTitle(e.target.value)} />

                <label htmlFor="ads-category"> ادخل الفئة</label>
                <input type="text" id="ads-category" name="ads-category" required onKeyUp={e => setcategory(e.target.value)} />

                <label htmlFor="ads-keywords">كلمات مفتاحيه </label>
                <div className="keywords-result">
                    {
                        keywords.length != 0
                            ? keywords.map(word => {
                                return (
                                    <div className="word">
                                        <h3>{word}</h3>
                                        <span onClick={() => {

                                            setKeyWords(keywords.filter(ele => ele != word))
                                        }}>x</span>

                                    </div>
                                )
                            })
                            : ""

                    }
                </div>
                <div className="add-keword-form">
                    <input type="text" name="ads-word-input" ref={keywordsInput} placeholder='ادخل كلمات مفتاحية ' />
                    <button className="add-word" onClick={() => {
                        if (keywordsInput.current.value != 0) {
                            // if word is not found
                            if (!keywords.includes(keywordsInput.current.value)) {
                                setKeyWords([...keywords, keywordsInput.current.value]);
                                keywordsInput.current.focus()
                            } else {
                                // we well do alert
                                alert('word is already found found');

                            }
                        } else {
                            alert("the input is empty")
                        }

                        keywordsInput.current.value = ''

                    }}>
                        add
                    </button>
                </div>

                <label htmlFor="ads-description">وصف الاعلان </label>
                <textarea id="ads-description" name="ads-description" required onKeyUp={e => setDescription(e.target.value)}></textarea>

                <label htmlFor="ads-price" >السعر بالجنيه المصرى</label>
                <input type="number" id="ads-price" name="ads-price" min="0" required onKeyUp={e => setPrice(e.target.value)} />

                {/* <div className="add-ads-card">
                    <h4 className="add-ads-card-title">ادخل موقعك</h4>
                    <button className="add-ads-card-button">  اختيار الموقع الحالى</button>
                </div> */}

                <div className="add-ads-card">
                    <h4 className="add-ads-card-title">ادخل رقم هاتفك </h4>
                    <input type="tel" className="add-ads-card-input" name="phone-number" required onKeyUp={e => setPhoneNumber(e.target.value)} />
                    {/* <PhoneInput
                        placeholder="Enter phone number"
                        value={phoneNumber.toString()}
                        onChange={(e) => {

                            setPhoneNumber(1550180558)

                        }}

                    /> */}

                </div>

                <div className="add-ads-uoload-img">
                    <h4 className="add-ads-card-title">ادخل رقم هاتفك </h4>
                    <input type="file" className="add-ads-card-input" name="ads-image" ref={imageInputRef} required onChange={e =>
                        () => {
                            console.log('fileChange');

                        }

                    } />
                </div>

                <button type="submit" className="add-ads-submit">{submitBtn} </button>
            </form>
        </div>
    );
}

export default AddAds;