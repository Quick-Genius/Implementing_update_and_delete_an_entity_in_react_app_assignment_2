// ItemList.jsx
import React, { useState, useEffect } from "react";
import Item from "./Item";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  // Fetch list items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Method to fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URI);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setApiResponse({ error: true, message: "Failed to fetch items" });
    }
  };

  // Method to delete an item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        const deletedItem = await response.json();
        // Update the list by filtering out the deleted item
        setItems(items.filter(item => item.id !== id));
        setApiResponse({ 
          success: true, 
          message: `Item ${deletedItem.name} deleted successfully` 
        });
      } else {
        const errorData = await response.json();
        setApiResponse({ 
          error: true, 
          message: errorData.message || "Failed to delete item" 
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setApiResponse({ 
        error: true, 
        message: "An error occurred while deleting the item" 
      });
    }
  };

  return (
    <div className="container">
      <h1>Door List</h1>
      
      {/* Display API response message if any */}
      {apiResponse && (
        <div className={`api-response ${apiResponse.error ? "error" : "success"}`}>
          {apiResponse.message}
        </div>
      )}
      
      {/* Render items or show a message if no items */}
      {items.length > 0 ? (
        items.map((item) => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default ItemList;