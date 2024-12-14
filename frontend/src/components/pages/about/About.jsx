import React from "react";
import "./about.css";
import karishmaImage from "../../../assets/images/Karishma.jpg";
import cracyImage from "../../../assets/images/Cracy.jpg";
import shailyImage from "../../../assets/images/Shaily.jpg";
import urviImage from "../../../assets/images/Urvi.jpg";
import { Typography, Container, Grid, Card, CardContent, CardMedia, Divider } from "@mui/material";

const UtsavVibesAboutUs = () => {
  // Reusable data for team members
  const teamMembers = [
    { name: "Karishma Patel", role: "Full Stack Developer", image: karishmaImage },
    { name: "Cracy Macwan", role: "Full Stack Developer", image: cracyImage },
    { name: "Shaily Shah", role: "Full Stack Developer", image: shailyImage },
    { name: "Urvi Patel", role: "Full Stack Developer", image: urviImage },
  ];

  return (
    <div className="about-us-container">
      <Container>
        {/* About Section */}
        <section className="about-us-section">
          <Typography variant="h2" fontSize="2rem" mb={4} gutterBottom textAlign="center">
            About UtsavVibes
          </Typography>
          <Typography variant="body1" className="para" paragraph>
            UtsavVibes brings your event visions to life with our expert planning and management services.
            We meticulously handle every detail, ensuring that your occasion is not just an event but an
            unforgettable experience. Trust UtsavVibes to turn your celebrations into cherished memories
            with our professional and personalized approach to event management.
          </Typography>
          <Typography variant="body1" paragraph>
            At UtsavVibes, our mission is to bring your dreams to life, whether it's a wedding, corporate
            event, or any special occasion. With a dedicated team of event experts, we meticulously handle
            every detail, ensuring a seamless and stress-free experience for our clients.
          </Typography>
        </section>

        <Divider sx={{ my: 4, backgroundColor: "red", height: "2px" }} />

        {/* Team Section */}
        <section className="team-section">
          <Typography variant="h3" textAlign="center" mb={4}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={`${member.name}`}
                    height="140"
                    image={member.image}
                  />
                  <CardContent>
                    <Typography variant="h5">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        <Divider sx={{ my: 4, backgroundColor: "red", height: "2px" }} />

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <Typography variant="h3" textAlign="center" mb={4}>
            What Our Clients Say
          </Typography>
          <div className="testimonial">
            <Typography variant="body1" component="blockquote" paragraph>
              "UtsavVibes made our wedding day absolutely magical. Their attention to detail and creativity
              exceeded our expectations, turning every moment into an enchanting experience. From the décor
              to the logistics, every aspect was flawlessly managed, allowing us to fully enjoy our special
              day without any stress. We couldn't have asked for a more perfect celebration."
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">- Delighted Duo</Typography>
          </div>
          <div className="testimonial">
            <Typography variant="body1" component="blockquote" paragraph>
              "We couldn't have pulled off our corporate event without UtsavVibes. Their professionalism
              and expertise were outstanding, ensuring everything ran smoothly and effortlessly. Their
              meticulous planning and execution allowed us to focus on our objectives while they handled
              all the details seamlessly. Highly recommend their services!"
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">- Satisfied Client</Typography>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default UtsavVibesAboutUs;
