import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VenueList.css";

const VenueList = ({ venues, setVenues }) => {
  const [deletingId, setDeletingId] = useState(null); // Track deletion state
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/Venues/edit/${id}`); // Redirect to Edit Venue form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        setDeletingId(id); // Set deleting state to show "Deleting..." button
        const response = await axios.delete(
          `https://utsavvibesbackend.onrender.com/api/venues/${id}`
        );
  
        // Check if the response status indicates success
        //if (response.status === 200) {
          // Update local venues state without page reload
          //setVenues((prevVenues) => prevVenues.filter((venue) => venue._id !== id));
        //} else {
          //throw new Error("Failed to delete venue");
        //}
        window.location.reload();
      } catch (error) {
        console.error("Error deleting venue:", error);
        alert("Failed to delete the venue. Please try again.");
      } finally {
        setDeletingId(null); // Reset deleting state
      }
    }
  };
  

  const handleAdd = () => {
    navigate("/Venues/new"); // Redirect to Add Venue form
  };

  return (
    <div className="venue-list-container">
      <h2>Venues</h2>
      <button className="add-venue-btn" onClick={handleAdd}>
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
                    disabled={deletingId === venue._id} // Disable when deleting
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(venue._id)}
                    disabled={deletingId === venue._id} // Disable during delete
                  >
                    {deletingId === venue._id ? "Deleting..." : "Delete"}
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
