# Builder Code implementation

## Architecture

- Builder Code attribution is configured globally in `src/web3/wagmi.ts`.
- The QA route `/builder-code-qa` is not linked in public navigation.
- The QA transaction sends `0 ETH` to a burn address so no value leaves the wallet; only gas is charged.
- A production onchain action will replace the QA-only route after attribution is confirmed.

## Safety

- No smart contract deployment.
- No private key in the repository.
- No database or state migration.
- Rollback is a standard Git revert.
