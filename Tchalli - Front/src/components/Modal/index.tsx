import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  openModal: boolean;
  element: JSX.Element;
  closeModal(): void;
}
const Modal: React.FC<InputProps> = ({ element, openModal, closeModal }) => {
  return (
    <Container visible={openModal}>
      <button type="button" onClick={() => closeModal()}>
        X
      </button>
      {element}
    </Container>
  );
};

export default Modal;
