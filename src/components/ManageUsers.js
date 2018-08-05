import React from "react";

export default class ManageUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTerm: "",
      filteredUsers: this.props.users
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.filterUsers(this.state.filterTerm, nextProps.users);
    }
  }

  filterUsers(searchTerm, users = this.props.users) {
    let filteredUsers = users;

    if (searchTerm && users && users.length) {
      filteredUsers = filteredUsers.filter(u => {
        for (var key in u) {
          const val = "" + u[key];
          if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }

    this.setState({ filterTerm: searchTerm, filteredUsers: filteredUsers });
  }

  updateUser(e, user, attr) {
    let userUpdate = Object.assign({}, user);
    userUpdate[attr] = e.target.value;

    // TODO: only call this if the values differ
    this.props.updateUser(userUpdate);
  }

  deleteUser(user) {
    if (confirm("Are you sure you want to permanently delete this user?")) {
      this.props.deleteUser(user);
    }
  }

  render() {
    const filterUsers = this.filterUsers.bind(this);
    const updateUser = this.updateUser.bind(this);
    const deleteUser = this.deleteUser.bind(this);

    return (
      <div>
        <h2>Manage Users</h2>
        <input
          type="text"
          placeholder="Filter Term"
          onChange={e => filterUsers(e.target.value)}
        />

        {this.state.filteredUsers.length ? (
          <table className="scrolling">
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
              {this.state.filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.userName}</td>
                  <td>{u.email}</td>
                  {/*
                  // one approach to making the fields editable:
                  <td><input type="text" defaultValue={u.firstName} onBlur={function(e){ updateUser(e, u, 'firstName') }} /></td>
                  <td><input type="text" defaultValue={u.lastName} onBlur={function(e){ updateUser(e, u, 'lastName') }} /></td>
                  <td><input type="text" defaultValue={u.userName} onBlur={function(e){ updateUser(e, u, 'userName') }} /></td>
                  <td><input type="text" defaultValue={u.email} onBlur={function(e){ updateUser(e, u, 'email') }} /></td>
                  <td><a onClick={function(){ deleteUser(u) }}>[X]</a></td>
                  */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}
