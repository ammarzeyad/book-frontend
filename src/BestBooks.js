import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import {Card , Button} from "react-bootstrap/";
import { CardGroup } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import AddBookForm from "./components/AddBookForm";
import UpdateBooksForm from "./components/UpdateBooksForm";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModel: false,
      showMUpdate: false,
      bookInfo: {}
    };
  }
  componentDidMount = async () => {
    // let { user } = this.props.auth0;
    let link = `${process.env.REACT_APP_SERVER}/getbooks`;
    let BooksBackend = await axios.get(link);
    this.setState({
      books: BooksBackend.data,
    });
  };
  handleClose = () => {
    this.setState({ showModel: false });
  };

  handleCloseU = () => {
    this.setState({ showMUpdate: false });
  };

  handleShow = () => {
    this.setState({showModel: true});
  };

  handleShowUpdate = (book) => {
    this.setState({ 
      showMUpdate: true,
      bookInfo: book
    });
  };

  addBook = (info) => {
    this.setState({books: info})
  };

  updateBook = (info) => {
    this.setState({ books: info })
  };

  deleteBook = async (bookID) => {
    let delURL = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook?bookID=${bookID}`);
    this.setState({books: delURL.data})
  };

  render() {
    return (
      <>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <button onClick={this.handleShow}>AddBook</button>
        {this.state.showModel && <AddBookForm showModel={this.state.showModel} 
                                              close={this.handleClose} 
                                              addBook={this.addBook.bind(this)}/>}
        {this.state.books && (
          <CardGroup>
            {this.state.books.map((item) => {
              return (
                <>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.status}</Card.Text>
                    <Button variant="danger" onClick={() => {this.deleteBook(item._id)}}>Delete</Button>
                    <Button variant="secondary" onClick={() => {this.handleShowUpdate(item)}}>Update</Button>
                  </Card.Body>
                </Card>
                {this.state.showMUpdate &&
                  <UpdateBooksForm
                    showModel={this.state.showMUpdate}
                    close={this.handleCloseU}
                    updateBook={this.updateBook.bind(this)}
                    bookData={this.state.bookInfo}
                  />
                }
                </>
              );
            })}
          </CardGroup>
        )}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);