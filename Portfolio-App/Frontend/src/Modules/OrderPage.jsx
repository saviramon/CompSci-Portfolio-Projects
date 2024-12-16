import products from '../data/products.js';
import OrderRow from './OrderRow.jsx';

function OrderPage() {
    return (
    <>
      <h2>Order Here</h2>
      <article>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => 
              <OrderRow 
                product={product} 
                key={product.id}
              />
            )}
          </tbody>
        </table>
      </article>
    </>
    );
}

export default OrderPage;
