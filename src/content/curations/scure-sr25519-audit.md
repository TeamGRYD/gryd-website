---
title: "scure-sr25519 security audit (Oak Security)"
kind: technical
client: "Paul Miller / Polkadot ecosystem"
ecosystem: "Polkadot"
outcome: completed
outcomeNote: "Audit and fuzzing completed; reports published 12 Jun 2025 (v1.0) and 22 Aug 2025 (v1.5)."
ourRole: "Audit coordination: scouted and compared firms, drafted the dotPAL bounty proposal, relayed feedback between author and auditors, and handled payments. Oak Security performed the audit."
date: 2025-04-07
dateLabel: "Apr – Aug 2025"
proposalUrl: "https://polkadot.subsquare.io/referenda/1520"
order: 2
sources:
  - label: "Audit report, timeline and funds trace (Polkadot Forum)"
    url: "https://forum.polkadot.network/t/micro-sr25519-post-audit-renamed-to-scure-sr25519-is-ready-to-improve-ecosystem-wide-devex-security-and-ux/14872"
  - label: "Oak Security audit reports"
    url: "https://github.com/oak-security/audit-reports/tree/main/Polkadot"
  - label: "Referendum #1520 (rejected on purpose; moved to dotPAL bounty)"
    url: "https://polkadot.subsquare.io/referenda/1520"
  - label: "Retroactive coordination request, referendum #1751 (rejected)"
    url: "https://polkadot.subsquare.io/referenda/1751"
seo:
  title: "Curation: scure-sr25519 Security Audit by Oak Security | GRYD"
  description: "GRYD coordinated the Oak Security audit of the scure-sr25519 library, funded by the dotPAL bounty. Timeline, roles and funds trace."
  keyword: "sr25519 audit"
---

Paul Miller recommended an independent audit before production use, and asked for a firm other than Cure53. We screened several firms with cryptography experience and selected **Oak Security**.

## Timeline
- **Apr 2025:** our treasury referendum #1520 was deliberately withdrawn in favour of the **dotPAL bounty**. Its title read "Vote Nay, opting PAL bounty". The dotPAL curators approved the audit on 25 April 2025.
- **19 May 2025:** service agreement signed through the Edgeware DAO Association; the audit begins.
- **12–13 Jun 2025:** v1.0 audit and differential fuzz testing reports published.
- **28 Jul – 23 Aug 2025:** additional cryptographic review, fixes verified, v1.5 report published.

## What happened next
The library was renamed **scure-sr25519**, and polkadot-js switched to it in December 2025.

Our request for retroactive payment for the coordination work (referendum #1751) was **rejected** on 12 October 2025. We list that here too.
