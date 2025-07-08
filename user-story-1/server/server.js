require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { validateApiKey } = require("./middleware/auth");
const calculatorRoutes = require("./routes/calculator");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", validateApiKey, calculatorRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Key: ${process.env.API_KEY || "default-api-key-12345"}`);
});
