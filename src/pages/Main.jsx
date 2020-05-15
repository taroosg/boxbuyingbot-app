import React, { useContext } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import ItemList from '../components/ItemList';
import { AuthContext } from '../contexts/auth'
import SimpleModal from '../components/SimpleModal';

const Main = props => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="App">
      <Header />
      {
        currentUser.uid === process.env.REACT_APP_CURRNTUSER_UID
          ? <div className="App-main">
            <SimpleModal>
              <InputForm />
            </SimpleModal>
            <ItemList />
          </div>
          : ''
      }
    </div>
  )
}

export default Main;