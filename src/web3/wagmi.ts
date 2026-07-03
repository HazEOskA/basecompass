import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';

// Env-driven chain selection.
//   VITE_CHAIN_ID=84532  -> Base Sepolia (testnet)
//   VITE_CHAIN_ID=8453   -> Base mainnet (default when unset)
const envChainId = Number(import.meta.env.VITE_CHAIN_ID ?? base.id);

/** The chain the app is currently configured to run against. */
export const activeChain = envChainId === baseSepolia.id ? baseSepolia : base;

/** Hex chain id (e.g. "0x14a34" for Base Sepolia) for raw EIP-1193 calls. */
export const activeChainHexId = `0x${activeChain.id.toString(16)}`;

// Optional custom RPC (falls back to the chain's public RPC when unset).
const rpcUrl = import.meta.env.VITE_BASE_RPC_URL as string | undefined;

export const wagmiConfig = createConfig({
  chains: [activeChain],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'BaseCompass',
    }),
  ],
  // Only `activeChain` is enabled, but both transports are declared so the
  // config type-checks regardless of which chain the env selects.
  transports: {
    [base.id]: http(activeChain.id === base.id ? rpcUrl : undefined),
    [baseSepolia.id]: http(activeChain.id === baseSepolia.id ? rpcUrl : undefined),
  },
});

export { base, baseSepolia };
