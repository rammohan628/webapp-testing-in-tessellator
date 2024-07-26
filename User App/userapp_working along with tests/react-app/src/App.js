import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import UserTable from './components/UserTable';
import AddUser from './components/AddUser';
import SearchUser from './components/SearchUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';

const App = () => {
  const [userAdded, setUserAdded] = useState(false);

  const handleUserAdded = () => {
    setUserAdded(!userAdded);  // Toggle state to trigger re-render of UserTable
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Container className="mt-4">
          <Routes>
            <Route path="/add" element={<AddUser onUserAdded={handleUserAdded} />} />
            <Route path="/search" element={<SearchUser />} />
            <Route path="/display" element={<UserTable key={userAdded} />} />
            <Route path="/" element={<UserTable key={userAdded} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
