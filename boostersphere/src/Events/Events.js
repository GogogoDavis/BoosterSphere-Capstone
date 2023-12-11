import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, DateRangeCalendar, DatePicker } from '@mui/x-date-pickers-pro';
import { AddEvents } from './AddEvent.js';
import './Events.css';
import { Routes, Route, Navigate } from 'react-router-dom';

  export const Events = () => {


  return (
    <Routes> 
      <Route path='/Events' element={<AddEvents />} /> 
    </Routes>
  );
};

