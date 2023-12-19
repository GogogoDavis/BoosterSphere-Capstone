import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Events } from './Events/Events';

import { Visitor } from './Visitor/Visitor';
import { Details } from './Details/Details';
import { Landing } from './Landing/Landing';
import { NewRegister } from './Register/NewRegister.js';
import { HomePage } from './Home/HomePage';
import { Funds } from './Funds/Funds.js';
import { Shop } from './Shop/Shop';
import { Cart } from './Shop/Cart'
import { Store } from './Shop/store';

import { Profile } from './Profile/Profile.js';
import Cookies from 'js-cookie';
import { Setting } from './Setting/Setting.js'
import { NewLogin } from './Login/NewLogin.js';
import { FundEdit } from './Funds/FundEdit.js';
import { Volunteers } from './volunteers/Volunteers.js';
import { VisitorVolunteers } from './volunteers/Visitor_Volunteers.js';
import { VisitorShop } from './Shop/VisitorShop.js';
import { VisitorHome } from './Home/VisitorHome.js';

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
    return userData ? children : <Navigate to="/" />;
  };

  return (
    <>

      <div className="App">

        <userContext.Provider value={{ details, setDetails, userData, setUserData}}>
          <Routes>
            <Route path='/Login' element={<NewLogin />} />
            <Route path='/' element={<Landing />} />
            <Route path='/Visitor' element={<Visitor />} />

            <Route path='/Events' element={
              <RequireAuth>
                <Events />
              </RequireAuth>} />

            <Route path='/VisitorHome' element={<VisitorHome />} />
            <Route path='/Home' element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>} />

            <Route path='/Funds' element={
              <RequireAuth>
                <FundEdit />
              </RequireAuth>} />


            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/register' element={<NewRegister />} />

            <Route path='/Profile' element={
            <RequireAuth><Profile />
            </RequireAuth>} />

            <Route path='/Setting' element={
            <RequireAuth><Setting />
            </RequireAuth>} />

            <Route path='/volunteers' element={<RequireAuth><Volunteers /></RequireAuth>} />
            <Route path='/VisitorVolunteers' element={<VisitorVolunteers />} />
            <Route path='/VisitorShop' element={<VisitorShop />} />

            <Route path='/Shop' element={<Shop />} />
            <Route path='/Cart' element={<Cart />} />

            <Route path='/details/:id' element={<Details item={details} />} />

          </Routes>
        </userContext.Provider>

      </div>
    </>
  );
}

export default App;
