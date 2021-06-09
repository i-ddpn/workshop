import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { serviceListReducer } from './reducers/serviceReducers'
import { positionListReducer } from './reducers/positionReducers'
import {
  userLoginReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userCreateReducer,
  userEditReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  serviceList: serviceListReducer,
  positionList: positionListReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userCreate: userCreateReducer,
  userEdit: userEditReducer,
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
