import React from 'react';
import Item from './item';
import Image from '../../../resources/WOW-light-spear.jpg';

export default function ItemList() {
  const [items, showItems] = React.useState(
    {
      items: [
        {
          token: 1,
          name: 'WOW Light Spear',
          game: 'World of Warcraft',
          image: Image,
          description: ''
        },
        {
          token: 2,
          name: 'WOW Dark Spear',
          game: 'World of Warcraft',
          image: Image,
          description: ''
        }
      ]
    }
  );

  return (
    <div>
      {items.items.map((item) => (
        <Item items = {item}></Item>
      ))}
    </div>
  )
}