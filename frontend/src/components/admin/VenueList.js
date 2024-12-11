import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VenueList.css";

const VenueList = ({ venues }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/Venues/edit/${id}`); // Redirect to Edit Venue form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await axios.delete(`/api/venues/${id}`);
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error deleting venue:", error);
      }
    }
  };
  const handleAdd = () => {
    navigate('/Venues/new');  // Redirect to Add Venue form
  };
  return (
    <div className="venue-list-container">
      <h2>Venues</h2>
      <button className="add-venue-btn"onClick={handleAdd}>
        Add New Venue
      </button>

      {venues.length === 0 ? (
  <p>No venues available. Add a new one!</p>
) : (
        <table className="venue-table">
          <thead>
            <tr>
              <th>Occasion Type</th>
              <th>Venue Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue._id}>
                <td>{venue.occasionType}</td>
                <td>{venue.venueName}</td>
                <td>{venue.address}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(venue._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(venue._id)}
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

export default VenueList;
