import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  padding: 10px;
  width: 100%;
  color: #666368;

  & + div {
    margin-top: 8px;
  }
  label {
    display: flex;
    align-items: center;
    span {
      margin-left: 8px;
    }
    input {
      flex: 1;
      color: #192a3e;
      height: 100%;
    }
  }
`;
