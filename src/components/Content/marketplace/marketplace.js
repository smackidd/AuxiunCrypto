import React from 'react';
import Item from '../Items/item';
import Image from '../../../resources/WOW-light-spear.jpg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white'
  }
}))


export default function ItemList(props) {
  const classes = useStyles();

  const [items, showItems] = React.useState(
    {
      items: [
        {
          token: 1,
          name: 'WOW Light Axe',
          game: 'World of Warcraft',
          image: Image,
          description: ''
        },
        {
          token: 2,
          name: 'WOW Dark Axe',
          game: 'World of Warcraft',
          image: Image,
          description: ''
        }
      ]
    }
  );

  return (
    <div>
      <Typography variant="h2" className={classes.title}>Marketplace</Typography>
      <br/>
      {items.items.map((item) => (
        <Item items = {item} home={props.home}></Item>
      ))}
    </div>
  )
}