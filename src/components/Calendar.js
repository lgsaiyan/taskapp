import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const Calendar = ({ onInputChange, dueState }) => {
  const [startDate, setStartDate] = useState(new Date());

  // Initial reading of date to [due date state] in Create
  useEffect(() => {
    const formatDate = moment(startDate).format('MMM D, YYYY')
    onInputChange(formatDate)
  }, [dueState]); //only updates at init and every time [due date state] in Create gets updated (e.g., when we reset values)

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
