const keywordReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_KEYWORD':
      return action.data
    case 'CLEAR_KEYWORD':
      return ''
    default:
      return state
  }
}

export default keywordReducer
