import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  const dayListItemName = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayListItemName} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 

      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}

      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}

      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}

    </li>
  );

}
