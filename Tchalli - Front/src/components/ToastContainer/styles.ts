import styled, { css } from 'styled-components';

interface IContainer {
  haveMessages: boolean;
}
export const Container = styled.div<IContainer>`
  ${props =>
    !props.haveMessages &&
    css`
      display: none;
    `}
  position: absolute;
  right: 0;
  top: 0;

  padding: 30px;

  overflow: hidden;
`;
