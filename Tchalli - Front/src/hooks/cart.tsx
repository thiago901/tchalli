import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useToast } from './toast';
import api from '../services/api';
import { formatPrice } from '../util/format';

interface IStock {
  id: string;
  price: number;
  amount: number;
}
interface ICart {
  id: string;
  name: string;
  description: string;
  color: string;
  size: string;
  price: number;
  amount: number;
  priceFormatted: string;
  subTotal: string;
}
interface ICartTotal {
  total: number;
  totalFormatted: string;
}
interface IUpdateAmount {
  amount: number;
  product_id: string;
}
interface CartContextData {
  cart: ICart[];
  addToCart(id: string): Promise<unknown>;
  updateAmount(data: IUpdateAmount): Promise<void>;
  removeToCart(product_id: string): void;
  cartSize: number;
  cartTotal: ICartTotal;
  cleanCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ICart[]>(() => {
    const cartString = localStorage.getItem('@Tchalli:cart');

    const cartStore = cartString ? JSON.parse(cartString) : ([] as ICart[]);
    console.log(cartStore);

    return cartStore;
  });

  const [cartTotal, setCartTotal] = useState<ICartTotal>({} as ICartTotal);
  const { addToast } = useToast();

  useEffect(() => {
    const total = cart.reduce((acumulador, product) => {
      return acumulador + product.price * product.amount;
    }, 0);
    setCartTotal({
      total,
      totalFormatted: formatPrice(total),
    });
  }, [cart]);
  const updateAmount = useCallback(
    async ({ amount, product_id }: IUpdateAmount) => {
      if (amount <= 0) return;

      const stock = await api.get(`/stock/product/${product_id}`);
      const stockAmount = stock.data.amount;

      if (amount > stockAmount) {
        addToast({
          title: 'Quantidade solicitada fora de estoque',
          description: '',
          type: 'info',
        });
        return;
      }

      const newCart = cart.slice();
      const productIndex = newCart.findIndex(p => p.id === product_id);
      cart[productIndex].amount = amount;
      cart[productIndex].subTotal = formatPrice(
        amount * cart[productIndex].price,
      );
      setCart(newCart);
      localStorage.setItem('@Tchalli:cart', JSON.stringify(cart));
    },
    [addToast, cart],
  );

  const addToCart = useCallback(
    async (id: string) => {
      let cartString = localStorage.getItem('@Tchalli:cart');
      if (!cartString) {
        cartString = '[]';
      }
      const cartStore = JSON.parse(cartString);
      const productExist = cartStore.find((p: ICart) => id === p.id);
      const stock = await api.get<IStock>(`/stock/product/${id}`);
      const currentAmount = productExist ? Number(productExist.amount) : 0;
      const stockAmount = stock.data.amount;
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        addToast({
          title: 'Quantidade solicitada fora de estoque',
          description: '',
          type: 'info',
        });
        return;
      }

      if (productExist) {
        updateAmount({ amount, product_id: id });
      } else {
        const response = await api.get(`/products/${id}`);

        const data = {
          ...response.data,
          amount: 1,
          price: stock.data.price,
          priceFormatted: formatPrice(stock.data.price),
          subTotal: formatPrice(stock.data.price),
        };
        cartStore.push(data);
        setCart(cartStore);
        localStorage.setItem('@Tchalli:cart', JSON.stringify(cartStore));
      }
    },
    [addToast, updateAmount],
  );
  const removeToCart = useCallback(
    (product_id: string) => {
      const cartFiltered = cart.filter(c => c.id !== product_id);
      setCart(cartFiltered);
      localStorage.setItem('@Tchalli:cart', JSON.stringify(cartFiltered));
      addToast({
        title: 'Item Removido',
        description: '',
        type: 'info',
      });
    },
    [addToast, cart],
  );

  const cleanCart = useCallback(() => {
    localStorage.removeItem('@Tchalli:cart');
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateAmount,
        removeToCart,
        cartTotal,
        cartSize: cart.length,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('cartAuth must be used within an CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
