import React, { Fragment, useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export default ({ renderSignin, renderMain }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Fragment>
      {
        currentUser?.uid === process.env.REACT_APP_CURRNTUSER_UID
          ? renderMain()
          : renderSignin()
      }
    </Fragment>
  )
}