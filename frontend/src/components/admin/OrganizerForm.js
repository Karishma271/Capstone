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

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/organizers/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => console.error("Error fetching organizer:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiRequest = id
      ? axios.put(`/api/organizers/${id}`, formData) 
      : axios.post("/api/organizers", formData); 

    apiRequest
      .then(() => navigate("/Organizers"))
      .catch((error) => console.error("Error saving organizer:", error));
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
