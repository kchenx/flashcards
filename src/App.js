import React from "react";
import { Route, Switch } from "react-router-dom";
import CardEditor from "./CardEditor";
import CardViewer from "./CardViewer";
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
      <Switch>
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
    );
  }
}

export default App;
