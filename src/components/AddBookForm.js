import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Modal } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class Forms extends React.Component {
  SBInfo = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0;
    let book = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      email: user.email,
    };
    let booksData = await axios.post(
      `${process.env.REACT_APP_SERVER}/addBook`,
      book
    );
    this.props.addBook(booksData.data);
    this.props.close();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showModel} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Books</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.SBInfo.bind(this)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="name" name="title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  name="description"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Book Status</Form.Label>
                <Form.Control type="text" placeholder="status" name="status" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.close}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withAuth0(Forms);