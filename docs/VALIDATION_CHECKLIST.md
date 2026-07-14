# Validation checklist

- [ ] Vercel preview build is READY.
- [ ] `/` returns HTTP 200.
- [ ] `/builder-code-qa` returns HTTP 200.
- [ ] Wallet connects on mobile.
- [ ] Network switch targets Base mainnet (8453).
- [ ] Zero-value QA transaction confirms.
- [ ] Basescan input ends with the ERC-8021 attribution suffix.
- [ ] Base.dev Total Transactions increments.
- [ ] Builder Code checker resolves `bc_7ys71jwf`.

Do not merge until the preview build passes. Do not run the transaction more than once unless the first attempt fails.
