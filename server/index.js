const express = require("express");     // Express for making HTTP requests
const cors = require("cors");           // Cors for communicating with React frontend
require("dotenv").config();             // dotenv for config file containing API key

const app = express();
const PORT = 3001;

app.use(cors());

// Test if server is working
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// Test if .env and API key is loaded and accessible
app.get("/api/key-test", (req, res) => {
    res.json({
        keyLoaded: Boolean(process.env.NASA_API_KEY)
    });
});

// Log that server has started
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});