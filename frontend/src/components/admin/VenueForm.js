import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './VenueForm.css';

const VenueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    occasionType: '',
    venueName: '',
    description: '',
    address: '',
    capacity: '',
    acceptedPayments: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const occasionTypeOptions = ['Wedding', 'Birthday', 'Conference', 'Party'];
  const paymentOptions = ['Credit Card', 'Cash', 'PayPal', 'Bank Transfer'];

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/venues/${id}`)
        .then((response) => {
          setFormData(response.data);
          setIsUpdateMode(true);
        })
        .catch((error) => console.error('Error fetching venue:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      acceptedPayments: selectedOptions,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const validateForm = () => {
    const { venueName, occasionType, address } = formData;
    if (!venueName.trim() || !occasionType || !address.trim()) {
      alert('Please fill in all required fields before submitting.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let imageUrl = '';
      if (imageFile) {
        const imageData = new FormData();
        imageData.append('image', imageFile);
        const imageResponse = await axios.post('/api/upload-image', imageData);
        imageUrl = imageResponse.data.imageUrl;
      }

      const updatedData = { ...formData, imageUrl };

      if (isUpdateMode) {
        await axios.put(`/api/venues/${id}`, updatedData);
      } else {
        await axios.post('/api/venues', updatedData);
      }

      navigate('/venues');
    } catch (error) {
      console.error('Error saving/updating venue:', error);
    }
  };

  return (
    <div className="organizer-form-container">
      <h2>{isUpdateMode ? 'Update Venue' : 'Add Venue'}</h2>
      <form className="organizer-form" onSubmit={handleSubmit}>
        <label>Occasion Type:</label>
        <select name="occasionType" value={formData.occasionType} onChange={handleChange} required>
          <option value="">Select an occasion</option>
          {occasionTypeOptions.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>

        <label>Venue Name:</label>
        <input type="text" name="venueName" value={formData.venueName} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <label>Capacity:</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />

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

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button className="save-btn" type="submit">{isUpdateMode ? 'Update Venue' : 'Add Venue'}</button>
      </form>
    </div>
  );
};

export default VenueForm;
