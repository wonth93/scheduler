import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationdatas() {

  function updateSpots(state, day) {
    const dayInfo = state.days.filter(date => date.name === day);
    let spots = 0;

    dayInfo[0].appointments.forEach(appointment => {
      if(!state.appointments[appointment].interview) {
        spots ++;
      }
    })

    return spots;

  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 0
  });
  
  const setDay = day => setState({...state, day});
  
  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spots = updateSpots(state, state.day);
  
    
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      // .then(() => setState({ ...state, appointments, spots }));
      .then(() => {
        setState({ ...state, appointments, spots })
      });
      
      console.log(spots)
  }
  
  function cancelInterview(id) {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        const spots = updateSpots(state, state.day);
        setState({ ...state, appointment, spots })
      });     
  }
  
  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;
  
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
      .then((all) => {
        // setDays(response.data)
        // console.log(all[2].data)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };

}
