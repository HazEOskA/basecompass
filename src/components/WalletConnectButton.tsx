import React, { useState } from 'react';
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { base } from '../web3/wagmi';

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

interface WalletConnectButtonProps {
  compact?: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ compact = false }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connectAsync, connectors, error, isPending, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [localError, setLocalError] = useState('');

  const buttonClass = `font-mono uppercase tracking-wider rounded border transition-all duration-150
    text-txt-primary border-base-blue/40 bg-base-blue/20 hover:text-neon-cyan
    hover:border-neon-cyan/60 hover:bg-base-blue/30 touch-manipulation disabled:opacity-60
    ${compact ? 'min-h-10 px-2.5 py-2 text-[9px]' : 'px-3 py-2 text-[10px] sm:text-[11px]'}`;

  const handleConnect = async () => {
    setLocalError('');
    reset();

    const injected =
      connectors.find((c) => c.name.toLowerCase().includes('injected')) ||
      connectors.find((c) => c.id.toLowerCase().includes('injected'));

    const baseAccountConnector = connectors.find((c) => {
      const identity = `${c.id} ${c.name}`.toLowerCase();
      return identity.includes('base') || identity.includes('coinbase');
    });

    const hasInjectedWallet = typeof window !== 'undefined' && 'ethereum' in window;
    const connector =
      (hasInjectedWallet ? injected : baseAccountConnector) ||
      baseAccountConnector ||
      injected ||
      connectors[0];

    if (!connector) {
      setLocalError('No wallet connector available.');
      return;
    }

    try {
      await connectAsync({ connector });
    } catch (connectError) {
      const message = connectError instanceof Error ? connectError.message.toLowerCase() : '';
      setLocalError(
        message.includes('rejected') || message.includes('denied')
          ? 'Connection rejected.'
          : 'Wallet connection failed. Try again.',
      );
    }
  };

  if (isConnected && address) {
    const wrongChain = chainId !== base.id;

    if (compact) {
      return (
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => wrongChain ? switchChain({ chainId: base.id }) : disconnect()}
            disabled={isSwitching}
            className={buttonClass}
            title={wrongChain ? 'Switch wallet to Base' : address}
          >
            {wrongChain
              ? (isSwitching ? 'Switching...' : 'Switch Base')
              : shortAddress(address)}
          </button>
        </div>
      );
    }

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
        {isPending ? 'Connecting...' : compact ? 'Connect' : 'Connect Wallet'}
      </button>

      {(localError || error?.message) && (
        <span
          role="status"
          className={compact
            ? 'fixed top-16 right-3 z-[60] max-w-[220px] rounded border border-red-400/30 bg-cyber-navy/95 px-3 py-2 text-right font-mono text-[9px] uppercase tracking-wider text-red-300 shadow-lg'
            : 'max-w-[180px] text-right font-mono text-[9px] uppercase tracking-wider text-red-300/80'}
        >
          {localError || 'Wallet connection failed.'}
        </span>
      )}
    </div>
  );
};

export default WalletConnectButton;
