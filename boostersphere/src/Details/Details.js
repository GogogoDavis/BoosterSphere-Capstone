import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, {useState} from 'react';
import mopey from '../DaMopester-nobackground.png'
import { Sidebar } from '../Sidebar/Sidebar';
import './Details.css'


export const Details = ({ item }) => {
  const { id } = useParams();
  const { title, type, description, start, end, fundRequired, volunteerNeeded, userId } = item;
  const navigate = useNavigate();
  const [editDetails, setEditDetails] = useState({
    id: id,
    title: title,
    type: type,
    description: description,
    start: new Date(start),
    end: new Date(end),
    fundRequired: fundRequired,
    volunteerNeeded: volunteerNeeded,
    userId: userId,
  })



  async function handleDeleteEvent() {
    // Fetch to sevrver but it is not getting the request
    await fetch(`http://localhost:8080/events/${id}`, {
      method: "DELETE",
    }).then(x => setTimeout(() => { navigate(`/events`) }, 50));
  }

  const handleUpdateEvent = () => {

    fetch(`http://localhost:8080/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: editDetails.title == "" ? item.title : editDetails.title,
        type: editDetails.type == "" ? item.type : editDetails.type,
        description: editDetails.description == "" ? item.description : editDetails.description,
        start: editDetails.start,
        end: editDetails.end,
        fundRequired: editDetails.fundRequired == undefined ? item.fundRequired : (editDetails.fundRequired),
        volunteerNeeded: editDetails.volunteerNeeded == undefined ? item.volunteerNeeded : editDetails.volunteerNeeded,
        userId: editDetails.userId == undefined ? item.userId : editDetails.userId,
      })
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

  // console.log('This be', editDetails.funds)

  const calendarReturn = () => {
    navigate(`/events`);
  };

  // console.log(item);
  // console.log(editDetails);

  return (
    <>


    <div className='details_parent_container'>
     <div className="details_sidebar">
    <Sidebar/>
    </div>
    <div className='detailMopey'>
      <img src={mopey} alt=''></img>
      </div>
      <div  id="wrap">
        <h1 id="DetailTitle"> Event Details</h1>

         <div className="Detail_LabelInput_Container">


          <div className="detail_div"><label className="DetailsEvent_label">Event ID: </label></div>

          <div className="DetailsInput_Field">
            <input
            className="detail_value"
            value= {editDetails.id}
            readOnly
            />
          </div>
          </div>



          <div className="Detail_LabelInput_Container">

            <div className="detail_div"><label  className="DetailsEvent_label">Event Title: </label></div>

            <div className="DetailsInput_Field">
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

          <div className="Detail_LabelInput_Container">

            <div className="detail_div"><label className="DetailsEvent_label">Party Type: </label></div>

            <div className="DetailsInput_Field">
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

          <div className="Detail_LabelInput_Container">

            <div className="detail_div"><label className="DetailsEvent_label">Event Details: </label></div>

            <div className="DetailsInput_Field">
              <textarea
                role="textbox"
                contentEditable
                id="details_description"
                className="detail_value autoWidthTextarea"
                type= "text"
                placeholder={item.description}
                value={editDetails.description}
                // style={{width: '100%', height:'100%'}}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="Detail_LabelInput_Container">

          <div className="detail_div"><label className="DetailsEvent_label">Start Date: </label></div>

          <div className="DetailsInput_Field">
            <DatePicker
              className="detail_value"
              placeholderText={item.start}
              showTimeSelect
              style={{ marginRight: "10px" }}
              selected={editDetails.start}
              value= {editDetails.start}
              onChange={(start) => setEditDetails({ ...editDetails, start })}
            />
          </div>
      </div>

      <div className="Detail_LabelInput_Container">

          <div className="detail_div"><label className="DetailsEvent_label">End Date: </label></div>

          <div className="DetailsInput_Field">
            <DatePicker
              className="detail_value"
              placeholderText={item.end}
              showTimeSelect
              style={{ marginRight: "10px" }}
              selected={editDetails.end}
              value= {editDetails.end}
              onChange={(end) => setEditDetails({ ...editDetails, end })}
            />
          </div>
      </div>

      <div className="Detail_LabelInput_Container">

            <div className="detail_div"><label className="DetailsEvent_label">Funds Required: </label></div>

            <div className="DetailsInput_Field">
              <input
                className="detail_value"
                type="integer"
                placeholder={item.fundRequired}
                // defaultValue={item.fundRequired}
                value={editDetails.fundRequired}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, fundRequired: e.target.value })
                }
              />
            </div>
          </div>

          <div className="Detail_LabelInput_Container">

            <div className="detail_div"><label className="DetailsEvent_label">Volunteers Needed:</label></div>

            <div className="DetailsInput_Field">
              <input
                className="detail_value"
                type="integer"
                placeholder={item.volunteerNeeded}
                // defaultValue={item.volunteerNeeded}
                value={editDetails.volunteerNeeded}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    volunteerNeeded: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="Detail_LabelInput_Container">

            <div className="detail_div"><label className="DetailsEvent_label">User ID: </label></div>

            <div className="DetailsInput_Field">
              <input
                className="detail_value"
                type="integer"
                placeholder= {item.userId}
                // defaultValue={item.userId}
                value= {editDetails.userId}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, userId: e.target.value })
                }
              />
            </div>

          </div>
          </div>

        <div className='DetailButton_Layout'>
          <button className="DetailButton" onClick={calendarReturn}>
            Return to Calendar
          </button>
          <button className="DetailButton" onClick={handleDeleteEvent}>
            Remove Event
          </button>
          <button className="DetailButton" onClick={handleUpdateEvent}>
            Update Event
          </button>
        </div>
      </div>
      <div className='detail_wrapper'>
      </div>
      <div className='detail_wrapper2'>
      </div>

    </>
  );
};
