import './HomePage.css';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import { userContext } from '../App';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';


export const HomePage = () => {

  const { userdata, setUserdata } = useContext(userContext)
  const { thisuser, setThisuser } = useContext(userContext)
  const {fulluserData, setFullUserData} = useContext(userContext)
  
  useEffect(()=>{    
    
  fulluserData.forEach(element =>{
    if(element.id === userdata.uid){
      setThisuser(element)
    }
  })

  },[])

  console.log(thisuser)

  return !thisuser ? null : ((
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
        <h2>{!thisuser ? '' : thisuser.displayName}</h2>
        {/* <h3>Email: {!JSON.parse(localStorage.getItem("user")) ? 'none' :  JSON.parse(localStorage.getItem("user")).email}</h3> */}
      </div>
    </>
  ))
}
