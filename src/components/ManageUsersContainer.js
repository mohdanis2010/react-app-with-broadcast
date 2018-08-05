import React from "react";
import { Subscriber } from "react-broadcast";

import ManageUsers from "./ManageUsers";

// Subscriber can be injected at any hierarchy depth to listen to broadcast events
export default class ManageUsersContainer extends React.Component {
  render() {
    return (
      <Subscriber channel="users">
        {users => <ManageUsers users={users} />}
      </Subscriber>
    );
  }
}
