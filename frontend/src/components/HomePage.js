import React, { useEffect } from 'react';
import '../styles/HomePage.css';

const HomePage = () => {

    useEffect(() => {
        const servicesSection = document.querySelector('.services');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        if (servicesSection) {
            observer.observe(servicesSection);
        }

        return () => {
            if (servicesSection) {
                observer.unobserve(servicesSection);
            }
        };
    }, []);

    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="logo">Bean's Bagels</div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/order">Order Now</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <section
                className="hero"
                style={{ backgroundImage: "url('/hero-background2.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">Handcrafted Bagels, Delivered Fresh</h1>
                    <p className="hero-subtitle">Start your weekend right with Bean's Bagels</p>
                    <a href="/order" className="hero-button">Order Now</a>
                </div>
            </section>

            <section className="services">
                <h2 className="services-title">Our Sandwiches</h2>
                <div className="service-cards">
                    <div className="service-card">
                        <h3>Fresh Ingredients</h3>
                        <p>We use locally sourced ingredients to bake the freshest bagels every morning.</p>
                    </div>
                    <div className="service-card">
                        <h3>Handcrafted</h3>
                        <p>Our sandwiches are carefully handcrafted to give you the best flavor and texture.</p>
                    </div>
                    <div className="service-card">
                        <h3>Fast Delivery</h3>
                        <p>Enjoy fast delivery right to your door, ensuring your bagels arrive warm and fresh.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Bean's Bagels | Follow us on <a href="https://instagram.com/beansbagelslaf" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
