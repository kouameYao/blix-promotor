'use client';

import React, { PropsWithChildren } from 'react';

import NuqsProvider from './nuqs-provider';
import ReactQueryProvider from './react-query-provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <NuqsProvider>{children}</NuqsProvider>
    </ReactQueryProvider>
  );
};

export default AppProvider;
