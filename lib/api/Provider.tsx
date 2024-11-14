'use client';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { ReactNode } from 'react';
const Provider = ({children}:{children:Readonly<ReactNode>}) => {
  const queryclient = new QueryClient();
  return (
     <QueryClientProvider client={queryclient}>
           {children}
     </QueryClientProvider>
  )
}

export default Provider;
