import './HomePage.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import { userContext } from '../App';


export const HomePage = () => {

  const { userdata } = useContext(userContext)
  const { thisuser } = useContext(userContext)


  return !userdata ? null : ((
    <>

      <div className="nav">
        <div className='links'>
          <Link to='/Home' className='NavBar'>Home</Link>
          <Link to='/Events' className='NavBar'>Events</Link>
        </div>
        <Logout />
      </div>
      <div className='mainpage'>
        <p className='welcome'>Welcome Back!</p>
        <h2>{!userdata ? '' : userdata.displayName}</h2>
        {/* <h3>Email: {!JSON.parse(localStorage.getItem("user")) ? 'none' :  JSON.parse(localStorage.getItem("user")).email}</h3> */}
      </div>
    </>
  ))
}
