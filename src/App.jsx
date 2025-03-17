import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items...");
        const response = await fetch("http://localhost:8000/doors");
        const data = await response.json();
        console.log("Fetched items:", data);
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Door Status</h1>
      <ItemList items={items} />
    </div>
  );
};

export default App;
