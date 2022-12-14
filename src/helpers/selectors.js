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

export function getInterview(state, interview) {
  const result = {};

  if (interview === null) {
    return null;
  }

  for (const interviewerID in state.interviewers) {
    if (state.interviewers[interviewerID].id === interview.interviewer) {
      result.student = interview.student;
      result.interviewer = state.interviewers[interviewerID]
    }
  }

  return result;
}

export function getInterviewersForDay(state, day) {

  const dayInfo = state.days.filter(date => date.name === day);
  const result = [];

  if (!dayInfo[0]) {
    return result;
  }

  for (const interviewer of dayInfo[0].interviewers) {
    result.push(state.interviewers[interviewer])
  }

  return result;

}
