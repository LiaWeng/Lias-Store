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

const removeHelper = (state, action) => {
  const items = [...state]
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === action.data) {
      items.splice(i, 1)
      return items
    }
  }
}

export const getTotal = (basket) => {
  // let total = 0
  // for (let item of basket) {
  //   total += item.price
  // }

  return 100
}

export default basketReducer
