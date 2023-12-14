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

  const calendarReturn = () => {
    navigate(`/events`);
  };

  console.log(item);

  return (
    <>
      <h1>Details</h1>
      <p>{item.id}</p>
      <p>{item.title}</p>
      <p>{item.description}</p>
      <p className="back" onClick={() => window.history.back()}>
        Back
      </p>
      <div>
        <button onClick={calendarReturn}>Return to Calendar</button>
        <button onClick={handleDeleteEvent} style={{ marginLeft: "10px" }}>
          Event lame, plz remove
        </button>
      </div>
    </>
  );
};
