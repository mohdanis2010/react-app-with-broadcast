import React from "react";
import { render } from "react-dom";

import { Broadcast } from "react-broadcast";

import { UserService } from "../services/UserService";
import { StatusService } from "../services/StatusService";

import Header from "./components/Header";
import Statuses from "./components/Statuses";
import CreateUser from "./components/CreateUser";
import ManageUsersOuter from "./components/ManageUsersOuter";

class App extends React.Component {
  constructor(props) {
    super(props);

    // 1) both the data and actions SHOULD* be included in the store
    //    - this allows every store access to the actions of the others
    //    * you could do this in various other ways, like by passing in stores as an additional parameter to call()
    // 2) the benefit of separating actions from data is that it makes it much easier to update values
    //    - otherwise, you have to replace a nested object/array every time you update (cumbersome & arguably more error-prone)
    //    - this is really a preference thing
    this.state = {
      statuses: {},
      statusService: StatusService.call(this),
      users: [],
      userService: UserService.call(this)
    };
  }

  componentDidMount() {
    this.state.userService.get();
  }

  render() {
    return (
      <Broadcast channel="users" value={this.state.users}>
        <div className="container">
          <div className="row">
            <div className="column">
              <Header />
            </div>
            <div className="column statusContainer">
              <Statuses statuses={this.state.statuses} />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <CreateUser
                addUser={this.state.userService.add}
                statusService={this.state.statusService}
              />
            </div>
            <div className="column column-67">
              {/* This is an arbitrary wrapper to demo injected state */}
              <ManageUsersOuter />
            </div>
          </div>
        </div>
      </Broadcast>
    );
  }
}

render(<App />, document.getElementById("root"));
