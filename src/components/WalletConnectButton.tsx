import React, { useState } from 'react';
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { base } from '../web3/wagmi';

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const WalletConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connectAsync, connectors, error, isPending, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [localError, setLocalError] = useState('');

  const buttonClass =
    'font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-2 rounded border transition-all duration-150 text-txt-primary border-base-blue/40 bg-base-blue/20 hover:text-neon-cyan hover:border-neon-cyan/60 hover:bg-base-blue/30';

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
          {localError || 'Wallet connection failed.'}
        </span>
      )}
    </div>
  );
};

export default WalletConnectButton;
