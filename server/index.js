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
        const { query, startYear, endYear, page = "1" } = req.query;

        const start = startYear ? Number(startYear) : undefined;
        const end = endYear? Number(endYear) : undefined;
        const pageNumber = Number(page);

        // Check that start year is integer, if it exists
        if (start !== undefined && !Number.isInteger(start)) {
            return res.status(400).json({
                error: "Start year must be an integer",
            });
        }

        // Check that end year is integer, if it exists
        if (end !== undefined && !Number.isInteger(end)) {
            return res.status(400).json({
                error: "End year must be an integer",
            });
        }

        // Check that start year is not later than end year
        if (start !== undefined && end !== undefined && start > end) {
            return res.status(400).json( {
                error: "Start year cannot be after end year",
            });
        }

        // Validate that page number is a positive integer
        if (!Number.isInteger(pageNumber) || pageNumber < 1) {
            return res.status(400).json( {
                error: "Page must be a positive integer",
            });
        }

        const data = await searchImages({
            query: query?.trim(),
            startYear: start,
            endYear: end,
            page: pageNumber,
        });

        res.json(data);
    } catch (error) {
        console.error("NASA API error:", error.message);

        res.status(502).json({
            error: "NASA API request failed",
        });
    }
});

// Log that server has started
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});