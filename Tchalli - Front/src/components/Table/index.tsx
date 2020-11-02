import React from 'react';
import { v4 } from 'uuid';

import { Container, Table } from './styles';

interface ITable {
  header: Array<string>;
}
const TableComponent: React.FC<ITable> = ({ header, children }) => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            {header.map(h => (
              <th key={v4()}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </Container>
  );
};

export default TableComponent;
