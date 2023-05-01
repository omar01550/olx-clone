import React, { useContext, useEffect, useState } from "react";
import "./browse.css";
import userImg from '../../images/benzema.jpg';
import { db } from "../../App";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import ProductCard from "../productCard/productCard";
import Loader from "../loader/loader";





const BrowseUser = () => {

    const [user, setUser] = useState(null);
    const [userProducts, setUserProducts] = useState([]);

    useEffect(() => {
        let docRef = doc(db, "users", window.localStorage.getItem("browseUser"))
        getDoc(docRef).then((user) => {
            setUser(user.data())

        }).catch((err) => {
            setUser(null)
            alert(err);
        });



    }, [])

    useEffect(() => {
        if (user != null) {
            let userId = window.localStorage.getItem("browseUser");
            let q = query(collection(db, "ads"), where("uid", "==", userId));
            getDocs(q)
                .then((result) => {
                    let products = result.docs.map(ele => {
                        let item = ele.data();
                        item.id = ele.id;
                        return item;
                    });
                    setUserProducts(products);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }, [user])

    return (
        <div className="browse-user">
            {
                user
                    ? (
                        <div className="browes-user">
                            <div className="user-info">
                                <img className="user-image" src={user.photoURL || "https://firebasestorage.googleapis.com/v0/b/react-ecommerce-7fe5c.appspot.com/o/ad%2Fomar%2F958092.jpg?alt=media&token=0bca8dde-0133-4975-a434-4499ee2c5e53"} alt="User Image" />
                                <h3 className="user-name">{user.displayName}</h3>
                            </div>
                            <div className="user-products">
                                {
                                    userProducts.length != 0
                                        ? userProducts.map(ele => <ProductCard image={ele.image} title={ele.title} price={ele.price} id={ele.id} userPhoto={ele.photoURL} userName={ele.displayName} />)

                                        : "nodata"
                                }

                            </div>
                        </div>
                    )
                    : <Loader />
            }
        </div>
    );
};

export default BrowseUser;


// tab favs
// {
//     user.ufavs
//         ? user.ufavs.map(card => <ProductCard />)
//         : 'no cards'

// }