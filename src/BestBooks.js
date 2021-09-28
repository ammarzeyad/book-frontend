import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from '@auth0/auth0-react';
import "./BestBooks.css";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import axios from "axios";



class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount = async () => {
    let user = this.props.auth0.user.email;
    let link = `${process.env.REACT_APP_SERVER}/books?emailin=${user}`;
    let BooksBackend = await axios.get(link);
    this.setState({
      books: BooksBackend.data
    });
    console.log(this.state.books);
  };
  render() {
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {this.state.books && (
          <CardGroup>
            {this.state.books.map((item) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.status}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        )}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);