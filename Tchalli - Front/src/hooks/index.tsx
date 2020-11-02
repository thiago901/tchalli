import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ModalProvider } from './modal';
import { CacheProvider } from './cache';
import { CartProvider } from './cart';

const AppProvider: React.FC = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <CacheProvider>
          <ToastProvider>
            <ModalProvider>
              <CartProvider>{children}</CartProvider>
            </ModalProvider>
          </ToastProvider>
        </CacheProvider>
      </AuthProvider>
    </>
  );
};

export default AppProvider;
