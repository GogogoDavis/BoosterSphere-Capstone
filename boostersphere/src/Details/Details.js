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
            placeholder={item.type}
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
            placeholderText={item.start}
            showTimeSelect
            style={{ marginRight: "10px" }}
            selected={editDetails.start}
            onChange={(start) => setEditDetails({ ...editDetails, start })}
          />

          <DatePicker
            className="addWrap"
            placeholderText={item.end}
            showTimeSelect
            style={{ marginRight: "10px" }}
            selected={editDetails.end}
            onChange={(end) => setEditDetails({ ...editDetails, end })}
          />

          <input
            className="addWrap"
            type="integer"
            placeholder={item.fundRequired}
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
