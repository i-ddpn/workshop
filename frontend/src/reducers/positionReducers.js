import {
  POSITION_LIST_REQUEST,
  POSITION_LIST_SUCCESS,
  POSITION_LIST_FAIL,
} from '../constants/positionConstants'

export const positionListReducer = (state = { positions: [] }, action) => {
  switch (action.type) {
    case POSITION_LIST_REQUEST:
      return { loading: true, positions: [] }
    case POSITION_LIST_SUCCESS:
      return { loading: false, positions: action.payload }
    case POSITION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
