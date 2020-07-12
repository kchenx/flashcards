import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import Homepage from "./Homepage";
import PageRegister from "./PageRegister";
import PageLogin from "./PageLogin";
import { Button, Nav, Navbar, Spinner } from "react-bootstrap";
import "./App.css";

import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

const App = (props) => {
  const { auth, profile, email, isLoggedIn, firebase } = props;

  if (!isLoaded(auth, profile)) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          {"🥇 "}
          Flashcards
        </Navbar.Brand>
        <Nav className="mr-auto">
          {isLoggedIn && (
            <Nav.Link as={Link} to="/editor">
              New Deck
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <>
              <Navbar.Text className="mr-3">{email}</Navbar.Text>
              <Button variant="outline-info" onClick={() => firebase.logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link variant="light" as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/editor">
          <CardEditor />
        </Route>
        <Route exact path="/viewer/:deckId">
          <CardViewer />
        </Route>
        <Route exact path="/register">
          <PageRegister />
        </Route>
        <Route exact path="/login">
          <PageLogin />
        </Route>
        <Route>
          <>Page not found</>
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(App);
