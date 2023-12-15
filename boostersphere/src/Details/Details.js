import { useEffect, useState } from "react";
import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";

export const Details = ({ item }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

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
      body: JSON.stringify(editedItem), // Sending the edited data as JSON to the server
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

  console.log(item);

  return (
    <container>
  <div id='wrap'>

    <form style={{display: 'flex', justifyContent: 'center', color: 'salmon'}}>
      <label>Event ID 
      <input className='addwrap' type="text" name="id" value={editedItem.id || ""} readOnly ></input>
      </label>
      <label>Title:  
      <input className='addwrap' type="text" name="title" value={editedItem.title || ""} onChange={handleInputChange} ></input>
      </label>
      <label>Description:  
      <input className='addwrap' type="text" name="description" value={editedItem.description || ""} onChange={handleInputChange} ></input>
      </label>
      <label>Start:  
      <input className='addwrap' type="text" name="start" value={editedItem.start || ""} onChange={handleInputChange} ></input>
      </label>
      <label>
      <input className='addwrap' type="text" name="end" value={editedItem.end || ""} onChange={handleInputChange} ></input>
      </label>
      <label>Funds Required:  
      <input className='addwrap' type="text" name="fundRequired" value={editedItem.fundRequired || ""} onChange={handleInputChange} ></input>
      </label>
      <label>Volunteers Needed: 
      <input className='addwrap' type="text" name="volunteers" value={editedItem.volunteerNeeded || ""} onChange={handleInputChange} ></input>
      </label>
    </form>
    {/* <ul>
      <h1 style={{display: 'flex', justifyContent: 'center', color: 'salmon'}}>Details</h1>
      <li className='addWrap'>{item.id}</li>
      <li className='addWrap'>{item.title}</li>
      <li className='addWrap'>{item.description}</li>
      <li className='addWrap'>{item.start}</li>
      <li className='addWrap'>{item.end}</li>
      <li className='addWrap'>{item.fundRequired}</li>
      <li className='addWrap'>{item.volunteerNeeded}</li>
    </ul> */}
  </div>  
      <div id='btns'>
        <button className= 'detailBtn' onClick={calendarReturn}>Return to Calendar</button>
        <button className= 'detailBtn' onClick={handleDeleteEvent} style={{ marginLeft: "10px" }}>
          Event lame, plz remove
        </button> 
      </div>
        <div style={{margin: '10px'}}> <button className='detailBtn' onClick={handleUpdateEvent} style={{ marginLeft: '10px' }}>
          Update Event
        </button> </div>
    
    </container>
  );
};
