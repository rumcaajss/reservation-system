import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import {  
  format, 
  parse, 
  startOfWeek, 
  getDay, 
  setHours, 
  setMinutes, 
  isBefore,
  sub
} from 'date-fns';

import FormDialog from '../Components/FormDialog';
import EventComponent from '../Components/EventComponent';
import LastPerson from '../Components/LastPerson';
import { 
  Button, 
  Container, 
  Box,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import Cookies from 'js-cookie';
import { firestore } from '../firebase'

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
  const EXAMS_COLLECTION = 'exams';
  const { setSnackBarOpen, setSnackMessage, setBackdropOpen } = props;
  const scrollToTime = setMinutes(setHours(new Date(), 6), 0)
  const [events, setEvents]  = useState({});
  const [activeEvent, setActiveEvent] = useState({});
  const [preview, setPreview] = useState(false);
  const [lastPersonModalOpen, setLastPersonModalOpen] = useState(false);
  const [lastPerson, setLastPerson] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingRoom, setBookingRoom] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomNeeded, setRoomNeeded] = useState(false);
  const [cameraNeeded, setCameraNeeded] = useState(false);
  const name = Cookies.get('name');
  const avatar = Cookies.get('avatar');

  const handleSlotSelect = ({ start, end }) => {
    if (isBefore(start, new Date())) {
      setSnackBarOpen(true);
      setSnackMessage('Please select a future date :)');
      return;
    }
    setStartDate(start);
    setEndDate(end);
    setModalOpen(true);

  }

  const handleSubmit = async (examId) => {
    let evt = {
      title: name,
      room: bookingRoom,
      start: startDate,
      end: endDate,
      camera_needed: cameraNeeded,
      room_needed: roomNeeded,
      booked_by: {
        name: name,
        avatar: avatar
      }
    }

    if (examId) {
      updateExam(examId, evt);
    } else {
      createExam(evt);
    }
    resetState();
    setModalOpen(false);
  }
  
  const handleClose = () => {
    setModalOpen(false);
    resetState();
  }
  
  const getCamera = async () => {
    setBackdropOpen(true);
    try {
      let obj = {};
      const querySnapshot = await firestore.collection(EXAMS_COLLECTION)
        .where('camera_needed', '==', true)
        .where('start', '<', new Date() )
        .orderBy('start', 'desc')
        .limit(1)
        .get();
      querySnapshot.forEach(function(doc) {
        let exam = {...doc.data()};
        let lastPerson = {};
        lastPerson.name = exam.booked_by.name;
        lastPerson.avatar = exam.booked_by.avatar;
        setLastPerson(lastPerson);
        setLastPersonModalOpen(true);
      });
    } catch(e) {
      console.log(e)
      setSnackBarOpen(true);
      setSnackMessage('Unable to localize person');
    }
    setBackdropOpen(false);
  }

  const updateExam = async (id, data) => {
    setBackdropOpen(true);
    try {
      await firestore.collection(EXAMS_COLLECTION).doc(id).set(data);
      let evtCopy = {...events};
      for (let param in data) {
        evtCopy[id][param] = data[param];
      }
      setEvents({...evtCopy});
      setSnackBarOpen(true);
      setSnackMessage('Event has been updated!');
    } catch(e) {
      setSnackBarOpen(true);
      setSnackMessage('Something went wrong. Please try again.');
    }
    setBackdropOpen(false);
  }

  const createExam = async (exam) => {
    setBackdropOpen(true);
    try {
      const docRef = await firestore.collection(EXAMS_COLLECTION).add(exam);
      setSnackBarOpen(true);
      setSnackMessage('Event succesfully created!');
      let id = docRef.id;
      let newEvt = {};
      exam._id = id;
      newEvt[id] = exam;
      setEvents({...events, ...newEvt});
    } catch(e) {
      setSnackBarOpen(true);
      setSnackMessage('Something went wrong. Please try again.');
    }
    setBackdropOpen(false);
  }

  const removeExam = async (id) => {
    setBackdropOpen(true);
    try {
      await firestore.collection(EXAMS_COLLECTION).doc(id).delete();
      let evtCopy = {...events};
      delete evtCopy[id];
      setEvents({...evtCopy});
      setSnackBarOpen(true);
      setSnackMessage('Event succesfully removed!');
    } catch(e) {
      setSnackBarOpen(true);
      setSnackMessage('Something went wrong. Please try again.');
    }
    
    setBackdropOpen(false);
    setModalOpen(false);
    resetState();
  }

  const resetState = () => {
    setBookingRoom('');
    setPreview(false);
    setStartDate(new Date());
    setEndDate(new Date());
    setCameraNeeded(false);
    setRoomNeeded(false);
    setActiveEvent({});
  }

  const handleEventClick = (event) => {
    setPreview(true);
    setActiveEvent(event);
    setBookingRoom(event.room);
    setStartDate(event.start);
    setEndDate(event.end);
    setRoomNeeded(event.room_needed);
    setCameraNeeded(event.camera_needed);
    setModalOpen(true);
  }

  const readData = async () => {
    const defaultDate = sub(new Date(), {
      months: 1,
    })
    setBackdropOpen(true);
    try {
      let obj = {};
      const querySnapshot = await firestore.collection(EXAMS_COLLECTION).where('start', '>=', defaultDate ).get();
      querySnapshot.forEach(function(doc) {
        let exam = {...doc.data()};
        let examId = doc.id;
        exam.start = exam.start.toDate();
        exam.end = exam.end.toDate();
        exam._id = examId;
        obj[examId] = exam;
      });
      setEvents({...obj});
    } catch(e) {
      setSnackBarOpen(true);
      setSnackMessage('Unable to connect to database.');
    }
    setBackdropOpen(false);
  }

  useEffect(() => {
    readData();
  }, [])

  return(
    <div>
      <Container
        maxWidth="lg"
        > 
        <Box
          display="flex"
          justifyContent="flex-end"
          m={3}
        >
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            <AddIcon />
            Make a booking
          </Button>
          <Button variant="outlined" color="primary" onClick={readData}>
            <RefreshIcon />
            Refresh events
          </Button>
          <Button variant="outlined" color="primary" onClick={getCamera}>
            <PersonPinIcon />
            Who has a camera?
          </Button>
        </Box>
        <Calendar
          selectable
          components={{event: EventComponent}}
          defaultView={Views.WEEK}
          localizer={localizer}
          events={Object.values(events)}
          style={{ height: 650 }}
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSlotSelect}
          scrollToTime={scrollToTime}
        />
        <FormDialog 
          open={modalOpen} 
          onSubmitModal={handleSubmit}
          onCloseModal={handleClose}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          bookingRoom={bookingRoom}
          setBookingRoom={setBookingRoom}
          cameraNeeded={cameraNeeded}
          setCameraNeeded={setCameraNeeded}
          roomNeeded={roomNeeded}
          setRoomNeeded={setRoomNeeded}
          onRemoveEvent={removeExam}
          evt={activeEvent}
          preview={preview}
        />
      </Container>
      <LastPerson 
        open={lastPersonModalOpen}
        setOpen={setLastPersonModalOpen}
        person={lastPerson}
      />
    </div>

  )
}
  

export default MyCalendar;