import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isVisibility?: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  width: 100%;

  color: #666368;
  border: 1px solid #666368;

  ${props =>
    props.isVisibility &&
    css`
      visibility: hidden;
      display: none;
    `}
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #192a3e;
      border-color: #192a3e;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #192a3e;
    `}


  & + div {
    margin-top: 8px;
  }

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #192a3e;
    height: 100%;
    &::placeholder {
      color: #666368;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    color: #fff;
    background: #c53030;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
