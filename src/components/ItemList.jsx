import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';

const ItemList = props => {
  const [itemListData, setItemListData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // モーダル管理
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // 全件取得関数
  const getDataFromAPI = async () => {
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.get(requestUrl);
    setIsLoading(false);
    return result;
  }
  // データ更新関数
  const requestUpdate = async (index, docId, newData) => {
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.put(`${requestUrl}/${docId}`, { title: newData });
    const newDataArray = [...props.data]
    newDataArray[index] = {
      ...newDataArray[index],
      ...{ data: result.data.data },
    }
    props.setData(newDataArray);
    alert('Updated Successfly!');
    setIsLoading(false);
  }

  // データ削除関数
  const deleteData = async (index, docId) => {
    setIsLoading(true);
    const requestUrl = process.env.REACT_APP_API_URL;
    const result = await axios.delete(`${requestUrl}/${docId}`);
    const newDataArray = [...itemListData].filter((x, i) => i !== index);
    setItemListData(newDataArray);
    alert('Deleted Successfly!');
    setIsLoading(false);
  }

  useEffect(() => {
    const result = getDataFromAPI?.().then(response => setItemListData(response.data));
  }, [])
  return (
    <div>

      <ul>
        {
          itemListData?.map((x, index) =>
            <li key={index}>
              <p>{x.data.name}</p>
              <p>{x.data.url}</p>
              <p onClick={() => {
                if (window.confirm('Delete item??')) {
                  deleteData(index, x.id)
                }
              }}>delete</p>
            </li>
          )
        }
      </ul>
      {
        !isLoading
          ? ''
          : <Loading
            text='Now Loading...'
          />
      }
    </div>
  );
}
export default ItemList;