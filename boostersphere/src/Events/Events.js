import './Events.css'
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';

export const Events = () => {

 
return (
<>
<div className="nav">
        <div className='links'>
          <Link to='/Home' className='NavBar'>Home</Link>
          <Link to='/Events' className='NavBar'>Events</Link>
        </div>
        <Logout />
      </div>

Events Page

</>
)    


}