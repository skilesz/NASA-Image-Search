const axios = require("axios");     // Axios for easier HTTP methods

const NASA_API_URL = "https://images-api.nasa.gov/search";

async function searchImages({ query, startYear, endYear, page }) {
    // Construct params
    const params = {
        q: query?.trim(),
        media_type: "image",
        year_start: startYear,
        year_end: endYear,
        page_size: 20,
        page,
    };

    // Call NASA API
    const response = await axios.get(NASA_API_URL, {
        params,
    });

    // Simplify image items for frontend
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

    // Response
    return {
        items,
        pagination: {
            page,
            pageSize: 20,
            totalHits: response.data.collection.metadata?.total_hits ?? 0,
        }
    };
}

module.exports = {
    searchImages,
}