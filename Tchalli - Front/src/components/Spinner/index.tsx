import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

const Spinner: React.FC = () => {
  return (
    <Container>
      <FaSpinner size={50} />
    </Container>
  );
};

export default Spinner;
