import React, { useContext } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import ItemList from '../components/ItemList';
import { AuthContext } from '../contexts/auth'

const Main = props => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div>
      <Header />
      {
        currentUser.uid === process.env.REACT_APP_CURRNTUSER_UID
          ? <div>
            <InputForm />
            <ItemList />
          </div>
          : ''
      }
    </div>
  )
}

export default Main;