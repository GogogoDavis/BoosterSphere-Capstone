import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, {useState} from 'react';
import mopey from '../DaMopester-nobackground.png'

export const Details = ({ item }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editDetails, setEditDetails] = useState({
    id: id,
    title: "",
    type: "",
    description: "",
    start: new Date,
    end: new Date, 
    fundRequired: 0,
    volunteerNeeded: 0,
    userId: 0
  })

  function handleDeleteEvent() {
    // Fetch to sevrver but it is not getting the request
    fetch(`http://localhost:8080/events/${id}`, {
      method: "DELETE",
    }).then(navigate(`/events`));
  }

  const handleUpdateEvent = () => {
  
    fetch(`http://localhost:8080/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editDetails),
    })
      .then(() => {
        console.log("Event updated successfully");
      })
      .then(() => {
        navigate(`/events`)
      })
      .catch((error) => {
        console.error("Error updating event", error);
      });
  };

  const calendarReturn = () => {
    navigate(`/events`);
  };

  // console.log(item);
  console.log(editDetails);

  return (
    <container id='detailscontainer'>
       <div className='mopeyImg'>
            <img src={mopey} alt=''></img>
              </div>
      <div id="wrap">
        <ul>
          <h1
            id="detailstitle"
            // style={{
            //   // display: "flex",
            //   // justifyContent: "center",
            //   // color: "salmon",
            // }}
          >Details</h1>
          
          <label className="event_label">Event ID: </label>
          <input
          className="detail_value"
          value= {item.id}
          readOnly
          />
          
        
          

          <label  className="event_label">Event Title: </label>
          <input
            className="detail_value"
            type="text"
            placeholder={item.title}
            value={editDetails.title}
            onChange={(e) =>
              setEditDetails({ ...editDetails, title: e.target.value })
            }
          />

          <label className="event_label">Party Type: </label>
          <input
            className="detail_value"
            type="text"
            placeholder={item.type}
            value={editDetails.type}
            onChange={(e) =>
              setEditDetails({ ...editDetails, type: e.target.value })
            }
          />

          <label className="event_label">Event Details: </label>
          <input
            className="detail_value"
            type="text"
            placeholder={item.description}
            value={editDetails.description}
            style={{ height: 'auto', width: '800px', padding: '50px', margin: '10px' }}
            onChange={(e) =>
              setEditDetails({ ...editDetails, description: e.target.value })
            }
          />
<div>     
          <label className="event_label">Start Date: </label>
          <DatePicker
            className="detail_value"
            placeholderText={item.start}
            showTimeSelect
            style={{ marginRight: "10px" }}
            selected={editDetails.start}
            onChange={(start) => setEditDetails({ ...editDetails, start })}
          />
</div>
<div>
          <label className="event_label">End Date: </label>
          <DatePicker
            className="detail_value"
            placeholderText={item.end}
            showTimeSelect
            style={{ marginRight: "10px" }}
            selected={editDetails.end}
            onChange={(end) => setEditDetails({ ...editDetails, end })}
          />
</div>

          <label className="event_label">Amount of Funds Required: </label>
          <input
            className="detail_value"
            type="integer"
            placeholder={item.fundRequired}
            // defaultValue={item.fundRequired}
            // value={editDetails.fundRequired}
            onChange={(e) =>
              setEditDetails({ ...editDetails, fundRequired: e.target.value })
            }
          />

          <label className="event_label">Number of Volunteers Needed:</label>
          <input
            className="detail_value"
            type="integer"
            placeholder={item.volunteerNeeded}
            // defaultValue={item.volunteerNeeded}
            // value={editDetails.volunteerNeeded}
            onChange={(e) =>
              setEditDetails({
                ...editDetails,
                volunteerNeeded: e.target.value,
              })
            }
          />

          <label className="event_label">User ID: </label>
          <input
            className="detail_value"
            type="integer"
            placeholder={item.userId}
            // defaultValue={item.userId}
            // value={editDetails.userId}
            onChange={(e) =>
              setEditDetails({ ...editDetails, userId: e.target.value })
            }
          />
        </ul>
        <div className='buttonLayout'>
          <button className="detailBtn" onClick={calendarReturn}>
            Return to Calendar
          </button>
          <button className="detailBtn" onClick={handleDeleteEvent}>
            Remove Event
          </button>
          <button className="detailBtn" onClick={handleUpdateEvent}>
            Update Event
          </button>
        </div>
      </div>
      <div className='detail_wrapper'>
      </div>
    </container>
    
  );
};
