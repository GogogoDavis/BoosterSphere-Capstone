import './Sidebar.css'
import { useState, useContext, useEffect } from 'react';
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import mopey from '../DaMopester.jpg'
import Cookies from 'js-cookie';


import {RxDashboard} from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { RiRefund2Fill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { TiChevronLeftOutline } from "react-icons/ti";


export const Sidebar = () => {
  const { userData, setUserData } = useContext(userContext)
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const toggleClass = () =>{
      setActive(!isActive);
  }

  const handleLogout = () =>{
    Cookies.remove('user_data');
    setUserData(null)
  }


  return !userData? null : ((
    <>

        <div className="container">
            <div className={isActive ? 'sidebar' : 'sidebar active' }>
                <div className='menu-btn' onClick={()=>{toggleClass()}}>
                    <i className='icon'><TiChevronLeftOutline /></i>
                </div>
                <div className="head">
                    <div className='user-img'>
                        {userData.profileImage ? <img src={userData.profileImage} alt='' /> : <img src={mopey} alt='' />}
                    </div>
                    <div className='user-details'>
                        <p className='title'>{userData.email}</p>
                        <p className='name'>{userData.firstName} {userData.lastName}</p>
                        <p className='name'>{userData.username}</p>
                    </div>
                </div>
                <div className='nav'>
                    <div className='menu'>
                        <p className='title'>Main</p>
                        <ul>
                            <li className='active' onClick={()=>{navigate('/Home')}}>
                                <div className='select'>
                                    <i className='icon'><GrHomeRounded /></i>
                                    <span className='text'>Home</span>
                                </div>
                            </li>
                            <li onClick={()=>{navigate('/Events')}}>
                                <div className='select'>
                                    <i className='icon'><RxDashboard /></i>
                                    <span className='text'>Events</span>
                                </div>
                            </li>
                            <li onClick={()=>{navigate('/shop')}}>
                                <div className='select'>
                                    <i className='icon'><MdOutlineShoppingBag /></i>
                                    <span className='text'>Store</span>
                                </div>
                            </li>
                            <li onClick={()=>{navigate('/Funds')}}>
                                <div  className='select'>
                                    <i className='icon'><RiRefund2Fill /></i>
                                    <span className='text'>Funds</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='menu'>
                        <p className='title'>Settings</p>
                        <ul>
                            <li className='active' onClick={()=>{navigate('/Setting')}}>
                                <div className='select'>
                                    <i className='icon'><IoSettingsOutline /></i>
                                    <span className='text'>Settings</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='menu'>
                        <p className='title'>Account</p>
                        <ul>
                            <li className='active' onClick={()=>{navigate('/Profile')}}>
                                <div className='select'>
                                    <i className='icon'><CgProfile /></i>
                                    <span className='text'>Profile</span>
                                </div>
                            </li>
                            <li className='active' onClick={()=>{handleLogout()}}>
                                <div className='select'>
                                    <i className='icon'><CiLogout /></i>
                                    <span className='text'>Logout</span>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>

    </>
  ))
}

