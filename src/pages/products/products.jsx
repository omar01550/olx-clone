import React, { useContext, useEffect, useState } from 'react';
import './products.css';
import ProductCard from '../../components/productCard/productCard';
import SectionTitle from '../../components/sectionTitle/sectionTitle';
import LoadMoreButton from '../../components/loadMoreBtn/btn';
import { collection, getCountFromServer, getDocs, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { appContext } from '../../App';
import { logRoles } from '@testing-library/react';
import Loader from '../../components/loader/loader';
import ErrorPage from '../../components/error/error';



const Products = ({ products }) => {

    const [ads, setAds] = useState('');
    const [err, setErr] = useState(false)
    const app = useContext(appContext);
    const db = getFirestore(app)
    let adsCollection = collection(db, 'ads');

    // handel add more items
    // let [countOfItems, setCountofItems] = useState();




    // functions
    async function getCountDocs(db, collectionName) {
        const coll = collection(db, collectionName);
        const snapshot = await getCountFromServer(coll);
        return snapshot.data().count;
    }
    // return docs inside collection
    const getAds = async (collectioName, countItems) => {
        let adsCollection = collection(db, collectioName);
        let res = await getDocs(adsCollection);
        let docs = res.docs;
        let docsData = docs.map(ele => {
            let item = ele.data();
            item.id = ele.id;
            return item;
        });
        return docsData;
    }



    useEffect(() => {
        getAds("ads")
            .then((docs) => {
                setAds(docs)
            }).catch((err) => {
                setErr(true)
                console.log(err);
            });

    }, []);

    onSnapshot(adsCollection, () => {
        getAds("ads")
            .then((docs) => {
                setAds(docs)
            }).catch((err) => {
                setErr(true)
                console.log(err);
            });

    });


    useEffect(() => {

    })




    return (
        <div className="products container">
            <SectionTitle title="احدث الاعلانات" />
            <div className="products__list">

                {
                    ads.length != 0
                        ?
                        ads.map((product, index) => (
                            <ProductCard
                                key={index}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                userName={product.displayName}
                                userId={product.uid}
                                id={product.id}
                                time={product.time}
                                userPhoto={product.photoURL}
                            />

                        ))
                        :
                        err == true
                            ? <ErrorPage />
                            : <Loader />

                }
            </div>
            {/* {<LoadMoreButton />} */}
        </div>
    );
};

export default Products;