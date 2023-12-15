
import { Sidebar } from "../Sidebar/Sidebar"
import { useState, useContext, useEffect } from 'react';
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc, onSnapshot  } from "firebase/firestore"; 
import { db, storage, auth} from '../firebase';
import { getAuth } from "firebase/auth";
import './Setting.css'




export const Setting = () =>{
    const [database, setDatabase] = useState();

    
    useEffect(()=>{    
        const fetchData = async () =>{
          let list = []
          try{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              list.push({id: doc. id, ...doc.data()});
            });
            setDatabase(list)
          } catch(err){
            console.log(err);
          }
        };
        fetchData()
      },[])


const handleDelete = async(id) => {
try{
//delete users   
    await deleteDoc(doc(db, "users", id));
    setDatabase(database.filter((item) => item.id !== id));


//delete email

} catch(err){
    console.log(err)
}
};


return !database ? null : ((
<>
<div className="Container">
        <Sidebar />
        <div className="Userdata">
            <ul>
                {database.map((user) => <li><p>{user.email}{user.displayName}</p><button onClick={()=>{handleDelete(user.id)}}>Delete</button></li>)}
            </ul>
        </div>
</div>        
</>        
    ))
}