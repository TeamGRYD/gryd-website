---
name: "PlugPort"
category: product
role: launched
ecosystems: ["Monad"]
summary: "Upgrade your apps to dApps within seconds. One protocol port for every database: MongoDB, SQL and Redis wire protocols with verifiable storage on MonadDb."
status: in-development
statusPlaceholder: PH-10
statusVerifiedOn: 2026-10-15
years: "2026"
links:
  live: "https://plugport.wtf"
  github: "https://github.com/PlugPort-Protocol/plugport"
  docs: "https://wiki.plugport.wtf"
stack: ["TypeScript", "MonadDb", "Node.js / Python / Go SDKs"]
placeholders: ["PH-10"]
featured: true
order: 6
sources:
  - label: "PlugPort on GitHub"
    url: "https://github.com/PlugPort-Protocol/plugport"
  - label: "plugport.wtf"
    url: "https://plugport.wtf"
seo:
  title: "PlugPort: Turn Apps into dApps on MonadDB | GRYD"
  description: "PlugPort speaks MongoDB, Postgres, MySQL and Redis wire protocols and stores every write in a Merkle Patricia Trie on MonadDb, so reads are verifiable."
  keyword: "plugport"
---

## What it is
PlugPort is a multi-protocol database that **speaks MongoDB, Postgres, MySQL and Redis wire protocols natively** and stores every write in a Merkle Patricia Trie on **MonadDb**, so clients can request cryptographic proofs for the data they read.

## Features
- Drop-in compatibility with mongosh, psql, mysql, redis-cli and their drivers (Prisma, Drizzle, ioredis, DBeaver).
- Merkle-anchored proofs for every write.
- SIWE authentication, wallet-derived API keys and **on-chain role-based access control**.
- AES-256-GCM encryption for private collections.
- Hash, left, right and cross joins, plus aggregation pipelines with `$lookup`.
- Redis Pub/Sub bridged to Server-Sent Events.
- SDKs for Node.js, Python and Go, plus a `plugport` CLI and a web console.

## Also: PlugPort Agent Graph
A verifiable memory graph for AI agents on Monad, built on PlugPort and anchored on Monad testnet.
