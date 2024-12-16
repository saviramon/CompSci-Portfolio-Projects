import React, { useState } from 'react';
import OrderQuantity from './OrderQuantity';

function OrderRow({ product }) {
    const [quantity, setQuantity] = useState(0);

    return (
        <tr>
            <td>{product.company}</td>
            <td>{product.product}</td>
            <td>
                {product.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                })}
            </td>
            <td>
                <OrderQuantity quantity={quantity} setQuantity={setQuantity} />
            </td>
        </tr>
    );
}

export default OrderRow;
