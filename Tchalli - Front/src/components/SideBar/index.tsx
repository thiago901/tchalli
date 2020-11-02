import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { Container, SideBarContent, Logo } from './styles';
import logo from '../../assets/icon-topgain.svg';

interface IUser {
  id: string;
  provider: boolean;
}

const SideBar: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <SideBarContent>
        <Logo>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Logo>
        <section>
          <Link to="/">Produtos</Link>
          <Link to="/sales">Vendasa</Link>

          <button type="button" onClick={signOut}>
            Sair
          </button>
        </section>
      </SideBarContent>
    </Container>
  );
};

export default SideBar;
