import './App.css';
import React, { useState, useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Events } from './Events/Events';
import { Login } from './Login/Login';
import { Visitor } from './Visitor/Visitor';
import { Details } from './Details/Details';
import { Landing } from './Landing/Landing';
import { Register } from './Register/Register';
import { HomePage } from './Home/HomePage';


export const userContext = React.createContext();

function App() {

  const [details, setDetails] = useState();
  const [userdata, setUserdata] = useState();
  const [thisuser, setThisuser] = useState();

  const { currentUser } = useContext(AuthContext)


  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/Login" />
  }

  console.log(currentUser)
  return (
    <>

      <div className="App">

        <userContext.Provider value={{ details, setDetails, userdata, setUserdata, thisuser, setThisuser }}>
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

            <Route path='/Register' element={<Register />} />
            <Route path='/details/:id' element={<Details item={details} />} />

          </Routes>
        </userContext.Provider>

      </div>
    </>
  );
}

export default App;
