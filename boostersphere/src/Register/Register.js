import { useState, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, setDoc, addDoc, collection, getDocs } from "firebase/firestore"; 
import { db, storage, auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import mopey from '../DaMopester.jpg'
import './Register.css'
import upload from './upload.png'


export const Register = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordtwo, setPasswordtwo] = useState();
    const [displayName, setDisplayName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userInfo, setUserInfo] = useState();
    const [exists, setExists] = useState(false);
    const [same, setNotSame] = useState();
    const [file, setFile] = useState();
    const [photoUrl, setUrl] = useState();
    const [per, setPerc] = useState(null);
    const [check, setCheck] = useState();


    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)


    useEffect(() => {
        const uploadFile = () =>{
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
              (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPerc(progress)
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                    default:
                    break;
                }
              }, 
              (error) => {
                alert('upload error')
              }, 
              () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setUrl(downloadURL);
                });
              }
            );
        };
        file && uploadFile();
    }, [file]);


    useEffect(()=>{    
        const fetchData = async () =>{
          let list = []
          try{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              list.push({id: doc. id, ...doc.data()});
            });
            setCheck(list)
          } catch(err){
            console.log(err);
          }
        };
        fetchData()
      },[])

       
const handleKeyDown = e => {
    if (e.key === " ") {
        e.preventDefault();
    }
};

const handleAdd = async (e) => {
    e.preventDefault();
    let flag = false;
    let existFlag = false;

    check.forEach(element => {
        if(element.username.toLowerCase().includes(displayName.toLowerCase())){
            existFlag = true;
        }
    })

    if(existFlag === true){
        alert('username already exists')
    } else{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
        username: displayName,
        displayName: firstName + " " + lastName,
        email: email,
        password: password,
        img: !photoUrl ? 'null' : photoUrl
      });

    } catch (err){
        alert(err)
        flag = true
    }
    flag ? flag = true : navigate('/Login')
 }
}

return (

    <div className='login'>
        <div> <p className='welcome'>Register</p></div>
        <form onSubmit={handleAdd}>
            <div className='submitRegister'>
                <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder='type password again' onChange={e => { setPasswordtwo(e.target.value); if (e.target.value !== password) { setNotSame('Not Same') } else { setNotSame('Correct!') } }} /><span>{same}</span>
                <input type="text" placeholder='Username' onChange={e => setDisplayName(e.target.value)} onKeyDown={handleKeyDown} />
                <input type="text" placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
                <input type="text" placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
                <label htmlFor="file" className='upload'>
                   Upload Profile Picture:  
                   <img src={upload} alt='profile' className='uploadimg'/>
                </label>
                <input 
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none"}}
                />
                <button disabled={per !== null && per <100} type='submit'>Register</button>
                <p>Back to <Link to='/Login' className='register'>Login</Link></p>
                {photoUrl ? <img src={photoUrl} alt='uploaded photo' className='currentPhoto' /> : <img src="https://firebasestorage.googleapis.com/v0/b/capstone-b1b79.appspot.com/o/noProfile.png?alt=media&token=f9093a55-b818-4fd9-91cb-d75fcdd6035a" alt='empty' className='currentPhoto' />}
            </div>
        </form>
    </div>

)
}
