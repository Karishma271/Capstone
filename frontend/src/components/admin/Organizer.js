import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrganizerList from './OrganizerList';  
import './Organizer.css';  

const Organizer = () => {
  const [organizers, setOrganizers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      // Fetch backend URL from environment variables
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.get(`${apiUrl}/api/organizers`);
      
      console.log('Fetched Organizers:', response.data); 
      setOrganizers(response.data);
    } catch (error) {
      console.error('Error fetching organizers:', error.message || error);
    }
  };

  return (
    <div className="organizer-page-container">
      <OrganizerList organizers={organizers} />
    </div>
  );
};

export default Organizer;
