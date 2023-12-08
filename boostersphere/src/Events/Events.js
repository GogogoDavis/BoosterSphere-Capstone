import './Events.css';
import { Link } from 'react-router-dom';
import { Logout } from '../Logout/Logout';
import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, DateRangeCalendar } from '@mui/x-date-pickers-pro';

export const Events = () => {
  const [value, setValue] = useState();
  const [toggleAddEvent, setToggleAddEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventTitle: '',
    type: '',
    description: '',
    date: null,
    fundRequired: 0,
    volunteerNeeded: 0,
    userId: 1, // Replace this with the appropriate user ID
  });

  useEffect(() => {
    // Fetch events from backend when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // Fetch events from backend API
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
    // Post new event data to the backend
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        toggleOff(); // Hide the form after successful addition
        fetchEvents(); // Fetch events again to update the list
      })
      .catch((err) => console.error('Error adding event:', err));
  };

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
          <div>
            <h2>Events Page</h2>
            <button id="freshAddBtn" onClick={toggleAdd}>
              Add Super Cool and Fresh New Event!
            </button>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  {event.eventTitle} - {event.date}
                  {/* Display other event details as needed */}
                </li>
              ))}
            </ul>
          </div>
        </LocalizationProvider>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <button onClick={toggleOff}>Return</button>
            <form label="Add Event Form" onSubmit={addEvent}>
              <div>
                <input
                  type="text"
                  name="eventTitle"
                  placeholder="Event Title"
                  value={formData.eventTitle}
                  onChange={handleFormChange}
                  required
                />
                {/* Add other input fields for event details */}
                <DateRangeCalendar value={formData.date} onChange={handleDateChange} />
              </div>
              <button type="submit">Add Event</button>
            </form>
          </div>
        </LocalizationProvider>
      )}
    </>
  );
};
