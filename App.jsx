import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs';
import MainPage1 from './components/MainPage1';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Blog from './components/Blog';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage1 />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer /> {/* Footer is included here to be shown on all pages */}
    </Router>
  );
}

export default App;
