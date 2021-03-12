import React from 'react';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Link from '@material-ui/core/Link';
import { makeStyles, Typography, withWidth } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
//import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginTop: 100,
    paddingRight:50
  },
  submit: {
    marginTop: 20,
    width: 150
  }
}))

export default function DevItemForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h2">Add Items</Typography>
      <FormGroup>
        <TextField 
          id="itemName"
          label="Item Name"
          placeholder="Item Name"  
        />
        <TextField 
          id="itemDescription"
          label="Item Description"
          multiline
          placeholder="Item Description"
        />
        <TextField
          id="itemPrice"
          label="Price"
          placeholder="Price"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
        <br />
          <ButtonGroup variant="contained" className={classes.submit}>
            <Button color="primary" type="submit">Submit</Button>
            <Button color="secondary">Cancel</Button>
          </ButtonGroup>
          <br />


        
      </FormGroup>
    </div>
  )
}