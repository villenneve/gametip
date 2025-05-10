import {
    GambaUi,
    TokenValue,
    useCurrentPool,
    useGambaPlatformContext,
    useUserBalance,
} from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'
import EvmWalletConnect from './Header/EvmWalletConnect'

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 10px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background 0.2s;
  &:hover {
    background: white;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(33, 34, 51, 0.9);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`

const Logo = styled(NavLink)`
  height: 35px;
  margin: 0 10px;
  & > img {
    height: 100%;
  }
`

export default function Header() {
    const pool = useCurrentPool()
    const context = useGambaPlatformContext()
    const balance = useUserBalance()
    const [bonusHelp, setBonusHelp] = React.useState(false)
    const [jackpotHelp, setJackpotHelp] = React.useState(false)

    return (
        <>
            {bonusHelp && (
                <Modal onClose={() => setBonusHelp(false)}>
                    <h1>Bonus ✨</h1>
                    <p>
                        You have <b><TokenValue amount={balance.bonusBalance} /></b> worth of free plays.
                    </p>
                    <p>A fee is still required for each play.</p>
                </Modal>
            )}
            {jackpotHelp && (
                <Modal onClose={() => setJackpotHelp(false)}>
                    <h1>Jackpot 💰</h1>
                    <p><TokenValue amount={pool.jackpotBalance} /> is in the jackpot.</p>
                    <GambaUi.Switch
                        checked={context.defaultJackpotFee > 0}
                        onChange={(checked) => context.setDefaultJackpotFee(checked ? 0.01 : 0)}
                    />
                </Modal>
            )}
            <StyledHeader>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Logo to="/">
                        <img alt="Gamba logo" src="/logo.svg" />
                    </Logo>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {pool.jackpotBalance > 0 && (
                        <Bonus onClick={() => setJackpotHelp(true)}>
                            💰 <TokenValue amount={pool.jackpotBalance} />
                        </Bonus>
                    )}
                    {balance.bonusBalance > 0 && (
                        <Bonus onClick={() => setBonusHelp(true)}>
                            ✨ <TokenValue amount={balance.bonusBalance} />
                        </Bonus>
                    )}
                    <TokenSelect />
                    <UserButton />
                    <EvmWalletConnect />
                </div>
            </StyledHeader>
        </>
    )
}
