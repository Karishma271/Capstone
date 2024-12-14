import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./OrganizerForm.css";

const OrganizerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    email: "",
    contactNumber: "",
  });

  // Fetch Backend URL from Environment Variable
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (id) {
      // Fetch organizer details for edit
      axios
        .get(`${apiUrl}/api/organizers/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) =>
          console.error("Error fetching organizer:", error.message)
        );
    }
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Choose API request type: PUT for update, POST for create
    const apiRequest = id
      ? axios.put(`${apiUrl}/api/organizers/${id}`, formData)
      : axios.post(`${apiUrl}/api/organizers`, formData);

    apiRequest
      .then(() => navigate("/Organizers"))
      .catch((error) =>
        console.error("Error saving organizer:", error.message || error)
      );
  };

  return (
    <div className="organizer-form-container">
      <h2>{id ? "Edit Organizer" : "Add Organizer"}</h2>
      <form onSubmit={handleSubmit} className="organizer-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Enter contact number"
        />
        <button type="submit" className="save-btn">
          {id ? "Update Organizer" : "Save Organizer"}
        </button>
      </form>
    </div>
  );
};

export default OrganizerForm;
