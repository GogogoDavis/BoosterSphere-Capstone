import "./Details.css";
import { useNavigate, useParams } from "react-router-dom";

export const Details = ({ item }) => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      body: JSON.stringify(item),
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

  console.log(item);

  return (
    <container>
  <div id='wrap'>
    <ul>
      <h1 style={{display: 'flex', justifyContent: 'center', color: 'salmon'}}>Details</h1>
      <li className='addWrap'>{item.id}</li>
      <li className='addWrap'>{item.title}</li>
      <li className='addWrap'>{item.description}</li>
      <li className='addWrap'>{item.start}</li>
      <li className='addWrap'>{item.end}</li>
      <li className='addWrap'>{item.fundRequired}</li>
      <li className='addWrap'>{item.volunteerNeeded}</li>
    </ul>
  </div>  
      <div id='btns'>
        <button className= 'detailBtn' onClick={calendarReturn}>Return to Calendar</button>
        <button className= 'detailBtn' onClick={handleDeleteEvent} style={{ marginLeft: "10px" }}>
          Event lame, plz remove
        </button>
        <button className='detailBtn' onClick={handleUpdateEvent} style={{ marginLeft: '10px' }}>
          Update Event
        </button>
      </div>
    </container>
  );
};
