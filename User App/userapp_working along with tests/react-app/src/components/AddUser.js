import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:3000/api/users';

const AddUser = ({ onUserAdded }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, user);
      setUser({ name: '', email: '' });  // Reset the user object
      onUserAdded();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the message after 3 seconds
    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('Failed to add user. Please try again.'); // Show error message
      setTimeout(() => setErrorMessage(''), 3000); // Hide the error message after 3 seconds
    }
  };

  return (
    <Container>
      <h2>Add User</h2>
      {showSuccessMessage && (
        <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
          User added successfully!
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleAddUser}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name" // Updated to use name attribute
            placeholder="Enter name"
            value={user.name}
            onChange={handleInputChange}
            aria-label="Name"  // Added for accessibility
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email" // Updated to use name attribute
            placeholder="Enter email"
            value={user.email}
            onChange={handleInputChange}
            aria-label="Email"  // Added for accessibility
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </Container>
  );
};

export default AddUser;
