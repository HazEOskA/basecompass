import React from 'react';
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { base } from '../web3/wagmi';

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const WalletConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const preferredConnector =
    connectors.find((connector) => connector.name.toLowerCase().includes('coinbase')) ||
    connectors.find((connector) => connector.name.toLowerCase().includes('injected')) ||
    connectors[0];

  const baseButtonClass =
    'font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded transition-all duration-150 border';

  if (isConnected && address) {
    const wrongChain = chainId !== base.id;

    return (
      <div className="flex items-center gap-2">
        {wrongChain ? (
          <button
            type="button"
            onClick={() => switchChain({ chainId: base.id })}
            disabled={isSwitching}
            className={`${baseButtonClass} text-yellow-200 border-yellow-400/50 bg-yellow-400/10 hover:bg-yellow-400/20`}
          >
            {isSwitching ? 'Switching...' : 'Switch Base'}
          </button>
        ) : (
          <span className={`${baseButtonClass} text-neon-cyan border-base-blue/40 bg-base-blue/15`}>
            Base Ready
          </span>
        )}

        <button
          type="button"
          onClick={() => disconnect()}
          className={`${baseButtonClass} text-txt-primary border-base-blue/35 bg-base-blue/20 hover:text-neon-cyan hover:border-neon-cyan/60`}
          title={address}
        >
          {shortAddress(address)}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => preferredConnector && connect({ connector: preferredConnector })}
      disabled={!preferredConnector || isPending}
      className={`${baseButtonClass} text-txt-primary border-base-blue/35 bg-base-blue/20 hover:text-neon-cyan hover:border-neon-cyan/60 hover:bg-base-blue/30`}
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnectButton;
