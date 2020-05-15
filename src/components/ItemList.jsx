import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CakeIcon from '@material-ui/icons/Cake';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from 'axios';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    overflow: 'hidden',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const ItemList = props => {
  const classes = useStyles();

  const [itemListData, setItemListData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className={classes.root}>
      <List>
        {
          itemListData?.map((x, index) =>
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <CakeIcon />
                </Avatar>
              </ListItemAvatar>
              <Link
                href={x.data.url}
                target="_blank"
                color="inherit"
                rel="noopener"
              >
                <ListItemText
                  primary={x.data.name}
                  secondary={x.data.url}
                />
              </Link>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    if (window.confirm('Delete item??')) {
                      deleteData(index, x.id)
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }
      </List>
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