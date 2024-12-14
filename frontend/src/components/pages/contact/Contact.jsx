import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import "./contact.css"; // Make sure to include the appropriate CSS file for styling

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
    subject: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear previous error on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phoneNumber: "", subject: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(formData.name.trim())) {
      newErrors.name = "Name should contain only alphabets and spaces";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data Submitted: ", formData);
      setSuccessMessage(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        phoneNumber: "",
        subject: "",
      });
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div className="contact-container">
      <Typography textAlign="center" variant="h4" fontSize="2.5rem" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit} className="contact-form">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              name="subject"
              fullWidth
              variant="outlined"
              value={formData.subject}
              onChange={handleChange}
              error={!!errors.subject}
              helperText={errors.subject}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "16px" }}
          fullWidth
        >
          Submit
        </Button>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(false)}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactForm;
