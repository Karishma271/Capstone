import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './VenueForm.css';

const VenueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    occasionType: '',
    venueName: '',
    description: '',
    address: '',
    capacity: '',
    acceptedPayments: [],
    imageUrl: '', // Store image URL directly
  });

  const [previewImage, setPreviewImage] = useState(null); // Image preview
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Track if we are in update mode
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [message, setMessage] = useState(''); // Feedback message

  // Dropdown options
  const occasionTypeOptions = ['Wedding', 'Birthday', 'Conference', 'Party'];
  const paymentOptions = ['Credit Card', 'Cash', 'PayPal', 'Bank Transfer'];

  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com';

  // Fetch venue details for update (if in update mode)
  useEffect(() => {
    if (id) {
      axios
        .get(`${apiUrl}/api/venues/${id}`)
        .then((response) => {
          setFormData(response.data);
          setPreviewImage(response.data.imageUrl); // Set preview image for update mode
          setIsUpdateMode(true);
        })
        .catch((error) => console.error('Error fetching venue:', error));
    }
  }, [id, apiUrl]);

  // Handle input changes for form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If updating the image URL, update the preview as well
    if (name === 'imageUrl') {
      setPreviewImage(value); // Update preview for image URL
    }
  };

  // Handle accepted payments changes (multiple select)
  const handlePaymentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      acceptedPayments: selectedOptions,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const { venueName, occasionType, address, imageUrl } = formData;
    if (!venueName.trim() || !occasionType || !address.trim() || !imageUrl.trim()) {
      alert('Please fill in all required fields before submitting.');
      return false;
    }

    // Validate image URL format
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
    if (!urlRegex.test(imageUrl.trim())) {
      alert('Please provide a valid image URL.');
      return false;
    }
    return true;
  };

  // Submit form (add or update venue)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    try {
      // Submit form data including image URL
      const updatedData = { ...formData };

      if (isUpdateMode) {
        await axios.put(`${apiUrl}/api/venues/${id}`, updatedData);
        setMessage('Venue updated successfully!');
      } else {
        await axios.post(`${apiUrl}/api/venues`, updatedData);
        setMessage('Venue added successfully!');
      }

      // Redirect after success
      setTimeout(() => navigate('/venues'), 2000);
    } catch (error) {
      console.error('Error saving/updating venue:', error);
      setMessage('An error occurred while saving the venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="venue-form-container">
      <h2>{isUpdateMode ? 'Update Venue' : 'Add Venue'}</h2>
      {message && <p className="form-message">{message}</p>}

      <form className="venue-form" onSubmit={handleSubmit}>
        {/* Occasion Type */}
        <label>Occasion Type:</label>
        <select
          name="occasionType"
          value={formData.occasionType}
          onChange={handleChange}
          required
        >
          <option value="">Select an occasion</option>
          {occasionTypeOptions.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>

        {/* Venue Name */}
        <label>Venue Name:</label>
        <input
          type="text"
          name="venueName"
          value={formData.venueName}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Address */}
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        {/* Capacity */}
        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
        />

        {/* Accepted Payments */}
        <label>Accepted Payments:</label>
        <select
          multiple
          name="acceptedPayments"
          value={formData.acceptedPayments}
          onChange={handlePaymentChange}
        >
          {paymentOptions.map((payment) => (
            <option key={payment} value={payment}>
              {payment}
            </option>
          ))}
        </select>

        {/* Image URL */}
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Enter an image URL"
          required
        />

        {/* Image Preview */}
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        {/* Submit Button */}
        <button className="save-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isUpdateMode ? 'Update Venue' : 'Add Venue'}
        </button>
      </form>
    </div>
  );
};

export default VenueForm;
