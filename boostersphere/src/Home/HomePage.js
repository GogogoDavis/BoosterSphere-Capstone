import React, { useContext } from 'react';
import { userContext } from '../App';
import { Sidebar } from '../Sidebar/Sidebar';
import './HomePage.css'

export const HomePage = () => {
  const { userData } = useContext(userContext);
  const fakeEventData = [{title: 'Holiday Party', location:'Delta 96 Main Office'}, {title: 'BBQ Cook Out', location:'Front Yard'}]

  return (
    <>
    <div className='Parent-Container'>
      <Sidebar />
      <div className='mainpage'>
        {!userData ? '' : <>
          <div>
            <h1>Users Delta Booster Club</h1>
            <h1>'Booster Club Name'</h1>
            <h2>What We Do</h2>
            <p>super cool booster club stuff</p>
          </div>
          <div>
            <img src="/static/media/DaMopester.bc28fcacec29f56e9984.jpg" alt='booster club'></img>
          </div>
          <div className='event-container'>
            <h3>Upcoming Events!</h3>
            <ul className='event-list'>
              {fakeEventData.map(event => {
                return (
                  <li key={event.title}>
                    <h3>{event.title}</h3>
                    <p>{event.location}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </>}
      </div>
      </div>
    </>
  );
};

