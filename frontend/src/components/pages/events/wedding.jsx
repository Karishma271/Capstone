import React, { useState } from 'react';
import axios from 'axios';
import './wedding.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Paper, Typography } from '@mui/material';

const Wedding = () => {
  const [brideName, setBrideName] = useState('');
  const [groomName, setGroomName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    brideName: '',
    groomName: '',
    email: '',
    phoneNumber: '',
  });

  const validateField = (fieldName, value) => {
    if (fieldName === 'brideName' || fieldName === 'groomName' || fieldName === 'venue') {
      const regex = /^[A-Za-z\s]+$/;
      return regex.test(value);
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else if (fieldName === 'phoneNumber') {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(value);
    }
    return true; // Default to valid
  };

  const handleFieldChange = (fieldName, value) => {
    const isValid = validateField(fieldName, value);
    if (!isValid) {
      setErrorMessages({
        ...errorMessages,
        [fieldName]: `Please enter valid ${fieldName}`,
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        [fieldName]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { brideName, groomName, eventDate, venue, email, phoneNumber };
    let isValid = true;

    for (const fieldName of Object.keys(eventData)) {
      if (!validateField(fieldName, eventData[fieldName])) {
        handleFieldChange(fieldName, eventData[fieldName]);
        isValid = false;
      }
    }

    if (!isValid) {
      return; // Don't submit if there are validation errors
    }

    try {
      // Send data to the backend (adjust URL accordingly)
      const response = await axios.post('https://utsavvibesbackend.onrender.com/wedding', eventData);

      // Success message
      setSuccessMessage(response.data.message);
      setBrideName('');
      setGroomName('');
      setEventDate('');
      setVenue('');
      setEmail('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error while saving data:', error);
      setErrorMessages({ ...errorMessages, general: 'Failed to register the event. Please try again.' });
    }
  };

  return (
    <Container className="form-container" maxWidth="sm">
      <Paper className="form-paper" elevation={3}>
        <Typography variant="h4" className="form-heading">
          Wedding Event Planner Form
        </Typography>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessages.general && <p style={{ color: 'red' }}>{errorMessages.general}</p>}
        <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Bride's Name"
            value={brideName}
            onChange={(e) => {
              setBrideName(e.target.value);
              handleFieldChange('brideName', e.target.value);
            }}
            error={!!errorMessages.brideName}
            helperText={errorMessages.brideName}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Groom's Name"
            value={groomName}
            onChange={(e) => {
              setGroomName(e.target.value);
              handleFieldChange('groomName', e.target.value);
            }}
            error={!!errorMessages.groomName}
            helperText={errorMessages.groomName}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Venue"
            value={venue}
            onChange={(e) => {
              setVenue(e.target.value);
              handleFieldChange('venue', e.target.value);
            }}
            error={!!errorMessages.venue}
            helperText={errorMessages.venue}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleFieldChange('email', e.target.value);
            }}
            error={!!errorMessages.email}
            helperText={errorMessages.email}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handleFieldChange('phoneNumber', e.target.value);
            }}
            error={!!errorMessages.phoneNumber}
            helperText={errorMessages.phoneNumber}
            required
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" className="submit-button">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Wedding;
