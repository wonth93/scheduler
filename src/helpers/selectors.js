export function getAppointmentsForDay(state, day) {
  const arrayOfAppointment = [];
  const result = [];

  for (const singleDay of state.days) {
    if (singleDay.name === day) {
      for (const app of singleDay.appointments) {
        arrayOfAppointment.push(app);
      }
    }
  }

  if(arrayOfAppointment.length === 0) {
    return result;
  }

  for (const oneAppointment of arrayOfAppointment) {
    for (const singleApp in state.appointments) {
      if(oneAppointment === state.appointments[singleApp].id) {
        result.push(state.appointments[singleApp])
      }
    }
  }

  return result;

}