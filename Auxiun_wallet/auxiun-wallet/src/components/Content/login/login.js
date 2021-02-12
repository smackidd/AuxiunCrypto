import React from 'react';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 100
  },
  submit: {
    marginTop: 20
  }
}))

export default function LogIn(props) {
  const classes = useStyles();
  const [usernameInput, setUsername] = React.useState("");
  const [passwordInput, setPassword] = React.useState("");



  return (
    <div className={classes.root}>

      <TextField
        id="username-input"
        label="username"

        placeholder="username"
      />
      <br />
      <TextField
        id="password-input"
        type="password"
        label="password"

        placeholder="password"
      />
      <br />
      <ButtonGroup variant="contained" className={classes.submit}>
        <Button color="primary">Submit</Button>
        <Button color="secondary">Cancel</Button>
      </ButtonGroup>



    </div>
  )
}