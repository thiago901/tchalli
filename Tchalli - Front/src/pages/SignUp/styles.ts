import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import background from '../../assets/icon-topgain.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;
export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: 300px;
  background-color: #192a3e;
`;

const appearFromRight = keyframes`
  from{
    transform: translateX(50px); opacity:0;
  }
  to{
    transform: translateX(0px); opacity:1;
  }
`;
export const AnimatedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 350px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
      font-size: 22px;
      color: #192a3e;
    }

    a {
      color: #f4ede8;
      text-decoration: none;
      display: block;
      margin-top: 24px;

      transition: color 0.5s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    display: block;
    color: #666;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      color: ${shade(0.2, '#666')};
    }
    svg {
      margin-right: 15px;
    }
  }
`;
