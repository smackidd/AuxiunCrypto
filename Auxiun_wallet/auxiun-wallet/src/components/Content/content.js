import ItemList from './Items/item-list';
import Balance from './balance/balance';
import LogIn from './login/login';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  logIn: {
    align: "center"  
  }
}))

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div>
      {props.loggedIn ? 
        <Grid container spacing={2}>
          <Grid item xs={6}>
              <ItemList></ItemList>
          </Grid>
          <Grid item xs={6}> 
            <Balance></Balance>
          </Grid>
        </Grid>
        :
        <LogIn ></LogIn>
      }   
    </div>
  )
}