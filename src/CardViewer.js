import React from "react";
import { Button, ButtonGroup, ProgressBar } from "react-bootstrap";
import "./CardViewer.css";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randIndex: 0,
      randIndices: [...Array(props.cards.length).keys()],
      isFront: true,
    };
  }

  getCard = () => {
    if (!this.props.cards.length) {
      return "No cards yet — add some in the editor! 😸💩";
    }
    const card = this.props.cards[this.state.randIndices[this.state.randIndex]];
    if (this.state.isFront) {
      return card.front;
    } else {
      return card.back;
    }
  };

  flipCard = () => this.setState({ isFront: !this.state.isFront });

  isPrevCard = () => this.props.cards.length && this.state.randIndex > 0;

  prevCard = () => {
    if (this.isPrevCard()) {
      this.setState({ randIndex: this.state.randIndex - 1, isFront: true });
    }
    this.focus();
  };

  isNextCard = () =>
    this.props.cards.length &&
    this.state.randIndex < this.props.cards.length - 1;

  nextCard = () => {
    if (this.isNextCard()) {
      this.setState({ randIndex: this.state.randIndex + 1, isFront: true });
    }
    this.focus();
  };

  randomize = () => {
    this.setState({
      randIndices: this.shuffle(this.state.randIndices),
      randIndex: 0,
      isFront: true,
    });
    this.focus();
  };

  shuffle = (oldArray) => {
    const array = oldArray.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
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

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <div className="viewer">
        <h2>Card Viewer {"👨‍🎓📚"}</h2>
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
              (this.props.cards.length && this.state.isFront
                ? "card-front"
                : "card-back") + " card"
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
            now={this.props.cards.length ? this.state.randIndex + 1 : 0}
            max={this.props.cards.length}
          />
          <p>
            Card{" "}
            {this.props.cards.length
              ? this.state.randIndex + 1
              : this.state.randIndex}
            {" of " + this.props.cards.length}
          </p>
          <Button variant="light" onClick={this.randomize}>
            Randomize
          </Button>
        </div>
        <div>
          <hr />
          <Button variant="light" onClick={this.props.switchMode}>
            Go to card editor
          </Button>
        </div>
      </div>
    );
  }
}

export default CardViewer;
