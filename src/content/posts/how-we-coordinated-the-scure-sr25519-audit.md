---
title: "How we got the sr25519 JavaScript library funded and audited"
description: "A case study in Polkadot OpenGov: funding Paul Miller's sr25519 library, coordinating an Oak Security audit through the dotPAL bounty, and what it cost."
pubDate: 2026-10-14
author: "GRYD"
tags: ["polkadot", "opengov", "security", "case-study"]
keyword: "sr25519 audit"
---

Every Polkadot account signs with **sr25519**. For years, JavaScript tooling did that through WASM bindings. A pure, minimal, audited JavaScript implementation would make the ecosystem faster, safer and easier to maintain. This is how we helped make it happen, and what we learned.

## 1. Finding the right builder (Aug 2024)
A GitHub issue asking for sr25519 support in `@noble/curves` had been open since August 2023. The library's author, **Paul Miller**, said he was interested, subject to sponsorship. In August 2024 we offered to help draft a Polkadot treasury proposal, and promised that every step would be transparent and public.

## 2. Funding development through OpenGov (Sep–Oct 2024)
We curated **[referendum #1165](https://polkadot.subsquare.io/referenda/1165)** in the Small Spender track. Feedback from **Jeff Burdges** (remove MuSig from scope; support OLAF separately) and **Shawn Tabrizi** reshaped the proposal before it went on-chain.

It **passed with 100% aye** and executed on 7 October 2024: 19,800 USDT for development, paid to the developer. We took no fee.

## 3. Choosing an auditor (early 2025)
Paul Miller advised auditing the library before production use, and asked for a firm other than Cure53. We screened several firms with cryptography expertise, compared their offers and picked **Oak Security**.

## 4. Switching funding routes (Apr 2025)
We first submitted the audit as treasury **[referendum #1520](https://polkadot.subsquare.io/referenda/1520)**. When the **dotPAL bounty** turned out to be a better fit, we retitled the referendum "Vote Nay, opting PAL bounty" so voters would reject it, and moved the request to the bounty. The dotPAL curators approved it on 25 April 2025.

**Lesson:** OpenGov is not the only route. Bounties with expert curators can be faster and better matched for specialist work.

## 5. Running the audit (May–Aug 2025)
- **19 May:** service agreement signed through the Edgeware DAO Association, a Swiss association, as the legal counterparty.
- **12–13 June:** v1.0 audit and differential fuzz testing reports published.
- **July–August:** an additional cryptographic review, with fixes verified. v1.5 report published in August.

During the audit we relayed feedback between author and auditors, handled milestone payments and fiat liquidation, and tracked issues in a public sheet.

## 6. Publishing the receipts (Sep 2025)
We posted a [full report](https://forum.polkadot.network/t/micro-sr25519-post-audit-renamed-to-scure-sr25519-is-ready-to-improve-ecosystem-wide-devex-security-and-ux/14872) to the Polkadot Forum: governing proposals, agreements, invoices, audit reports, a timeline, the auditors' team, our role, and on-chain transaction links tracing every payment.

## 7. Adoption (Dec 2025)
The library became **`@scure/sr25519`**, and **polkadot-js/common switched to it** ([PR #1971](https://github.com/polkadot-js/common/pull/1971), merged 8 December 2025).

## And one thing that didn't work
We asked OpenGov to pay retroactively for about 624 hours of coordination ([referendum #1751](https://polkadot.subsquare.io/referenda/1751)). **It was rejected.** Public goods coordination is valuable but hard to fund after the fact. Next time we'd budget coordination into the original proposal.

*Need help taking a public good through funding, audit and adoption? [Delegate it to us](/delegate/).*
