import { createStore, combineReducers } from 'redux'
import basketReducer from './reducers/basketReducer'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import loginReducer from './reducers/loginReducer'
import keywordReducer from './reducers/keywordReducer'

const reducers = combineReducers({
  basket: basketReducer,
  user: userReducer,
  products: productReducer,
  login: loginReducer,
  keyword: keywordReducer,
})

const store = createStore(reducers)

export default store
