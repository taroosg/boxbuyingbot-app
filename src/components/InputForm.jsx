import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const InputForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  // データ追加関数
  const sendNewDataToServer = async (name, url) => {
    if (name === '' || url === '') {
      return false
    }
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const postdata = {
      name: name,
      url: url,
    }
    const result = await axios.post(requestUrl, postdata);
    alert('Saved Successfly!');
    setName('');
    setUrl('');
    setIsLoading(false);
  }

  return (
    <div>
      <form action="">
        <ul>
          <li>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => { setName(e.target.value) }}
            />
          </li>
          <li>
            <label htmlFor="url">url</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={e => { setUrl(e.target.value) }}
            />
          </li>
          <button
            type="button"
            onClick={() => { sendNewDataToServer(name, url) }}
          >submit</button>
        </ul>
      </form>
      {
        !isLoading
          ? ''
          : <Loading
            text='Now Loading...'
          />
      }
    </div>
  )
}

export default InputForm;