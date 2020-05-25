import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import FormDialog from '../Components/FormDialog';
import { Button } from '@material-ui/core';
import Cookies from 'js-cookie';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function MyCalendar(props) {
  const [events, setEvents]  = useState([]);
  const [activeEvent, setActiveEvent] = useState({});
  const [preview, setPreview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingRoom, setBookingRoom] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const name = Cookies.get('name');
  const avatar = Cookies.get('avatar');

  const handleSlotSelect = ({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
    setModalOpen(true);

  }
  const handleSubmit = () => {
    let evt = {
      name: bookingRoom,
      start: startDate,
      end: endDate,
      booked_by: {
        name: name,
        avatar: avatar
      }
    }
    
    setEvents([...events, evt]);
    setBookingRoom('');
    setPreview(false);
    setStartDate(new Date());
    setEndDate(new Date());
    setModalOpen(false);
    setActiveEvent({});
  }

  const handleClose = () => {
    setModalOpen(false);
    setPreview(false);
    setActiveEvent({});
  }

  const handleEventClick = (event) => {
    console.log(event);
    setPreview(true);
    setActiveEvent(event);
    setModalOpen(true);
  }

  return(
    <div>
      <Button variant="outlined" color="primary" onClick={() => setModalOpen(true)}>
        Make a booking
      </Button>
      <Calendar
        selectable
        defaultView={Views.WEEK}
        localizer={localizer}
        events={events}
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleSlotSelect}
      />
      <FormDialog 
        open={modalOpen} 
        onSubmitModal={handleSubmit}
        onCloseModal={handleClose}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        bookingRoom={bookingRoom}
        onBookingRoomChange={setBookingRoom}
        evt={activeEvent}
        preview={preview}
      />
    </div>

  )
}
  

export default MyCalendar;