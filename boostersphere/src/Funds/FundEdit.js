import './FundEdit.css'
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { RiFundsBoxFill } from 'react-icons/ri';
import { inputAdornmentClasses, responsiveFontSizes } from '@mui/material';

export const FundEdit = () => {
const [funds, setFunds] = useState();
const [toggleRefresh, settoggleRefresh] = useState(false)

//inputs
const [inputTitle, setinputTitle] = useState('')
const [inputAmount, setinputAmount] = useState(0.00)
const [inputEvent, setEvent] = useState(0)


  useEffect(()=>{
    fetch('http://localhost:8080/funds')
    .then(res => res.json())
    .then(data => setFunds(data))
  },[toggleRefresh])


  const addFund = () =>{
    fetch('http://localhost:8080/funds', {
      method: 'POST',
      body: JSON.stringify({
        title: inputTitle,
        amount: inputAmount,
        event_id: inputEvent
      }),
      headers: {
        'Content-type': 'applicatoin/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))

      settoggleRefresh(!toggleRefresh)
  }

  console.log(inputTitle)
  console.log(inputAmount)
  console.log(inputEvent)
  

  const handleDelete = (funds_id) =>{
    fetch(`http://localhost:8080/funds/${funds_id}`, {
      method: 'DELETE',
    })
  }

  return !funds ? null : ((
    <>
     <div className='Funds_ParentContainer'>
         <Sidebar />


     <div className='Funds_main'>

        <div className='Funds_add'>
          <input type='text' placeholder='Event Title' onChange={(e)=> {setinputTitle(e.target.value)}} value={inputTitle}/>
          <input type='number' placeholder='Amount' onChange={(e)=> {setinputAmount(e.target.value)}} value={inputAmount}/>
          <input type='number' placeholder='Event Id' onChange={(e)=> {setEvent(e.target.value)}} value={inputEvent}/>
          <button onClick={()=>{addFund()}}>Add Fundraiser</button>
        </div>

      <ul>
        {funds.map((elem, index) => <li><h1>{elem.id}</h1> + {elem.title} + {elem.amount} + {elem.event_id} <button onClick={()=>{handleDelete(elem.id)}}>Delete</button></li> )}
        </ul>
      </div>
      </div>
      
    </>
  ));
};

