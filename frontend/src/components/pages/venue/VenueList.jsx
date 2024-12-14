import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './venueList.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';

const VenueList = () => {
  const [venues, setVenues] = useState([]); // State for storing venues
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch venues from backend API
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/venues`
        );
        setVenues(response.data); // Set fetched data
      } catch (err) {
        console.error('Error loading venue data:', err);
        setError('Error loading venue data. Please try again later.');
      }
    };

    fetchVenues();
  }, []);

  return (
    <div>
      <Typography
        variant="h1"
        fontSize="3rem"
        mb={4}
        gutterBottom
        style={{ textAlign: 'center' }} // Center align the "Venues" text
      >
        Venues
      </Typography>
      <div className="fp">
        {error && <Typography color="error">{error}</Typography>}

        {venues.length > 0 ? (
          venues.map((venue) => (
            <div className="fpItem" key={venue._id}>
              <Link to={`/fhalls/${venue._id}`}>
                <img
                  src={venue.imageUrl || '/path/to/default/image.jpg'} // Use a fallback image if no image is provided
                  alt={venue.venueName}
                />
              </Link>
              <span className="fpName">{venue.venueName}</span>
              <span className="fpCity">
                <LocationOnIcon /> {venue.address}
              </span>
              <span className="fpOccasion">Event: {venue.occasionType}</span>
              <span className="fpCapacity">
                Capacity: {venue.capacity || 'N/A'} <GroupsIcon />
              </span>
              {venue.acceptedPayments?.length > 0 && (
                <span className="fpPayments">
                  <PaymentIcon /> Accepted Payments:{' '}
                  {venue.acceptedPayments.join(', ')}
                </span>
              )}
              <span className="fpDescription">
                {venue.description || 'No description available.'}
              </span>
            </div>
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>
    </div>
  );
};

export default VenueList;
