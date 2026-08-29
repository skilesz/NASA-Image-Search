const axios = require("axios");     // Axios for easier HTTP methods

const NASA_API_URL = "https://images-api.nasa.gov/search";

async function searchImages({ query, startYear, endYear }) {
    const response = await axios.get(NASA_API_URL, {
        params: {
            q: query,
            media_type: "image",
            year_start: startYear,
            year_end: endYear,
        },
    });

    return response.data;
}

module.exports = {
    searchImages,
}