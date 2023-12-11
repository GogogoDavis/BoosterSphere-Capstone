import './App.css';
import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Events } from './Events/Events';
import { Login } from './Login/Login';
import { Visitor } from './Visitor/Visitor';
import { Details } from './Details/Details';
import { Landing } from './Landing/Landing';
import { Register } from './Register/Register';
import { HomePage } from './Home/HomePage';
import { Funds } from './Funds/Funds.js';
import { Shop } from './Shop/Shop';
import { AddUsers } from './AddUsers/AddUsers.js';
import { Cart } from './Shop/Cart'
import store from './Shop/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";


export const userContext = React.createContext();

function App() {
  const [details, setDetails] = useState();
  const [userdata, setUserdata] = useState();
  const [thisuser, setThisuser] = useState();
  const [fulluserData, setFullUserData] = useState();
  const { currentUser, dispatch } = useContext(AuthContext)

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserdata(user);
        setThisuser(user.displayName);
  
        // Fetch user data when the user is logged in
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          let list = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setFullUserData(list);
        } catch (err) {
          console.log(err);
        }
      } else {
        // User is not logged in
        setUserdata(null);
        setThisuser(null);
        // Dispatch logout only if the user is logged in
        if (currentUser) {
          dispatch({ type: "LOGOUT" });
        }
      }
    });
    return () => unsubscribe();
  }, [auth, currentUser, dispatch]);

  console.log('userdata on app', fulluserData)


  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/Login" />
  }

  return (
    <>

      <div className="App">

        <userContext.Provider value={{ details, setDetails, userdata, setUserdata, thisuser, setThisuser, fulluserData, setFullUserData}}>
          <Routes>
            <Route path='/Login' element={<Login />} />
            <Route path='/' element={<Landing />} />
            <Route path='/Visitor' element={<Visitor />} />

            <Route path='/Events' element={
              <RequireAuth>
                <Events />
              </RequireAuth>} />

            <Route path='/Home' element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>} />

            <Route path='/Funds' element={
              <RequireAuth>
                <Funds />
              </RequireAuth>} />


            <Route path='/add' element={<AddUsers />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/details/:id' element={<Details item={details} />} />

          </Routes>
        </userContext.Provider>

      </div>
    </>
  );
}

export default App;
