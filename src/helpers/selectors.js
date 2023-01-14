export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayInfo = state.days.filter(date => date.name === day);

  if (!dayInfo[0]) {
    return result;
  } else {
    for (const appointment of dayInfo[0].appointments) {
      result.push(state.appointments[appointment]);
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
