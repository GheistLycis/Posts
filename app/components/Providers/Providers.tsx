'use client';
import { HeroUIProvider } from '@heroui/react';
import { GregorianCalendar } from '@internationalized/date';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CSSProperties, FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000, refetchOnWindowFocus: false, retry: false },
    },
  });
  const toasterStyle: CSSProperties = {
    color: 'black',
    bottom: 48,
  };

  return (
    <HeroUIProvider
      createCalendar={() => new GregorianCalendar()}
      locale="pt-BR"
    >
      <QueryClientProvider client={queryClient}>
        <Toaster containerStyle={toasterStyle} />

        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default Providers;
