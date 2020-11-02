import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  img {
    height: 50px;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  div {
    margin-right: 10px;
    text-align: right;
    strong {
      color: #fff;
      display: block;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
export const Menu = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  a {
    color: #fff;
    font-size: 20px;
    margin-right: 10px;
  }
`;
export const Logo = styled(Link)`
  @import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 10px;
  color: #fff;
  h1 {
    margin-left: 10px;
    font-family: 'Courgette', cursive;
  }
`;
