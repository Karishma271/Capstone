import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/login/Login';
import Signup from './components/pages/signup/Signup';
import Header from './components/header/Header';
import UtsavVibesAboutUs from './components/pages/about/About';
import ContactForm from './components/pages/contact/Contact';
import EventPage from './components/pages/events/Events';
import Wedding from './components/pages/events/wedding';
import Birthday from './components/pages/events/birthday';
import Corporate from './components/pages/events/corporate';
import HomePage from './components/pages/home/Home';
import Footer from './components/footer/Footer';
import Venue from './components/admin/Venue';
import User from './components/admin/User';
import Dashboard from './components/admin/Dashboard';
import Organizer from './components/admin/Organizer';  // Main Organizer Page (Organizer.js)
import OrganizerForm from './components/admin/OrganizerForm';  // Add/Edit Organizer (OrganizerForm.js)
import AdminLogin from './components/admin/AdminLogin';
import ListFeatured from './components/pages/listfeatured/ListFeatured';
import CheckoutPage from './components/pages/checkout/CheckoutPage';
import VenuePage from './components/pages/venuePage/VenuePage';
import VenueForm from './components/admin/VenueForm';  


function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  return (  
    <Router>
      <div className="App">
        <Header className="header" userRole={userRole}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/about" element={<UtsavVibesAboutUs/>} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/events" element={<EventPage/>} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/birthday" element={<Birthday />} />
          <Route path="/corporate" element={<Corporate />} />
         
          <Route path='/User' element={<User />} />
          <Route path='/Dashboard' element={<Dashboard/>}/>

          {/* Routes for Organizer */}
          <Route path='/Organizers' element={<Organizer />} />  {/* List of organizers */}
          <Route path='/Organizers/new' element={<OrganizerForm />} />  {/* Add new organizer */}
          <Route path='/Organizers/edit/:id' element={<OrganizerForm />} />  {/* Edit existing organizer */}

          {/* Routes for Venue */}
          <Route path='/Venues' element={<Venue />} />  {/* List of venue */}
          <Route path='/Venues/new' element={<VenueForm />} />  {/* Add new Venue */}
          <Route path='/Venues/edit/:id' element={<VenueForm />} />  {/* Edit existing Venue */}
          
          <Route path='/AdminLogin' element={<AdminLogin/>}/>
          <Route path="/fhalls/:id" element={<ListFeatured/>} />
          <Route path='/CheckoutPage' element={<CheckoutPage/>} />
          <Route path='/VenuePage' element={<VenuePage />}  />
        </Routes>
      </div>
      <Footer className="footer" />
    </Router>
  );
}

export default App;
