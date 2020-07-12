import React from "react";
import { Button, Form } from "react-bootstrap";

import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value, error: "" });

  handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      this.login();
    }
  };

  login = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      await this.props.firebase.login(credentials);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    const { email, password, error } = this.state;

    return (
      <div className="m-4">
        <div className="m-4">
          <h2>Login</h2>
          <h3>{error}</h3>
          <Form type="">
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
            <Button variant="light" onClick={this.login}>
              Login
            </Button>
          </Form>
        </div>
        <hr />
        <div className="m-4" style={{ textAlign: "center" }}>
          <p>Need an account?</p>
          <Button variant="light" as={Link} to="/register">
            Register
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({
  isLoggedIn: firebase.auth.uid,
});

export default compose(firebaseConnect(), connect(mapStateToProps))(PageLogin);
