import {
  CLIENT_CREATE_FAIL,
  CLIENT_CREATE_REQUEST,
  CLIENT_CREATE_RESET,
  CLIENT_CREATE_SUCCESS,
  CLIENT_DELETE_FAIL,
  CLIENT_DELETE_REQUEST,
  CLIENT_DELETE_SUCCESS,
  CLIENT_DETAILS_FAIL,
  CLIENT_DETAILS_REQUEST,
  CLIENT_DETAILS_SUCCESS,
  CLIENT_EDIT_FAIL,
  CLIENT_EDIT_REQUEST,
  CLIENT_EDIT_RESET,
  CLIENT_EDIT_SUCCESS,
  CLIENT_LIST_FAIL,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
} from '../constants/clientConstants'

export const clientDetailsReducer = (state = { client: {} }, action) => {
  switch (action.type) {
    case CLIENT_DETAILS_REQUEST:
      return { loading: true }
    case CLIENT_DETAILS_SUCCESS:
      return { loading: false, client: action.payload }
    case CLIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const clientListReducer = (state = { clients: [] }, action) => {
  switch (action.type) {
    case CLIENT_LIST_REQUEST:
      return { loading: true }
    case CLIENT_LIST_SUCCESS:
      return { loading: false, clients: action.payload }
    case CLIENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const clientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENT_DELETE_REQUEST:
      return { loading: true }
    case CLIENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CLIENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const clientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENT_CREATE_REQUEST:
      return { loading: true }
    case CLIENT_CREATE_SUCCESS:
      return { loading: false, success: true, client: action.payload }
    case CLIENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CLIENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const clientEditReducer = (state = { client: {} }, action) => {
  switch (action.type) {
    case CLIENT_EDIT_REQUEST:
      return { loading: true }
    case CLIENT_EDIT_SUCCESS:
      return { loading: false, success: true, client: action.payload }
    case CLIENT_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case CLIENT_EDIT_RESET:
      return {}
    default:
      return state
  }
}
