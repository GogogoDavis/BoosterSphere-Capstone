import './Login.css';
import { useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from "../firebase"
import {Link, useNavigate } from 'react-router-dom' ;
import { AuthContext } from '../context/AuthContext';
import { userContext } from '../App';


export const Login = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)
  const {setUserdata,  setThisuser} = useContext(userContext)


  useEffect(()=>{
    dispatch({type:"LOGOUT"})
  },[])

  const handleLogin = (e) =>{
    e.preventDefault();

    signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      setUserdata(user)
      setThisuser(user.displayName)
      dispatch({type:"LOGIN", payload:user})
    
      navigate("/Home")
      console.log(user)
      // ...
    })
    .catch((error) => {
      setError(true)
      // ..
    });
  }

  

  return (
<>
    <div className='login'>
        <div> <p className='welcome'>Welcome to BoosterSphere</p></div>
         <form onSubmit={handleLogin}>
          <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)}/>
          <input type="password"  placeholder='password' onChange={e => setPassword(e.target.value)}/>
          <button type='submit'>Login</button>
          {error && <span>Wrong email or password!</span>}
          <p>Not a member? <Link to='/Register' className='register'>Register!</Link></p>
          <p>Or want to just visit? <Link to='/Visitor' className='register'>Explore!</Link></p>
         </form>
    </div>

</>
  )
}
