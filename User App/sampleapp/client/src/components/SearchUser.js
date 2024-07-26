import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, FormControl, Container, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:3000/api/users';

const SearchUser = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userUpdates, setUserUpdates] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}?q=${query}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
  };

  const handleChange = (field, value) => {
    setUserUpdates({
      ...userUpdates,
      [field]: value,
    });
  };

  const handleUpdate = async (userId) => {
    try {
      await axios.put(`${API_URL}/${userId}`, userUpdates);
      setUser(null);
      setEditingUserId(null);
      setUserUpdates({});
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleShowDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${userIdToDelete}`);
      setUser(null);
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <h2>Search User</h2>
      <FormControl
        type="text"
        placeholder="Enter user name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>

      {user && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={user._id}>
              <td>
                {editingUserId === user._id ? (
                  <FormControl
                    type="text"
                    value={userUpdates.name || user.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user._id ? (
                  <FormControl
                    type="text"
                    value={userUpdates.email || user.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user._id ? (
                  <Button variant="success" onClick={() => handleUpdate(user._id)}>Update</Button>
                ) : (
                  <>
                    <Button variant="warning" onClick={() => handleEdit(user._id)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleShowDeleteModal(user._id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SearchUser;
