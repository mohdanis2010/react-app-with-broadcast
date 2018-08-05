import React from "react";

import ManageUsersContainer from "./ManageUsersContainer";

// This component exists solely to create demonstrable hierarchical "depth" between the top-level app and container levels
// - it also demonstrates that parent components won't stop updates in their children components (via "shouldComponentUpdate")
export default class ManageUsersOuter extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <ManageUsersContainer />;
  }
}
