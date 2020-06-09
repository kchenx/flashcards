import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./CardViewer.css";

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isFront: true,
    };
  }

  getCard = () => {
    if (!this.props.cards.length) {
      return "No cards yet — add some in the editor! 😸💩";
    }
    const card = this.props.cards[this.state.index];
    if (this.state.isFront) {
      return card.front;
    } else {
      return card.back;
    }
  };

  flipCard = () => this.setState({ isFront: !this.state.isFront });

  isPrevCard = () => this.props.cards.length && this.state.index > 0;

  prevCard = () => {
    if (this.isPrevCard()) {
      this.setState({ index: this.state.index - 1, isFront: true });
    }
  };

  isNextCard = () =>
    this.props.cards.length && this.state.index < this.props.cards.length - 1;

  nextCard = () => {
    if (this.isNextCard()) {
      this.setState({ index: this.state.index + 1, isFront: true });
    }
  };

  render() {
    return (
      <div className="card-viewer">
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
          <Button className="card" variant="light" onClick={this.flipCard}>
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
        <br />
        <p>
          Card{" "}
          {this.props.cards.length ? this.state.index + 1 : this.state.index}/
          {this.props.cards.length}
        </p>
        <hr />
        <Button variant="light" onClick={this.props.switchMode}>
          Go to card editor
        </Button>
      </div>
    );
  }
}

export default CardViewer;
