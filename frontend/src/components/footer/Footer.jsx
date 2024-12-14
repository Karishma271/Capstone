import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Text */}
        <div className="footer-text">
          <Typography variant="h6" component="p" align="center">
            &copy; 2024 UtsavVibes. All rights reserved.
          </Typography>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <Link to="https://www.facebook.com" aria-label="Visit our Facebook page">
            <Facebook />
          </Link>
          <Link to="https://www.twitter.com" aria-label="Visit our Twitter page">
            <Twitter />
          </Link>
          <Link to="https://www.linkedin.com" aria-label="Visit our LinkedIn page">
            <LinkedIn />
          </Link>
          <Link to="https://www.instagram.com" aria-label="Visit our Instagram page">
            <Instagram />
          </Link>
        </div>

        {/* Footer Buttons */}
        <div className="footer-buttons">
          <Button variant="outlined" color="primary" className="footer-btn">
            Privacy Policy
          </Button>
          <Button variant="outlined" color="primary" className="footer-btn">
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
