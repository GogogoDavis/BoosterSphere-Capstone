import './Logout.css';
import {  useContext } from 'react';

import { AuthContext } from '../context/AuthContext';


export const Logout = () => {
  const {dispatch} = useContext(AuthContext)

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  }

  return (
<>
<div class="navigation">
  
  <a class="button" href="" onClick={() => {handleLogout()}}>
    <img src="https://as2.ftcdn.net/v2/jpg/04/89/93/27/1000_F_489932758_qfhzj92KwhZ5Lr2APhi5FJNbnAkq9BIB.jpg" alt='profile' onClick={() => {handleLogout()}}/>

    <div className="logout" onClick={() => {handleLogout()}}>Logout</div>
    </a>
 </div>
</>
  )
}
