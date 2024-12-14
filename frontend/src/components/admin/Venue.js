import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VenueList from './VenueList'; // Import the VenueList component
import './Venue.css'; // Import CSS for styling

const Venue = () => {
  const [venues, setVenues] = useState([]); // State to store venue data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  // Fetch venues from the backend
  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true); // Start loading
      setError(''); // Reset error
      const apiUrl = process.env.REACT_APP_BACKEND_URL || 'https://utsavvibesbackend.onrender.com'; // Use environment variable
      const response = await axios.get(`${apiUrl}/api/venues`);
      console.log('Fetched Venues:', response.data); // Debugging logs
      setVenues(response.data); // Update state with fetched venues
    } catch (error) {
      console.error('Error fetching venues:', error);
      setError('Failed to fetch venues. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="venue-page-container">
     
      {/* Display error message if there's an issue */}
      {error && <p className="error-message">{error}</p>}

      {/* Display a loading message while fetching */}
      {loading ? (
        <p>Loading venues...</p>
      ) : (
        <VenueList venues={venues} />
      )}
    </div>
  );
};

export default Venue;
