const basketReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return [...state, action.data]
    case 'REMOVE_FROM_BASKET': {
      const newState = removeHelper(state, action)
      return [...newState]
    }
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
  const prices = basket.map((item) => Number(item.price))
  let total = 0
  for (let price of prices) {
    total += price
  }

  return total
}

export default basketReducer
