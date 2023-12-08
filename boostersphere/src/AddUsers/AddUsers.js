import { useState, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { db, storage, auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import mopey from '../DaMopester.jpg'


export const AddUsers = () => {
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
    


    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)


    useEffect(() => {
        const uploadFile = () =>{
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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


    // useEffect(() => {
    //     fetch('http://localhost:8081/users')
    //         .then(res => res.json())
    //         .then(data => setUserInfo(data))
    // }, [])




    const handleRegister = (e) => {
        e.preventDefault();
        // let existFlag = false;

        // userInfo.forEach(element => {
        //     if(element.username.toLowerCase().includes(displayName.toLowerCase())){
        //         existFlag = true;
        //     }  
        // });

        if ((displayName == null || password == null || email == null || passwordtwo == null) || password !== passwordtwo || (password.length && passwordtwo.length < 6)) {
            alert('All field are required and Passwords must match as well as being longer then 6 characters')
        } else {

            // {
            //             if(existFlag === true){
            //                 alert('Username already exists')
            //             } else {
            createUserWithEmailAndPassword(auth, email, password, displayName)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, { displayName: displayName })
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    setError(true)
                    // ..
                });
        // adduser()
        navigate("/Login")
      } 
}



const handleKeyDown = e => {
    if (e.key === " ") {
        e.preventDefault();
    }
};

const handleAdd = async (e) => {
    e.preventDefault();
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
        username: displayName,
        displayName: firstName + " " + lastName,
        email: email,
        password: password,
        img: photoUrl
      });

    } catch (err){
        console.log(err)
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
                <label htmlFor="file">
                    <img src={mopey} alt='profile'/>
                </label>
                <input 
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none"}}
                />
                <button disabled={per !== null && per <100} type='submit'>Add User</button>
            </div>
        </form>
    </div>

)
}
