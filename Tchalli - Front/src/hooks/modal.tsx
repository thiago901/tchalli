import React, { createContext, useContext, useCallback, useState } from 'react';

import ModalContainer from '../components/Modal';

interface ModalContexData {
  addModal(content: JSX.Element): void;
  closeModal(): void;
}
const ModalContext = createContext<ModalContexData>({} as ModalContexData);

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentModal, setContentModal] = useState<JSX.Element>(<></>);
  const addModal = useCallback((content: JSX.Element) => {
    setContentModal(content);
    setIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContentModal(<></>);
  }, []);

  return (
    <ModalContext.Provider value={{ addModal, closeModal }}>
      {children}
      <ModalContainer
        element={contentModal}
        openModal={isOpen}
        closeModal={closeModal}
      />
    </ModalContext.Provider>
  );
};

function useModal(): ModalContexData {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export { ModalProvider, useModal };
