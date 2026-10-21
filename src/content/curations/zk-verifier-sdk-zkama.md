---
title: "ZK Verifier SDK (PolkaZK → ZKAMA)"
kind: technical
client: "Jatin Sahijwani & Anirudh Singh Chouhan"
ecosystem: "Kusama / PolkaVM"
outcome: pending
outcomePlaceholder: PH-13
outcomeNote: "Post-hackathon proposal posted for discussion on Kusama Polkassembly; no on-chain referendum found."
ourRole: "Post-hackathon curation: project management and operations, architecture/design/UX reviews, DevOps and QA."
date: 2025-07-13
dateLabel: "Jul 2025"
proposalUrl: "https://kusama.polkassembly.io/post/2672"
placeholders: ["PH-13"]
order: 4
sources:
  - label: "Kusama Polkassembly discussion #2672"
    url: "https://kusama.polkassembly.io/post/2672"
  - label: "Tech specifications (Polkadot Forum)"
    url: "https://forum.polkadot.network/t/polkazk-verifier-sdk-tech-specifications/13727"
seo:
  title: "Curation: ZK Verifier SDK for PolkaVM (ZKAMA) | GRYD"
  description: "GRYD's post-hackathon curation of ZKAMA, a Circom and Groth16 zk-verifier SDK for PolkaVM that won the AssetHub Hackathon."
  keyword: "zk verifier sdk polkavm"
---

The PolkaZK Verifier SDK **won first prize at our [AssetHub Hackathon](/education/events/assethub-hackathon-2025/)**. A single CLI command compiles Circom circuits, runs a Groth16 setup and emits a verifier contract, and a JS/TS SDK exposes `verifyProof`.

After the hackathon we curated a follow-up proposal, renamed **ZKAMA**, targeting Kusama AssetHub where PolkaVM was live. The budget was $49,440, including $12,480 for our curation work. Community reviewers supported the idea and pushed for a PolkaVM-native (Rust) verifier, Poseidon hashing, and a clear answer on how it differs from existing ZK grants. That feedback shaped the roadmap.
