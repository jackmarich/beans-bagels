import React from 'react';

const MenuItemCard = ({ item, onClick }) => {
    return (
        <div className="menu-item-card" onClick={onClick}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
        </div>
    );
};

export default MenuItemCard;
