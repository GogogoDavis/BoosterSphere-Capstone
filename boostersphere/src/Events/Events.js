import React, { useState, useEffect } from 'react';
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"
// import Calendar from 'react-calendar';
// import './Events.css';

// .('eventTitle'); 
//     .('type');
//     .('description');
//     table.date('date');
//     // date in this format 'yyyy-mm-dd'
//     .('fundRequired');
//     .('volunteerNeeded')
//     .('userId');

const locales = {
  "en-Us": require("date-fns/locale/en-US")

};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [
  {
    title: 'Bingus party', 
    type: 'religious event',
    description: 'We do be religioning',
    start: new Date,
    end: new Date,
    fundRequired: 230000,
    volunteerNeeded: 200,
    userId: 2
  }
]

export const Events = () => {

  const [ toggleForm, setToggleForm ] = useState(false);
  const [newEvent, setNewEvent] = useState({
     title: "",
     type: "",
     description: "",
     start: "",
     end: "", 
     fundRequired: 0,
     volunteerNeeded: 0,
     userId: 0
    });

  const formatEvent = { 
    ...newEvent, 
    start: newEvent.start.toString(),
    end:   newEvent.end.toString(),
  }


  const [allEvents, setAllEvents] = useState(events) 

  function HandleAddEvent() {
      setToggleForm(false);
      fetch(`http://localhost:8080/events`, {
      method: 'POST', 
      headers:  {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formatEvent)
      })
      .then(res => res.json())
      .then(data => {console.log('Incredibly cool:', data); 
      setAllEvents([...allEvents, formatEvent]);
    })
    .catch((error) => {
      setAllEvents([...allEvents, formatEvent]);
      console.error('Wuh-oh :,(       :', error);
    })
    }

    const yesToggler = () => {
      setToggleForm(true);
    }


  return(
    <div className='App'>
      <h1>Calendar</h1>
      <h2>
        <button onClick={yesToggler}>Add New Event</button>
        </h2>
        {toggleForm ? (
      <>
      <div>
          <input type="text" placeholder='Add Event' style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        </div>
        
        <div>
            <input type="text" placeholder='Event Type' style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} />
          </div>

          <div>
            <input type="text" placeholder='Event Description' style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          </div>
          
          <DatePicker
            placeholderText='Start Date'
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })} />

          <DatePicker
            placeholderText='End Date'
            style={{ marginRight: "10px" }}
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })} />
           
            <div>
             <input type="integer" placeholder='Funds Required' style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.fundRequired} onChange={(e) => setNewEvent({ ...newEvent, fundRequired: e.target.value })} />
               </div>
          
          <div>
            <input type="integer" placeholder='Volunteers Needed' style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.volunteerNeeded} onChange={(e) => setNewEvent({ ...newEvent, volunteerNeeded: e.target.value })} />
          </div>
          
          <div>
            <input type="integer" placeholder='User ID' style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.userId} onChange={(e) => setNewEvent({ ...newEvent, userId: e.target.value })} />
          </div>
          <button style={{marginTop: "10px"}} onClick={HandleAddEvent}>Submit New Event!</button>
          </>
        ): null }

      <Calendar 
        localizer={localizer} events={allEvents}
        startAccessor="start" 
        endAccessor="end" 
        style={{height: 500, margin: "50px"}}/>
    </div>
  )
};

  // const [toggleAddEvent, setToggleAddEvent] = useState(false);
  // const [events, setEvents] = useState([]);
  // const [formData, setFormData] = useState({
  //   eventTitle: '',
  //   type: '',
  //   description: '',
  //   date: null,
  //   fundRequired: 0,
  //   volunteerNeeded: 0,
  //   userId: 1,
  // });

  // const [calendarDate, setCalendarDate] = useState(new Date());

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const fetchEvents = () => {
  //   fetch('/events')
  //     .then((res) => res.json())
  //     .then((data) => setEvents(data))
  //     .catch((err) => console.error('Error fetching events:', err));
  // };

  // const toggleAdd = () => {
  //   setToggleAddEvent(true);
  // };

  // const toggleOff = () => {
  //   setToggleAddEvent(false);
  //   setFormData({
  //     eventTitle: '',
  //     type: '',
  //     description: '',
  //     date: null,
  //     fundRequired: 0,
  //     volunteerNeeded: 0,
  //     userId: 1,
  //   });
  // };

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleDateChange = (newValue) => {
  //   setFormData({
  //     ...formData,
  //     date: newValue,
  //   });
  // };

  // const addEvent = (e) => {
  //   e.preventDefault();
  //   fetch('/events', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then(() => {
  //       toggleOff();
  //       fetchEvents();
  //     })
  //     .catch((err) => console.error('Error adding event:', err));
  // };

  // const updateEvent = (id) => {
  //   fetch(`/events/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         toggleOff();
  //         fetchEvents();
  //       } else {
  //         console.error('Event not updated:', res.statusText);
  //       }
  //     })
  //     .catch((err) => console.error('Error updating event:', err));
  // };
  

  // const deleteEvent = (id) => {
  //   fetch(`/events/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         fetchEvents();
  //       } else {
  //         console.error('Event not deleted:', res.statusText);
  //       }
  //     })
  //     .catch((err) => console.error('Error deleting event:', err));
  // };
  

  // return (
  //   <>
  //     <div id='Calendar'>
  //       <h1>Calendar</h1>
  //       <Calendar localizer={localizer} events/>
  //     </div>
  //     <div className="events-container">
  //       {!toggleAddEvent ? (
  //         <>
  //           <button className="add-event-btn" onClick={toggleAdd}>
  //             Add Event
  //           </button>
  //           <ul className="events-list">
  //             {events.map((event) => (
  //               <li key={event.id}>
  //                 {event.eventTitle} - {event.date}
  //                 <button onClick={() => updateEvent(event.id)}>Update</button>
  //                 <button onClick={() => deleteEvent(event.id)}>Delete</button>
  //               </li>
  //             ))}
  //           </ul>
  //         </>
  //       ) : (
  //         <>
  //           <button onClick={toggleOff} className="return-btn">
  //             Return
  //           </button>
  //           <form onSubmit={addEvent} className="add-event-form">
  //             <input
  //               type="text"
  //               name="eventTitle"
  //               placeholder="Event Title"
  //               value={formData.eventTitle}
  //               onChange={handleFormChange}
  //               required
  //             />
  //             {/* Other form inputs */}
  //             <button type="submit" className="submit-btn">
  //               Add Event
  //             </button>
  //           </form>
  //         </>
  //       )}
  //     </div>
  //   </>
  // );
