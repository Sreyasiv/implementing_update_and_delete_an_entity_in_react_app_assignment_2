const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

let doors = [
  { id: 1, name: "Front Door", status: "open" },
  { id: 2, name: "Back Door", status: "closed" },
];

// GET route - Fetch all doors
app.get("/doors", (req, res) => {
  res.json(doors);
});

// DELETE route - Remove a door by ID
app.delete("/doors/:id", (req, res) => {
  const { id } = req.params;
  const index = doors.findIndex((door) => door.id === parseInt(id));

  if (index !== -1) {
    doors.splice(index, 1);
    res.status(200).json({ message: "Door deleted successfully" });
  } else {
    res.status(404).json({ message: "Door not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
