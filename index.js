const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is alive");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
