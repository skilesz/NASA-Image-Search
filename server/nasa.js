const axios = require("axios");     // Axios for easier HTTP methods

const NASA_API_URL = "https://images-api.nasa.gov/search";

async function searchImages({ query, startYear, endYear }) {
    const response = await axios.get(NASA_API_URL, {
        params: {
            q: query,
            media_type: "image",
            year_start: startYear,
            year_end: endYear,
            page_size: 20,
        },
    });

    const items = response.data.collection.items.map((item) => {
        const metadata = item.data[0];

        const imageLink = item.links?.find(
            (link) => link.rel === "preview"
        );

        return {
            id: metadata.nasa_id,
            title: metadata.title,
            description: metadata.description,
            dateCreated: metadata.date_created,
            keywords: metadata.keywords || [],
            photographer: metadata.photographer,
            imageUrl: imageLink?.href,
        };
    });

    return {
        items,
    };
}

module.exports = {
    searchImages,
}