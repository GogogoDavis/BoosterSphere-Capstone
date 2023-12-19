import './Landing.css'
import { useContext, useEffect } from 'react'
import { userContext } from '../App'
import { HomePage } from '../Home/HomePage'
import Cookies from 'js-cookie';
import mopey from '../DaMopester-nobackground.png'
import galaxy from '../galaxy.png'
import Typed from 'typed.js'
import { Link, useNavigate } from 'react-router-dom';

export const Landing = () => {

  const {setUserData} = useContext(userContext)
  const { thisuser } = useContext(userContext)
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove('user_data');
    setUserData(null)
  }, []);




  useEffect(() => {
    let typingEffect = new Typed("#multiText", {
      strings : ["Events", "Funds", "Mopey!"],
      loop : true,
      typeSpeed : 100,
      backSpeed : 80,
      backDelay : 1500
    })
  }, []);






  return (thisuser ?  <HomePage />:
<>

    <div className='Landing_container'>
      <div className='Landing_nav'>
        <div className = "Landing_logo">BoosterSphere<b className='Landing_bold'>.</b></div>
        <ul className='Landing_navItems'>
            <li><Link to='/VisitorHome'><p>HOME</p></Link></li>
            <li><Link to ='/VisitorVolunteers'><p>VOLUNTEER</p></Link></li>
            <li><Link to='/VisitorShop'><p>STORE</p></Link></li>
        </ul>

      </div>

      <div className='Landing_wrapper'>
        <div className='cols cols0'>
            <span className='topline'>Welcome</span>
            <h1 className='Landing_h1'>Del10 <span id="multiText"></span></h1>
            <p className='Landing_p'>Help Make this Organization better by Donating, Volunteering, or Hosting an event to build connections!</p>
            <div className='btns'>
              <button className='Landing_button' onClick={()=>{ navigate('/Login')}}>Login</button>
              <button className='Landing_button' onClick={()=>{ navigate('/Register')}}>Register</button>
            </div>
        </div>
          <div class="cols cols1">
            <div className='imgbox'>
              <img src={galaxy} id='splash' alt=''></img>
              <img src={mopey} alt='' ></img>
            </div>
            <div>
            <img src={mopey} alt='' className='tiny' ></img>
            </div>
          </div>
      </div>
    </div>



</>
  )
}
