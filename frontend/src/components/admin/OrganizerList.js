import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrganizerList.css";

const OrganizerList = ({ organizers }) => {
  const navigate = useNavigate();

  // Fetch Backend URL from Environment Variable
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleEdit = (id) => {
    navigate(`/Organizers/edit/${id}`); // Redirect to Edit Organizer form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this organizer?")) {
      try {
        // Make DELETE request to backend
        await axios.delete(`${apiUrl}/api/organizers/${id}`);
        window.location.reload(); // Refresh the page after deletion
      } catch (error) {
        console.error("Error deleting organizer:", error.message || error);
      }
    }
  };

  const handleAdd = () => {
    navigate("/Organizers/new"); // Redirect to Add Organizer form
  };

  return (
    <div className="organizer-list-container">
      <h2>Organizers</h2>
      <button className="add-organizer-btn" onClick={handleAdd}>
        Add New Organizer
      </button>

      {organizers.length === 0 ? (
        <p>No organizers available. Add a new one!</p>
      ) : (
        <table className="organizer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Address</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((organizer) => (
              <tr key={organizer._id}>
                <td>{organizer.name}</td>
                <td>{organizer.category}</td>
                <td>{organizer.address}</td>
                <td>{organizer.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(organizer._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(organizer._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrganizerList;
