import React, { useCallback, useContext, useEffect, useReducer, useRef, useState, memo } from 'react';
import emptyheartImg from '../../images/empty-heart.png';
import heartImg from '../../images/heart.png';
import loadingImg from '../../images/loading.png'
import LikeSound from '../../sounds/Facebook Like - Sound Effect _ ProSounds(M4A_128K).m4a';
import avatarImage from '../../images/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png';



import './productCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { authContext, db, getUserDetails, userContext, userDetailsContext } from '../../App';
import { FieldValue, arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from 'firebase/firestore';




const ProductCard = ({ image, title, price, userPhoto, userName, userId, id }) => {

    const [user, setUser] = useContext(userContext);
    const [userDetails, setUserDetails] = useContext(userDetailsContext);
    const [heart, setHeart] = useState();
    const LikeBtnRef = useRef();

    // let docRef = doc(db, 'users', userDetails.uid);
    useEffect(() => {
        console.log(userDetails);

    })

    const Route = useNavigate("");

    const handleFavs = async () => {
        if (user.uid) {
            setHeart(loadingImg)
            if (isInFavs(userDetails, id)) {
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
            ufavs: arrayUnion(id)

        }).then(() => {
            getUserDetails(userDetails.uid)
                .then((user) => {
                    setUserDetails(user)

                })
        })

        // update ads likes 

        // try {
        //     updateDoc(doc(db, 'ads', id), {
        //         usersLikes: arrayUnion(userDetails.uid),
        //         likes: increment(1)
        //     }).then(() => {

        //     })

        // } catch (error) {
        //     alert(error)
        // }


    };

    const removeFromFavs = async () => {
        updateDoc(doc(db, "users", userDetails.uid), {
            ufavs: arrayRemove(id)

        }).then(() => {
            getUserDetails(userDetails.uid)
                .then((user) => {
                    setUserDetails(user)
                })

        })

        // try {
        //     updateDoc(doc(db, 'ads', id), {
        //         usersLikes: arrayRemove(userDetails.uid),
        //         likes: increment(-1)
        //     })
        // } catch (error) {
        //     alert(error)
        // }


    }
    useEffect(() => {
        if (userDetails != null) {
            isInFavs(userDetails, id)
                ? setHeart(heartImg)
                : setHeart(emptyheartImg)

        }
    }, [userDetails])



    return (
        <div className="card" id={id}>

            <div className="card__image-wrapper">

                <img src={image} alt={title} className="card-image" onClick={() => {
                    window.localStorage.setItem("currentProduct", id);
                    Route("/product")
                }} />

                <div className="card__love-icon">
                    <img src={heart || emptyheartImg} alt="notfound" onClick={() => {
                        if (user != null) {
                            handleFavs()
                        } else {
                            Route("/login")
                        }
                    }} />
                </div>
            </div>

            <div className="card-info">
                <h4 className="card-title">
                    {title}
                </h4>
                <h4 className="card-price">
                    {price}
                    <span>جنيه  </span>
                </h4>

                <Link className="user-info" to="/browes-user" id={userId} onClick={() => {
                    window.localStorage.browseUser = userId;
                }}>
                    <img src={userPhoto || avatarImage} alt="not found" className='user-image' />
                    <p className='user-name'>{userName}</p>
                </Link>
            </div>

            {/* <div className="card__info">
                <p className="card__title">
                    {title}
                </p>
                <div className="card__details">


                    <Link to="/profile" className='user-info'>
                        <img src={userPhoto} alt="" className='user-image' />
                        <p className='user-name'>{userName}</p>

                    </Link>
                    
                    <div className="card__time">{10}</div>
                </div>
            </div> */}
        </div>
    );
};

export default memo(ProductCard);