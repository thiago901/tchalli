import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation-name: loading;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes loading {
    to {
      transform: rotate(360deg);
    }
  }
`;
