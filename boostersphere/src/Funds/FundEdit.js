import './FundEdit.css'
import React, { useState, useEffect, cloneElement } from 'react';
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

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', event_id: NaN })
  const [formShowing, setFormShowing] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()

  //inputs
  const [inputTitle, setinputTitle] = useState('')
  const [inputDetails, setInputDetails] = useState('')
  const [inputAmount, setinputAmount] = useState(0.00)
  const [currRaised, setcurrRaised] = useState(0.00)
  const [moneytoAdd, setmoneytoAdd] = useState(0.00);





  useEffect(() => {
    fetch('http://localhost:8080/funds')
      .then(res => res.json())
      .then(data => setFunds(data))
  }, [toggleRefresh])


  const addFund = async () => {
    fetch('http://localhost:8080/funds', {
      method: 'POST',
      body: JSON.stringify({
        title: inputTitle,
        details: inputDetails,
        amount: inputAmount,
        currRaised: currRaised,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }



  const handleDelete = (funds_id) => {
    fetch(`http://localhost:8080/funds/${funds_id}`, {
      method: 'DELETE',
    })
    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }


  const getProgressBarColor = (completionPercentage) => {
      if (completionPercentage > 100){
        return 'darkgreen'
      }
      else if (completionPercentage === 100) {
      return 'green';
    } else if (completionPercentage >= 50) {
      return 'yellow';
    } else {
      return 'red';
    }
  };



  const showForm = (event) => {
    setSelectedEvent(event)
    setFormShowing(true)
  }


  const handleFundAdd = (selected) =>{
    console.log(selected.currRaised)
    let total = (selected.currRaised == undefined) ? 0 + parseInt(moneytoAdd) : parseInt(selected.currRaised) + parseInt(moneytoAdd)

    fetch('http://localhost:8080/funds', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: selected.id,
        currRaised: total,
      })
    })
    setmoneytoAdd(0)
    setFormShowing(false)
    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }


  const handleFundDelete = (selected) =>{
    console.log(selected.currRaised)
    let total = (selected.currRaised == undefined) ? 0 - parseInt(moneytoAdd) : parseInt(selected.currRaised) - parseInt(moneytoAdd)

    fetch('http://localhost:8080/funds', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: selected.id,
        currRaised: total,
      })
    })
    setmoneytoAdd(0)
    setFormShowing(false)
    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }
  


  return !funds ? null : ((
    <>
      <div className='Funds_ParentContainer'>
        <Sidebar />


        <div className='Funds_main'>

          <div className='Funds_add'>
            <input type='text' placeholder='Event Title' onChange={(e) => { setinputTitle(e.target.value) }} value={inputTitle} />
            <input type='text' placeholder='Details' onChange={(e) => { setInputDetails(e.target.value) }} value={inputDetails} />
            <input type='number' placeholder='Amount' onChange={(e) => { setinputAmount(e.target.value) }} value={inputAmount} />
            <input type='number' placeholder='Amount' onChange={(e) => { setcurrRaised(e.target.value) }} value={currRaised} />
            <button onClick={() => { addFund() }}>Add Fundraiser</button>
          </div>


          {funds.map((elem, index) => {
            return (
              <div className='Funds_card'>
                <div className='Funds_Card_Container'>

                  <h4>{elem.title}</h4>
                  <p>{elem.details}</p>
                  <p>Currently raised: ${elem.currRaised == undefined ? 0 : elem.currRaised}</p> <p>Amount Needed: ${elem.amount}</p>

                  <button onClick={() => { handleDelete(elem.id) }}>Delete</button>
                  <button onClick={() => showForm(elem)}>Edit Fund</button>


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

        </div>


        {formShowing && (
          <div className="volunteer-overlay">
            <div className="volunteer-form-container form-names-span">
              {selectedEvent.title}
              {selectedEvent.currRaised}
              <input placeholder="Amount" onChange={(e) => { setmoneytoAdd(e.target.value) }} value={moneytoAdd}/>
              <button className="volunteer-button volunteer-button-form" onClick={() => setFormShowing(false)}>Cancel</button>
              <button className="volunteer-button volunteer-button-form"  onClick={()=>{handleFundAdd(selectedEvent)}}>Add</button>
              <button className="volunteer-button volunteer-button-form"  onClick={()=>{handleFundDelete(selectedEvent)}}>Subtract</button>
            </div>
          </div>
        )}
      </div>
    </>
  ));
};

