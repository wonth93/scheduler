import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationdatas() {

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
        return { ...day, spots: day.spots + changeSpot }
    });

    return update;

  }
  
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments, id);
    
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { ...interview })
      .then(() => {
        setState({ ...state, appointments, days})
        console.log(state.days);
      });
      
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
        // const spots = updateSpots(state, state.day);
        setState({ ...state, appointments })
      });     
  }
  


  return { state, setDay, bookInterview, cancelInterview };

}
