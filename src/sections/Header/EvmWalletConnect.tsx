import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function EvmWalletConnect() {
    return (
        <div style={{ marginLeft: '10px' }}>
            <ConnectButton
                accountStatus="address"
                chainStatus="icon"
                showBalance={false}
            />
        </div>
    )
}
