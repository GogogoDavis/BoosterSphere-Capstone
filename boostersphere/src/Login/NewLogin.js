import './NewLogin.css'

import './Login.css';
import { useState, useContext, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom' ;
import { userContext } from '../App';
import Cookies from 'js-cookie';
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";

export const NewLogin = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const {setUserData} = useContext(userContext)


  useEffect(() => {
    Cookies.remove('user_data');
    setUserData(null)
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const user = await response.json();
      setUserData(user);
      Cookies.set('user_data', JSON.stringify({userId: user.userId, username: user.username, lastName: user.lastName, email: user.email}), { expires: 15 });
      navigate('/Home');

    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
        <div className='NewLogin_container'>
        <div className='NewLogin_wrapper'>
            <form onSubmit={handleLogin}>
                <h1 className='NewLogin_h1'> Login</h1>
                <div className='NewLogin_input-box'>
                    <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)} className='NewLogin_input'/>
                    <i className='NewLogin_usericon'><FaUser/></i>
                </div>
                <div className='NewLogin_input-box'>
                  <input type="password"  placeholder='password' onChange={e => setPassword(e.target.value)} className='NewLogin_input'/>
                  <i className='NewLogin_usericon'><FaLock/></i>
                </div>
                <div className='NewLogin_errorbox'>
                <button type='submit' className='NewLogin_btn'>Login</button>
                {error && <span className='NewLogin_error'>Wrong email or password!</span>}
                </div>
                <div className='NewLogin_register-link'>
                    <p>Don't have an account? <Link to='/Register' className='NewLogin_register'>Register!</Link></p>
                    <p>Go back to <Link to='/' className='NewLogin_register'>Home!</Link></p>
                </div>
            </form>
        </div>
        </div>
    </>
  )
}
