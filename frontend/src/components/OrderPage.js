import React, { useState } from 'react';
import MenuItemCard from './MenuItemCard';
import CustomizationModal from './CustomizationModal';
import Cart from './Cart';
import '../styles/OrderPage.css';

const menuItems = [
    { id: 1, name: 'Breakfast Sandwich', price: 7, image: '/images/sandwich.png' },
    { id: 2, name: 'Bagel', price: 3, image: '/images/bagel.png' },
    { id: 3, name: 'Drink', price: 2, image: '/images/drink.png' },
    { id: 4, name: 'Hashbrown on Side', price: 1, image: '/images/hashbrown.png' },
];

const OrderPage = () => {
    const [selectedItem, setSelectedItem] = useState(null); // For modal
    const [cart, setCart] = useState([]); // For cart

    const handleAddToCart = (item, customizations) => {
        setCart([...cart, { ...item, customizations }]);
        setSelectedItem(null); // Close modal
    };

    return (
        <div className="order-page">
            <nav className="navbar">
                <div className="logo">Bean's Bagels</div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/order">Order Now</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <div className="order-layout">
                <div className="menu-items">
                    <h2>Order Your Food</h2>
                    <div className="menu-grid">
                        {menuItems.map(item => (
                            <MenuItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                        ))}
                    </div>
                </div>

                <div className="user-info-section">
                    <Cart cart={cart} />
                </div>
            </div>

            {/* Customization Modal */}
            {selectedItem && (
                <CustomizationModal
                    item={selectedItem}
                    onAddToCart={handleAddToCart}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Bean's Bagels | Follow us on <a href="https://instagram.com/beansbagelslaf" target="_blank" rel="noopener noreferrer">Instagram</a></p>
                </div>
            </footer>
        </div>
    );
};

export default OrderPage;
