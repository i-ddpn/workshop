import axios from 'axios'
import {
  STATS_MASTERS_REQUEST,
  STATS_MASTERS_SUCCESS,
  STATS_MASTERS_FAIL,
  STATS_MANAGERS_REQUEST,
  STATS_MANAGERS_SUCCESS,
  STATS_MANAGERS_FAIL,
} from '../constants/statsConstants'

export const getStatsMasters = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STATS_MASTERS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/stats/masters', config)

    dispatch({ type: STATS_MASTERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: STATS_MASTERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getStatsManagers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STATS_MANAGERS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/stats/managers', config)

    dispatch({ type: STATS_MANAGERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: STATS_MANAGERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
