import axios from 'axios'
import {
  CLIENT_CREATE_FAIL,
  CLIENT_CREATE_REQUEST,
  CLIENT_CREATE_SUCCESS,
  CLIENT_DELETE_FAIL,
  CLIENT_DELETE_REQUEST,
  CLIENT_DELETE_SUCCESS,
  CLIENT_DETAILS_FAIL,
  CLIENT_DETAILS_REQUEST,
  CLIENT_DETAILS_SUCCESS,
  CLIENT_EDIT_FAIL,
  CLIENT_EDIT_REQUEST,
  CLIENT_EDIT_SUCCESS,
  CLIENT_LIST_FAIL,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
} from '../constants/clientConstants'

export const getClientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/clients/${id}`, config)

    dispatch({ type: CLIENT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CLIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listClients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/clients`, config)

    dispatch({
      type: CLIENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/clients/${id}`, config)

    dispatch({ type: CLIENT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CLIENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createClient =
  (firstName, middleName, lastName, phoneNumber) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CLIENT_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/clients`,
        { firstName, middleName, lastName, phoneNumber },
        config
      )

      dispatch({ type: CLIENT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: CLIENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const editClient = (client) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_EDIT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/clients/${client._id}`,
      client,
      config
    )

    dispatch({ type: CLIENT_EDIT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CLIENT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
