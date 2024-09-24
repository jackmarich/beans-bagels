import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ContactUs.css'; // Link to the CSS file

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://127.0.0.1:5000/api/contact', formData);
            setSuccess(true);
            setError('');
        } catch (err) {
            setError('There was an issue sending your message. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="contact-page">
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

            <div className="contact-container">
                <h2>Contact Us</h2>

                {success ? (
                    <p className="success-message">Thank you! Your message has been sent.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Message:
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button type="submit" className="submit-button">Send Message</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                )}

                {/* Instagram Link */}
                <div className="instagram-link">
                    <h3>Follow us on Instagram!</h3>
                    <a
                        href="https://instagram.com/beansbagelslaf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Our Instagram
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Bean's Bagels | Follow us on <a href="https://instagram.com/beansbagelslaf" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                </div>
            </footer>
        </div>
    );
};

export default ContactUs;
