import './Logout.css';
import {  useContext } from 'react';
import mopey from '../DaMopester.jpg'
import { AuthContext } from '../context/AuthContext';


export const Logout = () => {
  const {dispatch} = useContext(AuthContext)

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  }

  return (
<>
<div className="navigation">
  

  <a class="button" href="" onClick={() => {handleLogout()}}>
    <img src={mopey} alt='profile' onClick={() => {handleLogout()}} className='logoutImg'/>


    <div className="logout" onClick={() => {handleLogout()}}>Logout</div>
    </a>
 </div>
</>
  )
}
