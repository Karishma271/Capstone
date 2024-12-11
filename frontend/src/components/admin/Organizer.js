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
      const response = await axios.get('/api/organizers');
      console.log('Fetched Organizers:', response.data); // Add debugging logs
      setOrganizers(response.data);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    }
  };

  

  return (
    <div className="organizer-page-container">
      
      <OrganizerList organizers={organizers} />
    </div>
  );
};

export default Organizer;
