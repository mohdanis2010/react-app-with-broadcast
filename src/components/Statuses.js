import React from "react";

export default class Statuses extends React.Component {
  render() {
    const statuses = this.props.statuses;
    const statusKeys = Object.keys(statuses);
    let toReturn = null;

    if (statusKeys.length) {
      toReturn = (
        <ul className="statuses">
          {statusKeys.map(id => (
            <li key={id} className={statuses[id].fadeout ? "fadeOut" : null}>
              {statuses[id].text}
            </li>
          ))}
        </ul>
      );
    }

    return toReturn;
  }
}
