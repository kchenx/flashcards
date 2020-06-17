import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron } from "react-bootstrap";

class Homepage extends React.Component {
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
              Get started
            </Button>
          </p>
        </Jumbotron>
      </>
    );
  }
}

export default Homepage;
