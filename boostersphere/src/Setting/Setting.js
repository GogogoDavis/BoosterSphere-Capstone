
import { Sidebar } from "../Sidebar/Sidebar"
import { useState, useContext, useEffect } from 'react';
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc, onSnapshot  } from "firebase/firestore"; 
import { db, storage, auth} from '../firebase';
import { getAuth } from "firebase/auth";
import './Setting.css'




export const Setting = () =>{
    const [list, setList] = useState();


    useEffect(()=>{
      fetch('http://localhost:8080/funds')
      .then(res => res.json())
      .then(data => setList(data))
    },[])



return !list ? null : ((
<>
<div className="Container">
        <Sidebar />
        <div className="Userdata">
              hello
        </div>
</div>        
</>        
    ))
}