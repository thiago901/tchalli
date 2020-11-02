import React, { useCallback } from 'react';
import {
  FaPlusCircle,
  FaMinusCircle,
  FaShoppingCart,
  FaTrash,
} from 'react-icons/fa';

import { useCart } from '../../hooks/cart';
import Header from '../../components/Header';

import { Container, CartEmpy, ProductTable, Total } from './styles';
import api from '../../services/api';

interface ICart {
  id: string;
  name: string;
  description: string;
  color: string;
  size: string;
  price: number;
  amount: number;
}
const Cart: React.FC = () => {
  const { cart, updateAmount, removeToCart, cartTotal, cleanCart } = useCart();
  const handleFinishSale = useCallback(async () => {
    const cartAmount = cart.reduce((acum, p) => acum + p.amount, 0);
    const sale = await api.post('/sales', {
      amount: cartAmount,
      price: cartTotal.total,
      type: 'Dinheiro',
    });
    const detail = cart.map(p => ({
      amount: p.amount,
      price: p.price,
      product_id: p.id,
      sale_id: sale.data.id,
    }));

    await api.post('/salesdetail', { saleDetail: detail });
    cleanCart();
  }, [cart, cartTotal.total, cleanCart]);
  const decrement = useCallback(
    async (product: ICart) => {
      await updateAmount({
        product_id: product.id,
        amount: product.amount - 1,
      });
    },
    [updateAmount],
  );
  const increment = useCallback(
    async (product: ICart) => {
      await updateAmount({
        product_id: product.id,
        amount: product.amount + 1,
      });
    },
    [updateAmount],
  );
  const removeFromCart = useCallback(
    id => {
      removeToCart(id);
    },
    [removeToCart],
  );
  return (
    <>
      <Header />
      <Container>
        {cart.length > 0 ? (
          <>
            <ProductTable>
              <thead>
                <tr>
                  <th> </th>
                  <th>PRODUTO</th>
                  <th>QTD</th>
                  <th>SUBTOTAL</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {cart.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src="https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg"
                        alt="Produto"
                      />
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                      <span>{product.priceFormatted}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          type="button"
                          onClick={() => decrement(product)}
                        >
                          <FaMinusCircle size={20} color="#7159c1" />
                        </button>
                        <input type="number" readOnly value={product.amount} />
                        <button
                          type="button"
                          onClick={() => increment(product)}
                        >
                          <FaPlusCircle size={20} color="#7159c1" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <strong>{product.subTotal}</strong>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <FaTrash size={20} color="#7159c1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductTable>
            <footer>
              <button type="button" onClick={handleFinishSale}>
                Finalizar Pedido
              </button>
              <Total>
                <span>Total</span>
                <strong>{cartTotal.totalFormatted}</strong>
              </Total>
            </footer>
          </>
        ) : (
          <CartEmpy>
            <div>
              <FaShoppingCart size={100} />
              <strong>Seu carrinho está vazio</strong>
            </div>
          </CartEmpy>
        )}
      </Container>
    </>
  );
};

export default Cart;
