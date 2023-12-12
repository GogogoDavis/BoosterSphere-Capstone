import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Events } from './Events/Events';
import { Login } from './Login/Login';
import { Visitor } from './Visitor/Visitor';
import { Details } from './Details/Details';
import { Landing } from './Landing/Landing';
import { Register } from './Register/Register';
import { HomePage } from './Home/HomePage';
import { Funds } from './Funds/Funds.js';
import { Shop } from './Shop/Shop';
import { Cart } from './Shop/Cart'
import { Store } from './Shop/store';
import { Sidebar } from './Sidebar/Sidebar.js';
import { Profile } from './Profile/Profile.js';
import Cookies from 'js-cookie';

export const userContext = React.createContext();

function App() {
  const [details, setDetails] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const storedUserString = Cookies.get('user_data');
    const storedUserObject = storedUserString ? JSON.parse(storedUserString) : null;
    if (storedUserObject) 
      fetch(`http://localhost:8080/users/image?userId=${storedUserObject.userId}`)
        .then(res => res.json())
        .then(imgData => {
          storedUserObject.profileImage = imgData[0].profileImage
          setUserData(storedUserObject)
          setLoading(false);
        })
    else setLoading(false);
  };

  useEffect(() => {
    fetchUserData()
  }, []);

  const RequireAuth = ({ children }) => {
    if (loading) return null
    return userData ? children : <Navigate to="/Login" />;
  };

  return (
    <>

      <div className="App">

        <userContext.Provider value={{ details, setDetails, userData, setUserData}}>
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

            <Route path='/profile' element={<Profile />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/register' element={<Register />} />
            <Route path='/details/:id' element={<Details item={details} />} />

          </Routes>
        </userContext.Provider>

      </div>
    </>
  );
}

export default App;
