# BaseCompass Builder Code QA

This branch integrates the Base Builder Code `bc_7ys71jwf` through Wagmi's global `dataSuffix` configuration.

## Validation flow

1. Open `/builder-code-qa` on the Vercel preview.
2. Connect a wallet on Base mainnet.
3. Send the zero-value QA transaction.
4. Copy the transaction hash.
5. Verify the transaction in Base.dev under the Onchain transaction filter.
6. Verify the hash with the Base Builder Code validation tool.

The QA transaction sends `0 ETH` to the burn address and only incurs the Base network fee. The page is intentionally not linked from the public navigation.

## Rollback

Revert the attribution branch or remove `dataSuffix` from `src/web3/wagmi.ts` and delete the hidden route/page. No smart contract or database migration is involved.
