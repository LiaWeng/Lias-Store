const basketReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET': {
      let newState = { ...state }
      if (!(action.data in newState)) {
        newState[action.data] = 1
      } else {
        newState[action.data] += 1
      }

      return newState
    }
    case 'REMOVE_FROM_BASKET': {
      let newState = { ...state }
      if (newState[action.data] === 1) {
        delete newState[action.data]
      } else {
        newState[action.data] -= 1
      }

      return newState
    }
    case 'EMPTY_BASKET':
      return []
    default:
      return state
  }
}

export default basketReducer
