import './Visitor.css'
import { Link } from 'react-router-dom';

export const Visitor = () =>{

    return (
<>

<div className="nav">
          <div className='links'>
          <Link to='/Login' className='NavBar'>Login</Link>
          </div>
        </div>
<h1>Visitors Page </h1>

</>

    )
}