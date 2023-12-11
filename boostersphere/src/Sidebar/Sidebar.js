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

const { thisuser, setThisuser, fulluserData, userdata } = useContext(userContext)
const {dispatch} = useContext(AuthContext)
const [isActive, setActive] = useState(false);

    useEffect(() => {
        const getThisUserData = async () => {
          fulluserData.forEach((element) => {
            if (element.id === userdata.uid) {
              setThisuser(element);
            }
          });
        };
        if (fulluserData && userdata) getThisUserData();
      }, [fulluserData, userdata, setThisuser]);


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
                                <div className='select'>
                                    <i className='icon'><GrHomeRounded /></i>
                                    <span className='text'>Home</span>
                                </div>
                            </li>
                            <li>
                                <div className='select'>
                                    <i className='icon'><RxDashboard /></i>
                                    <span className='text'>Events</span>
                                </div>
                            </li>
                            <li>
                                <div className='select'>
                                    <i className='icon'><MdOutlineShoppingBag /></i>
                                    <span className='text'>Store</span>
                                </div>
                            </li>
                            <li>
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
                            <li className='active'>
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
                            <li className='active'>
                                <div className='select'>
                                    <i className='icon'><CgProfile /></i>
                                    <span className='text'>Profile</span>
                                </div>
                            </li>
                            <li className='active'>
                                <div className='select'>
                                    <i className='icon' onClick={()=>{handleLogout()}}><CiLogout /></i>
                                    <span className='text' onClick={()=>{handleLogout()}}>Logout</span>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>

    </>
  ))
}
