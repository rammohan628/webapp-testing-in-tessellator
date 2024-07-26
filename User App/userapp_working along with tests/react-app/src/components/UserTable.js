import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, FormControl, Container, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:3000/api/users'; // Adjust this URL to match your backend endpoint

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUserName, setEditingUserName] = useState(null);
  const [userUpdates, setUserUpdates] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userNameToDelete, setUserNameToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (userName) => {
    setEditingUserName(userName);
  };

  const handleChange = (userName, field, value) => {
    setUserUpdates({
      ...userUpdates,
      [userName]: {
        ...userUpdates[userName],
        [field]: value,
      },
    });
  };

  const handleUpdate = async (userName) => {
    try {
      const user = users.find(u => u.name === userName);
      await axios.put(`${API_URL}/${user._id}`, userUpdates[userName]);
      fetchUsers();
      setEditingUserName(null);
      setUserUpdates({});
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleShowDeleteModal = (userName) => {
    setUserNameToDelete(userName);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserNameToDelete(null);
  };

  const handleDelete = async () => {
    try {
      const user = users.find(u => u.name === userNameToDelete);
      await axios.delete(`${API_URL}/${user._id}`);
      fetchUsers();
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name} data-email={user.email}>
              <td>
                {editingUserName === user.name ? (
                  <FormControl
                    id={`name-input-${user.name}`}
                    name="name"
                    type="text"
                    value={userUpdates[user.name]?.name || user.name}
                    onChange={(e) => handleChange(user.name, 'name', e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserName === user.name ? (
                  <FormControl
                    id={`email-input-${user.name}`}
                    name="email"
                    type="text"
                    value={userUpdates[user.name]?.email || user.email}
                    onChange={(e) => handleChange(user.name, 'email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserName === user.name ? (
                  <Button variant="success" data-testid={`update-btn-${user.name}`} onClick={() => handleUpdate(user.name)}>Update</Button>
                ) : (
                  <>
                    <Button variant="warning" data-testid={`edit-btn-${user.name}`} onClick={() => handleEdit(user.name)}>Edit</Button>
                    <Button variant="danger" data-testid={`delete-btn-${user.name}`} onClick={() => handleShowDeleteModal(user.name)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" data-testid={`confirm-delete-btn`} onClick={() => handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserTable;
