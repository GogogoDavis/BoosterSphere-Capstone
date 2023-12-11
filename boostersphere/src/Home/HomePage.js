import './HomePage.css';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import { userContext } from '../App';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Sidebar } from '../Sidebar/Sidebar';


export const HomePage = () => {

  const { userdata, setUserdata } = useContext(userContext)
  const { thisuser, setThisuser } = useContext(userContext)
  const {fulluserData, setFullUserData} = useContext(userContext)
  
  useEffect(() => {
    // Ensure fulluserData is defined before attempting to use forEach
    console.log('fulluserdata on home page', fulluserData)
    console.log('userdata on home page', userdata)
    if (fulluserData) {
      fulluserData.forEach((element) => {
        if (element.id === userdata.uid) {
          setThisuser(element);
        }
      });
    }
  }, [fulluserData, setThisuser]);

  console.log('this user on home page', thisuser)

  return (
    <>
      <div className='side-barcontainer'>
        <Sidebar />
      <div className='mainpage'>
        <p className='welcome'>Welcome Back!</p>
        <h2>{!thisuser ? '' : thisuser.displayName}</h2>
        <Logout />
        {/* <h3>Email: {!JSON.parse(localStorage.getItem("user")) ? 'none' :  JSON.parse(localStorage.getItem("user")).email}</h3> */}
      </div>
      </div>
    </>
  )
}
