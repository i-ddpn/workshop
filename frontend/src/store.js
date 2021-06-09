import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { serviceListReducer } from './reducers/serviceReducers'
import { userLoginReducer, userDetailsReducer } from './reducers/userReducers'

const reducer = combineReducers({
  serviceList: serviceListReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
