---
name: "Universal Hybrid Substrate Faucet"
category: ecosystem-collaboration
maintained: true
role: built
roleLabel: "Built & maintained"
ecosystems: ["Polkadot", "Substrate", "EVM"]
summary: "One testnet faucet for Substrate chains and Frontier-based EVM chains, with single-chain and bulk multi-chain disbursement. Funded by the Polkadot treasury."
status: unknown
statusPlaceholder: PH-09
statusVerifiedOn: 2026-10-15
years: "2024 – 2025"
funding:
  - program: "Polkadot Treasury, ref #541"
    amount: "4,471 DOT"
    url: "https://polkadot.subsquare.io/referenda/541"
  - program: "Polkadot Treasury, ref #904 (top-up)"
    amount: "724.78 DOT"
    url: "https://polkadot.subsquare.io/referenda/904"
links:
  github: "https://github.com/edgeware-network/Universal-Hybrid-Substrate-Faucet"
  proposal: "https://polkadot.subsquare.io/referenda/541"
stack: ["TypeScript", "Polkadot.js", "Frontier EVM"]
placeholders: ["PH-09"]
featured: true
order: 1
sources:
  - label: "Polkadot OpenGov referendum #541 (executed 1 Apr 2024)"
    url: "https://polkadot.subsquare.io/referenda/541"
  - label: "Polkadot OpenGov referendum #904 (executed 26 Jun 2024)"
    url: "https://polkadot.subsquare.io/referenda/904"
  - label: "Source code on GitHub"
    url: "https://github.com/edgeware-network/Universal-Hybrid-Substrate-Faucet"
  - label: "Polkadot Forum: Universal Testnet Faucet Idea"
    url: "https://forum.polkadot.network/t/universal-testnet-faucet-idea/6114"
seo:
  title: "Universal Hybrid Substrate Faucet: Multi-Chain Testnet Faucet"
  description: "One testnet faucet for Substrate and EVM chains, funded by the Polkadot treasury and built and maintained by GRYD (formerly Edgetributor SubDAO)."
  keyword: "substrate faucet"
---

## The problem
Every Substrate testnet had its own faucet, or none. Developers had to hunt for test tokens chain by chain, and the existing Polkadot faucet had **no one-click multi-chain disbursement and no EVM support**.

## What we built
A **hybrid** faucet: one interface for Substrate chains *and* Frontier-based EVM chains.
- **Network switcher** for single-chain claims.
- **Network selector** for bulk claims across several chains at once.
- **Abuse protection** against derived-account attacks, with one claim per day across all accounts tied to a signer.

## Funding
Referendum **#541** (Small Spender) was executed on **1 April 2024**. It funded $500 per chain integration across 69 testnets, with 50% vested over a year and a commitment of 24 months of maintenance and weekly integration of new testnets. After the DOT price fell between approval and payout, referendum **#904** topped up the shortfall (**724.78 DOT**, executed 26 June 2024).

## Status
The code is open source (MIT) in the Edgeware DAO GitHub organisation. The last commit was on 23 July 2025.
