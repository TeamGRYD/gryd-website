---
name: "AgentDOT"
category: ecosystem-collaboration
role: built
ecosystems: ["Polkadot"]
summary: "An AI-powered interaction layer for Polkadot SDK chains: ask in plain language, review the extrinsic, sign. Includes transaction queuing and batched execution."
status: completed
statusVerifiedOn: 2026-10-15
years: "2025 – 2026"
funding:
  - program: "Polkadot Fast-Grants"
    amount: "$10,000 (2 milestones)"
    url: "https://github.com/Polkadot-Fast-Grants/apply/blob/master/applications/AgentDot.md"
links:
  live: "https://agent-dot.vercel.app/"
  github: "https://github.com/edgeware-network/agent-dot"
  proposal: "https://github.com/Polkadot-Fast-Grants/apply/pull/49"
stack: ["Next.js", "TypeScript", "PAPI", "LangChain", "XCM"]
featured: true
order: 2
sources:
  - label: "Fast-Grants application (merged 8 Jul 2025)"
    url: "https://github.com/Polkadot-Fast-Grants/apply/pull/49"
  - label: "Milestone 1 delivery (merged 1 Dec 2025)"
    url: "https://github.com/Polkadot-Fast-Grants/delivery/pull/14"
  - label: "Milestone 2 delivery (merged 3 Mar 2026)"
    url: "https://github.com/Polkadot-Fast-Grants/delivery/pull/39"
  - label: "Source code on GitHub"
    url: "https://github.com/edgeware-network/agent-dot"
seo:
  title: "AgentDOT: AI Agent for Polkadot Transactions | GRYD"
  description: "AgentDOT turns plain-language requests into Polkadot extrinsics, with queuing and batched signing. Built by GRYD with a Polkadot Fast-Grant."
  keyword: "ai agent for polkadot"
---

## The problem
In every workshop and hackathon we ran, newcomers struggled with the same things: unfamiliar terms, many steps, and building transactions by hand. AgentDOT came out of that teaching work.

## What we built
- **Milestone 1: AI extrinsic builder.** Natural language in, a ready-to-sign extrinsic out, covering transfers, staking and XCM transfers.
- **Milestone 2: prompt queuing and batched execution.** Several requests in one message are queued for review, reorder or cancel, then signed **once** using `utility.batch` / `utility.batchAll` with live status tracking through PAPI's `signSubmitAndWatch`.

## Funding and delivery
Funded by **Polkadot Fast-Grants** ($10,000 across two milestones). Both milestones were delivered and accepted, and payouts were claimed on-chain on 4 December 2025 and 11 March 2026.
