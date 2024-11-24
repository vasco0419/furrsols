import { useEffect } from "react"

import { useWallet } from '@solana/wallet-adapter-react'

// import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'

import PrimaryLayout from './../../../components/template/PrimaryLayout'
import NavPart from './../../../components/organisms/NavPart'
import MainContent from './../../../components/organisms/MainContent'
import FilterPart from './../../../components/organisms/FilterPart'
import ContentPart from './../../../components/organisms/ContentPart'

import ItemBox from './../../../components/atoms/ItemBox'
import MartItem from './../../../components/molecules/MartItem'

// import styles from './index.module.scss'

import { useAppSelector } from "../../../redux/hook"
import { useDispatch } from "react-redux"

import { buyMart } from "./actions"

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {

//     },
//     infoList: {
//       borderBottomColor: alpha(`${theme.syscolor.light}`, 0.1),
//       borderBottomStyle: 'solid',
//       borderBottomWidth: '1px'
//     },
//     info: {
//       color: theme.palette.text.primary
//     }
//   })
// )

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
        key: "supplies",
        name: "Supplies",
      },
      {
        key: "powerups",
        name: "Powerups",
      }
    ]
  }
]

const marts = [
  {
    image: '/assets/marts/pearl.png',
    title: 'Pearl',
    fluff: 12
  },
  {
    image: '/assets/marts/pillow.png',
    title: "Pillow",
    fluff: 12
  },
  {
    image: '/assets/marts/soap.png',
    title: "Soap",
    fluff: 12
  },
  {
    image: '/assets/marts/ball.png',
    title: "Ball",
    fluff: 12
  }
]

const MartPage = () => {
  const store = useAppSelector((state) => state.mart)
  const dispatch = useDispatch()

  const walletState = useWallet()

  const handleBuyMart = (name: string, amount: number) => {
    dispatch(
      buyMart({
        walletAddress: walletState.publicKey?.toString(),
        name,
        amount
      })
    )
  }
  // Handle Filter
  const handleFilter = (filterOption: string, key: string) => {
    dispatch({
      type: "HANDLE_FILTER",
      filterOption,
      key
    })
  }

  const handleFilterEnables = () => {
    // const furrsols = store.furrsols

    // let enables = {
    //   filters: {
    //     all: furrsols.length > 0 ? true: false,
    //     spawned: furrsols.filter((furrsol: IFurrsol) => furrsol.spawn === true).length > 0 ? true : false,
    //     notspawned: furrsols.filter((furrsol: IFurrsol) => furrsol.spawn === false).length > 0 ? true : false
    //   },
    //   classes: {
    //     all: furrsols.length > 0 ? true: false,
    //     Winter: furrsols.filter((furrsol: IFurrsol) => furrsol.class === 'Winter').length > 0 ? true : false,
    //     Spring: furrsols.filter((furrsol: IFurrsol) => furrsol.class === 'Spring').length > 0 ? true : false,
    //     Summer: furrsols.filter((furrsol: IFurrsol) => furrsol.class === 'Summer').length > 0 ? true : false,
    //     Autumn: furrsols.filter((furrsol: IFurrsol) => furrsol.class === 'Autumn').length > 0 ? true : false,
    //   },
    //   status: {
    //     all: furrsols.length > 0 ? true: false,
    //     alive: furrsols.filter((furrsol: IFurrsol) => 
    //     !(furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0)).length > 0 ? true : false,
    //     dead: furrsols.filter((furrsol: IFurrsol) => 
    //     furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0).length > 0 ? true : false,
    //   }
    // }

    // dispatch({
    //   type: 'UPDATE_ENABLES',
    //   enables: enables
    // })
  }

  const handleFilteredItems = () => {
    // const filters = store.filters
    // const filtered = store.furrsols.filter((furrsol: IFurrsol) => {
    //   let state = 0
    //   if (filters.filters.key === 'all') {
    //     state++
    //   } else {
    //     if (filters.filters.key === 'spawned' && furrsol.spawn === true) {
    //       state++
    //     }
    //     if (filters.filters.key === 'notspawned' && furrsol.spawn === false) {
    //       state++
    //     }
    //   }

    //   if (filters.classes.key === 'all') {
    //     state++
    //   } else {
    //     if (filters.classes.key === 'Winter' && furrsol.class === 'Winter') {
    //       state++
    //     }
    //     if (filters.classes.key === 'Spring' && furrsol.class === 'Spring') {
    //       state++
    //     }
    //     if (filters.classes.key === 'Summer' && furrsol.class === 'Summer') {
    //       state++
    //     }
    //     if (filters.classes.key === 'Autumn' && furrsol.class === 'Autumn') {
    //       state++
    //     }
    //   }

    //   if (filters.status.key === 'all') {
    //     state++
    //   } else {
    //     if (filters.status.key === 'alive') {
    //       if(!(furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0)) {
    //         state++
    //       }
    //     }
    //     if (filters.status.key === 'dead') {
    //       if(furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0) {
    //         state++
    //       }
    //     }
    //   }

    //   if (state === 3) {
    //     return furrsol
    //   }
    // })

    // console.log('filtered furrsols', filtered)
    // console.log('store.furrsols', store.furrsols)
    // setFilteredFurrsols(filtered)
  }

  useEffect(() => {
    handleFilteredItems()
  }, [store.filters])

  // Handle Filter

  useEffect(() => {
    if (walletState.connected === true) {
      handleFilteredItems()
      handleFilterEnables()
    }
  }, [walletState.connected])

  return (
    <PrimaryLayout>
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
              </FilterPart>

              <ContentPart>
                <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={3}>
                  {marts.map((nft, index) => {
                    return <Grid item lg={4} md={6} key={index}>
                      <ItemBox>
                        <MartItem
                          info={nft}
                          handleBuyMart={handleBuyMart}
                        >

                        </MartItem>
                      </ItemBox>
                    </Grid>
                  })}
                </Grid>
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

export default MartPage

