
import { Sidebar } from "../Sidebar/Sidebar"
import { useState, useContext, useEffect } from 'react';
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
              Dark Mode Engage...
        </div>
</div>        
</>        
    ))
}