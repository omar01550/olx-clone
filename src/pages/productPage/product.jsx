import React, { useContext, useEffect, useState } from 'react';
import './product.css';
import productImage from '../../images/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg'
import emptyheartImg from '../../images/empty-heart.png';
import heartImg from '../../images/heart.png';
import loadingImg from '../../images/loading.png'
import empptyHertImg from '../../images/empty-heart.png';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { appContext, authContext, userDetailsContext, getUserDetails, userContext } from '../../App';
import Loader from '../../components/loader/loader';
import { useNavigate } from 'react-router-dom';



const ProductPage = () => {
    const [product, setProduct] = useState();
    const [image, setImage] = useState('/images/product1.jpg');
    const [heart, setHeart] = useState();

    const [userDetails, setUserDetails] = useContext(userDetailsContext)
    const [user, setUser] = useContext(userContext)
    const app = useContext(appContext)
    const auth = useContext(authContext)
    const db = getFirestore(app);
    const adsCollection = collection(db, "ads")
    let productid = window.localStorage.getItem("currentProduct")

    const Route = useNavigate()

    // handle favs
    const handleFavs = async () => {
        if (userDetails != null) {
            setHeart(loadingImg)
            if (isInFavs(userDetails, productid)) {
                removeFromFavs()
            } else {
                addToFavs()
            }
        } else {
            Route("/login")
        }
    }



    function isInFavs(userDetails, id) {
        if (userDetails.ufavs.includes(id)) {
            return true
        } else {
            return false;
        }
    }

    const addToFavs = async () => {
        updateDoc(doc(db, "users", userDetails.uid), {
            ufavs: arrayUnion(productid)

        }).then(() => {
            getUserDetails(userDetails.uid)
                .then((user) => {
                    setUserDetails(user)
                })
        })


    }

    const removeFromFavs = async () => {
        updateDoc(doc(db, "users", userDetails.uid), {
            ufavs: arrayRemove(productid)

        }).then(() => {
            getUserDetails(userDetails.uid)
                .then((user) => {
                    setUserDetails(user)
                })

        })

        console.log('remove works');
    }
    useEffect(() => {
        if (userDetails != null) {
            isInFavs(userDetails, productid)
                ? setHeart(heartImg)
                : setHeart(emptyheartImg)

        };

    }, [userDetails])

    // handle favs





    useEffect(() => {
        // get product
        let docRf = doc(db, "ads", window.localStorage.currentProduct);
        getDoc(docRf).then((result) => {
            let product = result.data();
            productid = result.id;
            setProduct(product)
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div className="product-page">


            {
                product != undefined && product != 'undefined'
                    ?
                    <div className="main">
                        <div className="product-details">
                            <div className="product-images">
                                <img src={product.image} alt="Product" className='main-image' />
                                <div className="small-images">

                                </div>
                            </div>
                            <div className="product-info">
                                <div className="product-card">
                                    <h2>{product.title}</h2>
                                    <p className="price">
                                        {product.price}
                                        <span></span>
                                        جنيه </p>
                                    <p className="describtion">
                                        {product.description}
                                    </p>
                                    <div className="icons">
                                        <img src={heart || emptyheartImg} alt={product.title} className='love-icon' onClick={
                                            () => {
                                                if (user != null) {
                                                    handleFavs()
                                                } else {
                                                    Route("/login")
                                                }
                                            }
                                        } />
                                    </div>
                                    <p cl assName="created">10:10</p>
                                </div>

                            </div>

                        </div>
                        <div className="user-card">
                            <img src={product.photoURL} alt="{product.user.name}" />
                            <div className="user-info">
                                <div>
                                    <h3>{product.displayName}</h3>
                                    <p className="location"></p>
                                    <p className="bio"></p>
                                </div>
                                <button className='contact-btn' onClick={() => {
                                    Route("/browes-user");
                                    window.localStorage.browseUser = product.uid;

                                }}>Contact {product.displayName}</button>
                            </div>
                        </div>

                    </div>

                    :

                    <Loader />


            }
        </div>
    );
};

export default ProductPage;


