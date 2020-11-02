import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow-y: auto;
`;
export const Table = styled.table`
  width: 100%;
  max-height: 90%;

  thead {
    text-align: center;
    font-size: 12px;
    th {
      padding: 5px;
      font-size: 14px;
      position: sticky;
      top: 0;
      background: #fff;
    }
  }
  tbody {
    td {
      text-align: center;
      padding: 5px;
      background: #fff;
    }
  }
`;
