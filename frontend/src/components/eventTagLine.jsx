import React from 'react';
import styled from 'styled-components';

const EventTaglineContainer = styled.div`
  background-size: cover;
  background-position: center;
  color: grey;
  text-align: center;
  padding: 20px 0;
`;

const Tagline = styled.h1`
  font-size: 36px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 20px;
`;

const EventTagline = () => {
  return (
    <EventTaglineContainer>
      <Tagline>UtsavVibes Event Hub</Tagline>
      <Description>Bringing your dreams to life, one unforgettable event at a time.
      Let me know if there's anything else you'd like to tweak!</Description>
    </EventTaglineContainer>
  );
};

export default EventTagline;
