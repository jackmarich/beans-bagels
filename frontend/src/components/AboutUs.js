import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">Bean's Bagels</div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/order">Order Now</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            {/* About Us Section */}
            <section className="about-us-hero">
                <div className="about-hero-content">
                    <h1 className="about-hero-title">About Us</h1>
                    <p className="about-hero-subtitle">We are passionate about delivering fresh, handcrafted bagels right to your door.</p>
                </div>
            </section>

            {/* About Us Info */}
            <section className="about-info">
                <h2 className="about-title">Our Story</h2>
                <p className="about-text">Bean's Bagels was founded by Julian Shorter and Jack Marich, two students at Lafayette College. We were tired of waking up on weekends feeling hungry and sluggish, and we recognized the need for a solution to revitalize our mornings.</p>
                <p className="about-text">As natives of New Jersey, breakfast sandwiches have been a staple of our diet, whether from our local bagel store or homemade. We decided it was time to bring our expertise to Lafayette and assist students like us, exactly when they need it most.</p>
                <p className="about-text">We aim to expand Bean's Bagels across the entire campus, and your support is what drives us forward every weekend. If you enjoy our sandwiches, please spread the word to your friends, helping us continue to deliver awesome breakfast options to Lafayette!</p>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Bean's Bagels | Follow us on <a href="https://instagram.com/beansbagelslaf" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
