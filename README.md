# bun-blockchain

## Features

Main features coming from already existing blockchains were included in the code such as:

<ul>
 <li>Auto-Adjusting mining difficulty based on target block time.</li>
 <li>1% up/down adjustments each time a block is found to come close to the target block time in milliseconds.</li>
 <li>Easy swappable POW algo choice from Bun's CryptoHasher library(https://bun.sh/docs/api/hashing/).</li>
</ul>

## Installation

First install bun with this command:

```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies after bun was installed:

```bash
bun install
```

To run:

```bash
bun run index.js
```
