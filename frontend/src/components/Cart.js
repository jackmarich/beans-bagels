import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cart }) => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        dormRoom: '',
        date: 'Saturday',
        time: '9:00 AM',
        phoneNumber: '',
    });

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const orderData = {
            items: cart,
            customerDetails: userInfo,
            totalPrice,
        };

        axios.post('http://127.0.0.1:5000/api/order', orderData)
            .then(response => {
                alert(response.data.message || "Order placed successfully!");
            })
            .catch(error => {
                console.error("There was an error submitting your order!", error);
                alert("There was an error placing your order. Please try again.");
            });
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price.toFixed(2)}
                            <ul>
                                {Object.keys(item.customizations).map(key => (
                                    <li key={key}>{key}: {item.customizations[key]}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${totalPrice.toFixed(2)}</p>

            <div className="user-info">
                <h3>Your Details</h3>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={userInfo.fullName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="dormRoom"
                    placeholder="Dorm & Room Number"
                    value={userInfo.dormRoom}
                    onChange={handleInputChange}
                />
                <select name="date" value={userInfo.date} onChange={handleInputChange}>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
                <select name="time" value={userInfo.time} onChange={handleInputChange}>
                    <option value="9:00 AM">9:00 AM</option>
                    {/* Add more time options */}
                </select>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                />
                <button className="confirm-button" onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
        </div>
    );
};

export default Cart;
