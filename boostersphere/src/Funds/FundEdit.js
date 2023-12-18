import './FundEdit.css'
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { RiFundsBoxFill } from 'react-icons/ri';
import { inputAdornmentClasses, responsiveFontSizes } from '@mui/material';

import {
  LinearProgress,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export const FundEdit = () => {
const [funds, setFunds] = useState();
const [toggleRefresh, settoggleRefresh] = useState(false)

//inputs
const [inputTitle, setinputTitle] = useState('')
const [inputDetails, setInputDetails] = useState('')
const [inputAmount, setinputAmount] = useState(0.00)
const [currRaised, setcurrRaised] = useState(0.00)
const [moneytoAdd, setmoneytoAdd] = useState(0.00);

const [progress, setProgress] = useState (0);




  useEffect(()=>{
    fetch('http://localhost:8080/funds')
    .then(res => res.json())
    .then(data => setFunds(data))
  },[toggleRefresh])


  const addFund = async () =>{
   fetch('http://localhost:8080/funds', {
      method: 'POST',
      body: JSON.stringify({
        title: inputTitle,
        details: inputDetails,
        amount: inputAmount,
        currRaised: currRaised,
      }),
      headers:  {
        'Content-Type': 'application/json',
      },
    })

    setTimeout(()=>{settoggleRefresh(!toggleRefresh)},100)
  }

  

  const handleDelete = (funds_id) =>{
    fetch(`http://localhost:8080/funds/${funds_id}`, {
      method: 'DELETE',
    })
    setTimeout(()=>{settoggleRefresh(!toggleRefresh)},100)
  }


  //Progress Bar Handlers

  const handleButtonClick = () =>{
    if(progress < 100){
      setProgress(progress + 20);
    }
  }


  const handleButtonReset = () =>{
    setProgress(0);
  }

  const getColor = () => {
    if(progress < 40){
      return "#ff000";
    } else if (progress < 70){
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  }



  const getProgressBarColor = (completionPercentage) => {
    if (completionPercentage === 100) {
      return 'green'; 
    } else if (completionPercentage >= 50) {
      return 'yellow'; 
    } else {
      return 'red'; 
    }
  };




  
  const addMoneytoFund = (id, addamount) => {
    let sum = moneytoAdd +  addamount 

    fetch(`http://localhost:8080/funds/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          id: id,
          currRaised: sum,
      }),
    })

      setmoneytoAdd(0.00)

  };


  return !funds ? null : ((
    <>
     <div className='Funds_ParentContainer'>
         <Sidebar />


     <div className='Funds_main'>

        <div className='Funds_add'>
          <input type='text' placeholder='Event Title' onChange={(e)=> {setinputTitle(e.target.value)}} value={inputTitle}/>
          <input type='text' placeholder='Details' onChange={(e)=> {setInputDetails(e.target.value)}} value={inputDetails}/>
          <input type='number' placeholder='Amount' onChange={(e)=> {setinputAmount(e.target.value)}} value={inputAmount}/>
          <input type='number' placeholder='Amount' onChange={(e)=> {setcurrRaised(e.target.value)}} value={currRaised}/>
          <button onClick={()=>{addFund()}}>Add Fundraiser</button>
        </div>


              {funds.map((elem, index) => {
              return(
                <div className='Funds_card'>
                <div className='Funds_Card_Container'>

                  <h4>{elem.title}</h4>
                  <p>{elem.details}</p>
                 <p>Currently raised: {elem.currRaised}</p> <p>Amount Needed: {elem.amount}</p>

                  <button onClick={()=>{handleDelete(elem.id)}}>Delete</button>
                  <input type='number' placeholder='amount raised' onChange={(e)=> {setmoneytoAdd(e.target.value)}} value={moneytoAdd}/>
                  <button onClick={()=>{addMoneytoFund(elem.id, elem.currRaised)}}>Add Fund</button>


            <LinearProgress
                    variant="determinate"
                    value={(elem.currRaised / elem.amount) * 100 || 0}
                    sx={{ backgroundColor: getProgressBarColor((elem.currRaised / elem.amount) * 100) }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <Typography variant="body2">
                      {elem.currRaised} / {elem.amount}
                    </Typography>
                    <Typography variant="body2">
                      {((elem.currRaised / elem.amount) * 100).toFixed(2)}% Complete
                    </Typography>
                  </div>

              
                </div>
                </div>
              )
              })}
    
            <div className='Funds_progresscontainer'>
              <div className='Funds_ProgressBar'>
                <div className='Funds_progress-bar-fill' style={{ width : `${progress}%`, backgroundColor: getColor()}}>
         
                </div>
              </div>
                <div className='Funds_Progress-label'>
                  {progress}%
                </div>
                <button className='Funds_progress-button' onClick={handleButtonClick}>Progress</button>
                <button className='Funds_progress-button' onClick={handleButtonReset}>Reset</button>
            </div>



      </div>
      </div>
      
    </>
  ));
};

