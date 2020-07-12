import React from "react";
import { Button, Form } from "react-bootstrap";

import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value, error: "" });

  handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      this.register();
    }
  };

  register = async () => {
    this.setState({ username: this.state.username.trim() });

    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    const profile = {
      email: this.state.email,
      username: this.state.username,
    };

    try {
      await this.props.firebase.createUser(credentials, profile);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const { email, password, username, error } = this.state;

    return (
      <div className="m-4">
        <h2>Register</h2>
        <h3>{error}</h3>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="username"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyEnter}
              placeholder="Name"
              type="email"
              value={username}
            />
            <Form.Text className="text-muted">
              This is how others will see you on the site.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyEnter}
              placeholder="Email"
              type="email"
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyEnter}
              placeholder="Password"
              type="password"
              value={password}
            />
          </Form.Group>
          <Button
            variant="light"
            onClick={this.register}
            disabled={!username.trim()}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({
  isLoggedIn: firebase.auth.uid,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(PageRegister);
