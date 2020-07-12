import React from "react";
import { Button, ListGroup, Jumbotron, Spinner } from "react-bootstrap";
import "./Homepage.css";

import { Link } from "react-router-dom";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class Homepage extends React.Component {
  renderDecks = () => {
    const { decks, uid } = this.props;

    if (!isLoaded(decks) || isEmpty(decks)) {
      return <></>;
    }

    const getDecks = (criteria) =>
      Object.keys(decks)
        .filter(criteria)
        .map((key) => (
          <ListGroup.Item
            key={key.toString()}
            action
            href={key.toString()}
            as={Link}
            to={`/viewer/${key}`}
          >
            {decks[key].name}
          </ListGroup.Item>
        ));

    const userDecks = getDecks((key) => decks[key].owner === uid);

    const publicDecks = getDecks(
      (key) => decks[key].isPublic && decks[key].owner !== uid
    );

    return (
      <>
        {!isEmpty(userDecks) && (
          <div className="m-4">
            <h3>Your Decks</h3>
            <ListGroup>{userDecks}</ListGroup>
          </div>
        )}
        {!isEmpty(publicDecks) && (
          <div className="m-4">
            <h3>Public Decks</h3>
            <ListGroup>{publicDecks}</ListGroup>
          </div>
        )}
      </>
    );
  };

  render() {
    const { decks, username } = this.props;

    if (!isLoaded(decks)) {
      return <Spinner animation="border" />;
    }

    return (
      <>
        <Jumbotron className="mt-4">
          <h1>Welcome to the new you{username && ", " + username}.</h1>
          <p>
            Congratulations on embarking on your new learning journey with the
            Flashcards app! Infinite possibilities await. Discover your zen now.
          </p>
          {username ? (
            <Button variant="dark" as={Link} to="/editor">
              Create a new deck
            </Button>
          ) : (
            <>
              <Button className="mr-2" variant="dark" as={Link} to="/register">
                Register
              </Button>
              <Button className="mr-2" variant="dark" as={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Jumbotron>
        <div className="decks">{this.renderDecks()}</div>
      </>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({
  decks: firebase.data.decks,
  username: firebase.profile.username,
  uid: firebase.auth.uid,
});

export default compose(
  firebaseConnect([{ path: `/homepage`, storeAs: "decks" }]),
  connect(mapStateToProps)
)(Homepage);
