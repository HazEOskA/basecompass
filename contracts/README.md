# BaseCompass Contracts

Foundry project for the BaseCompass onchain proof layer.

## Contract

- **`src/BaseCompassCheckIn.sol`** — `checkIn(string route)` records a permanent
  onchain check-in: emits `CheckedIn(address indexed user, string route, uint256 timestamp)`
  and increments `checkInCount[user]`. No tokens, NFTs, payments, DAO or backend.

## Setup

```bash
cd contracts
forge install foundry-rs/forge-std   # if lib/forge-std is not already present
forge build
forge test -vvv
```

## Deploy to Base Sepolia (chain id 84532)

```bash
cd contracts
cp .env.example .env   # then fill in PRIVATE_KEY and BASE_SEPOLIA_RPC_URL
source .env

forge script script/Deploy.s.sol:Deploy \
  --rpc-url "$BASE_SEPOLIA_RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  --broadcast
```

Optionally verify on Sepolia Basescan:

```bash
forge verify-contract <DEPLOYED_ADDRESS> \
  src/BaseCompassCheckIn.sol:BaseCompassCheckIn \
  --chain 84532 \
  --etherscan-api-key "$BASESCAN_API_KEY"
```

After deploying, copy the printed address into the frontend env var
`VITE_BASECOMPASS_CHECKIN_ADDRESS` (see `.env.example` at the repo root).
