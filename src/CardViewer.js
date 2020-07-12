import React from "react";
import { Button, ButtonGroup, ProgressBar, Spinner } from "react-bootstrap";
import "./CardViewer.css";

import { Link, withRouter } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards,
      index: 0,
      showFront: true,
    };
  }

  getCard = () => {
    if (!this.state.cards.length) {
      return "No cards yet — add some in the editor! 😸💩";
    }
    const card = this.state.cards[this.state.index];
    if (this.state.showFront) {
      return card.front;
    } else {
      return card.back;
    }
  };

  flipCard = () => this.setState({ showFront: !this.state.showFront });

  isPrevCard = () => this.state.cards.length && this.state.index > 0;

  prevCard = () => {
    if (this.isPrevCard()) {
      this.setState({ index: this.state.index - 1, showFront: true });
    }
  };

  isNextCard = () =>
    this.state.cards.length && this.state.index < this.state.cards.length - 1;

  nextCard = () => {
    if (this.isNextCard()) {
      this.setState({ index: this.state.index + 1, showFront: true });
    }
  };

  randomize = () => {
    this.setState({
      cards: this.shuffle(this.state.cards),
      index: 0,
      showFront: true,
    });
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
    if (isLoaded(this.cardButton)) {
      this.cardButton.focus();
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.cards !== prevProps.cards) {
      this.setState({ cards: this.props.cards });
    }
    this.focus();
  }

  render() {
    const { cards, index, showFront } = this.state;
    const { name } = this.props;

    if (!isLoaded(cards)) {
      return <Spinner animation="border" />;
    }

    if (isEmpty(cards)) {
      return <>Page not found</>;
    }

    return (
      <div className="viewer">
        <h2>Card Viewer {"👨‍🎓📚"}</h2>
        <h3>{name}</h3>
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
              (cards.length && showFront ? "card-front" : "card-back") + " card"
            }
            ref={(input) => {
              this.cardButton = input;
            }}
            variant="light"
            onClick={this.flipCard}
            onKeyDown={this.handleKeyDown}
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
            now={cards.length ? index + 1 : 0}
            max={cards.length}
          />
          <p>
            Card {cards.length ? index + 1 : index}
            {" of " + cards.length}
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

const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return { cards, name };
};

export default compose(
  withRouter,
  firebaseConnect((props) => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
  }),
  connect(mapStateToProps)
)(CardViewer);
