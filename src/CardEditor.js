import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./CardEditor.css";

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: "", back: "" };
  }

  addCard = () => {
    this.props.addCard(this.state);
    this.setState({ front: "", back: "" });
  };

  deleteCard = (index) => this.props.deleteCard(index);

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
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
      );
    });

    return (
      <div className="card-editor">
        <h2>Card Editor</h2>
        <Table>
          <thead>
            <tr>
              <th>Card</th>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </Table>
        <br />
        <input
          name="front"
          onChange={this.handleChange}
          placeholder="Front of card"
          value={this.state.front}
        />
        <input
          name="back"
          onChange={this.handleChange}
          placeholder="Back of card"
          value={this.state.back}
        />
        <Button variant="light" onClick={this.addCard}>
          Add card
        </Button>
        <hr />
        <Button variant="light" onClick={this.props.switchMode}>
          Go to card viewer
        </Button>
      </div>
    );
  }
}

export default CardEditor;
