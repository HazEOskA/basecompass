import React from 'react';
import {
  useAccount,
  useChainId,
  useConnect,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { CheckCircle2, Loader2, ExternalLink, AlertTriangle, Radio } from 'lucide-react';
import { activeChain } from '../web3/wagmi';
import { checkInAbi, checkInAddress, hasCheckInAddress, txUrl } from '../web3/contracts';

interface OnchainCheckInProps {
  /** Route/mission label recorded onchain. */
  route?: string;
}

const shortAddress = (a: string) => `${a.slice(0, 6)}...${a.slice(-4)}`;

const OnchainCheckIn: React.FC<OnchainCheckInProps> = ({ route = 'beginner-roadmap' }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const {
    writeContract,
    data: hash,
    isPending: isSigning,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const wrongChain = isConnected && chainId !== activeChain.id;
  const busy = isSigning || isConfirming;

  const handleConnect = () => {
    const connector =
      connectors.find((c) => c.name.toLowerCase().includes('coinbase')) ||
      connectors.find((c) => c.id.toLowerCase().includes('injected')) ||
      connectors[0];
    if (connector) connect({ connector });
  };

  const handleCheckIn = () => {
    reset();
    writeContract({
      address: checkInAddress,
      abi: checkInAbi,
      functionName: 'checkIn',
      args: [route],
    });
  };

  // Trim wagmi's verbose error to the first line.
  const errorMessage = writeError
    ? (writeError as { shortMessage?: string }).shortMessage ||
      writeError.message.split('\n')[0]
    : '';

  return (
    <div
      className="neon-card rounded-xl p-6 md:p-7"
      style={{ borderColor: 'rgba(0,212,255,0.28)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Radio size={16} className="text-neon-cyan" />
        <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em]">
          // onchain proof
        </p>
      </div>

      <h3 className="font-display text-3xl md:text-4xl text-txt-primary mb-2">
        CHECK IN ONCHAIN
      </h3>
      <p className="font-ui text-sm text-txt-secondary mb-5 max-w-md">
        Leave a permanent, verifiable record on {activeChain.name} that you
        walked the <span className="text-neon-cyan font-mono">{route}</span> route.
        One transaction, no tokens, no cost beyond gas.
      </p>

      {/* Missing deployment address */}
      {!hasCheckInAddress ? (
        <div
          className="inline-flex items-start gap-2.5 px-4 py-3 rounded-md border w-full"
          style={{ background: 'rgba(255,170,0,0.06)', borderColor: 'rgba(255,170,0,0.25)' }}
        >
          <AlertTriangle size={14} className="text-street-amber shrink-0 mt-0.5" />
          <p className="font-ui text-sm text-street-amber/90 leading-snug">
            No contract configured yet. Deploy{' '}
            <span className="font-mono">BaseCompassCheckIn</span> to {activeChain.name} and set{' '}
            <span className="font-mono text-[12px]">VITE_BASECOMPASS_CHECKIN_ADDRESS</span>.
          </p>
        </div>
      ) : !isConnected ? (
        <button type="button" onClick={handleConnect} disabled={isConnecting} className="btn-primary">
          {isConnecting ? 'Connecting…' : 'Connect Wallet'}
        </button>
      ) : wrongChain ? (
        <div className="flex flex-col gap-2">
          <div
            className="inline-flex items-start gap-2.5 px-4 py-3 rounded-md border"
            style={{ background: 'rgba(255,51,102,0.06)', borderColor: 'rgba(255,51,102,0.25)' }}
          >
            <AlertTriangle size={14} className="text-street-red shrink-0 mt-0.5" />
            <p className="font-ui text-sm text-street-red/85 leading-snug">
              Wrong network. Switch to {activeChain.name} to check in.
            </p>
          </div>
          <button
            type="button"
            onClick={() => switchChain({ chainId: activeChain.id })}
            disabled={isSwitching}
            className="btn-primary self-start"
          >
            {isSwitching ? 'Switching…' : `Switch to ${activeChain.name}`}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCheckIn}
            disabled={busy}
            className="btn-primary inline-flex items-center gap-2 self-start"
          >
            {busy && <Loader2 size={14} className="animate-spin" />}
            {isSigning
              ? 'Confirm in wallet…'
              : isConfirming
              ? 'Checking in…'
              : isSuccess
              ? 'Check in again'
              : 'Check In Onchain'}
          </button>

          <p className="font-mono text-[10px] text-txt-muted uppercase tracking-wider">
            wallet {shortAddress(address as string)} · {activeChain.name}
          </p>

          {/* Success */}
          {isSuccess && hash && (
            <div
              className="inline-flex items-center gap-2 px-4 py-3 rounded-md border"
              style={{ background: 'rgba(0,255,136,0.06)', borderColor: 'rgba(0,255,136,0.28)' }}
            >
              <CheckCircle2 size={15} className="text-street-green shrink-0" />
              <span className="font-ui text-sm text-street-green/90">Checked in!</span>
              <a
                href={txUrl(hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-neon-cyan hover:opacity-70 transition-opacity"
              >
                View tx <ExternalLink size={10} />
              </a>
            </div>
          )}

          {/* Pending tx hash (before confirmation) */}
          {!isSuccess && hash && (
            <a
              href={txUrl(hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-neon-cyan hover:opacity-70 transition-opacity"
            >
              Pending: {shortAddress(hash)} <ExternalLink size={10} />
            </a>
          )}

          {/* Error */}
          {errorMessage && (
            <div
              className="inline-flex items-start gap-2.5 px-4 py-3 rounded-md border"
              style={{ background: 'rgba(255,51,102,0.06)', borderColor: 'rgba(255,51,102,0.25)' }}
            >
              <AlertTriangle size={14} className="text-street-red shrink-0 mt-0.5" />
              <p className="font-ui text-sm text-street-red/85 leading-snug break-words">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnchainCheckIn;
