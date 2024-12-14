import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { TextField } from '@mui/material';

const User = () => {
  const [users, setUsers] = useState([]); // User list state
  const [searchTerm, setSearchTerm] = useState(''); // Search input state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const usersPerPage = 5; // Users displayed per page

  const [loading, setLoading] = useState(false); // Loading indicator state
  const [error, setError] = useState(''); // Error message state

  // Fetch users when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-management-page">
      <header>
        <h1>User Management</h1>
      </header>

      {/* Search Bar */}
      <nav>
        <TextField
          className="textField"
          label="Search by Name"
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </nav>

      {/* Main Content */}
      <main>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="pagination">
            <ul>
              {Array(Math.ceil(filteredUsers.length / usersPerPage))
                .fill()
                .map((_, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? 'active' : ''}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default User;
