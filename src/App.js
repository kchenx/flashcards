import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import Homepage from "./Homepage";
import PageRegister from "./PageRegister";
import PageLogin from "./PageLogin";
import { Button, Nav, Navbar } from "react-bootstrap";
import "./App.css";

import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

const App = (props) => {
  const { auth, profile, username, isLoggedIn, firebase } = props;

  const rightNavContent = isLoggedIn ? (
    <>
      <Navbar.Text className="mr-3">{username}</Navbar.Text>
      <Button
        variant="outline-info"
        onClick={() => firebase.logout()}
        as={Link}
        to="/"
      >
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
  );

  const rightNav = isLoaded(auth, profile) ? rightNavContent : <></>;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          {"🥇 "}
          Flashcards
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/editor">
            New Deck
          </Nav.Link>
        </Nav>
        <Nav>{rightNav}</Nav>
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
          <div className="m-4">Page not found</div>
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = ({ firebase }) => ({
  auth: firebase.auth,
  profile: firebase.profile,
  username: firebase.profile.username,
  isLoggedIn: firebase.auth.uid,
});

export default compose(firebaseConnect(), connect(mapStateToProps))(App);
