// Item.jsx
import React from "react";

const Item = ({ item, onDelete }) => {
  return (
    <div className="item">
      <span>{item.name}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default Item;