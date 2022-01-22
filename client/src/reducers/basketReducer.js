const basketReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return [...state, action.data]
    case 'REMOVE_FROM_BASKET': {
      const newState = removeHelper(state, action)
      return [...newState]
    }
    case 'EMPTY_BASKET':
      return []
    default:
      return state
  }
}

const removeHelper = (state, action) => {
  const items = state
  for (let i = 0; i < items.length; i++) {
    if (items[i].title === action.data) {
      items.splice(i, 1)
      return items
    }
  }
}

export const getTotal = (basket) => {
  let total = 0
  for (let item of basket) {
    total += item.price
  }

  return total
}

export default basketReducer
