import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_EDIT_FAIL,
  ORDER_EDIT_REQUEST,
  ORDER_EDIT_RESET,
  ORDER_EDIT_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants'

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true }
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderEditReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_EDIT_REQUEST:
      return { loading: true }
    case ORDER_EDIT_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_EDIT_RESET:
      return {}
    default:
      return state
  }
}
