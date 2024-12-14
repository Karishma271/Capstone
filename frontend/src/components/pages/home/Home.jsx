// HomePage.js
import React from 'react';
import eventImage1 from '../../../assets/images/event1.png';
import eventImage2 from '../../../assets/images/event2.png';
import eventImage3 from '../../../assets/images/event3.png';
import eventImage4 from '../../../assets/images/event4.png';
import ImageSlideshow from '../../ImageSlideshow';
import './home.css';
import EventPage from '../events/Events';
import VenueList from '../venue/VenueList';


function HomePage() {
  const images = [
    eventImage1,
    eventImage2,
    eventImage3,
    eventImage4,
  ];

  return (
    <div className='content'>
      <main>
      <div className='mainContainer'>
      <div className='imgContainer'>
      <div className='imgSlider'>
      <ImageSlideshow className='img1' images={images} />
      </div>
      </div>
    </div>

    <div className='event'>
      <EventPage/>
    </div>
    <div className='venue'>
      <VenueList />
    </div>
    
    <div className='sectionContainer'>
        <section className='homeSection'>
          <h2>About Us</h2>
          <p>
          UtsavVibes Events crafts unforgettable experiences. From corporate gatherings to magical weddings, 
          our expert team ensures seamless, personalized events that reflect your unique style. Join us in 
          creating lasting memories with UtsavVibes, where every detail is tailored to perfection and every 
          moment is unforgettable.
          </p>
        </section>
        <section className='homeSection'>
          <h2>Services</h2>
          <p>
          UtsavVibes Events caters to your unique needs with a diverse array of services. We offer comprehensive 
          event planning and execution, ensuring that every occasion is seamless and unforgettable for you and 
          your guests. Let us handle the details while you enjoy the experience.
          </p>
        </section>
        <section className='homeSection'>
          <h2>Contact Us</h2>
          <p>
          For any inquiries or to get in touch with us, please don't hesitate to reach out. We're excited to hear from you and help make your event dreams a reality.
          </p>
        </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
