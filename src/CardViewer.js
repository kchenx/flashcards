import React from "react";
import { Button, ButtonGroup, ProgressBar, Spinner } from "react-bootstrap";
import "./CardViewer.css";

import { Link, withRouter } from "react-router-dom";
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate,
} from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.deck && props.deck.cards,
      index: 0,
      showFront: true,
    };
  }

  cardsExist = () =>
    isLoaded(this.state.cards) &&
    !isEmpty(this.state.cards) &&
    this.state.cards.length;

  getCard = () => {
    const card = this.state.cards[this.state.index];
    return this.state.showFront ? card.front : card.back;
  };

  flipCard = () => this.setState({ showFront: !this.state.showFront });

  isPrevCard = () => this.cardsExist() && this.state.index > 0;

  prevCard = () => {
    if (this.isPrevCard()) {
      this.setState({ index: this.state.index - 1, showFront: true });
    }
    this.focus();
  };

  isNextCard = () =>
    this.cardsExist() && this.state.index < this.state.cards.length - 1;

  nextCard = () => {
    if (this.isNextCard()) {
      this.setState({ index: this.state.index + 1, showFront: true });
    }
    this.focus();
  };

  randomize = () => {
    this.setState({
      cards: this.shuffle(this.state.cards),
      index: 0,
      showFront: true,
    });
    this.focus();
  };

  shuffle = (oldArray) => {
    const array = oldArray.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        this.prevCard();
        break;
      case "ArrowRight":
        this.nextCard();
        break;
      default:
    }
  };

  focus = () => {
    this.cardButton.focus();
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.deck &&
      this.props.deck.cards &&
      (!prevProps.deck || this.props.deck !== prevProps.deck)
    ) {
      this.setState({ cards: this.props.deck && this.props.deck.cards });
    }
  }

  render() {
    const { cards, index, showFront } = this.state;
    const { deck, uid } = this.props;

    if (!isLoaded(deck, this.state.cards)) {
      return <Spinner animation="border" />;
    }

    const { name, owner, ownerName, isPublic } = deck;

    if (isEmpty(this.state.cards)) {
      return <div className="m-4">{"This deck doesn't exist 😸💩"}</div>;
    } else if (!isPublic && owner !== uid) {
      return <div className="m-4">You do not have access to this deck.</div>;
    }

    return (
      <div className="viewer mt-4">
        <h2>{name}</h2>
        <h5>Made by: {ownerName}</h5>
        <ButtonGroup>
          <Button
            className="buttonArrow"
            variant="light"
            onClick={this.prevCard}
            disabled={!this.isPrevCard()}
          >
            &lt;
          </Button>
          <Button
            className={
              (this.cardsExist() && cards.length && showFront
                ? "card-front"
                : "card-back") + " card"
            }
            ref={(input) => {
              this.cardButton = input;
            }}
            variant="light"
            onClick={this.flipCard}
            onKeyDown={this.handleKeyDown}
            autoFocus
          >
            {this.getCard()}
          </Button>
          <Button
            className="buttonArrow"
            variant="light"
            onClick={this.nextCard}
            disabled={!this.isNextCard()}
          >
            &gt;
          </Button>
        </ButtonGroup>
        <div>
          <br />
          <ProgressBar
            striped
            variant="success"
            now={this.cardsExist() ? index + 1 : 0}
            max={this.cardsExist() ? cards.length : 0}
          />
          <p>
            Card {this.cardsExist() ? index + 1 : 0}
            {" of " + (this.cardsExist() ? cards.length : 0)}
          </p>
          <Button variant="light" onClick={this.randomize}>
            Randomize
          </Button>
        </div>
        <div>
          <hr />
          <Button variant="light" as={Link} to="/">
            Home
          </Button>
        </div>
      </div>
    );
  }
}

const populates = [
  {
    child: "owner",
    root: "users",
    childParam: "username",
    childAlias: "ownerName",
  },
];

const mapStateToProps = ({ firebase }, props) => ({
  uid: firebase.auth.uid,
  deck: populate(
    firebase,
    `/flashcards/${props.match.params.deckId}`,
    populates
  ),
});

export default compose(
  withRouter,
  firebaseConnect((props) => {
    const deckId = props.match.params.deckId;
    return [
      { path: `/flashcards/${deckId}`, storeAs: deckId },
      { path: `/flashcards/${deckId}`, populates },
    ];
  }),
  connect(mapStateToProps)
)(CardViewer);
