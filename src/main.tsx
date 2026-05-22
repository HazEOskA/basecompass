import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FixedWalletButton from './components/FixedWalletButton';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './web3/wagmi';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <><FixedWalletButton /><App /></>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
