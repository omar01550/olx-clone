import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react';
import Header from './components/header/header';
import Home from './pages/home/home';
import Login from './pages/auth/login/login';
import SignUpPage from './pages/auth/signup/signin';
import PrivateRoute from './components/privateRoute/private';
// import Products from './pages/products/products';


import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, onAuthStateChanged, setUser, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Footer from './components/footer/footer';
import ProductPage from './pages/productPage/product';
import Signup from './pages/auth/signup/signin';
import AddAds from './pages/addAds/add';
import NavigationMenu from './components/navMenu/navMeny';
import Example from './components/phoneEvample/a';
import BrowseUser from './components/browesUser/browse';


// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: "AIzaSyBQqtBb4ey6uBgLJ4k1ZDcKG0OPBVJjBvw",
  authDomain: "react-ecommerce-7fe5c.firebaseapp.com",
  projectId: "react-ecommerce-7fe5c",
  storageBucket: "react-ecommerce-7fe5c.appspot.com",
  messagingSenderId: "474926991102",
  appId: "1:474926991102:web:39dea9050aa98b074e07af",
  measurementId: "G-RC1CF23990"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const authContext = createContext();
export const userContext = createContext();
export const appContext = createContext();
export const userDetailsContext = createContext();
export const getUserDetails = async (userId) => {
  let docRef = doc(db, 'users', userId);

  let res = await getDoc(docRef);
  return res.data();
}



function App() {

  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user)
  });

  useEffect(() => {
    if (user) {
      getUserDetails(user.uid).then((data) => {
        setUserDetails(data)
      })
    }
  }, [user]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails])


  return (
    <div className="App">


      <BrowserRouter>
        <authContext.Provider value={auth}>
          <userContext.Provider value={[user, setUser]}>
            <appContext.Provider value={app}>
              <userDetailsContext.Provider value={[userDetails, setUserDetails]}>


                <Header />
                <Routes>
                  <Route path='/' element={
                    <Home />
                  } />
                  <Route path='/login' element={
                    <PrivateRoute user={user}>
                      <Login />
                    </PrivateRoute>
                  } />
                  <Route path='/signup' element={
                    <PrivateRoute user={user}>
                      <Signup />
                    </PrivateRoute>
                  } />
                  {/* <Route path='/products' element={<Products />} /> */}
                  <Route path='/product' element={<ProductPage />} />
                  <Route path='/add-ads' element={
                    user ? <AddAds /> : <Navigate to="/login" />
                  } />

                  <Route path="/browes-user" element={<BrowseUser />} />





                </Routes>
              </userDetailsContext.Provider>
            </appContext.Provider>
          </userContext.Provider>
        </authContext.Provider>
      </BrowserRouter>


      <Footer />







    </div>
  );
}



export default App;
