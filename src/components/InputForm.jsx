import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const InputForm = props => {
  const classes = useStyles();
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
      <form
        className={classes.root}
        // noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            spacing={3}
          >
            <TextField
              required
              id="standard-required"
              label="Name"
              defaultValue=""
              value={name}
              onChange={e => { setName(e.target.value) }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            spacing={3}
          >
            <TextField
              required
              id="standard-required"
              label="URL"
              defaultValue=""
              value={url}
              onChange={e => { setUrl(e.target.value) }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            spacing={3}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => { sendNewDataToServer(name, url) }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* <button
          type="button"
          onClick={() => { sendNewDataToServer(name, url) }}
        >submit</button> */}
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