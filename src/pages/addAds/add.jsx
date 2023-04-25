import React, { useContext, useDebugValue, useEffect, useState } from 'react';
import './add.css';
import { appContext, authContext, userContext } from '../../App';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, addImageToStorage, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useRef } from 'react';

function AddAds() {

    const [title, setTitle] = useState("");
    const [categoty, setcategory] = useState("");
    const [price, setPrice] = useState("");
    const [keywords, setKeyWords] = useState("");
    const [description, setDescription] = useState("");
    const [site, setSite] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const imageInputRef = useRef();
    const [image, setImage] = useState(null);



    const app = useContext(appContext);
    const [user, setUser] = useContext(userContext);
    const Route = useNavigate()
    const db = getFirestore(app);
    const storage = getStorage(app);

    const addNewAds = async (e) => {
        e.preventDefault()
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

                <label htmlFor="ads-category"> ادخل الفقه</label>
                <input type="text" id="ads-category" name="ads-category" required onKeyUp={e => setcategory(e.target.value)} />

                <label htmlFor="ads-keywords">كلمات مفتاحيه </label>
                <input type="text" id="ads-keywords" name="ads-keywords" required onKeyUp={e => setKeyWords(e.target.value)} />

                <label htmlFor="ads-description">وصف الاعلان </label>
                <textarea id="ads-description" name="ads-description" required onKeyUp={e => setDescription(e.target.value)}></textarea>

                <label htmlFor="ads-price" >السعر بالجنيه المصرى</label>
                <input type="number" id="ads-price" name="ads-price" min="0" required onKeyUp={e => setPrice(e.target.value)} />

                <div className="add-ads-card">
                    <h4 className="add-ads-card-title">ادخل موقعك</h4>
                    <button className="add-ads-card-button">  اختيار الموقع الحالى</button>
                </div>

                <div className="add-ads-card">
                    <h4 className="add-ads-card-title">ادخل رقم هاتفك </h4>
                    <input type="tel" className="add-ads-card-input" name="phone-number" required onKeyUp={e => setPhoneNumber(e.target.value)} />
                </div>

                <div className="add-ads-uoload-img">
                    <h4 className="add-ads-card-title">ادخل رقم هاتفك </h4>
                    <input type="file" className="add-ads-card-input" name="ads-image" ref={imageInputRef} required onChange={e =>
                        () => {
                            console.log('fileChange');

                        }

                    } />
                </div>

                <button type="submit" className="add-ads-submit">انشاء الاعلان</button>
            </form>
        </div>
    );
}

export default AddAds;