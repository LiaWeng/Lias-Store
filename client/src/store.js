import { createStore, combineReducers } from 'redux'
import basketReducer from './reducers/basketReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  basket: basketReducer,
  user: userReducer,
})

const store = createStore(reducers)

export default store
