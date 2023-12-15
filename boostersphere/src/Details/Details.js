import { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, {useState} from 'react';

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

    // Function to update the event details
  const handleUpdateEvent = () => {
 
    fetch(`http://localhost:8080/events/${id}`, {
      method: "PATCH", // Using the PATCH method to update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editDetails),
    })
      .then(() => {
        console.log("Event updated successfully");
      })

      // Fetch the updated event data after a successful update
      fetch(`http://localhost:8080/events/${id}`)
        .then((response) => response.json())
        .then((updatedEvenData) => {

          // Update the state with the newly fetched data
          setEditedItem(updatedEvenData);
        })
      .catch((error) => {
        console.error("Error updating event", error);
      });
  };

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const {name, value} = e.target; // Extracting name and value from the input field
    setEditedItem({...editedItem, [name]: value}); // Updating the corresponding field in editedItem
  
  }

  const calendarReturn = () => {
    navigate(`/events`);
  };

  // console.log(item);
  console.log(editDetails);

  return (
    <container>
      <div id="wrap">
        <ul>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              color: "salmon",
            }}
          >
            Details
          </h1>

          <label style={{ width: "20%" }} className="addWrap">
            id: {item.id}
          </label>
          <input
            className="addWrap"
            type="text"
            placeholder={item.title}
            value={editDetails.title}
            onChange={(e) =>
              setEditDetails({ ...editDetails, title: e.target.value })
            }
          />

          <input
            className="addWrap"
            type="text"
            defaultValue={item.type}
            value={editDetails.type}
            onChange={(e) =>
              setEditDetails({ ...editDetails, type: e.target.value })
            }
          />

          <input
            className="addWrap"
            type="text"
            placeholder={item.description}
            value={editDetails.description}
            onChange={(e) =>
              setEditDetails({ ...editDetails, description: e.target.value })
            }
          />

          <DatePicker
            className="addWrap"
            defaultValue={item.start}
            showTimeSelect
            style={{ marginRight: "10px" }}
            selected={editDetails.start}
            onChange={(start) => setEditDetails({ ...editDetails, start })}
          />

          <DatePicker
            className="addWrap"
            defaultValue={item.end}
            showTimeSelect
            style={{ marginRight: "10px" }}
            selected={editDetails.end}
            onChange={(end) => setEditDetails({ ...editDetails, end })}
          />

          <input
            className="addWrap"
            type="integer"
            // placeholder={item.fundRequired}
            defaultValue={item.fundRequired}
            // value={editDetails.fundRequired}
            onChange={(e) =>
              setEditDetails({ ...editDetails, fundRequired: e.target.value })
            }
          />

          <input
            className="addWrap"
            type="integer"
            // placeholder={item.volunteerNeeded}
            defaultValue={item.volunteerNeeded}
            // value={editDetails.volunteerNeeded}
            onChange={(e) =>
              setEditDetails({
                ...editDetails,
                volunteerNeeded: e.target.value,
              })
            }
          />

          <input
            className="addWrap"
            type="integer"
            // placeholder={item.userId}
            defaultValue={item.userId}
            // value={editDetails.userId}
            onChange={(e) =>
              setEditDetails({ ...editDetails, userId: e.target.value })
            }
          />
        </ul>
        <div className='buttonLayout'>
        <div>
          <button className="detailBtn" onClick={calendarReturn}>
            Return to Calendar
          </button>
        </div>
        <div>
          <button className="detailBtn" onClick={handleDeleteEvent}>
            Event lame, plz remove
          </button>
        </div>
        <div>
          <button className="detailBtn" onClick={handleUpdateEvent}>
            Update Event
          </button>
        </div>
        </div>
      </div>
    </container>
  );
};
