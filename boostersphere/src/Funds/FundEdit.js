import './FundEdit.css'
import React, { useState, useEffect, cloneElement } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { RiFundsBoxFill } from 'react-icons/ri';
import { inputAdornmentClasses, responsiveFontSizes } from '@mui/material';

//icons
import { MdDelete } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import { BsClockHistory } from "react-icons/bs"
import { IoIosExit } from "react-icons/io"

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
  const [formShowingHistory, setFormShowingHistory] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()
  const [fundsHistory, setFundsHistory] = useState()

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

  useEffect(() => {
    fetch('http://localhost:8080/funds/transaction')
      .then(res => res.json())
      .then(data => setFundsHistory(data))
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

  const showFormHistory = (event) => {
    setSelectedEvent(event)
    setFormShowingHistory(true)
  }


  const handleFundAdd = (selected) =>{
    console.log(selected.currRaised)
    let total = (selected.currRaised == undefined) ? 0 + parseFloat(moneytoAdd) : parseFloat(selected.currRaised) + parseFloat(moneytoAdd)

    fetch('http://localhost:8080/funds', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: selected.id,
        currRaised: total,
      })
    })


    fetch('http://localhost:8080/funds/transaction', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        title: selected.title,
        amount: moneytoAdd,
        event_id: selected.id,
        status: "add"
      })
    })

    setmoneytoAdd(0)
    setFormShowing(false)
    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }


  const handleFundDelete = (selected) =>{
    console.log(selected.currRaised)
    let total = (selected.currRaised == undefined) ? 0 - parseFloat(moneytoAdd) : parseFloat(selected.currRaised) - parseFloat(moneytoAdd)

    fetch('http://localhost:8080/funds', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: selected.id,
        currRaised: total,
      })
    })

    fetch('http://localhost:8080/funds/transaction', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        title: selected.title,
        amount: moneytoAdd,
        event_id: selected.id,
        status: "subtract"
      })
    })

    setmoneytoAdd(0)
    setFormShowing(false)
    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }



  const deleteTransactions = (selected, elem) =>{
    fetch(`http://localhost:8080/funds/transaction/${elem.id}`, {
      method: 'DELETE',
    })


    if(elem.status == "subtract"){
    let addtotal = (selected.currRaised == undefined) ? 0 + parseFloat(elem.amount) : parseFloat(selected.currRaised) + parseFloat(elem.amount)

    fetch('http://localhost:8080/funds', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: selected.id,
        currRaised: addtotal,
      })
    })
  }



  if(elem.status == "add"){
    let subtotal = (selected.currRaised == undefined) ? 0 - parseFloat(elem.amount) : parseFloat(selected.currRaised) - parseFloat(elem.amount)

    fetch('http://localhost:8080/funds', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: selected.id,
        currRaised: subtotal,
      })
    })
  }




console.log(selectedEvent)

    setTimeout(() => { settoggleRefresh(!toggleRefresh) }, 100)
  }






  
console.log(fundsHistory)

  return !funds ? null : ((
    <>
      <div className='Funds_ParentContainer'>
        <Sidebar />


        <div className='Funds_main'>


        <div className='Funds_carddiv'>
          {funds.map((elem, index) => {
            return (
              <div className='Funds_card'>
                <div className='Funds_Card_Container'>

                  <div className='Funds_titleandbuttons'><h4>{elem.title}</h4>
                    <div>                
                      <button onClick={() => { showFormHistory(elem) }} className='Funds_deleteEditbtn'><BsClockHistory /></button>
                      <button onClick={() => showForm(elem)} className='Funds_deleteEditbtn'><FaRegEdit /></button>
                      <button onClick={() => { handleDelete(elem.id) }} className='Funds_deleteEditbtn'><MdDelete /></button>
                      </div>
                    </div>
                  <p>{elem.details}</p>
                  <p>Currently raised: ${elem.currRaised == undefined ? 0 : elem.currRaised}</p> <p>Amount Needed: ${elem.amount}</p>




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

          
          <div className='Funds_add'>
            <input type='text' placeholder='Event Title' onChange={(e) => { setinputTitle(e.target.value) }} value={inputTitle} />
            <input type='text' placeholder='Details' onChange={(e) => { setInputDetails(e.target.value) }} value={inputDetails} />
            <input type='number' placeholder='Amount' onChange={(e) => { setinputAmount(e.target.value) }} value={inputAmount} />
            <input type='number' placeholder='Amount' onChange={(e) => { setcurrRaised(e.target.value) }} value={currRaised} />
            <button onClick={() => { addFund() }}>Add Fundraiser</button>
          </div>

        </div>


        {formShowing && (
          <div className="funds_volunteer-overlay">
            <div className="funds_volunteer-form-container funds_form-names-span">
              <h3>{selectedEvent.title}</h3>
              <p>Currently Raised: ${selectedEvent.currRaised}</p>
              <input placeholder="Amount" onChange={(e) => { setmoneytoAdd(e.target.value) }} value={moneytoAdd}/>
              <button className="funds_volunteer-button volunteer-button-form" onClick={() => setFormShowing(false)}>Cancel</button>
              <button className="funds_volunteer-button volunteer-button-form"  onClick={()=>{handleFundAdd(selectedEvent)}}>Add</button>
              <button className="funds_volunteer-button volunteer-button-form"  onClick={()=>{handleFundDelete(selectedEvent)}}>Subtract</button>
            </div>
          </div>
        )}
        


        {formShowingHistory && (
          <div className="funds_volunteer-overlay">
            <div className="funds_volunteer-form-container funds_form-names-span">

              <div className='funds_titleexit'>
                <h3>{selectedEvent.title} Transaction History</h3>
                <button className="funds_exitbutton" onClick={() => setFormShowingHistory(false)}><IoIosExit /></button>
              </div>
               

              <ul>
              {fundsHistory.filter(elem => elem.event_id == selectedEvent.id).map((elem, index) => {return <li className="funds_transactionli" style={{ background: elem.status == "add" ? "lightgreen" : "pink"}}>${elem.amount}<button onClick={()=>{deleteTransactions(selectedEvent, elem)}}>delete</button></li>})}
              </ul>




            </div>
          </div>
        )}




      </div>
    </>
  ));
};

