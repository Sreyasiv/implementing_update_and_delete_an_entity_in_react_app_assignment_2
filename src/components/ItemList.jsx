import { useEffect, useState } from "react";

const API_URI = "http://localhost:8000/doors"; // Change if needed

const ItemList = () => {
  const [items, setItems] = useState([]); // State for list items
  const [error, setError] = useState(null);

  // Fetch items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URI);
      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete item");

      // Update state to remove the deleted item
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🚪 Door Status</h2>
      {items.length === 0 ? (
        <p>No doors available</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                background: item.status === "open" ? "#d4edda" : "#f8d7da",
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>{item.name}</strong> - {item.status.toUpperCase()}
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
