import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import UserInfo from '../components/UserInfo'

const UserScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getUserDetails(match.params.id))
    }
  }, [dispatch, userInfo, history, match])

  return (
    <>
      <Link to='/users' className='btn btn-light my-3'>
        Назад
      </Link>
      <h1>Профиль</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <UserInfo user={user} />
      )}
    </>
  )
}

export default UserScreen
