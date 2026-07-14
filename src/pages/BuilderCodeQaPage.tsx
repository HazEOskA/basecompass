import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Radio,
} from 'lucide-react';
import {
  useAccount,
  useChainId,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from 'wagmi';
import WalletConnectButton from '../components/WalletConnectButton';
import {
  base,
  BASECOMPASS_BUILDER_CODE,
} from '../web3/wagmi';

const ATTRIBUTION_TEST_ADDRESS =
  '0x000000000000000000000000000000000000dEaD' as const;

const shortHash = (value: string) =>
  `${value.slice(0, 10)}...${value.slice(-8)}`;

const BuilderCodeQaPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const {
    sendTransaction,
    data: hash,
    isPending: isSigning,
    error,
    reset,
  } = useSendTransaction();
  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash });

  const wrongChain = isConnected && chainId !== base.id;
  const busy = isSigning || isConfirming;
  const errorMessage = error
    ? (error as { shortMessage?: string }).shortMessage || error.message.split('\n')[0]
    : '';

  const runAttributionTest = () => {
    reset();
    sendTransaction({
      to: ATTRIBUTION_TEST_ADDRESS,
      value: 0n,
    });
  };

  return (
    <div className="min-h-screen px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Radio size={16} className="text-neon-cyan" />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-txt-muted">
              // internal attribution QA
            </p>
          </div>
          <h1 className="mb-3 font-display text-5xl text-txt-primary md:text-6xl">
            BUILDER CODE TEST
          </h1>
          <p className="max-w-2xl font-ui text-txt-secondary">
            This hidden page verifies that BaseCompass transactions include the
            Base Builder Code attribution suffix before we ship a production
            onchain feature.
          </p>
        </div>

        <div
          className="neon-card rounded-xl p-6 md:p-8"
          style={{ borderColor: 'rgba(0,212,255,0.28)' }}
        >
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-base-blue/20 bg-surface-2 p-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-txt-muted">
                Builder Code
              </p>
              <p className="break-all font-mono text-sm text-neon-cyan">
                {BASECOMPASS_BUILDER_CODE}
              </p>
            </div>
            <div className="rounded-md border border-base-blue/20 bg-surface-2 p-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-txt-muted">
                Network
              </p>
              <p className="font-mono text-sm text-txt-primary">Base mainnet · 8453</p>
            </div>
          </div>

          <div
            className="mb-6 flex items-start gap-2.5 rounded-md border px-4 py-3"
            style={{
              background: 'rgba(255,170,0,0.06)',
              borderColor: 'rgba(255,170,0,0.25)',
            }}
          >
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-street-amber" />
            <p className="font-ui text-sm leading-snug text-street-amber/90">
              The test sends exactly 0 ETH to a burn address. No funds are
              transferred, but the wallet still charges a small Base network fee.
            </p>
          </div>

          {!isConnected ? (
            <div className="flex flex-col items-start gap-3">
              <p className="font-ui text-sm text-txt-secondary">
                Connect a wallet to run the attribution test.
              </p>
              <WalletConnectButton />
            </div>
          ) : wrongChain ? (
            <div className="flex flex-col items-start gap-3">
              <p className="font-ui text-sm text-street-red/90">
                Wallet is connected to the wrong network.
              </p>
              <button
                type="button"
                onClick={() => switchChain({ chainId: base.id })}
                disabled={isSwitching}
                className="btn-primary"
              >
                {isSwitching ? 'Switching...' : 'Switch to Base'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={runAttributionTest}
                disabled={busy}
                className="btn-primary inline-flex items-center gap-2"
              >
                {busy && <Loader2 size={14} className="animate-spin" />}
                {isSigning
                  ? 'Confirm in wallet...'
                  : isConfirming
                    ? 'Waiting for confirmation...'
                    : 'Send 0 ETH test transaction'}
              </button>
              <p className="font-mono text-[10px] uppercase tracking-wider text-txt-muted">
                Connected: {address}
              </p>
            </div>
          )}

          {hash && (
            <a
              href={`https://basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neon-cyan transition-opacity hover:opacity-70"
            >
              Transaction {shortHash(hash)} <ExternalLink size={11} />
            </a>
          )}

          {isSuccess && hash && (
            <div
              className="mt-5 flex items-start gap-2.5 rounded-md border px-4 py-3"
              style={{
                background: 'rgba(0,255,136,0.06)',
                borderColor: 'rgba(0,255,136,0.28)',
              }}
            >
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-street-green" />
              <p className="font-ui text-sm text-street-green/90">
                Transaction confirmed. Next, verify the hash in Base.dev and the
                Builder Code checker.
              </p>
            </div>
          )}

          {errorMessage && (
            <div
              className="mt-5 flex items-start gap-2.5 rounded-md border px-4 py-3"
              style={{
                background: 'rgba(255,51,102,0.06)',
                borderColor: 'rgba(255,51,102,0.25)',
              }}
            >
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-street-red" />
              <p className="break-words font-ui text-sm text-street-red/85">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderCodeQaPage;
