import { useEffect, useState } from "react"
import { Sidebar } from "../Sidebar/Sidebar"
import './volunteer.css'


export const Volunteers = () => {
  const [events, setEvents] = useState(null)
  const [volunteers, setVolunteers] = useState(null)
  const [formData, setFormData] = useState({firstName: '', lastName: '', email:'', phone:'', event_id: NaN})
  const [formShowing, setFormShowing] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()
  const [refreshData, setRefreshdata] = useState(false)

  useEffect(() => {
    getEvents()
    getVolunteers()
  }, [refreshData])

  const getEvents = () => {
    fetch('http://localhost:8080/events').then(res => res.json())
      .then(eventData => setEvents(eventData))
  }

  const getVolunteers = () => {
    fetch('http://localhost:8080/volunteers').then(res => res.json())
      .then(volunteerData => setVolunteers(volunteerData))
  }

  const showForm = (event) => {
    setFormData({
      ...formData,
      event_id: event.id,
    });
    setSelectedEvent(event)
    setFormShowing(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveVolunteer = () => {
    fetch('http://localhost:8080/volunteers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(formData)
      }).then(res => {
        console.log(res)
        setRefreshdata(!refreshData)
        setFormShowing(false)
      })
  }

  return (<>
    <div className='profile-parent-container volunteer-parent-container'>
      <Sidebar />
      {(!events || !volunteers) ? null :
      <div className="volunteer-event-list-container">
        <ul className="form-names-span">
          {events.map(event => {
            return (
              <li key={event.id}>
                <h1>{event.title}</h1>
                <h2>{event.description}</h2>
                <h3>{event.start.slice(0, 10)} @{event.start.slice(11, 16)}Z - {event.end.slice(0, 10)} @{event.end.slice(11, 16)}Z</h3>
                <p>Volunteers: { volunteers.filter(volunteer => volunteer.event_id === event.id).length}/{event.volunteerNeeded}</p>
                {volunteers.filter(volunteer => volunteer.event_id === event.id).length === event.volunteerNeeded ? 
                <button className="volunteer-button">Max volunteers</button>
                :
                <button className="volunteer-button"  onClick={() => showForm(event)}>Volunteer For Event</button>}
              </li>
            )
          })}
        </ul>
      </div>
      }
      {formShowing && (
        <div className="volunteer-overlay">
          <div className="volunteer-form-container form-names-span">
            <h1>Volunteer for {selectedEvent.title}</h1>
            <input placeholder="First Name" name="firstName" onChange={handleInputChange} />
            <input placeholder="Last Name" name="lastName" onChange={handleInputChange} />
            <input placeholder="Email" name="email" onChange={handleInputChange} />
            <input placeholder="Phone Number" name="phone" onChange={handleInputChange} />
            <span className="volunteer-form-buttons">
              <button className="volunteer-button volunteer-button-form" onClick={() => setFormShowing(false)}>Cancel</button>
              <button className="volunteer-button volunteer-button-form"  onClick={saveVolunteer}>Volunteer</button>
            </span>
          </div>
        </div>
      )}
    </div>
  </>)
}
