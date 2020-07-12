import React from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import "./CardEditor.css";

import { Link, withRouter, Redirect } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      name: "",
      front: "",
      back: "",
      isPublic: false,
    };
  }

  addCard = () => {
    const front = this.state.front.trim();
    const back = this.state.back.trim();
    if (front && back) {
      const newCard = { front: this.state.front, back: this.state.back };
      const cards = this.state.cards.slice().concat(newCard);
      this.setState({ cards, front: "", back: "" });
    } else {
      this.setState({ front, back });
    }
    this.focus();
  };

  deleteCard = (index) => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  createDeck = () => {
    const { cards, name, isPublic } = this.state;
    const { uid, firebase, history } = this.props;
    const deckId = firebase.push("/flashcards").key;
    const updates = {};
    updates[`/flashcards/${deckId}`] = { cards, name, isPublic, owner: uid };
    updates[`/homepage/${deckId}`] = { name, isPublic, owner: uid };
    const onComplete = () => history.push(`/viewer/${deckId}`);
    firebase.update("/", updates, onComplete);
  };

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleCheckboxChange = (event) =>
    this.setState({ isPublic: event.target.checked });

  handleCardEnter = (event) => {
    if (event.key === "Enter") {
      this.addCard();
    }
  };

  handleDeckEnter = (event) => {
    if (event.key === "Enter") {
      this.createDeck();
    }
  };

  focus = () => {
    this.frontInput.focus();
  };

  render() {
    if (!this.props.uid) {
      return <Redirect to="/login" />;
    }

    const { cards, name, front, back } = this.state;

    const cardRows = this.state.cards.map((card, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{card.front}</td>
        <td>{card.back}</td>
        <td>
          <Button variant="light" onClick={() => this.deleteCard(index)}>
            X
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className="editor">
        <h2>Card Editor {"👨‍💻"}</h2>
        <Table>
          <thead>
            <tr>
              <th>Card</th>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cardRows}</tbody>
        </Table>
        <Form>
          <InputGroup>
            <Form.Control
              name="front"
              ref={(input) => {
                this.frontInput = input;
              }}
              onChange={this.handleChange}
              onKeyDown={this.handleCardEnter}
              placeholder="Front of card"
              value={front}
              autoFocus
            />
            <Form.Control
              name="back"
              onChange={this.handleChange}
              onKeyDown={this.handleCardEnter}
              placeholder="Back of card"
              value={back}
            />
            <InputGroup.Append>
              <Button variant="light" onClick={this.addCard}>
                Add card
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Group className="mt-4">
            <Form.Control
              name="name"
              onChange={this.handleChange}
              onKeyDown={this.handleDeckEnter}
              placeholder="Name of deck"
              value={name}
            />
            <Form.Check
              type="checkbox"
              label="Make deck public"
              onChange={this.handleCheckboxChange}
            />
            <Button
              variant="light"
              disabled={!name.trim() || !cards.length}
              onClick={this.createDeck}
            >
              Create deck
            </Button>
          </Form.Group>
        </Form>
        <hr />
        <Button variant="light" as={Link} to="/">
          Home
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({
  uid: firebase.auth.uid,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
  withRouter
)(CardEditor);
