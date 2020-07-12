import React from "react";
import { Button, ListGroup, Jumbotron, Spinner } from "react-bootstrap";
import "./Homepage.css";

import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class Homepage extends React.Component {
  renderDecks = () => {
    if (!isLoaded(this.props.decks)) {
      return <Spinner animation="border" />;
    } else if (isEmpty(this.props.decks)) {
      return <></>;
    }

    const decks = Object.keys(this.props.decks).map((key) => (
      <ListGroup.Item
        key={key.toString()}
        action
        href={key.toString()}
        as={Link}
        to={`/viewer/${key}`}
      >
        {this.props.decks[key].name}
      </ListGroup.Item>
    ));

    return <ListGroup>{decks}</ListGroup>;
  };

  render() {
    return (
      <>
        <Jumbotron>
          <h1>Welcome to the new you.</h1>
          <p>
            Congratulations on embarking on your new learning journey with the
            Flashcards app! Infinite possibilities await. Discover your zen now.
          </p>
          <p>
            <Button variant="dark" as={Link} to="/editor">
              Create a new deck
            </Button>
          </p>
        </Jumbotron>
        <div className="homepage">
          <h2>Available Decks</h2>
          {this.renderDecks()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const decks = state.firebase.data.decks;
  return { decks };
};

export default compose(
  firebaseConnect([{ path: `/homepage`, storeAs: "decks" }]),
  connect(mapStateToProps)
)(Homepage);
