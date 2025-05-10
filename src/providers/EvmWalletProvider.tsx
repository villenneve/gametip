import '@rainbow-me/rainbowkit/styles.css'
import {
    connectorsForWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import {
    metaMaskWallet,
    walletConnectWallet,
    coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { WagmiConfig, createClient } from 'wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains'
import { providers } from 'ethers'
import React from 'react'

const chains = [mainnet, polygon, bsc]

const provider = ({ chainId }: { chainId?: number }) =>
    new providers.InfuraProvider(chainId, import.meta.env.VITE_INFURA_ID || undefined)

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ chains }),
            walletConnectWallet({ chains }),
            coinbaseWallet({ chains, appName: 'Gametip' }),
        ],
    },
])

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

export function EvmWalletProvider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
