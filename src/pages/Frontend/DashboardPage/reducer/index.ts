
export interface IFurrsol {
  nftAddress: string,
  walletAddress: string,
  name: string,
  symbol: string,
  description: string,
  image: string,
  Class: string,
  Gen: string,
  BreedCount: number,
  Upgrades: number,
  Sleep: number,
  MaxSleep: number,
  Hunger: number,
  MaxHunger: number,
  Hygiene: number,
  MaxHygiene: number,
  Fun: number,
  MaxFun: number,
  GuildID: number,
  FLUFF: number,
  Background: string,
  Fur: string,
  Eyes: string,
  Headgear: string,
  Accessory: string,
  Mouth: string,
  Toy: string,
  uri: string,
  updateAuthority: string,
  tokenAccount: string,
  spawn: boolean,
  spawnTime: number
}

// ** Initial State
const initialState = {
  furrsols: [] as IFurrsol[],
  filters: {
    filters: {
      key: 'all',
    },
    classes: {
      key: 'all',
    },
    status: {
      key: 'all',
    },
  },
  enables: {
    filters: {
      all: false,
      spawned: false,
      notspawned: false
    },
    classes: {
      all: false,
      Winter: false,
      Spring: false,
      Summer: false,
      Autumn: false,
    },
    status: {
      all: false,
      alive: false,
      dead: false,
    }
  },
  loading: false,
  event: {
    type: '',
    value: 0,
    message: ''
  },
  currentSeason: 'Winter'
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_FURRSOLS':
      return { ...state, furrsols: action.furrsols }
    case 'CLAIM_FLUFF': {
      return state
    }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'TAKECARE_FURRSOL':
    case 'SPAWN_FURRSOL':
    case 'DESPAWN_FURRSOL':
    case 'REVIVE_FURRSOL':
    case 'UPGRADE_FURRSOL':
    case 'COLLECT_FLUFF': {
      return {
        ...state,
        furrsols: state.furrsols.map(furrsol => furrsol.nftAddress === action.furrsol.nftAddress ?
          action.furrsol : furrsol
        )
      }
    }
    case 'HANDLE_FILTER': {
      const filters = {
        ...state.filters,
        [action.filterOption]: {
          ...state.filters[action.filterOption as keyof Object],
          key: action.key,
        }
      }
      return {
        ...state,
        filters: filters
      }
    }
    case 'UPDATE_ENABLES': {
      return {
        ...state,
        enables: action.enables
      }
    }
    case 'TAKECARE_FAILED': {
      return {
        ...state,
        event: action
      }
    }
    case 'EVENT_INIT': {
      return {
        ...state,
        event: {
          type: '',
          value: 0,
          message: ''
        }
      }
    }
    case 'GET_SEASON': {
      return {
        ...state,
        currentSeason: action.season
      }
    }
    default:
      return state
  }
}

export default reducer
