import { Sidebar } from "../Sidebar/Sidebar"
import './Profile.css'
import { useState, useContext } from 'react';
import { userContext } from '../App';
import upload from './upload.png';
import Cookies from 'js-cookie';
import EditIcon from '@mui/icons-material/Edit';

export const Profile = () =>{ 
  const { userData, setUserData} = useContext(userContext)
  const [isEditing, setIsEditing] = useState(false);
  const [formFilled, setFormFilled] = useState(false)
  const [formData, setFormData] = useState({...userData});

  const handleKeyDown = e => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewImage = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        profileImage: reader.result,
      });
    };
    reader.readAsDataURL(selectedFile);
  }

  const updateProfile = async () => {
    fetch('http://localhost:8080/users', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(formData)
    }).then(res => {
      if (res.status === 200) {
        Cookies.set('user_data', JSON.stringify({userId: formData.userId, username: formData.username,firstName: formData.firstName, lastName: formData.lastName, email: formData.email, role: formData.role}), { expires: 15 });
        setIsEditing(false)
        setUserData(formData)
      } else if (res.status !== 201) {
        setFormData({...userData})
      }
    })
  }

  const updatePassword = async () => {
    fetch('http://localhost:8080/users/password', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(formData)
    })
  }

  return(
  <div className='profile-parent-container'>
    <Sidebar />
    <div className="profile-page-container">
      <div className="top-half">
        <header className="profile-header">
          <h1>User Details</h1>
          {!isEditing ? <button className="profile-edit-button" onClick={() => setIsEditing(true)}><EditIcon /></button> 
          :<span className="form-names-span">
            <button className="cancel" disabled={formFilled} onClick={() => { setFormData({...userData}); setIsEditing(false) }}>Cancel</button>
            <button className="save" disabled={formFilled} onClick={() => {updateProfile(); setIsEditing(false) }}>Save</button>
          </span>}
        </header>
        <div className="profile-container">
          <div className="profile-img-container">
            <div className="img-container">
              <img src={formData.profileImage} alt='uploaded photo' className='currentPhoto' />
            </div>
            {!isEditing ? <></> : <>
              <label htmlFor="file" className='upload'> <img src={upload} alt='profile' className='uploadimg'/> </label>
              <input name='profileImage' type="file" id="file" onChange={handleNewImage} style={{ display: "none"}} /> 
            </>}
          </div>
          <div className="header-names">
            <span>{formData.firstName} {formData.lastName}</span>
            <h2>@{formData.username}</h2>
          </div>
        </div>
      </div>
      <div className="profile-user-details">
          {!isEditing ? <>
        <ul className="details-identifier">
          <p>
            <li>User ID</li>
            <li className="profile-user-data">{formData.userId}</li>
          </p>
          <p>
            <li>First Name</li>
            <li className="profile-user-data">{formData.firstName}</li>
          </p>
          <p>
            <li>Last Name</li>
            <li className="profile-user-data">{formData.lastName}</li>
          </p>
        </ul>
        <ul className="details-identifier">
            <p>
              <li>Role</li>
              <li className="profile-user-data">{formData.role ? formData.role : 'User'}</li>
            </p>
            <p>
              <li>Email</li>
              <li className="profile-user-data">{formData.email}</li>
            </p>
            <p>
              <li>Username</li>
              <li className="profile-user-data">{formData.username}</li>
            </p>
        </ul></> 
        : <>
        <ul className="details-identifier">
          <p>
            <li>User ID</li>
            <li className="profile-user-data">{formData.userId}</li>
          </p>
          <p>
            <li>First Name</li>
            <li><input className="profile-user-data" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} /></li>
          </p>
          <p>
            <li>Last Name</li>
            <li><input  className="profile-user-data" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} /></li>
          </p>
        </ul>
        <ul className="details-identifier">
            <p>
              <li>Role</li>
              <li className="profile-user-data">{formData.role ? formData.role : 'User'}</li>
            </p>
            <p>
              <li>Email</li>
              <li><input className="profile-user-data" name="email" type='email' value={formData.email} onChange={handleInputChange} /></li>
            </p>
            <p>
              <li>Username</li>
              <li><input className="profile-user-data" name="username" type="text" value={formData.username} onChange={handleInputChange} onKeyDown={handleKeyDown} /></li>
            </p>
        </ul></>}
      </div>
    </div>
  </div>)
}
