import React from "react";
import { Button, FormControl, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CardEditor.css";

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: "", back: "" };
  }

  addCard = () => {
    const front = this.state.front.trim();
    const back = this.state.back.trim();
    if (front && back) {
      this.props.addCard(this.state);
      this.setState({ front: "", back: "" });
    } else {
      this.setState({ front, back });
    }
    this.focus();
  };

  deleteCard = (index) => this.props.deleteCard(index);

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      this.addCard();
    }
  };

  focus = () => {
    this.frontInput.focus();
  };

  componentDidMount() {
    this.focus();
  }

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
          <tbody>{cards}</tbody>
        </Table>
        <InputGroup>
          <FormControl
            name="front"
            ref={(input) => {
              this.frontInput = input;
            }}
            onChange={this.handleChange}
            placeholder="Front of card"
            value={this.state.front}
          />
          <FormControl
            name="back"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyEnter}
            placeholder="Back of card"
            value={this.state.back}
          />
          <InputGroup.Append>
            <Button variant="light" onClick={this.addCard}>
              Add card
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div>
          <hr />
          <Link to="/viewer">
            <Button variant="light">Go to card viewer</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CardEditor;
