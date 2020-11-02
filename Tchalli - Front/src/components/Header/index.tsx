/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCart } from '../../hooks/cart';
import { Container, Cart, Menu, Logo } from './styles';

import logo from '../../assets/icon.png';

interface IUser {
  id: string;
  provider: boolean;
}
const Header: React.FC = () => {
  const { cartSize } = useCart();
  return (
    <Container>
      <Logo to="/">
        <img src={logo} alt="Tchalli" />
        <h1>T'Challi</h1>
      </Logo>
      <Menu>
        <Link to="/sales">Vendas</Link>
        <Link to="/dashboard">Dashboard</Link>
      </Menu>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{`${cartSize || 0} itens`}</span>
        </div>
        <FaShoppingBasket color="#fff" size={36} />
      </Cart>
    </Container>
  );
};

export default Header;
