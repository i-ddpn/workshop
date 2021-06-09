import axios from 'axios'
import {
  POSITION_LIST_REQUEST,
  POSITION_LIST_SUCCESS,
  POSITION_LIST_FAIL,
} from '../constants/positionConstants'

export const listPositions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POSITION_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/positions', config)

    dispatch({ type: POSITION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: POSITION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
