import React, { useState, useEffect, useContext } from 'react';
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"
import { Sidebar } from '../Sidebar/Sidebar';
import './Events.css'
import { id } from 'date-fns/locale';
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';
import mopey from '../DaMopester-nobackground.png'
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

// const events = [
//   {
//     title: 'Bingus party', 
//     type: 'religious event',
//     description: 'We do be religioning',
//     start: new Date,
//     end: new Date,
//     fundRequired: 230000,
//     volunteerNeeded: 200,
//     userId: 2
//   }
// ]

export const Events = () => {

  const [ toggleForm, setToggleForm ] = useState(false);
  const [allEvents, setAllEvents] = useState() 
  const { setDetails } = useContext(userContext)
  const [toggleRefresh, settoggleRefresh] = useState(false)
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    description: "",
    start: new Date,
    end: new Date, 
    fundRequired: 0,
    volunteerNeeded: 0,
    userId: 0
   });

  useEffect(()=>{
    fetch('http://localhost:8080/events')
    .then(res => res.json())
    .then(data => setAllEvents(data))
  },[toggleRefresh])
  


  // const formatEvent = { 
  //   ...newEvent, 
  //   start: newEvent.start.toISOString(),
  //   end:   newEvent.end.toISOString(),
  // }

  function HandleAddEvent() {
      setToggleForm(false);


      fetch(`http://localhost:8080/events`, {
      method: 'POST', 
      headers:  {
        'Content-Type': 'application/json', 
      },
        body: JSON.stringify(newEvent)
      })

      if(newEvent.fundRequired > 0){
  fetch('http://localhost:8080/funds', {
      method: 'POST',
      body: JSON.stringify({
        title: newEvent.title,
        details: newEvent.description,
        amount: newEvent.fundRequired,
      }),
      headers:  {
        'Content-Type': 'application/json',
      },
    })
  }

      setTimeout(()=>{settoggleRefresh(!toggleRefresh)},50)
    }


    const yesToggler = () => {
      setToggleForm(!toggleForm);
    }



  //   function handleDeleteEvent(event) {
  //     console.log(event)
  //     // Fetch to sevrver but it is not getting the request
  //     fetch(`http://localhost:8080/events/${event.id}`, {
  //       method: 'DELETE'
  //   });
  // }


  const handleDetails = (event) =>{
      setDetails(event)
      navigate(`/details/${event.id}`)
  }

   

  return !allEvents ? null : ((
    <>
      <div className="EventParentContainer">
        <Sidebar />
        <div className="eventPortion">
          <div id='cal'>
          <h1 id='calHead' style={{color: "#3d535f"}}>Calendar</h1>
          <div>
          </div>
          </div>
          {toggleForm ? (
            <div id="postEventFields">
              <div className='fieldContainer'>
             <div><label className='inputLabels'>Event Title: </label></div>
              <div className='eventsInputField'><input
                  type="text"
                  placeholder="Add Event"
                  style={{ width: "100%", marginRight: "0px" }}
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                /></div>
              </div>
              <div className='fieldContainer'>
              <div><label className='inputLabels'>Event Type: </label></div>
              <div className='eventsInputField'><input
                  type="text"
                  placeholder="Event Type"
                  style={{ width: "100%", marginRight: "0px" }}
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, type: e.target.value })
                  }
                /></div>
              </div>
              <div className='fieldContainer'>
              <div><label className='inputLabels'>Description: </label></div>
               <div className=' eventsInputField'><input
                  type="text"
                  placeholder="Event Description"
                  style={{ width: "100%", marginRight: "0px" }}
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                /></div>           
              </div>
              <div className='fieldContainer'>
             <div><label className='inputLabels'>Start Date: </label></div>
              <div className='eventsInputField'>
                <DatePicker
                placeholderText="Start Date"
                showTimeSelect
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              /></div>
              </div>

              <br></br>

              <div className='fieldContainer'>
              <div><label className='inputLabels'>End Date: </label></div>
              <div className='eventsInputField'>
                <DatePicker
                placeholderText="End Date"
                showTimeSelect
                style={{ marginRight: "10px" }}
                selected={newEvent.end}
                onChange={(end) => {setNewEvent({ ...newEvent, end }); console.log(end)}}
              /></div>
              </div>

              <div className='fieldContainer'>
              <div><label className='inputLabels'>Funds Required: </label></div>
                <div className='eventsInputField'><input
                  type="integer"
                  placeholder="Funds Required"
                  style={{ width: "100%", marginRight: "0px" }}
                  value={newEvent.fundRequired}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, fundRequired: e.target.value })
                  }
                /></div>            
              </div>

              <div className='fieldContainer'>
              <div><label className='inputLabels'>Volunteers Needed: </label></div>
                <div className= 'eventsInputField'><input
                  type="integer"
                  placeholder="Volunteers Needed"
                  style={{ width: "100%", marginRight: "0px" }}
                  value={newEvent.volunteerNeeded}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      volunteerNeeded: e.target.value,
                    })
                  }
                /></div>
              </div>
              <div className='fieldContainer'>
              <div><label className='inputLabels'>User ID: </label></div>
                <div className='eventsInputField'><input
                  type="integer"
                  placeholder="User ID"
                  style={{ width: "100%", marginRight: "0px" }}
                  value={newEvent.userId}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, userId: e.target.value })
                  }
                /></div>
              </div>
            <div className='eventInputButton'>
              <button 
                className='eventButtonStyle'
                onClick={()=>HandleAddEvent()}>
                Submit New Event!
              </button>
              <button
                className= 'eventButtonStyle'
                style={{ marginLeft: "5px", width: "30%" }}
                onClick={yesToggler}
              >Return</button>
            </div>
            </div>
          ) : null}

          <Calendar
            id="Calendar"
            localizer={localizer}
            events={allEvents}
            startAccessor={(event) => { return new Date(event.start) }}
            endAccessor={(event) => { return new Date(event.end) }}
            style={{ height: 800, color: '#3d535f', marginBottom: '50px', marginRight: '50px', background: 'transparent',
            backdropFilter: 'blur(20px)', marginLeft: '50px', zIndex: '999'}}
            onSelectEvent={handleDetails}
          />
          <div>
         <a href={`https://www.youtube.com/watch?v=dQw4w9WgXcQ`}><img src={mopey} alt= '' className='baby'></img></a>         
          </div>
          <div id='centerBtn'>
            <button id='togglerBtn' onClick={yesToggler}>Add New Event</button>  
            </div>     
        </div>
        <div className='Events_Landing_wrapper'>
      </div>
      </div>
    </>
  ));
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
