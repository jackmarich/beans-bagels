import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import OrderPage from './OrderPage';
import ContactUs from './ContactUs';


function App() {
  return (
    <Router>
      {/* Define Routes */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
