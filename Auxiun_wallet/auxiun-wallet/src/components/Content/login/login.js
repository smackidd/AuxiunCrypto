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

  function handleSubmit() {
    //console.log("submitted");
    const userInfo = {
      username: usernameInput,
      password: passwordInput
    }
    console.log(userInfo)
    props.handleNewUser(userInfo)
  }

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className={classes.root}>

      <TextField
        id="username-input"
        label="username"
        onChange={(e) => handleUsername(e)}
        placeholder="username"
      />
      <br />
      <TextField
        id="password-input"
        type="password"
        label="password"
        onChange={(e) => handlePassword(e)}
        placeholder="password"
      />
      <br />
      <ButtonGroup variant="contained" className={classes.submit}>
        <Button color="primary" type="submit" onClick={() => handleSubmit()}>Submit</Button>
        <Button color="secondary">Cancel</Button>
      </ButtonGroup>



    </div>
  )
}