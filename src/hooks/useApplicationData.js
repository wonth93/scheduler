import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationdatas() {

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
  
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      });
  }, []);  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});

  function updateSpots(state, appointments, appointmentsId) {
    let changeSpot = 0;
    const beforeEdit = state.appointments[appointmentsId].interview;
    const afterEdit =appointments[appointmentsId].interview;

    if (beforeEdit === null && afterEdit !== null) {
      changeSpot = -1;
    } else if (beforeEdit !== null && afterEdit === null) {
      changeSpot = 1;
    }

    const update = state.days.map((day) => {
      if (day.appointments.includes(appointmentsId)) {
        return { ...day, spots: day.spots + changeSpot }
      }
      return day;
    });

    return update;

  }
  
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments, id);
    
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days});
      });
      
  }
  
  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        const days = updateSpots(state, appointments, id);
        setState({ ...state, appointments, days });
      });     
  }
  


  return { state, setDay, bookInterview, cancelInterview };

}
