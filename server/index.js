const express = require("express");     // Express for main server application
const cors = require("cors");           // Cors for communicating with React frontend
require("dotenv").config();             // dotenv for config file containing API key

const { searchImages } = require("./nasa");

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

// Photo query endpoint
app.get("/api/photos", async (req, res) => {
    try {
        const { query, startYear, endYear } = req.query;

        if (!query) {
            return res.status(400).json({
                error: "Search query required"
            });
        }

        const data = await searchImages({
            query,
            startYear,
            endYear,
        });

        res.json(data);
    } catch (error) {
        console.error("NASA API error:", error.message);

        res.status(500).json({
            error: "Failed to retrieve images from NASA",
        });
    }
});

// Log that server has started
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});