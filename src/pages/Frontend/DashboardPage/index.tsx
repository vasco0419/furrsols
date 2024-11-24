import { useEffect, useState } from "react"

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'

import { toast } from 'react-toastify'

import PrimaryLayout from './../../../components/template/PrimaryLayout'
import NavPart from './../../../components/organisms/NavPart'
import MainContent from './../../../components/organisms/MainContent'
import FilterPart from './../../../components/organisms/FilterPart'
import ContentPart from './../../../components/organisms/ContentPart'

import ItemBox from './../../../components/atoms/ItemBox'
import NftItem from './../../../components/molecules/NftItem'

import DetailModal from './../../../components/molecules/DetailModal'
import UpgradeModal from './../../../components/molecules/UpgradeModal'

import styles from './index.module.scss'

import { useAppSelector } from "../../../redux/hook"
import { useDispatch } from "react-redux"

import { getFurrsols, takecare, spawn, despawn, revive, collect, upgrade, getCurrentSeason } from "./actions"
import { IFurrsol } from './reducer'

// Solana
import { AnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram } from '@solana/web3.js'

import { getProvider, makeATokenAccountTransaction } from '../../../utils/Helper'
import { PROGRAM_ID, TOKEN_ACCOUNT, TOKEN_MINT } from '../../../configs/develop'
import { METADATA_PROGRAM_ID_PUBLIC_KEY } from '../../../helpers/solana'
import { IDL } from '../../../constants/furrsols_staking_contract'
import * as anchor from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { sendTransactions } from '../../../helpers/solana/connection'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    infoList: {
      borderBottomColor: alpha(`${theme.syscolor.light}`, 0.1),
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px'
    },
    info: {
      color: theme.palette.text.primary
    }
  })
)

const filterOptions = [
  {
    key: "filters",
    name: "Filters",
    options: [
      {
        key: "all",
        name: "All",
      },
      {
        key: "spawned",
        name: "Spawned",
      },
      {
        key: "notspawned",
        name: "Not Spawned",
      }
    ]
  },
  {
    key: "classes",
    name: "Classes",
    options: [
      {
        key: "all",
        name: "All",
      },
      {
        key: "Winter",
        name: "Winter",
      },
      {
        key: "Spring",
        name: "Spring",
      },
      {
        key: "Summer",
        name: "Summer",
      },
      {
        key: "Autumn",
        name: "Autumn",
      }
    ]
  },
  {
    key: "status",
    name: "Status",
    options: [
      {
        key: "all",
        name: "All",
      },
      {
        key: "alive",
        name: "Alive",
      },
      {
        key: "dead",
        name: "Dead",
      }
    ]
  }
]

const Dashboard = () => {
  const classes = useStyles()

  const store = useAppSelector((state) => state.dashboard)
  const dispatch = useDispatch()

  const walletState = useWallet()
  const wallet = useAnchorWallet()
  const { connection } = useConnection()

  const [openNFTModal, setOpenNFTModal] = useState<boolean>(false)
  const [openUpgradeModal, setOpenUpgradeModal] = useState<boolean>(false)
  const [filteredFurrsols, setFilteredFurrsols] = useState<IFurrsol[]>([])
  const [selectedFurrsol, setSelectedFurrsol] = useState('')

  // Handle TakeCare Furrsol
  const handleOpenDetailModal = (nftAddress: string) => {
    setSelectedFurrsol(nftAddress)
    setOpenNFTModal(true)

  }

  const handleTakecare = (nftAddress: any, type: String) => {
    dispatch(
      takecare({
        walletAddress: walletState.publicKey?.toString(),
        nftAddress,
        type
      })
    )
  }

  const handleSpawn = async (nftAddress: any) => {
    if (!wallet) {
      toast.error('Wallet is not connected!', { theme: 'dark' })
      return
    }
    dispatch({ type: 'SET_LOADING', loading: true })
    const provider: any = getProvider(connection, wallet as AnchorWallet)
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider)
    let instructionSet: any = []
    let signerSet: any = []
    let instructions: any = []
    let signers: any = []
    let [poolSigner, nonce_signer] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol signer'), wallet.publicKey.toBuffer()
    ], program.programId)

    let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), new PublicKey(nftAddress).toBuffer()
    ], program.programId)

    let [poolData] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol data')
    ], program.programId)
    let metaPub = new PublicKey(nftAddress)
    let [metadata] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
        metaPub.toBytes()
      ],
      METADATA_PROGRAM_ID_PUBLIC_KEY
    )
    let result: any = await connection.getAccountInfo(poolSigner)
    // console.log('poolSigner: ', result)
    try {
      if (result === null) {
        const instruction = await program.instruction.createPoolsigner(nonce_signer, {
          accounts: {
            poolSigner: poolSigner,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId
          }
        })

        instructions.push(instruction)
      }
    } catch (error) {
      console.log(error)
      toast.error('Transaction Failded!', { theme: 'dark' })
      return
    }

    result = await connection.getAccountInfo(pool)
    try {
      if (result === null) {
        const instruction = await program.instruction.createPool(nonce_pool, {
          accounts: {
            pool: pool,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
            mint: new PublicKey(nftAddress)
          }
        })
        instructions.push(instruction)
      }
    } catch (error) {
      console.log(error)
      toast.error('Transaction Failed!', { theme: 'dark' })
      return
    }

    console.log('nft: ', nftAddress, wallet.publicKey.toString())

    let makeNftFromTokenAccount = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(nftAddress))

    if (makeNftFromTokenAccount.instructions.length !== 0) {
      instructions = [...instructions, ...makeNftFromTokenAccount.instructions]
      signers = [...signers, ...makeNftFromTokenAccount.signers]
    }

    let nftFrom = makeNftFromTokenAccount.tokenTo
    console.log('nftFrom: ', nftFrom.toString())

    let makeNftToTokenAccount = await makeATokenAccountTransaction(connection, wallet.publicKey, poolSigner, new PublicKey(nftAddress))

    if (makeNftToTokenAccount.instructions.length !== 0) {
      instructions = [...instructions, ...makeNftToTokenAccount.instructions]
      signers = [...signers, ...makeNftToTokenAccount.signers]
    }

    let nftTo = makeNftToTokenAccount.tokenTo

    instructions.push(program.instruction.stake({
      accounts: {
        user: wallet.publicKey,
        pool: pool,
        data: poolData,
        nftFrom: nftFrom,
        nftTo: nftTo,
        metadata: metadata,
        mint: new PublicKey(nftAddress),
        tokenProgram: TOKEN_PROGRAM_ID
      }
    }))

    instructionSet.push(instructions)
    signerSet.push(signers)
    try {
      const tx = await sendTransactions(connection, wallet, instructionSet, signerSet)

      if (tx.success) {
        console.log("Successfully Spawned")

        dispatch(
          spawn({
            walletAddress: walletState.publicKey?.toString(),
            nftAddress
          })
        )
      } else {
        dispatch({ type: 'SET_LOADING', loading: false })
        toast.error('Spawn Failed!', { theme: 'dark' })
        return
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: 'SET_LOADING', loading: false })
      toast.error('Spawn Failed!', { theme: 'dark' })
      return
    }

  }

  const handleDespawn = async (nftAddress: any) => {
    if (!wallet) {
      toast.error('Wallet is not connected!', { theme: 'dark' })
      return
    }
    dispatch({ type: 'SET_LOADING', loading: true })
    const provider = getProvider(connection, wallet as AnchorWallet)
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider)
    let instructionSet: any = []
    let signerSet: any = []
    let instructions: any = []
    let signers: any = []

    let [poolSigner, nonce_signer] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol signer'), wallet.publicKey.toBuffer()
    ], program.programId)

    let [pool] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), new PublicKey(nftAddress).toBuffer()
    ], program.programId)

    let [poolData] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol data')
    ], program.programId)

    let [vault] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol vault')
    ], program.programId)

    let makeRewardAtaTx: any

    try {
      makeRewardAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(TOKEN_MINT))
      if (makeRewardAtaTx.instructions.length !== 0) {
        instructions = [...makeRewardAtaTx.instructions]
        signers = [...makeRewardAtaTx.signers]
      }
    } catch (error) {
      console.log(error)
      toast.error('Transaction Failed!', { theme: 'dark' })
      return
    }

    let tokenTo = makeRewardAtaTx.tokenTo
    let tokenFrom = new PublicKey(TOKEN_ACCOUNT)

    let makeNftFromAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, poolSigner, new PublicKey(nftAddress))
    if (makeNftFromAtaTx.instructions.length !== 0) {
      instructions = [...instructions, ...makeNftFromAtaTx.instructions]
      signers = [...signers, ...makeNftFromAtaTx.signers]
    }
    let nftFrom = makeNftFromAtaTx.tokenTo

    let makeNftToAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(nftAddress))
    if (makeNftToAtaTx.instructions.length !== 0) {
      instructions = [...instructions, ...makeNftToAtaTx.instructions]
      signers = [...signers, ...makeNftToAtaTx.signers]
    }
    let nftTo = makeNftToAtaTx.tokenTo

    instructions.push(program.instruction.unstake(nonce_signer, {
      accounts: {
        user: wallet.publicKey,
        poolSigner,
        pool,
        data: poolData,
        vault,
        tokenFrom,
        tokenTo,
        nftFrom,
        nftTo,
        mint: new PublicKey(nftAddress),
        tokenProgram: TOKEN_PROGRAM_ID
      }
    }))
    instructionSet.push(instructions)
    signerSet.push(signers)
    try {
      const tx = await sendTransactions(connection, wallet, instructionSet, signerSet)
      if (tx.success) {
        dispatch(
          despawn({
            walletAddress: walletState.publicKey?.toString(),
            nftAddress
          })
        )

      } else {
        console.log('Despawn Failed!')
        toast.error('Despawn Failed!', { theme: 'dark' })
        dispatch({ type: 'SET_LOADING', loading: false })
        return
      }
    } catch (error) {
      console.log(error)
      console.log('Despawn Failed!')
      toast.error('Despawn Failed!', { theme: 'dark' })
      dispatch({ type: 'SET_LOADING', loading: false })
      return
    }
  }

  const handleRevive = (nftAddress: any) => {
    dispatch(
      revive({
        walletAddress: walletState.publicKey?.toString(),
        nftAddress
      })
    )
  }

  const handleCollect = (nftAddress: any) => {
    dispatch(
      collect({
        walletAddress: walletState.publicKey?.toString(),
        nftAddress
      })
    )
  }
  // Handle TakeCare Furrsol

  // Handle Filter
  const handleFilter = (filterOption: String, key: String) => {
    dispatch({
      type: "HANDLE_FILTER",
      filterOption,
      key
    })
  }

  const handleFilterEnables = () => {
    const furrsols = store.furrsols

    let enables = {
      filters: {
        all: furrsols.length > 0 ? true : false,
        spawned: furrsols.filter((furrsol: IFurrsol) => furrsol.spawn === true).length > 0 ? true : false,
        notspawned: furrsols.filter((furrsol: IFurrsol) => furrsol.spawn === false).length > 0 ? true : false
      },
      classes: {
        all: furrsols.length > 0 ? true : false,
        Winter: furrsols.filter((furrsol: IFurrsol) => furrsol.Class === 'Winter').length > 0 ? true : false,
        Spring: furrsols.filter((furrsol: IFurrsol) => furrsol.Class === 'Spring').length > 0 ? true : false,
        Summer: furrsols.filter((furrsol: IFurrsol) => furrsol.Class === 'Summer').length > 0 ? true : false,
        Autumn: furrsols.filter((furrsol: IFurrsol) => furrsol.Class === 'Autumn').length > 0 ? true : false,
      },
      status: {
        all: furrsols.length > 0 ? true : false,
        alive: furrsols.filter((furrsol: IFurrsol) =>
          !(furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0)).length > 0 ? true : false,
        dead: furrsols.filter((furrsol: IFurrsol) =>
          furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0).length > 0 ? true : false,
      }
    }

    dispatch({
      type: 'UPDATE_ENABLES',
      enables: enables
    })
  }

  const handleFilteredFurrsols = () => {
    const filters = store.filters
    const filtered = store.furrsols.filter((furrsol: IFurrsol) => {
      let state = 0
      if (filters.filters.key === 'all') {
        state++
      } else {
        if (filters.filters.key === 'spawned' && furrsol.spawn === true) {
          state++
        }
        if (filters.filters.key === 'notspawned' && furrsol.spawn === false) {
          state++
        }
      }

      if (filters.classes.key === 'all') {
        state++
      } else {
        if (filters.classes.key === 'Winter' && furrsol.Class === 'Winter') {
          state++
        }
        if (filters.classes.key === 'Spring' && furrsol.Class === 'Spring') {
          state++
        }
        if (filters.classes.key === 'Summer' && furrsol.Class === 'Summer') {
          state++
        }
        if (filters.classes.key === 'Autumn' && furrsol.Class === 'Autumn') {
          state++
        }
      }

      if (filters.status.key === 'all') {
        state++
      } else {
        if (filters.status.key === 'alive') {
          if (!(furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0)) {
            state++
          }
        }
        if (filters.status.key === 'dead') {
          if (furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0) {
            state++
          }
        }
      }

      if (state === 3) {
        return furrsol
      }
    })

    setFilteredFurrsols(filtered)
  }

  const handleUpgrade = () => {
    dispatch(
      upgrade({
        walletAddress: walletState.publicKey?.toString(),
        nftAddress: selectedFurrsol
      })
    )
  }

  useEffect(() => {
    handleFilteredFurrsols()
  }, [store.filters])

  useEffect(() => {
    handleFilteredFurrsols()
    handleFilterEnables()
  }, [store.furrsols])

  // Handle Filter
  useEffect(() => {
    if (walletState.connected === true) {
      dispatch(
        getFurrsols({ walletAddress: walletState.publicKey?.toString() })
      )
      dispatch(getCurrentSeason())
    } else {

    }
  }, [walletState.connected, store.currentSeason])

  useEffect(() => {
    const { value, message } = store.event

    switch (value) {
      case 1:
        toast.success(message, { theme: 'colored' })
        break
      case 2:
        toast.error(message, { theme: 'colored' })
        break
    }
    dispatch({
      type: 'EVENT_INIT'
    })
  }, [store.event.value])

  return (
    <PrimaryLayout>
      {store.loading && <div id="preloader"></div>}
      {
        walletState.connected === true ?
          <>
            <NavPart> </NavPart>
            <MainContent>

              <FilterPart
                filterOptions={filterOptions}
                filters={store.filters}
                enables={store.enables}
                handleFilter={handleFilter}
              >
                <Grid container direction="row" justifyContent="space-between" alignItems="center" className={`pb-16 mb-16 ${classes.infoList}`}>
                  <Grid item md={7} sm={3} className={`pt-8 ${classes.info}`}>
                    Current Season
                  </Grid>
                  <Grid item md={5} sm={3} className={`pt-8 ${classes.info}`}>
                    : {`❄ ${store.currentSeason}`}
                  </Grid>
                  <Grid item md={7} sm={3} className={`pt-8 ${classes.info}`}>
                    Your FurrSols
                  </Grid>
                  <Grid item md={5} sm={3} className={`pt-8 ${classes.info}`}>
                    : {store.furrsols.length}
                  </Grid>
                </Grid>
              </FilterPart>

              <ContentPart>
                <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={3} className={`${styles.NftItem}`}>
                  {filteredFurrsols.map((furrsol: any, index: any) => {
                    return <Grid item lg={6} md={8} sm={8} key={index}>
                      <ItemBox>
                        <NftItem
                          furrsol={furrsol}
                          handleOpenDetailModal={handleOpenDetailModal}
                          handleTakecare={handleTakecare}
                          handleSpawn={handleSpawn}
                          handleDespawn={handleDespawn}
                          handleRevive={handleRevive}
                          handleCollect={handleCollect}
                        >
                        </NftItem>
                      </ItemBox>
                    </Grid>
                  })}
                </Grid>

                <DetailModal
                  openNFTModal={openNFTModal}
                  setOpenNFTModal={setOpenNFTModal}
                  setOpenUpgradeModal={setOpenUpgradeModal}
                  furrsol={store.furrsols.find((elem: IFurrsol) => elem.nftAddress === selectedFurrsol)}
                >
                </DetailModal>

                <UpgradeModal
                  setOpenUpgradeModal={setOpenUpgradeModal}
                  openUpgradeModal={openUpgradeModal}
                  handleUpgrade={handleUpgrade}
                  furrsol={store.furrsols.find((elem: IFurrsol) => elem.nftAddress === selectedFurrsol)}
                >
                </UpgradeModal>

              </ContentPart>

            </MainContent>
          </>
          :
          <div style={{ height: "calc(100vh - 118px)" }}>
            <Grid container justifyContent="center">
              <div className="fontQuick" style={{ marginTop: '150px', textAlign: 'center', color: 'white', fontSize: '24px' }}>Please connect a Solana wallet to start.</div>
            </Grid>
          </div>
      }

    </PrimaryLayout>
  )
}

export default Dashboard

