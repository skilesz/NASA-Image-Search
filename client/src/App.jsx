import { useState } from "react";

function App() {
  // State
  const [query, setQuery] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Custom submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (query.trim()) {
        params.set("query", query.trim());
      }

      if (startYear) {
        params.set("startYear", startYear);
      }

      if (endYear) {
        params.set("endYear", endYear);
      }

      params.set("page", "1");

      const response = await fetch(
        `http://localhost:3001/api/photos?${params}`
      );

      if (!response.ok) {
        throw new Error("Failed to retrieve images");
      }

      const data = await response.json();

      setItems(data.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>NASA Image Search</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <label>
          Start Year:
          <input
            type="number"
            value={startYear}
            onChange={(event) => setStartYear(event.target.value)}
          />
        </label>

        <label>
          End Year:
          <input
            type="number"
            value={endYear}
            onChange={(event) => setEndYear(event.target.value)}
          />
        </label>

        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching NASA library...</p>}

      {error && <p>{error}</p>}

      <div>
        {items.map((item) => (
          <div key={item.id}>
            <img
              src={item.imageUrl}
              alt={item.title}
              width="300"
            />

            <h2>{item.title}</h2>

            <p>{item.dateCreated}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;