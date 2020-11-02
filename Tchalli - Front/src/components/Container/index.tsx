import React from 'react';

import { Wrapper } from './styles';

const Container: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
