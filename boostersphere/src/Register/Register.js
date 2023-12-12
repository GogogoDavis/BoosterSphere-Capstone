import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import upload from './upload.png';
import './Register.css'

export const Register = () => {
  const [same, setNotSame] = useState();
  const [formFilled, setFormFilled] = useState(false)
  const [duplicateUser, setDuplicateUser ] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    password2: '',
    profileImage: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // Use FileReader for handling profile image
    if (type === 'file') {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {username, firstName, lastName, email, role, password, password2} = formData
    if (password.length > 5 && password2.length > 5 && username, firstName, lastName, email) {
      console.log('test')
      registerAccount()
    } else {
      console.log('test2')
      setFormFilled(false)
    }
  }

  const registerAccount = () => {
    console.log('test')
    fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(formData)
    }).then(res => {
      console.log(res)
      if (res.status === 201) {
        navigate('/login')
      } else if (res.status === 400) {
        setDuplicateUser(true)
      }
    })
  }

  return (
    <div className='login'>
      <div> <p className='welcome'>Register</p></div>
      <form onSubmit={handleSubmit}>
        <div className='submitRegister'>
          <input name="email" type='email' placeholder='email' onChange={handleInputChange} />
          <input name="password" type="password" placeholder='password' onChange={handleInputChange} />
          <input name="password2" type="password" placeholder='type password again' onChange={e => { handleInputChange(e); if (e.target.value !== formData.password) { setNotSame('Not Same') } else { setNotSame('Correct!') } }} /><span>{same}</span>
          <input name="username" type="text" placeholder='Username' onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <input name="firstName" type="text" placeholder='First Name' onChange={handleInputChange} />
          <input name="lastName" type="text" placeholder='Last Name' onChange={handleInputChange} />
          <label htmlFor="file" className='upload'>
            Upload Profile Picture:  
            <img src={upload} alt='profile' className='uploadimg'/>
          </label>
          <input name='profileImage' type="file" id="file" onChange={handleInputChange} style={{ display: "none"}} />
          <button disabled={formFilled} type='submit'>Register</button>
          <p>Back to <Link to='/Login' className='register'>Login</Link></p>
          <img src={formData.profileImage} alt='uploaded photo' className='currentPhoto' />
        </div>
      </form>
    </div>
  )
}





