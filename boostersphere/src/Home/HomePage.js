import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { Logout } from '../Logout/Logout';
import { userContext } from '../App';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Sidebar } from '../Sidebar/Sidebar';


import './HomePage.css'


export const HomePage = () => {
  const { userdata, thisuser, setThisuser, fulluserData } = useContext(userContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fakeEventData = [{title: 'Holiday Party', location:'Delta 96 Main Office'}, {title: 'BBQ Cook Out', location:'Front Yard'}]

  useEffect(() => {
    const getThisUserData = async () => {
      fulluserData.forEach((element) => {
        if (element.id === userdata.uid) {
          setThisuser(element);
        }
      });
    };
    if (fulluserData && userdata) getThisUserData();
  }, [fulluserData, userdata, setThisuser]);

  return (
    <>

      <div className="nav">
        {/* Add a button to toggle the drawer */}
        <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}><MenuRoundedIcon /></button>

        <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <List>
            <ListItem IconButton component={Link} to="/Home">
              <HomeRoundedIcon />
              <ListItemText primary="HOME" />
            </ListItem>
            <ListItem IconButton component={Link} to="/">
              <ShoppingCartRoundedIcon />
              <ListItemText primary="BUY A PRODUCT" />
            </ListItem>
            <ListItem IconButton component={Link} to="/">
              <AccountBoxRoundedIcon />
              <ListItemText primary="MY ACCOUNT" />
            </ListItem>
            <ListItem IconButton component={Link} to="/">
              <TextSnippetRoundedIcon />
              <ListItemText primary="MY ORDERS" />
            </ListItem>
            <ListItem IconButton component={Link} to="/">
              <CreditCardRoundedIcon />
              <ListItemText primary="MY CREDIT CARDS" />
            </ListItem>
          </List>
          <List>
            <ListItem IconButton component={Link} to="/">
              <HelpRoundedIcon />
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem IconButton component={Link} to="/">
              <CallRoundedIcon />
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Drawer>

        <div className='links'>
          <Link to='/Home' className='NavBar'>Home</Link>
          <Link to='/Events' className='NavBar'>Events</Link>
        </div>
        <Logout />
      </div>
      <div className='mainpage'>
        {!thisuser ? '' : <>
          <div>
            <h1>Users Delta Booster Club</h1>
            <h1>'Booster Club Name'</h1>
            <h2>What We Do</h2>
            <p>super cool booster club stuff</p>
          </div>
          <div>
            <img src="/static/media/DaMopester.bc28fcacec29f56e9984.jpg" alt='booster club image'></img>
          </div>
          <div className='event-container'>
            <h3>Upcoming Events!</h3>
            <ul className='event-list'>
              {fakeEventData.map(event => {
                return (
                  <li>
                    <h3>{event.title}</h3>
                    <p>{event.location}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        
        </>}

      </div>

    </>
  );
};

