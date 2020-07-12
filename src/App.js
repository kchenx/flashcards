import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import Homepage from "./Homepage";

import { Link, Route, Switch } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import "./App.css";

const App = () => {
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
      </Navbar>
      <div className="pt-4">
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
          <Route>
            <>Page not found</>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
