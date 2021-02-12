import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 30,
    marginTop: 30
  },
  button: {
    margin: 50
  }

}))

export default function Item(props) {
  const [balance, setBalance] = React.useState(21.0427); 
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.root}>
        Balance: {balance} tokens
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        color="primary"
        className={classes.button}
      >Get More Tokens</Button>
      
    </div>
  )
}
