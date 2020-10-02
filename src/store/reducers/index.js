import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import favoritesReducer from './favoritesReducer'
import brandsReducer from './brandsReducer'
import CartsReducer from './CartsReducer'
import AuthReducer from './AuthReducer'
import plansReducer from './plansReducer'
import ordersReducer from './ordersReducer'

export default combineReducers({
  product: productsReducer,
  favorite: favoritesReducer,
  brand: brandsReducer,
  cart: CartsReducer,
  auth: AuthReducer,
  plan: plansReducer,
  order: ordersReducer
});