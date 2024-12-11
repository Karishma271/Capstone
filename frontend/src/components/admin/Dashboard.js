import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [organizerCount, setOrganizerCount] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/users/count").then((res) => setUserCount(res.data.count));
    axios.get("/api/venue/count")
    .then((res) => setVenueCount(res.data.count))
    
    axios
      .get("/api/organizer/count")
      .then((res) => setOrganizerCount(res.data.count));

    // Simulated upcoming events
    const events = [
      { id: 1, title: "Conference 2023", date: "2023-12-01" },
      { id: 2, title: "Product Launch", date: "2023-12-15" },
      { id: 3, title: "Tech Expo", date: "2024-01-10" },
      { id: 4, title: "Workshop Series", date: "2024-02-05" },
      { id: 5, title: "Networking Event", date: "2024-03-20" },
    ];
    setUpcomingEvents(events);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>

      {/* Stats and Quick Actions */}
      <div className="stats-actions-container">
        <div className="stat-box">
          <p>Total Users</p>
          <h2>{userCount}</h2>
          <Link to="/Usermgmt" className="action-btn">
            View Users
          </Link>
        </div>
        <div className="stat-box">
          <p>Total Venues</p>
          <h2>{venueCount}</h2>
          <Link to="/Venues" className="action-btn">
            View Venues
          </Link>
        </div>
        <div className="stat-box">
          <p>Total Organizers</p>
          <h2>{organizerCount}</h2>
          <Link to="/Organizers" className="action-btn">
            View Organizers
          </Link>
        </div>
      </div>

      {/* Quick Actions and Upcoming Events Side by Side */}
      <div className="actions-events-container">
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-buttons">
            <button>Add New User</button>
            <button>Add New Venue</button>
            <button>Assign Organizer</button>
          </div>
        </div>

        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <div className="event-details">
                  <strong>{event.title}</strong>
                  <span>{event.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
