import React, { useEffect, useState } from 'react';
import { activeChain } from '../web3/wagmi';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Derived from the env-configured chain (Base mainnet or Base Sepolia).
const BASE_CHAIN_ID = `0x${activeChain.id.toString(16)}`;

const BASE_PARAMS = {
  chainId: BASE_CHAIN_ID,
  chainName: activeChain.name,
  nativeCurrency: activeChain.nativeCurrency,
  rpcUrls: [
    (import.meta.env.VITE_BASE_RPC_URL as string) || activeChain.rpcUrls.default.http[0],
  ],
  blockExplorerUrls: activeChain.blockExplorers?.default.url
    ? [activeChain.blockExplorers.default.url]
    : [],
};

type ProviderDetail = {
  info?: {
    name?: string;
    rdns?: string;
    uuid?: string;
    icon?: string;
  };
  provider?: any;
};

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const FixedWalletButton: React.FC = () => {
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('');
  const [status, setStatus] = useState('Ready');
  const [provider, setProvider] = useState<any>(null);

  const findProvider = () => {
    const eth = window.ethereum;

    if (!eth) return null;

    if (eth.isCoinbaseWallet) return eth;

    if (Array.isArray(eth.providers)) {
      const coinbase = eth.providers.find((p: any) => p?.isCoinbaseWallet);
      if (coinbase) return coinbase;

      const metamask = eth.providers.find((p: any) => p?.isMetaMask);
      if (metamask) return metamask;

      return eth.providers[0];
    }

    return eth;
  };

  const openCoinbaseWallet = () => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `https://go.cb-w.com/dapp?cb_url=${url}`;
  };

  const refreshWallet = async (manualProvider?: any) => {
    const p = manualProvider || provider || findProvider();

    if (!p) {
      setStatus('No injected wallet');
      return;
    }

    setProvider(p);

    try {
      const accounts = await p.request({ method: 'eth_accounts' });
      const currentChain = await p.request({ method: 'eth_chainId' });

      setAddress(accounts?.[0] || '');
      setChainId(currentChain || '');

      if (accounts?.[0]) {
        setStatus(currentChain === BASE_CHAIN_ID ? 'Connected on Base' : 'Wallet connected');
      } else {
        setStatus('Wallet detected');
      }
    } catch {
      setStatus('Wallet check failed');
    }
  };

  useEffect(() => {
    const p = findProvider();
    if (p) {
      setProvider(p);
      refreshWallet(p);
    } else {
      setStatus('Open in wallet browser');
    }

    const onAnnounce = (event: any) => {
      const detail = event.detail as ProviderDetail;
      const announced = detail?.provider;
      const name = detail?.info?.name || '';
      const rdns = detail?.info?.rdns || '';

      if (
        announced &&
        (announced.isCoinbaseWallet ||
          name.toLowerCase().includes('coinbase') ||
          rdns.toLowerCase().includes('coinbase'))
      ) {
        setProvider(announced);
        refreshWallet(announced);
      }
    };

    window.addEventListener('eip6963:announceProvider', onAnnounce as EventListener);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => {
      window.removeEventListener('eip6963:announceProvider', onAnnounce as EventListener);
    };
  }, []);

  useEffect(() => {
    const p = provider;
    if (!p) return;

    const onAccountsChanged = (accounts: string[]) => {
      setAddress(accounts?.[0] || '');
      setStatus(accounts?.[0] ? 'Account connected' : 'Disconnected');
    };

    const onChainChanged = (nextChainId: string) => {
      setChainId(nextChainId);
      setStatus(nextChainId === BASE_CHAIN_ID ? 'Connected on Base' : 'Wrong network');
    };

    p.on?.('accountsChanged', onAccountsChanged);
    p.on?.('chainChanged', onChainChanged);

    return () => {
      p.removeListener?.('accountsChanged', onAccountsChanged);
      p.removeListener?.('chainChanged', onChainChanged);
    };
  }, [provider]);

  const switchToBase = async () => {
    const p = provider || findProvider();

    if (!p) {
      setStatus('Opening Coinbase...');
      openCoinbaseWallet();
      return;
    }

    setProvider(p);

    try {
      setStatus('Switching Base...');
      await p.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_CHAIN_ID }],
      });

      await refreshWallet(p);
      setStatus('Connected on Base');
    } catch (err: any) {
      if (err?.code === 4902) {
        try {
          await p.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_PARAMS],
          });

          await refreshWallet(p);
          setStatus('Base added');
        } catch {
          setStatus('Add Base rejected');
        }
      } else {
        setStatus('Switch rejected');
      }
    }
  };

  const connectWallet = async () => {
    let p = provider || findProvider();

    if (!p) {
      setStatus('Opening Coinbase...');
      openCoinbaseWallet();
      return;
    }

    setProvider(p);

    try {
      setStatus('Requesting account...');

      const accounts = await p.request({
        method: 'eth_requestAccounts',
      });

      const currentChain = await p.request({
        method: 'eth_chainId',
      });

      setAddress(accounts?.[0] || '');
      setChainId(currentChain || '');

      if (currentChain !== BASE_CHAIN_ID) {
        await switchToBase();
      } else {
        setStatus('Connected on Base');
      }
    } catch (err: any) {
      const msg = String(err?.message || '').toLowerCase();

      if (msg.includes('user rejected') || err?.code === 4001) {
        setStatus('Connection rejected');
      } else {
        setStatus('Open Coinbase browser');
        openCoinbaseWallet();
      }
    }
  };

  const isBase = chainId === BASE_CHAIN_ID;

  return (
    <div className="fixed top-4 right-16 z-[99999] flex flex-col items-end gap-1 sm:right-6">
      {address ? (
        <div className="flex items-center gap-2">
          {!isBase && (
            <button
              type="button"
              onClick={switchToBase}
              className="rounded border border-yellow-400/60 bg-yellow-400/15 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-yellow-200 shadow-lg backdrop-blur transition hover:bg-yellow-400/25"
            >
              Switch Base
            </button>
          )}

          <button
            type="button"
            onClick={() => refreshWallet()}
            className="rounded border border-cyan-300/60 bg-blue-600/30 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-cyan-100 shadow-lg backdrop-blur transition hover:bg-blue-500/40"
            title={address}
          >
            {isBase ? 'Base ' : ''}
            {shortAddress(address)}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={connectWallet}
          className="rounded border border-cyan-300/70 bg-blue-600/35 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-cyan-100 shadow-lg backdrop-blur transition hover:border-cyan-200 hover:bg-blue-500/45 active:scale-95"
        >
          Connect Wallet
        </button>
      )}

      {status && (
        <span className="max-w-[190px] rounded bg-black/75 px-2 py-1 text-right font-mono text-[9px] uppercase tracking-wider text-cyan-100">
          {status}
        </span>
      )}
    </div>
  );
};

export default FixedWalletButton;
