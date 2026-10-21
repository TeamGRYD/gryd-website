---
name: "scure-sr25519"
category: maintained
role: curated
roleLabel: "Curation & audit coordination"
ecosystems: ["Polkadot", "JavaScript"]
summary: "Paul Miller's audited, minimal JavaScript implementation of sr25519, the signature scheme behind Polkadot accounts. We curated its funding and coordinated its security audit."
status: live
statusVerifiedOn: 2026-10-15
years: "2024 – 2025"
funding:
  - program: "Polkadot Treasury, ref #1165 (development)"
    amount: "19,800 USDT"
    url: "https://polkadot.subsquare.io/referenda/1165"
  - program: "dotPAL bounty (audit)"
    url: "https://forum.polkadot.network/t/micro-sr25519-post-audit-renamed-to-scure-sr25519-is-ready-to-improve-ecosystem-wide-devex-security-and-ux/14872"
links:
  github: "https://github.com/paulmillr/scure-sr25519"
  docs: "https://www.npmjs.com/package/@scure/sr25519"
  proposal: "https://polkadot.subsquare.io/referenda/1165"
stack: ["JavaScript", "TypeScript", "noble-curves"]
featured: true
order: 3
sources:
  - label: "Polkadot OpenGov referendum #1165 (executed 7 Oct 2024)"
    url: "https://polkadot.subsquare.io/referenda/1165"
  - label: "Audit report and funds trace (Polkadot Forum, 12 Sep 2025)"
    url: "https://forum.polkadot.network/t/micro-sr25519-post-audit-renamed-to-scure-sr25519-is-ready-to-improve-ecosystem-wide-devex-security-and-ux/14872"
  - label: "Oak Security audit reports"
    url: "https://github.com/oak-security/audit-reports/tree/main/Polkadot"
  - label: "polkadot-js/common PR #1971 (merged 8 Dec 2025)"
    url: "https://github.com/polkadot-js/common/pull/1971"
seo:
  title: "scure-sr25519: Audited sr25519 for JavaScript | GRYD"
  description: "How GRYD curated funding and coordinated the Oak Security audit for Paul Miller's sr25519 library, now used by polkadot-js."
  keyword: "sr25519 javascript"
---

## The problem
Polkadot's JavaScript tooling relied on WASM bindings for sr25519 signatures. A pure, minimal, audited JavaScript implementation would improve performance, security and maintainability across the ecosystem.

## Who did what
- **Paul Miller** (author of the noble cryptography libraries) **wrote the library**.
- **Oak Security** **performed the audit** and fuzz testing.
- **GRYD (as Edgetributor SubDAO)** **curated and coordinated**. We approached Paul Miller, drafted and ran the OpenGov proposal (#1165, passed and executed), scouted and compared audit firms, drafted the dotPAL bounty audit proposal, relayed feedback between the author and the auditors, and handled payments. We published a full funds trace afterwards.

## Outcome
- Audit reports for v1.0 (with differential fuzzing) on 12 June 2025 and v1.5 on 22 August 2025.
- **polkadot-js/common switched from WASM to this library** (PR #1971, merged 8 December 2025).
- The npm package `@scure/sr25519` had 470,879 downloads in the 30 days to 12 October 2026.

The library's own README records that "the audit has been funded by Polkadot, coordinated by Edgeware".
