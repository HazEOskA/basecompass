import { activeChain } from './wagmi';

/**
 * Deployed BaseCompassCheckIn address, injected at build time via
 * VITE_BASECOMPASS_CHECKIN_ADDRESS. Empty until a contract is deployed.
 */
export const checkInAddress = (import.meta.env.VITE_BASECOMPASS_CHECKIN_ADDRESS ??
  '') as `0x${string}`;

/** True when a valid-looking contract address is configured. */
export const hasCheckInAddress =
  /^0x[a-fA-F0-9]{40}$/.test(checkInAddress);

/** Minimal ABI for BaseCompassCheckIn (typed for viem/wagmi). */
export const checkInAbi = [
  {
    type: 'event',
    name: 'CheckedIn',
    anonymous: false,
    inputs: [
      { name: 'user', type: 'address', indexed: true },
      { name: 'route', type: 'string', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'checkInCount',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'checkIn',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'route', type: 'string' }],
    outputs: [],
  },
] as const;

/** Block explorer base URL for the active chain (Sepolia Basescan on testnet). */
export const explorerBaseUrl =
  activeChain.blockExplorers?.default.url ?? 'https://sepolia.basescan.org';

/** Build a link to a transaction on the active chain's explorer. */
export const txUrl = (hash: string) => `${explorerBaseUrl}/tx/${hash}`;
