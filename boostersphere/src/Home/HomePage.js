import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';
import {Link, useNavigate } from 'react-router-dom' ;
import { Sidebar } from '../Sidebar/Sidebar';
import './HomePage.css'
import mopey from '../DaMopester-nobackground.png'
import sd10 from '../Space_Delta_10_emblem.png'
import galaxy from '../galaxy.png'

export const HomePage = () => {
  const { userData } = useContext(userContext);
  const [dashboardEvents, setDashboardEvents] = useState([]);
  const [dashboardDonations, setDashboardDonations] = useState([]);
  const [dashboardFunds, setDashboardFunds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/events')
      .then(response => response.json())
      .then(data => setDashboardEvents(data.slice(0, 2)))
      .catch(error => console.error('Error fetching dashboard events:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/donations')
      .then(response => response.json())
      .then(data => setDashboardDonations(data.slice(0, 2)))
      .catch(error => console.error('Error fetching dashboard events:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/funds')
      .then(response => response.json())
      .then(data => setDashboardFunds(data.slice(0, 2)))
      .catch(error => console.error('Error fetching dashboard events:', error));
  }, []);

  const calculateProgress = (raised, target) => {
    return (raised / target) * 100;
  };

  return (
    <>
    <div className='Parent-Container'>
      <Sidebar />
      <div className='mainpage'>
          <div className='leftSideVisPage'>
            <h1 className='homePageTitle'>Delta 10 Booster Club</h1>
            <div>
                <img src={sd10} alt='booster club'></img>
              </div>
            <h2 className='homePageTitle'>Who We Are:</h2>
            <p>Delta 10 is the home of Doctrine, Tactics, Lessons Learned and Wargaming for
              the United States Space Force!
            </p>
            <h2 className='homePageTitle'>Our Values:</h2>
            <p>Delta 10 values Connection between Guardians, Families and Leaders.
              We created this Booster Club to better connect our teammates
              to one another!
            </p>
            <h2 className='homePageTitle'>How Can You Help:</h2>
            <p>Help Make this Organization better by Donating, Volunteering, or Hosting
              an event to build connections!
            </p>

            <div className='home_reg_links'>
              <Link to='/volunteers'>
                <button type='submit' className='homePageButtons'>Click to Volunteer</button>
              </Link>
              <Link to='/Register'>
                <button type='submit' className='homePageButtons'>Register for an Account</button>
              </Link>
                </div>
          </div>

          <div className='event-container'>
            <h2>Booster Dashboard</h2>

            <h3>Upcoming Events</h3>
              <ul className='event-list'>
                {dashboardEvents.map(event => (
                  <li key={event.title}>
                    <h3>{event.title}</h3>
                    <p>Date: {event.start.length >10 ? event.start.substr(0,10) : event.start}</p>
                    <p>Volunteer Needed: {event.volunteerNeeded}</p>
                  </li>
                ))}
              </ul>

            <h3>Recent Donations</h3>
            <h5>Thank you to:</h5>
            <ul className='event-list'>
                {dashboardDonations.map(donations => (
                  <li key={donations.name}>
                    <h3 style={{textAlign: 'center'}}>{donations.name}</h3>
                    <h3 style={{textAlign: 'center'}}>${donations.amount}</h3>
                  </li>
                ))}
              </ul>

              <h3>Current Fundraisers:</h3>
            <ul className='event-list'>
                {dashboardFunds.map(funds => (
                  <li key={funds.title}>
                    <h3 className='dashboardTitle' style={{textAlign: 'center'}}>{funds.title}</h3>
                    <p>Need: ${funds.amount}</p>
                    <p>Contributions: ${funds.currRaised}</p>
                    <div className='progress-bar-container'>
                      <div
                        className='progress-bar'
                        style={{
                          width: `${calculateProgress(
                            funds.currRaised,
                            funds.amount
                          )}%`,
                        }}
                        ></div>
                      </div>
                  </li>
                ))}
              </ul>
              <br></br>
              <div className='mopeyImg'>
                <img src={mopey} alt=''></img>
              </div>
              <div>
                <p>Contact fake@email.com to learn more about
                  how to help with Events, Dontate, or Fundraisers!
                </p>
              </div>
          </div>
      </div>
      </div>

      <div className='Landing_wrapper'>
      </div>
    </>
  );
};

