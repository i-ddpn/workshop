import {
  REPORT_MASTER_REQUEST,
  REPORT_MASTER_SUCCESS,
  REPORT_MASTER_FAIL,
} from '../constants/reportConstants'

export const reportMasterReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case REPORT_MASTER_REQUEST:
      return { loading: true, orders: [] }
    case REPORT_MASTER_SUCCESS:
      return { loading: false, orders: action.payload }
    case REPORT_MASTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
