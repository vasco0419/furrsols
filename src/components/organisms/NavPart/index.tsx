import * as React from "react"
import { useEffect, useState } from "react"
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom"
import type { LinkProps } from "react-router-dom"

import { useWallet } from '@solana/wallet-adapter-react'

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'

import { MARKET_PAGES } from "./../../../constants/routers"

import styles from './index.module.scss'

import { useAppSelector } from "../../../redux/hook"
import { useDispatch } from "react-redux"

import { claim, fetchWallet, deposit } from "../../../redux/actions"

import ClaimModal from "../../molecules/ClaimModal"

import { toast } from 'react-toastify'
// Solana
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import DepositModal from "../../molecules/DepositModal"
import { useResize } from "./../../../utils/Helper"

import { getProvider, makeATokenAccountTransaction } from '../../../utils/Helper'
import { PROGRAM_ID, TOKEN_ACCOUNT, TOKEN_MINT } from '../../../configs/develop'

import { IDL } from '../../../constants/furrsols_staking_contract'
import * as anchor from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { sendTransactions } from '../../../helpers/solana/connection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: '20px solid rgba(0,0,0,0.3)'
    },
    tab: {
      '&.active': {
        background: 'rgba(0,0,0,0.3)'
      },
      '& a': {
        color: theme.palette.text.disabled,
        '&.active': {
          color: theme.syscolor.light,
        }
      }
    },
    collection: {
      color: theme.palette.text.primary
    },
    getCollection: {
      background: '#7D3CCF',
      color: theme.palette.text.primary,
      fontSize: '0.875rem',
      boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.25)',
      '&:hover': {
        opacity: 0.75,
        color: theme.palette.text.primary,
        background: '#7D3CCF'
      }
    }
  })
)

type Props = {
  children: React.ReactNode
  className?: string
}

const CustomNav = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })

  const classes = useStyles()
  return (
    <>
      <div className={`${styles.tab} ${match && `active`} ${classes.tab}`}>
        <Link
          to={to}
          {...props}
          className={`font-quick font-700 ${match && `active`}`}
        >
          {children}
        </Link>
      </div>

    </>
  )
}

const HeaderPart = (props: Props) => {
  const store = useAppSelector((state) => state.global)
  const dispatch = useDispatch()
  const dashboard = useAppSelector((state) => state.dashboard)

  const walletState = useWallet()
  const [openClaimModal, setOpenClaimModal] = useState(false)
  const [openDepositModal, setOpenDepositModal] = useState(false)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const classes = useStyles()

  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const { isMobile } = useResize()

  const handleClaim = async (amount: number) => {
    setLoading(true)
    if (amount <= 0 || amount > store.wallet.fluff) {
      toast.warn('Amount is not correct!', { theme: 'dark' })
      setLoading(false)
    } else {
      const result = await claimFluff(amount)
      if (result) {
        dispatch(
          claim({ walletAddress: walletState.publicKey?.toString(), amount: amount })
        )
        await getWalletBalance()
        setOpenClaimModal(false)
        setLoading(false)
      } else {
        toast.error('Claim fluff failed', { theme: 'dark' })
        setLoading(false)
      }

    }
  }

  const handleDeposit = async (amount: number) => {
    setLoading(true)
    if (amount <= 0 || amount > balance) {
      toast.warn('Amount is not correct!', { theme: 'dark' })
      setLoading(false)
    } else {
      const result = await depositFluff(amount)
      if (result) {
        await dispatch(
          deposit({ walletAddress: walletState.publicKey?.toString(), amount: amount })
        )
        await getWalletBalance()
        setOpenDepositModal(false)
        setLoading(false)
      } else {
        toast.error('Deposit fluff failed', { theme: 'dark' })
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (walletState.connected === true) {
      dispatch(
        fetchWallet({ walletAddress: walletState.publicKey?.toString() })
      )
    } else {

    }
  }, [walletState.connected])

  useEffect(() => {
    if (!wallet) return
    (async () => {
      await getWalletBalance()
    })()
  }, [wallet])

  const getWalletBalance = async () => {
    if (!wallet) return
    // const provider: any = getProvider(connection, wallet as AnchorWallet)
    // const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider)
    const tokenAccountPubkey = await connection.getTokenAccountsByOwner(wallet.publicKey, {
      mint: new PublicKey(TOKEN_MINT),
      programId: TOKEN_PROGRAM_ID
    })
    // console.log("tokenAccountPubkey", tokenAccountPubkey)
    if (tokenAccountPubkey.value.length > 0) {
      const account = tokenAccountPubkey.value[0].pubkey
      let balance = await connection.getTokenAccountBalance(account)
      // console.log("balance", balance.value.uiAmount)
      if (balance.value.uiAmount) {
        setBalance(balance.value.uiAmount)
      }
    }
  }

  const claimFluff = async (amount: number) => {
    if (!wallet) return
    const provider: any = getProvider(connection, wallet as AnchorWallet)
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider)
    let [vault, nonce_vault] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol vault')
    ], program.programId)
    // let [data, nonce_data] = await anchor.web3.PublicKey.findProgramAddress([
    //   Buffer.from('furrsol data')
    // ], program.programId)
    let [data] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol data')
    ], program.programId)
    let tokenFrom = new PublicKey(TOKEN_ACCOUNT)
    let instructionSet: any = []
    let instructions: any = []
    let signers: any = []
    let signerSet: any = []

    let makeTokenToTx = await makeATokenAccountTransaction(connection, wallet?.publicKey, wallet?.publicKey, new PublicKey(TOKEN_MINT))
    if (makeTokenToTx.instructions.length !== 0) {
      instructions = [...makeTokenToTx.instructions]
      signers = [...makeTokenToTx.signers]
    }
    let tokenTo = makeTokenToTx.tokenTo
    let furrsols = dashboard.furrsols
    let pool: any = undefined, nonce_pool: number = -1;
    for (let i = 0; i < furrsols.length; i++) {
      let furrsol = furrsols[i]
      if (!furrsol.spawn) continue
      let mint = new PublicKey(furrsol.nftAddress);

      [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), mint.toBuffer()
      ], program.programId)
      break
    }
    if (nonce_pool === - 1 || pool === undefined) {
      toast.warn('Spawn furrsol first!', { theme: 'dark' })
      return
    }
    instructions.push(program.instruction.withdraw(nonce_vault, amount, {
      accounts: {
        user: wallet.publicKey,
        tokenFrom: tokenFrom,
        tokenTo: tokenTo,
        vault: vault,
        data: data,
        pool: pool,
        tokenProgram: TOKEN_PROGRAM_ID
      }
    }))
    instructionSet.push(instructions)
    signerSet.push(signers)
    try {
      const result = await sendTransactions(connection, wallet, instructionSet, signerSet)
      if (result.success) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }

  }

  const depositFluff = async (amount: number) => {
    if (!wallet) return
    const provider: any = getProvider(connection, wallet as AnchorWallet)
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider)
    // let [vault, nonce_vault] = await anchor.web3.PublicKey.findProgramAddress([
    //   Buffer.from('furrsol vault')
    // ], program.programId)
    let [vault] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol vault')
    ], program.programId)
    // let [data, nonce_data] = await anchor.web3.PublicKey.findProgramAddress([
    //   Buffer.from('furrsol data')
    // ], program.programId)
    let [data] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol data')
    ], program.programId)
    let tokenTo = new PublicKey(TOKEN_ACCOUNT)
    let instructionSet: any = []
    let instructions: any = []
    let signers: any = []
    let signerSet: any = []

    let makeTokenFromTx = await makeATokenAccountTransaction(connection, wallet?.publicKey, wallet?.publicKey, new PublicKey(TOKEN_MINT))
    if (makeTokenFromTx.instructions.length !== 0) {
      instructions = [...makeTokenFromTx.instructions]
      signers = [...makeTokenFromTx.signers]
    }
    let tokenFrom = makeTokenFromTx.tokenTo

    instructions.push(program.instruction.deposit(amount, {
      accounts: {
        user: wallet.publicKey,
        tokenFrom: tokenFrom,
        tokenTo: tokenTo,
        vault: vault,
        data: data,
        tokenProgram: TOKEN_PROGRAM_ID
      }
    }))
    instructionSet.push(instructions)
    signerSet.push(signers)

    try {
      const result = await sendTransactions(connection, wallet, instructionSet, signerSet)
      if (result.success) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  return (
    <section
      className={`d-flex align-items-center justify-content-between global-padding ${classes.root} ${styles.header}`}
    >
      {loading && <div id="preloader"></div>}
      {!isMobile
        ? <>
          <div className={`d-flex align-items-center justify-content-between`}>
            {MARKET_PAGES.map((tab, index) => {
              return <CustomNav to={tab.url} key={index} >{tab.node}</CustomNav>
            })}
          </div>

          <div className={`d-flex align-items-center justify-content-between`}>
            <div className={`d-flex align-items-center justify-content-between mr-16`}>
              <p className={`font-quick ${classes.collection} ${styles.collection}`}>
                FLUFF Collected:&nbsp;&nbsp;
              </p>
              <p className={`font-quick ${classes.collection}`}>
                {store.wallet.fluff} <span className={`${styles.collectionAmount}`}>FLUFF</span>
              </p>
            </div>

            <div className={`text-center mr-16`}>
              <Button onClick={() => setOpenDepositModal(true)} variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
                Deposit FLUFF
              </Button>
            </div>

            <div className={`text-center`}>
              <Button onClick={() => setOpenClaimModal(true)} variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
                Claim FLUFF
              </Button>
            </div>
          </div>
        </>
        :
        <div className={styles.nav_part}>
          <div className={`d-flex`}>
            <div className={`text-center ${styles.claim_button}`} >
              <Button onClick={() => setOpenClaimModal(true)} variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
                Claim
              </Button>
            </div>
            <div className={`text-center ${styles.deposit_button}`}>
              <Button onClick={() => setOpenDepositModal(true)} variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
                DEPOSIT
              </Button>
            </div>
            <div className={`d-flex align-items-center justify-content-between`}>
              <p className={`font-quick ${classes.collection} ${styles.collection}`}>
                FLUFF Collected:&nbsp;&nbsp;
              </p>
              <p className={`font-quick ${classes.collection}`} style={{ display: 'flex' }}>
                {store.wallet.fluff}<span className={`${styles.collectionAmount}`}>&nbsp;FLUFF</span>
              </p>
            </div>
          </div>
          <div className={`d-flex align-items-center justify-content-between ${styles.nav_tabs}`}>
            {MARKET_PAGES.map((tab, index) => {
              return <CustomNav to={tab.url} key={index} >{tab.node}</CustomNav>
            })}
          </div>
        </div>
      }

      <ClaimModal
        wallet={store.wallet}
        openClaimModal={openClaimModal}
        setOpenClaimModal={setOpenClaimModal}
        handleClaim={handleClaim}
      >
      </ClaimModal>
      <DepositModal
        wallet={store.wallet}
        openDepositModal={openDepositModal}
        setOpenDepositModal={setOpenDepositModal}
        handleDeposit={handleDeposit}
      >

      </DepositModal>

    </section>
  )
}

export default HeaderPart;
