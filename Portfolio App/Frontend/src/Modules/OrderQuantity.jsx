import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function OrderQuantity({ quantity, setQuantity }) {
    const increment = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="clicker" style={{ display: 'flex', alignItems: 'center' }}>
            <i onClick={decrement} style={{ cursor: 'pointer' }}>
                <FaMinus />
            </i>
            <p>{quantity}</p>
            <i onClick={increment} style={{ cursor: 'pointer' }}>
                <FaPlus />
            </i>
        </div>
    );
}

export default OrderQuantity;
