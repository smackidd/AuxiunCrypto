import React, { useState, useEffect } from "react";
import Item from "./item";

export default function ItemList() {
  const [items, setItems] = useState([]);
  //const [reloadList, setReloadList] = useState(false);

  useEffect(async () => {
    const fetchedData = await fetch(
      "http://localhost:5000/api/marketplace/assets"
    )
      .then((res) => res.json())
      .then((data) => data);
    console.log(fetchedData);
    setItems(fetchedData);
  }, []);

  return (
    <div>
      {items.length ? (
        items.map((item) => <Item key={item.image} items={item}></Item>)
      ) : (
        <p>No Items</p>
      )}
    </div>
  );
}
