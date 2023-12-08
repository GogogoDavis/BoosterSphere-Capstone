import './shop.css'
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import { userContext } from '../App';
import { useContext } from 'react';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';




export const Shop = () => {

//   const userContextValue = useContext(userContext);
//   console.log(userContextValue);

//   const { userdata } = useContext(userContext);
//   console.log(userdata);

//   const { thisuser } = useContext(userContext);
// console.log(thisuser);

return (
<>

<div className="nav">
        <div className='links'>
          <Link to='/Home' className='NavBar'>Home</Link>
          <Link to='/Events' className='NavBar'>Events</Link>
        </div>
        <Logout />
      </div>

  <div className='header'>
    <img style={{width: 120, height: 40, marginTop: 10 }}
    className='logo'
    src="https://links.papareact.com/f90"
    />
  </div>
  <div>
    <input type='text' placeholder='search Items or Products'/>
    <SearchIcon/>
  </div>
</>
)


}