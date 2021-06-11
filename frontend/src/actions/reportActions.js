import axios from 'axios'
import {
  REPORT_MASTER_REQUEST,
  REPORT_MASTER_SUCCESS,
  REPORT_MASTER_FAIL,
} from '../constants/reportConstants'

export const getReportMaster = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_MASTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/report/my', config)

    dispatch({ type: REPORT_MASTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REPORT_MASTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
