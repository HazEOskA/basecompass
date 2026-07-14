import { Attribution } from 'ox/erc8021';
import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { baseAccount, injected } from 'wagmi/connectors';

export const BASECOMPASS_BUILDER_CODE = 'bc_7ys71jwf';

export const BASECOMPASS_DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BASECOMPASS_BUILDER_CODE],
});

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
  dataSuffix: BASECOMPASS_DATA_SUFFIX,
});

export { base };
