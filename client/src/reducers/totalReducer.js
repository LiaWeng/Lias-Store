const totalReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_TOTAL':
      return action.data
    case 'CLEAR_TOTAL':
      return 0
    default:
      return state
  }
}

export default totalReducer
