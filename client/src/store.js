import { createStore, combineReducers } from 'redux'
import basketReducer from './reducers/basketReducer'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import loginReducer from './reducers/loginReducer'

const reducers = combineReducers({
  basket: basketReducer,
  user: userReducer,
  products: productReducer,
  login: loginReducer,
})

const store = createStore(reducers)

export default store
