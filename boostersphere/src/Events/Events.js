import React, { useState, useEffect, Component } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, DateRangeCalendar, DatePicker, renderDateRangeViewCalendar } from '@mui/x-date-pickers-pro';
// import 'react-calendar/dist/Calendar.css';
import './Events.css';

export const Events = () => {
  const [toggleAddEvent, setToggleAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [sDate, setsDate] = useState(new Date());
  const [formData, setFormData] = useState({
    eventTitle: '',
    type: '',
    description: '',
    date: null,
    fundRequired: 0,
    volunteerNeeded: 0,
    userId: 1, 
  });
 ///-----------------------------------------------------calender code-------------------------------------------------/// 
  const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
 };

 const findFirstDay = (y, m) => {
    return new Date(y, m, 1).getDay();
 };

 const changeToPrevMonth = () => {
    setsDate((pDate) => {
       const pMonth = pDate.getMonth() - 1;
       const pYear = pDate.getFullYear();
       return new Date(pYear, pMonth);
    });
 };

 const changeToNextMonth = () => {
    setsDate((pDate) => {
       const nMonth = pDate.getMonth() + 1;
       const nYear = pDate.getFullYear();
       return new Date(nYear, nMonth);
    });
 };

 const handleDateClick = (date) => {
    setsDate(date);
 };

 const showCalendar = () => {
    const currDate = new Date();
    const y = sDate.getFullYear();
    const m = sDate.getMonth();
    const mDays = findMonthDays(y, m);
    const fDay = findFirstDay(y, m);

    const allDays = [];

    // For empty cells
    for (let p = 0; p < fDay; p++) {
       allDays.push(<div key = {`em-${p}`} className = "box empty"></div>);
    }

    // Show actual days
    for (let d = 1; d <= mDays; d++) {
       const date = new Date(y, m, d);
       const isSelected = sDate && date.toDateString() === sDate.toDateString();

       allDays.push(
          <div
             key = {`d-${d}`}
             className = {`box ${isSelected ? "selected" : ""}`}
             onClick = {() => handleDateClick(date)}
             >
             {d}
          </div>
       );
    }

    return allDays;
  };
  ///--------------------------------------------------------POST code------------------------------------------------------------///
  useEffect(() => {
    fetchEvents()
  }, []);

  const fetchEvents = () => {
    fetch('/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Error fetching events:', err));
  };

  const toggleAdd = () => {
    setToggleAddEvent(true);
  };

  const toggleOff = () => {
    setToggleAddEvent(false);
    setFormData({
      eventTitle: '',
      type: '',
      description: '',
      date: null,
      fundRequired: 0,
      volunteerNeeded: 0,
      userId: 1, // Reset the form data when toggling off
    });
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      date: newValue,
    });
  };

  const addEvent = () => {
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        toggleOff();
        fetchEvents();
      })
      .catch((err) => console.error('Error adding event:', err));
  };

  return (
    <>
    <div>
      <h3>
         Creating the <i> calendar component </i> from scratch using React JS
      </h3>
      <div className = "main">
         <div className = "header">
            <button onClick = {changeToPrevMonth}> Prev Month </button>
            <h2>
               {sDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
               })}
            </h2>
            <button onClick = {changeToNextMonth}> Next Month </button>
         </div>
         <div className = "body">{showCalendar()} </div>
            {sDate && (
               <div className = "selected-date">
                  Selected Date: {sDate.toLocaleDateString()}
               </div>
            )}
         </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="events-container">
          {!toggleAddEvent ? (
            <>
              <button className="add-event-btn" onClick={toggleAdd}>
                Add Super Cool and Fresh New Event!
              </button>
              {/* <DateRangeCalendar
                value={formData.date}
                onChange={handleDateChange}
              /> */}
              <ul className="events-list">
                {events.map((event) => (
                  <li key={event.id}>
                    {event.eventTitle} - {event.date}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <button onClick={toggleOff} className="return-btn">
                Return
              </button>
              <form onSubmit={addEvent} className="add-event-form">
                <input
                  type="text"
                  name="eventTitle"
                  placeholder="Event Title"
                  value={formData.eventTitle}
                  onChange={handleFormChange}
                  required
                />
                <DatePicker
                  value={formData.date}
                  onChange={handleDateChange}
                  className="date-picker"
                />
                <button type="submit" className="submit-btn">
                  Add Event
                </button>
              </form>
            </>
          )}
        </div>
      </LocalizationProvider>
    </>
  );
};

