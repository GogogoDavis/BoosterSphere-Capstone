import './Events.css'
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import React, { useState, useEffect } from 'react'; 
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimePicker, DatePicker, LocalizationProvider, DateCalendar, DateRangeCalendar } from '@mui/x-date-pickers-pro';
// import daMopey from '../DaMopester.jpg';

export const Events = () => {
  const [value, setValue] = useState();
  const [toggleAddEvent, setToggleAddEvent ] = useState(false); 

  const toggleAdd = () => {
    setToggleAddEvent(true); 
  }

  const toggleOff = () => {
    setToggleAddEvent(false); 
  }

  const addEventWindow = () => {
  
  }

 
return (
  <>
  {!toggleAddEvent ? (
  <LocalizationProvider dateAdapter={AdapterDayjs}> 
    <div className="nav">
      <div className="links">
        <Link to="/Home" className="NavBar">
          Home
        </Link>
        <Link to="/Events" className="NavBar">
          Events
        </Link>
      </div>
      <Logout />
    </div>
    Events Page
    <button id='freshAddBtn' onClick={toggleAdd}>Add Super Cool and Fresh New Event!</button>
  </LocalizationProvider>
  ): 
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <div>
    <button onClick={toggleOff}>Return</button>
  <form label='Add Event Form'>
    <div label='controlled calendar'>
      <DateRangeCalendar />
      </div>
  </form>
  </div>
  </LocalizationProvider>
  }
  </>
);    
}




{/* <DemoItem label="Events Calender">
      <DataRangeCalender
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </DemoItem> */}