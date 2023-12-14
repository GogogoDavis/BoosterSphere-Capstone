import './Login.css';
import { useState, useContext, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom' ;
import { userContext } from '../App';
import Cookies from 'js-cookie';

export const Login = () => {
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
      Cookies.set('user_data', JSON.stringify({userId: user.userId, username: user.username,firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role}), { expires: 15 });
      navigate('/Home');

    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
    <div className='login'>
        <div> <p className='welcome'>Welcome to BoosterSphere</p></div>
        <form onSubmit={handleLogin}>
          <input type='email' placeholder='EMAIL' onChange={e => setEmail(e.target.value)}/>
          <input type="password"  placeholder='PASSWORD' onChange={e => setPassword(e.target.value)}/>
          <button type='submit'>Login</button>
          {error && <span>Wrong email or password!</span>}
          <p>Not a member? <Link to='/Register' className='register'>Register!</Link></p>
          <p>No Login? No worries go back to explore!<Link to='/' className='register'>Home</Link></p>
        </form>
    </div>
    </>
  )
}
