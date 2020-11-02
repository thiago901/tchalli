import React from 'react';
import { FormProps } from '@unform/core';
import { Container } from './styles';

type Form = FormProps;
const FormModal: React.FC<Form> = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};

export default FormModal;
