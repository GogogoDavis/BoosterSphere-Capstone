import React, { useState, useEffect, Component } from 'react';
import Calendar from 'react-calendar';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, DateRangeCalendar, DatePicker, renderDateRangeViewCalendar } from '@mui/x-date-pickers-pro';
import './Events.css';

export const Events = () => {
  const [toggleAddEvent, setToggleAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventTitle: '',
    type: '',
    description: '',
    date: null,
    fundRequired: 0,
    volunteerNeeded: 0,
    userId: 1, 
  });

  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
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

///----------------------------------------------------Begin Calendar Code --------------------------------------------------///

    // class Calendar extends Component {
    //   constructor(){
    //     super();

    //     this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    //     this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
    //   'October', 'November', 'December']

    //     this.state = {
    //       currentDay: new Date()
    //     }
    //   }
    // }    

  };

  return (
    <>
    <div id='Calendar'>
      <h1>Calendar</h1>
      <Calendar onChange= {setCalendarDate} value={calendarDate} />
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

