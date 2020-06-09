import React from "react";
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
      return "No cards"
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

  isNextCard = () => this.props.cards.length && this.state.index < this.props.cards.length - 1;

  nextCard = () => {
    if (this.isNextCard()) {
      this.setState({ index: this.state.index + 1, isFront: true });
    }
  };

  render() {
    return (
      <div>
        <h2>Card Viewer</h2>
        <button onClick={this.prevCard} disabled={!this.isPrevCard()}>
          &lt;
        </button>
        <button onClick={this.flipCard} className="card">
          {this.getCard()}
        </button>
        <button onClick={this.nextCard} disabled={!this.isNextCard()}>
          &gt;
        </button>
        <br />
        <hr />
        <button onClick={this.props.switchMode}>Go to card editor</button>
      </div>
    );
  }
}

export default CardViewer;
