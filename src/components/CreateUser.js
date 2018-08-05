import React from "react";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.user = {};
    this.statusIds = [];
  }

  validateUser(user) {
    // REQUIREMENTS (* = required):
    // * First Name – 100long (DB constraint)
    // Last Name – 100long (DB constraint)
    // * Username – between 5 and 25 characters - Can only be letters or numbers
    // * Email – 100long (DB constraint)–  has to be a valid email (email format that is ???@???.???)

    const isAlphanumeric = str => {
      const lettersAndNumbers = /^[0-9a-zA-Z]+$/;
      // casting this as a string works here, but this could obviously have unintented effects if used elsewhere
      str = String(str);

      if (str.match(lettersAndNumbers)) {
        return true;
      }
      return false;
    };

    const isValidFirst = () => {
      if (!user.firstName) {
        errorMessages.push("First name is required.");
        return false;
      } else if (user.firstName.length > 100) {
        errorMessages.push("First name must be 50 characters or fewer.");
        return false;
      }
      return true;
    };

    const isValidLast = () => {
      if (user.lastName && user.lastName.length > 100) {
        errorMessages.push("Last name must be 50 characters or fewer.");
        return false;
      }
      return true;
    };

    const isValidUsername = () => {
      if (!user.userName) {
        errorMessages.push("Username is required.");
        return false;
      } else if (user.userName.length < 5 || user.userName.length > 25) {
        errorMessages.push("Username must be 5-25 characters.");
        return false;
      } else if (!isAlphanumeric(user.userName)) {
        errorMessages.push(
          "Username must be comprised solely of letters and numbers."
        );
        return false;
      }
      return true;
    };

    const isValidEmail = () => {
      const validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };

      if (!user.email) {
        errorMessages.push("Email is required.");
        return false;
      } else if (user.email.length > 100) {
        errorMessages.push("Email must be 100 characters or fewer.");
        return false;
      } else if (!validateEmail(user.email)) {
        errorMessages.push("Email must be valid email format.");
        return false;
      }

      return true;
    };

    let errorMessages = [];

    if (
      isValidFirst() &&
      isValidLast() &&
      isValidUsername() &&
      isValidEmail()
    ) {
      return { passed: true };
    }

    return {
      passed: false,
      error: errorMessages.join(" ")
    };
  }

  addUser(e) {
    e.preventDefault();

    const validation = this.validateUser(this.user);
    const statusService = this.props.statusService;
    const statusIds = this.statusIds;

    // cleanup any previous errors
    statusIds.forEach(function(id) {
      statusService.delete(id);
    });

    if (validation.passed) {
      this.props.addUser(Object.assign({}, this.user));
      this.clearUser();
    } else {
      const id = Math.random();
      statusIds.push(id);
      statusService.add(id, "Error(s) adding user: " + validation.error, true);
    }
  }

  clearUser() {
    this.firstName.value = "";
    this.lastName.value = "";
    this.userName.value = "";
    this.email.value = "";

    this.user = {};
  }

  render() {
    return (
      <div className="widget-box">
        <h2>Create User</h2>
        <form onSubmit={e => this.addUser(e)}>
          <input
            type="text"
            placeholder="First Name *"
            ref={el => (this.firstName = el)}
            onChange={e => (this.user.firstName = e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            ref={el => (this.lastName = el)}
            onChange={e => (this.user.lastName = e.target.value)}
          />
          <input
            type="text"
            placeholder="Username *"
            ref={el => (this.userName = el)}
            onChange={e => (this.user.userName = e.target.value)}
          />
          <input
            type="email"
            placeholder="Email *"
            ref={el => (this.email = el)}
            onChange={e => (this.user.email = e.target.value)}
          />

          <button>Save</button>
        </form>
      </div>
    );
  }
}
