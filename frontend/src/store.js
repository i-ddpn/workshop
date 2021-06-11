import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { serviceListReducer } from './reducers/serviceReducers'
import { orderStatusListReducer } from './reducers/orderStatusReducers'
import { positionListReducer } from './reducers/positionReducers'
import {
  userLoginReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userCreateReducer,
  userEditReducer,
} from './reducers/userReducers'
import {
  orderListReducer,
  orderDeleteReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderEditReducer,
} from './reducers/orderReducers'
import {
  clientListReducer,
  clientDeleteReducer,
  clientCreateReducer,
  clientDetailsReducer,
  clientEditReducer,
} from './reducers/clientReducers'
import {
  statsMastersReducer,
  statsManagersReducer,
} from './reducers/statsReducers'
import { reportMasterReducer } from './reducers/reportReducers'

const reducer = combineReducers({
  serviceList: serviceListReducer,
  orderStatusList: orderStatusListReducer,
  positionList: positionListReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userCreate: userCreateReducer,
  userEdit: userEditReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderEdit: orderEditReducer,
  clientList: clientListReducer,
  clientDelete: clientDeleteReducer,
  clientCreate: clientCreateReducer,
  clientDetails: clientDetailsReducer,
  clientEdit: clientEditReducer,
  statsMasters: statsMastersReducer,
  statsManagers: statsManagersReducer,
  reportMaster: reportMasterReducer,
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
