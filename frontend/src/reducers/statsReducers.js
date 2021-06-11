import {
  STATS_MASTERS_REQUEST,
  STATS_MASTERS_SUCCESS,
  STATS_MASTERS_FAIL,
  STATS_MANAGERS_REQUEST,
  STATS_MANAGERS_SUCCESS,
  STATS_MANAGERS_FAIL,
} from '../constants/statsConstants'

export const statsMastersReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case STATS_MASTERS_REQUEST:
      return { loading: true, stats: [] }
    case STATS_MASTERS_SUCCESS:
      return { loading: false, stats: action.payload }
    case STATS_MASTERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const statsManagersReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case STATS_MANAGERS_REQUEST:
      return { loading: true, stats: [] }
    case STATS_MANAGERS_SUCCESS:
      return { loading: false, stats: action.payload }
    case STATS_MANAGERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
