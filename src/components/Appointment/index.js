import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


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

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        /> }
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CREATE &&
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
    </article>
  );
}
