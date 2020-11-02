import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 16px;
  background: var(--primary-color);
  /* background: #192a3e; */
  border: 0;
  height: 46px;
  padding: 0 16px;
  border-radius: 4px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  transition: background-color 0.5s;
  &:hover {
    background: ${shade(0.2, '#192a3e')};
  }
`;
