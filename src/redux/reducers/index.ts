// ** Initial State
const initialState = {
  wallet: {
    walletAddress: '',
    pillow: 0,
    pearl: 0,
    soap: 0,
    ball: 0,
    fluff: 0,
  },
  event: {
    type: '',
    value: 0
  }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_WALLET':
      return {
        ...state,
        wallet: {
          ...state.wallet,
          ...action.wallet
        }
      }
    case 'CLAIM_FLUFF':
      return {
        ...state,
        wallet: {
          ...state.wallet,
          fluff: action.fluff
        }
      }

    case 'DEPOSIT_FLUFF':
      console.log(action.fluff)
      return {
        ...state,
        wallet: {
          ...state.wallet,
          fluff: action.fluff
        }
      }
    default:
      return state
  }
}

export default reducer
