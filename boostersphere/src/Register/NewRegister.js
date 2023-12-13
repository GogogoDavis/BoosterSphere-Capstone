import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import upload from './upload.png';
import './NewRegister.css'
import { MdOutlineDriveFolderUpload } from "react-icons/md"

export const NewRegister = () => {
    const [same, setNotSame] = useState();
    const [formFilled, setFormFilled] = useState(false)
    const [duplicateUser, setDuplicateUser] = useState(false)
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
        const { username, firstName, lastName, email, role, password, password2 } = formData
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
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(res => {
            console.log(res)
            if (res.status === 201) {
                navigate('/')
            } else if (res.status === 400) {
                setDuplicateUser(true)
            }
        })
    }

    return (
        <>

            <div className='NewRegister_container'>
                <div className='NewRegister_wrapper'>
                    <form onSubmit={handleSubmit}>
                        <div className='NewRegister_h1'> <h1 className='NewRegister_titleh1'>Register</h1> <span><img src={formData.profileImage} alt='uploaded photo' className='currentPhoto' /></span> </div>

                        <div className='NewRegister_input-box'>
                            <input name="email" type='email' placeholder='email' className='NewRegister_input' onChange={handleInputChange} />

                        </div>

                        <div className='NewRegister_input-box'>
                            <input name="password" className='NewRegister_input' type="password" placeholder='password' onChange={handleInputChange} />
                        </div>


                        <div className='NewRegister_input-box'>
                            <input name="password2" className='NewRegister_input' type="password" placeholder='type password again' onChange={e => { handleInputChange(e); if (e.target.value !== formData.password) { setNotSame('Not Same') } else { setNotSame('Correct!') } }} />
                            <span className='passerr'>{same}</span>
                        </div>



                        <div className='NewRegister_input-box'>
                            <input name="username" type="text" placeholder='Username' onChange={handleInputChange} onKeyDown={handleKeyDown} className='NewRegister_input' />
                        </div>


                        <div className='NewRegister_input-box'>
                            <input name="firstName" type="text" placeholder='First Name' onChange={handleInputChange} className='NewRegister_input' />
                        </div>

                        <div className='NewRegister_input-box'>
                            <input name="lastName" type="text" placeholder='Last Name' onChange={handleInputChange} className='NewRegister_input' />
                        </div>

                        <div className='NewRegister_image'>
                                <label htmlFor="file" className='upload'>
                                    <p>Upload Profile Picture:</p>
                                    <i className='NewRegister_icon'><MdOutlineDriveFolderUpload /></i>
                                </label>
                            <input name='profileImage' type="file" id="file" onChange={handleInputChange} style={{ display: "none" }} />
                        </div>


                        <button disabled={formFilled} type='submit' className='NewRegister_btn'>Register</button>


                        <div className='NewRegister_register-link'>
                            <p>Already Have an account? <Link to='/Login' className='NewRegister_register'>Login!</Link></p>
                            <p>Go back to <Link to='/' className='NewRegister_register'>Home!</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}





