import styled, { css } from 'styled-components';

interface IContainer {
  visible: boolean;
}
export const Container = styled.div<IContainer>`
  ${props =>
    !props.visible &&
    css`
      display: none;
    `}
  border-radius:4px;
  position: absolute;
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  text-align: right;
`;
