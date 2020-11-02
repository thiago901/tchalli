import React, { useCallback, useEffect, useState } from 'react';
import { FaShoppingCart, FaPlus, FaDropbox } from 'react-icons/fa';

import { useModal } from '../../hooks/modal';
import { useCart } from '../../hooks/cart';
import Header from '../../components/Header';
import ButtonFloat from '../../components/ButtonFloat';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { Container, Loading, ProductList, ButtonAdd, QtdStock } from './styles';
import FormModal from '../../components/FormModal';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface IStock {
  id: string;
  amount: number;
  price: number;
  availability: boolean;
}
interface IProduct {
  id: string;
  name: string;
  description: string;
  color: string;
  size: string;
  stock: IStock;
  formatPrice: string;
}
const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { addModal, closeModal } = useModal();

  const { addToCart } = useCart();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const response = await api.get<IProduct[]>('/products');
      const data = response.data.map(product => ({
        ...product,
        formatPrice: formatPrice(product.stock.price),
      }));
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleCreateProduct = useCallback(
    async data => {
      const product = await api.post('/products', {
        name: data.name,
        description: data.description,
        color: data.color,
        size: data.size,
      });
      await api.post('/acquisitions', {
        amount: data.amount,
        cost_price: data.cost_price,
        product_id: product.data.id,
      });
      const stock = await api.post('/stock', {
        amount: data.amount,
        price: data.price,
        product_id: product.data.id,
      });
      setProducts([
        ...products,
        {
          ...product.data,
          stock: {
            ...stock.data,
            price: Number(stock.data.price),
          },
        },
      ]);
      closeModal();
    },
    [closeModal, products],
  );

  const handleFormProduct = useCallback(() => {
    return addModal(
      <FormModal onSubmit={handleCreateProduct}>
        <h1>Novo Produto</h1>

        <Input name="name" placeholder="Nome do produto" />
        <Input name="description" placeholder="Descrição" />
        <Input name="color" placeholder="Cor" />
        <Input name="size" placeholder="Tamanho" />
        <Input name="amount" placeholder="Quantidade" />
        <Input name="cost_price" placeholder="Preço de Custo" />
        <Input name="price" placeholder="Preço de Venda" />
        <Button type="submit">Comprar</Button>
      </FormModal>,
    );
  }, [addModal, handleCreateProduct]);

  const handleUpdateProduct = useCallback(
    async data => {
      await api.post('/acquisitions', {
        amount: data.amount,
        cost_price: data.cost_price,
        product_id: data.id,
      });
      await api.post('/stock', {
        amount: data.amount,
        price: data.price,
        product_id: data.id,
      });
      closeModal();
    },
    [closeModal],
  );

  const handleFormAddProduct = useCallback(
    (product: IProduct) => {
      return addModal(
        <FormModal onSubmit={handleUpdateProduct}>
          <h1>{`Comprar ${product.name}`}</h1>

          <Input name="id" disabled hidden value={product.id} />

          <Input name="amount" placeholder="Quantidade" />
          <Input name="cost_price" placeholder="Preço de Custo" />
          <Input name="price" placeholder="Preço de Venda" />
          <Button type="submit">Comprar</Button>
        </FormModal>,
      );
    },
    [addModal, handleUpdateProduct],
  );

  const handdleAddProduct = useCallback(
    async id => {
      await addToCart(id);
    },
    [addToCart],
  );
  return (
    <>
      <Header />
      <Container>
        {loading ? (
          <Loading>
            <div />
            <div />
            <div />
            <div />
          </Loading>
        ) : (
          <ProductList>
            {products.map(product => (
              <li key={product.id}>
                <ButtonAdd
                  type="button"
                  onClick={() => handleFormAddProduct(product)}
                >
                  <FaPlus />
                </ButtonAdd>
                <img
                  src="https://d3ru0mmgfaaf43.cloudfront.net/Custom/Content/Products/50/44/504474_cropped-tenho-nem-roupa-para-isso-74957365934_m1_637042428549810565.jpg"
                  alt="Produto"
                />

                <strong>{product.name}</strong>
                <span>{product.formatPrice}</span>
                <QtdStock>
                  <FaDropbox size={30} />
                  {product.stock.amount}
                </QtdStock>
                <button
                  type="button"
                  onClick={() => handdleAddProduct(product.id)}
                >
                  <div>
                    <FaShoppingCart size={16} color="#fff" />
                    {0}
                  </div>
                  <span>ADICIONAR AO CARRINHO</span>
                </button>
              </li>
            ))}
          </ProductList>
        )}
        <ButtonFloat type="button" onClick={handleFormProduct}>
          <FaPlus size={20} />
        </ButtonFloat>
      </Container>
    </>
  );
};

export default Products;
