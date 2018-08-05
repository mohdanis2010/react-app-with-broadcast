import data from "../mockdata/users.js";

export function UserService() {
  const that = this;
  let svc = {};

  svc.get = function() {
    const newStatusId = Math.random();
    that.state.statusService.add(newStatusId, "Getting users");

    // what a fetch request might look like:
    // return fetch("/roles/administrators/users", {
    //   method: "GET"
    // })
    //   .then(response => response.json())
    //   .then(handleErrors)
    //   .then(
    //     data => {
    //       that.setState({
    //         users: data.items.map(u => {
    //           return u.data;
    //         })
    //       });
    //       that.state.statusService.delete(newStatusId);
    //     },
    //     error => {
    //       that.state.statusService.edit(newStatusId, error);
    //     }
    //   );

    // what an async mocked data version looks like:
    setTimeout(function() {
      that.setState({
        users: data.items.map(u => {
          return u;
        })
      });

      that.state.statusService.delete(newStatusId);
    }, 1500);
  };

  svc.add = function(user) {
    const newStatusId = Math.random();
    that.state.statusService.add(newStatusId, "Adding user: " + user.firstName);

    // what a fetch request might look like:
    // return fetch("users/super", {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify({
    //     FirstName: user.firstName,
    //     LastName: user.lastName,
    //     UserName: user.userName,
    //     Email: user.email
    //   })
    // })
    //   .then(response => response.json())
    //   .then(handleErrors)
    //   .then(
    //     u => {
    //       const newUsers = that.state.users.slice();
    //       newUsers.push(u);
    //       that.setState({ users: newUsers });

    //       that.state.statusService.delete(newStatusId, true);
    //     },
    //     error => {
    //       alert(error);
    //       that.state.statusService.edit(newStatusId, error, true);
    //     }
    //   );

    // what an async mocked data version looks like:
    setTimeout(function() {
      const newUsers = that.state.users.slice();
      user.id = Math.floor(Math.random() * 20000);
      newUsers.push(user);
      that.setState({ users: newUsers });

      that.state.statusService.delete(newStatusId, true);
    }, 1000);
  };

  svc.delete = function(userId) {
    // delete logic here
  };

  svc.edit = function(user) {
    // edit logic here
  };

  return svc;
}

// utility function for handling promise errors
function handleErrors(json) {
  if (json.status >= 400) {
    let errorMessage =
      json.error && json.error.message
        ? json.error.message
        : "There was an error.";
    return Promise.reject(errorMessage);
  } else {
    return json;
  }
}
