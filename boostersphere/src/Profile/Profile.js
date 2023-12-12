
import { Sidebar } from "../Sidebar/Sidebar"
import './Profile.css'
import { useState, useContext, useEffect } from 'react';
import { userContext } from '../App';
import { doc, setDoc, addDoc, collection, getDocs, updateDoc } from "firebase/firestore"; 
import { db, storage, auth } from '../firebase';



export const Profile = () =>{
const { thisuser, setThisuser, fulluserData, userdata } = useContext(userContext)

const [username, setUsername] = useState()
const [firstName, setFirstname] = useState()
const [lastName, setLastname] = useState()

useEffect(() => {
    const getThisUserData = async () => {
      fulluserData.forEach((element) => {
        if (element.id === userdata.uid) {
          setThisuser(element);
        }
      });
    };
    if (fulluserData && userdata) getThisUserData();
  }, [fulluserData, userdata, setThisuser]);




//handles

const handleKeyDown = e => {
    if (e.key === " ") {
        e.preventDefault();
    }
};


const handleUsername = () =>{
    const docRef = doc(db, 'users', thisuser.id)
    updateDoc(docRef,{
        username: username
    })
}




return(
<>
<div className="Container">
        <Sidebar />
        <div className="form">
            <input type='text' placeholder='username' onChange={e => setUsername(e.target.value)} value={username} onKeyDown={handleKeyDown}/>
            <button onClick={()=>{handleUsername(); setUsername("")}}>submit</button>
            <input type='text' placeholder='first name' onChange={e => setFirstname(e.target.value)} />
            <input type='text' placeholder='last name' onChange={e => setLastname(e.target.value)} />
        </div>
</div>        
</>        
    )
}