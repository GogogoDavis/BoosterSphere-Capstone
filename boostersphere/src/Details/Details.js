// import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, {useState} from 'react';
import mopey from '../DaMopester-nobackground.png'
import { Sidebar } from '../Sidebar/Sidebar';


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
    <>
    <div className='details_container'>
    <Sidebar />
       {/* <div className='mopeyImg'>
            <img src={mopey} alt=''></img>
              </div> */}
      <div style="overflow:hidden" id="wrap">
        <ul>
          <h1
            id="detailstitle"
            // style={{
            //   // display: "flex",
            //   // justifyContent: "center",
            //   // color: "salmon",
            // }}
          > Event Details</h1>

         <div className="detail_row"> 
          <div className="detail_container2" >

          <div className="detail_div"><label className="event_label">Event ID: </label></div>

          <div className="detail_input">
            <input
            className="detail_value"
            value= {item.id}
            readOnly
            />
          </div>
          </div>
        
          
          <div className="detail_row"> 

            <div className="detail_div"><label  className="event_label">Event Title: </label></div>

            <div className="detail_input">
            <input
              className="detail_value"
              type="text"
              placeholder={item.title}
              value={editDetails.title}
              onChange={(e) =>
                setEditDetails({ ...editDetails, title: e.target.value })
              }
            />
            </div>
          </div>

          <div className="detail_row"> 

            <div className="detail_div"><label className="event_label">Party Type: </label></div>

            <div className="detail_input">
              <input
                className="detail_value"
                type="text"
                placeholder={item.type}
                value={editDetails.type}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, type: e.target.value })
                }
              />
            </div>
          </div>

          <div className="detail_row"> 

            <div className="detail_div"><label className="event_label">Event Details: </label></div>

            <div className="detail_input">
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
            </div>
          </div>

          <div className="detail_row"> 
     
          <div className="detail_div"><label className="event_label">Start Date: </label></div>

          <div className="detail_input">
            <DatePicker
              className="detail_value"
              placeholderText={item.start}
              showTimeSelect
              style={{ marginRight: "10px" }}
              selected={editDetails.start}
              onChange={(start) => setEditDetails({ ...editDetails, start })}
            />
          </div>
      </div>
      
      <div className="detail_row"> 

          <div className="detail_div"><label className="event_label">End Date: </label></div>

          <div className="detail_input">
            <DatePicker
              className="detail_value"
              placeholderText={item.end}
              showTimeSelect
              style={{ marginRight: "10px" }}
              selected={editDetails.end}
              onChange={(end) => setEditDetails({ ...editDetails, end })}
            />
          </div>
      </div>

      <div className="detail_row"> 

            <div className="detial_div"><label className="event_label">Amount of Funds Required: </label></div>

            <div className="detail_input">
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
            </div>
          </div>

          <div className="detail_row"> 

            <div className="detail_div"><label className="event_label">Number of Volunteers Needed:</label></div>

            <div className="detail_input">
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
            </div>
          </div>

          <div className="detail_row"> 

            <div className="detail_div"><label className="event_label">User ID: </label></div>
            
            <div className="detail_input">
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
            </div>

          </div>
          </div>
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
      <div className='detail_wrapper2'>
      </div>
    </div>
    </>
  );
};
