import axios from 'axios'
import {
  ORDER_STATUS_LIST_REQUEST,
  ORDER_STATUS_LIST_SUCCESS,
  ORDER_STATUS_LIST_FAIL,
} from '../constants/orderStatusConstants'

export const listOrderStatuses = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_STATUS_LIST_REQUEST })

    const { data } = await axios.get('/api/order_statuses')

    dispatch({ type: ORDER_STATUS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_STATUS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
