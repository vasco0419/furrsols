
// ** Initial State
const initialState = {
    filters: {
      filters: {
        key: 'all',
      }
    },
    enables: {
      filters: {
        all: true,
        supplies: true,
        powerups: true
      }
    },
    event: {
      type: '',
      message: '',
      value: 0
    }
  }
  
  const reducer = (state = initialState, action: any) => {
    switch (action.type) {

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
      default:
        return state
    }
  }
  
  export default reducer
  