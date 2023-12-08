import './Events.css'
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import React, { useState, useEffect } from 'react'; 
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimePicker, DatePicker, LocalizationProvider, DateCalendar, DateRangeCalendar } from '@mui/x-date-pickers-pro';

export const Events = () => {
  const [value, setValue] = useState();

 
return (
  <>
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
    <div label='controlled calendar'>
      <DateRangeCalendar />
    </div>
  </LocalizationProvider>
  </>
);    


}




{/* <DemoItem label="Events Calender">
      <DataRangeCalender
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </DemoItem> */}