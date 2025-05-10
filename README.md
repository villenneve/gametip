# Gamba v2 - EVM Wallet Integration

A decentralized Web3 casino platform originally built for the Solana blockchain, now extended to support EVM-compatible wallets such as MetaMask, WalletConnect, and Coinbase Wallet.

---

## ✅ Implemented Features

- **EVM Wallet Integration**
  - Integrated `@rainbow-me/rainbowkit` and `wagmi` to support major EVM wallets.
  - Added an EVM provider wrapping the app for context.
  - New `ConnectButton` component displayed in the header.

- **Solana Compatibility Maintained**
  - Original support for Solana wallets (`@solana/wallet-adapter-*`) remains fully functional.

- **Resolved Critical Compatibility Issues**
  - Downgraded `wagmi` to `0.9.6` and `ethers` to `5.8.0` for RainbowKit v0.8.1 compatibility.
  - Adjusted imports and Vite bundling issues with deep module resolution.

---

## 🗂️ Modified and Added Files

```
src/
├── providers/
│   └── EvmWalletProvider.tsx       // EVM wallet provider with wagmi + rainbowkit
├── sections/
│   ├── Header.tsx                  // Modified to include EvmWalletConnect button
│   └── EvmWalletConnect.tsx       // Created ConnectButton component
└── index.tsx                       // Wrapped App with EvmWalletProvider
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.17.0
- npm >= 9.x
- Phantom wallet (Solana)
- MetaMask wallet (EVM)

### Setup

```bash
npm install --legacy-peer-deps
npm run dev
```

- App: [http://localhost:4001](http://localhost:4001)

---

## ⚠️ Known Issues

- **Package Conflicts**: 
  - RainbowKit 0.8.1 requires older versions of `wagmi` and `ethers`.
  - Installing newer versions will break compatibility without a full refactor.

- **Architecture Issues**:
  - No shared abstraction for wallet logic (EVM vs. Solana).
  - Providers are hardcoded and scoped inconsistently.
  - Folder structure is not layered or modular.

---

## 🛠️ Recommended Refactor

### 1. Restructure the Project

```
src/
├── app/                      // Root layout and global providers
├── chains/
│   ├── solana/               // Solana-specific context/provider
│   └── evm/                  // EVM-specific context/provider
├── components/               // UI components
├── hooks/                    // useWallet, useChainId, etc.
├── utils/                    // helper functions
└── index.tsx
```

### 2. Abstract Wallet Interface

Create a shared hook like:

```ts
const { connect, disconnect, isConnected, address, chainId } = useWallet()
```

Supporting both Solana and EVM chains dynamically.

### 3. Upgrade Packages (when refactoring)

| Package    | Suggested Version |
|------------|------------------|
| wagmi      | 1.3.x or higher  |
| ethers     | Replace with `viem` |
| rainbowkit | 2.0+             |
| vite       | 5.x              |

Use `vite-tsconfig-paths` plugin to resolve custom paths easily.

---

## 📸 Screenshot

### ![EVM Wallet Connected]

[![result-Gamepit.png](https://i.postimg.cc/BvyR8mPM/result-Gamepit.png)](https://postimg.cc/JyNpvcqk)

---

## 👨‍💻 Author

- Developer: Gilly Lopes
- Date: May 10, 2025

---

## 📄 License

MIT
