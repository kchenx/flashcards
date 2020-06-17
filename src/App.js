import React from "react";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
import Homepage from "./Homepage";

import { Link, Route, Switch } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  addCard = (card) => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = (index) => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">
            {"🥇 "}
            Flashcards
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/viewer">
              Viewer
            </Nav.Link>
            <Nav.Link as={Link} to="/editor">
              Editor
            </Nav.Link>
          </Nav>
        </Navbar>
        <body className="pt-4">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/editor">
              <CardEditor
                addCard={this.addCard}
                cards={this.state.cards}
                deleteCard={this.deleteCard}
              />
            </Route>
            <Route exact path="/viewer">
              <CardViewer cards={this.state.cards} />
            </Route>
          </Switch>
        </body>
      </>
    );
  }
}

export default App;
