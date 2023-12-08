import './Landing.css'


import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';


export const Landing = () => {


  return (
    <>
        <div className="nav">
          <div className='links'>
          <Link to='/Login' className='NavBar'>Login</Link>
          </div>
        </div>

<h1>Landing Page for visitors</h1>

    </>
  )
}
