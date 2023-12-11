import './Sidebar.css'
import { useState, useContext, useEffect } from 'react';
import { userContext } from '../App';
import { AuthContext } from '../context/AuthContext';


import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import mopey from '../DaMopester.jpg'


import {RxDashboard} from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { RiRefund2Fill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { TiChevronLeftOutline } from "react-icons/ti";






export const Sidebar = () => {

const { thisuser, setThisuser } = useContext(userContext)
const {dispatch} = useContext(AuthContext)

const [isActive, setActive] = useState(false);

const toggleClass = () =>{
    setActive(!isActive);
}

const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  }


  return !thisuser? null : ((
    <>

        <div className="container">
            <div className={isActive ? 'sidebar' : 'sidebar active' }>
                <div className='menu-btn' onClick={()=>{toggleClass()}}>
                    <i className='icon'><TiChevronLeftOutline /></i>
                </div>
                <div className="head">
                    <div className='user-img'>
                        {thisuser.img ? <img src={thisuser.img} alt='' /> : <img src={mopey} alt='' />}
                    </div>
                    <div className='user-details'>
                        <p className='title'>{thisuser.email}</p>
                        <p className='name'>{thisuser.displayName}</p>
                    </div>
                </div>
                <div className='nav'>
                    <div className='menu'>
                        <p className='title'>Main</p>
                        <ul>
                            <li className='active'>
                                <a href='/Login'>
                                    <i className='icon'><GrHomeRounded /></i>
                                    <span className='text'>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='icon'><RxDashboard /></i>
                                    <span className='text'>Events</span>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='icon'><MdOutlineShoppingBag /></i>
                                    <span className='text'>Store</span>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='icon'><RiRefund2Fill /></i>
                                    <span className='text'>Funds</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='menu'>
                        <p className='title'>Settings</p>
                        <ul>
                            <li className='active'>
                                <a href='#'>
                                    <i className='icon'><IoSettingsOutline /></i>
                                    <span className='text'>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='menu'>
                        <p className='title'>Account</p>
                        <ul>
                            <li className='active'>
                                <a href='#'>
                                    <i className='icon'><CgProfile /></i>
                                    <span className='text'>Profile</span>
                                </a>
                            </li>
                            <li className='active'>
                                <a href='#'>
                                    <i className='icon' onClick={()=>{handleLogout()}}><CiLogout /></i>
                                    <span className='text' onClick={()=>{handleLogout()}}>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>



    </>
  ))
}
