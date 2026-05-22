import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const BASE_CHAIN_ID = '0x2105';

const BASE_PARAMS = {
  chainId: BASE_CHAIN_ID,
  chainName: 'Base',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org'],
};

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const FixedWalletButton: React.FC = () => {
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('');
  const [status, setStatus] = useState('');

  const refreshWallet = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const currentChain = await window.ethereum.request({ method: 'eth_chainId' });

      setAddress(accounts?.[0] || '');
      setChainId(currentChain || '');
    } catch {
      setStatus('Wallet check failed');
    }
  };

  useEffect(() => {
    refreshWallet();

    if (!window.ethereum) return;

    const onAccountsChanged = (accounts: string[]) => {
      setAddress(accounts?.[0] || '');
    };

    const onChainChanged = (nextChainId: string) => {
      setChainId(nextChainId);
    };

    window.ethereum.on?.('accountsChanged', onAccountsChanged);
    window.ethereum.on?.('chainChanged', onChainChanged);

    return () => {
      window.ethereum?.removeListener?.('accountsChanged', onAccountsChanged);
      window.ethereum?.removeListener?.('chainChanged', onChainChanged);
    };
  }, []);

  const openCoinbaseWallet = () => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `https://go.cb-w.com/dapp?cb_url=${url}`;
  };

  const switchToBase = async () => {
    if (!window.ethereum) {
      setStatus('Open in Coinbase Wallet');
      openCoinbaseWallet();
      return;
    }

    try {
      setStatus('Switching Base...');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_CHAIN_ID }],
      });
      await refreshWallet();
      setStatus('');
    } catch (err: any) {
      if (err?.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_PARAMS],
          });
          await refreshWallet();
          setStatus('');
        } catch {
          setStatus('Add Base failed');
        }
      } else {
        setStatus('Switch rejected');
      }
    }
  };

  const connectWallet = async () => {
    setStatus('');

    if (!window.ethereum) {
      setStatus('Open in Coinbase Wallet');
      openCoinbaseWallet();
      return;
    }

    try {
      setStatus('Connecting...');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAddress(accounts?.[0] || '');

      const currentChain = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setChainId(currentChain || '');

      if (currentChain !== BASE_CHAIN_ID) {
        await switchToBase();
      } else {
        setStatus('');
      }
    } catch {
      setStatus('Connection rejected');
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
            onClick={refreshWallet}
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
        <span className="max-w-[180px] rounded bg-black/70 px-2 py-1 text-right font-mono text-[9px] uppercase tracking-wider text-cyan-100">
          {status}
        </span>
      )}
    </div>
  );
};

export default FixedWalletButton;
