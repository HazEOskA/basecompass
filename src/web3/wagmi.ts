import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { baseAccount, injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    baseAccount({
      appName: 'BaseCompass',
    }),
  ],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
});

export { base };
