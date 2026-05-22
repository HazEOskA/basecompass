import React, { useState } from 'react';
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { base } from '../web3/wagmi';

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const WalletConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [localError, setLocalError] = useState('');

  const buttonClass =
    'font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-2 rounded border transition-all duration-150 text-txt-primary border-base-blue/40 bg-base-blue/20 hover:text-neon-cyan hover:border-neon-cyan/60 hover:bg-base-blue/30';

  const openCoinbaseDeepLink = () => {
    const currentUrl = window.location.href;
    window.location.href = `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(currentUrl)}`;
  };

  const handleConnect = async () => {
    setLocalError('');

    const coinbase =
      connectors.find((c) => c.name.toLowerCase().includes('coinbase')) ||
      connectors.find((c) => c.id.toLowerCase().includes('coinbase'));

    const injected =
      connectors.find((c) => c.name.toLowerCase().includes('injected')) ||
      connectors.find((c) => c.id.toLowerCase().includes('injected'));

    const connector = coinbase || injected || connectors[0];

    if (!connector) {
      setLocalError('No wallet connector');
      openCoinbaseDeepLink();
      return;
    }

    try {
      connect({ connector });
    } catch {
      setLocalError('Opening wallet...');
      openCoinbaseDeepLink();
    }

    setTimeout(() => {
      if (!isConnected) {
        setLocalError('If wallet did not open, use Coinbase Wallet browser.');
      }
    }, 1800);
  };

  if (isConnected && address) {
    const wrongChain = chainId !== base.id;

    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          {wrongChain && (
            <button
              type="button"
              onClick={() => switchChain({ chainId: base.id })}
              disabled={isSwitching}
              className={buttonClass}
            >
              {isSwitching ? 'Switching...' : 'Switch Base'}
            </button>
          )}

          <button type="button" onClick={() => disconnect()} className={buttonClass} title={address}>
            {wrongChain ? shortAddress(address) : `Base ${shortAddress(address)}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button type="button" onClick={handleConnect} disabled={isPending} className={buttonClass}>
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {(localError || error?.message) && (
        <span className="max-w-[180px] text-right font-mono text-[9px] uppercase tracking-wider text-red-300/80">
          {localError || error?.message}
        </span>
      )}
    </div>
  );
};

export default WalletConnectButton;
