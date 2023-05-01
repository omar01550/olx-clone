import React, { useContext, useState } from 'react';
import Loader from '../../components/loader/loader';
import './search.css';
import { appContext } from '../../App';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    let app = useContext(appContext);
    let db = getFirestore(app);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "ads"),
                where("title", ">=", searchTerm)


            );

            const res = await getDocs(q);
            let result = res.docs.map(ele => {
                return { ...ele.data(), id: ele.id }
            })
            console.log(result);

        } catch (error) {
            console.log("Error getting documents: ", error);
        }


        setLoading(false);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);

    };



    return (
        <div className="search-page">
            <div className="container">
                <div className="search-box">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="ابحث"
                    />
                    <button onClick={handleSearch}>بحث</button>
                </div>
                {loading && "loading"}
                {searchResults.length > 0 ? (
                    <div className="search-results">
                        {searchResults.map((result) => (
                            <div key={result.id}>{result.title}</div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">No results found.</div>
                )}
            </div>
        </div>
    );
};


export default SearchPage;