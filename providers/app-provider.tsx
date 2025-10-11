'use client';

import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import NuqsProvider from './nuqs-provider';
import ReactQueryProvider from './react-query-provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <NuqsProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500'
            }
          }}
        />
      </NuqsProvider>
    </ReactQueryProvider>
  );
};

export default AppProvider;
