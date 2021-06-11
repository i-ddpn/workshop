import {
  ORDER_STATUS_LIST_REQUEST,
  ORDER_STATUS_LIST_SUCCESS,
  ORDER_STATUS_LIST_FAIL,
} from '../constants/orderStatusConstants'

export const orderStatusListReducer = (
  state = { orderStatuses: [] },
  action
) => {
  switch (action.type) {
    case ORDER_STATUS_LIST_REQUEST:
      return { loading: true, orderStatuses: [] }
    case ORDER_STATUS_LIST_SUCCESS:
      return { loading: false, orderStatuses: action.payload }
    case ORDER_STATUS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
