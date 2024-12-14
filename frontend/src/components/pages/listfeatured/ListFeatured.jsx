import React, { useState, useEffect } from "react";
import "./listFeatured.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ListFeatured = () => {
  const navigate = useNavigate();
  const path = '/CheckoutPage';

  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract the ID from the URL path

  // State for storing the venue data, loading state, and error state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch venue data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/halls/find/${id}`);
        setData(response.data); // Set fetched data
      } catch (err) {
        console.error("Error fetching venue data:", err);
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Display loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="hallWrapper">
        <h1 className="hallTitle">{data.venueName}</h1>
        <div className="hallAddress">
          <span><LocationOnIcon /> {data.address}</span>
        </div>
        <div className="hallImages">
          <div className="hallImgWrapper">
            <img src={data.imageUrl} alt="Venue" className="hallImg" />
          </div>
        </div>
        <span className="fpName">{data.capacity} <GroupsIcon /></span>
        <div className="hallDetails">
          <div className="hallDetailsPrice">
            <h1>Description</h1>
            <span>{data.description}</span>
            <button onClick={() => navigate(path)}>Book Now!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFeatured;
