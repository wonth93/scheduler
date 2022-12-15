import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(props.interview? SHOW : EMPTY);

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING);

    Promise.all([props.bookInterview(props.id, interview)])
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
      });

  }

  const cancel = function() {
    transition(DELETING);
    Promise.all([props.cancelInterview(props.id)])
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        /> }
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && 
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={cancel}
        />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CREATE &&
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
    </article>
  );
}
