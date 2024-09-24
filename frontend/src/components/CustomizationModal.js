import React, { useState } from 'react';

const CustomizationModal = ({ item, onAddToCart, onClose }) => {
    const [customizations, setCustomizations] = useState({
        meat: '',
        toasted: false,
        spread: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomizations({ ...customizations, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAdd = () => {
        onAddToCart(item, customizations);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{item.name}</h2>

                {/* Customization Options */}
                {item.name === 'Breakfast Sandwich' && (
                    <div>
                        <label>
                            Meat:
                            <select name="meat" value={customizations.meat} onChange={handleChange}>
                                <option value="">None</option>
                                <option value="bacon">Bacon</option>
                                <option value="sausage">Sausage</option>
                                <option value="pork roll">Pork Roll</option>
                            </select>
                        </label>
                        <label>
                            Toasted:
                            <input type="checkbox" name="toasted" checked={customizations.toasted} onChange={handleChange} />
                        </label>
                    </div>
                )}

                {item.name === 'Bagel' && (
                    <div>
                        <label>
                            Spread:
                            <select name="spread" value={customizations.spread} onChange={handleChange}>
                                <option value="">None</option>
                                <option value="butter">Butter</option>
                                <option value="cream cheese">Cream Cheese</option>
                            </select>
                        </label>
                    </div>
                )}

                <button className="add-button" onClick={handleAdd}>Add to Cart</button>
                <button className="close-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default CustomizationModal;
