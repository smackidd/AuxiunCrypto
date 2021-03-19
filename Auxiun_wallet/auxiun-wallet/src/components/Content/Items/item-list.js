import React, { useState, useEffect } from "react";
import Item from "./item";

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const fetchedData = await fetch(
      "http://localhost:3000/api/marketplace/assets"
    )
      .then((res) => res.json())
      .then((data) => data);
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
