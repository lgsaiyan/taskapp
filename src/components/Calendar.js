import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const Calendar = ({ onInputChange, dueState }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const formatDate = moment(startDate).format('MMM D, YYYY')
    onInputChange(formatDate)
  }, [dueState]); 

  const update = (date) => {
    setStartDate(date)
    const formatDate = moment(date).format('MMM D, YYYY')
    onInputChange(formatDate);
  };
  
  return (
    <DatePicker selected={startDate} onChange={(date) => update(date)} />
  );
};

export default Calendar
