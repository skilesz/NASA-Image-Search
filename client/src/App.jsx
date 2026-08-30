import { useState } from "react";

function App() {
  // State
  const [query, setQuery] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const totalPages = pagination
    ? Math.ceil(
        pagination.totalHits / pagination.pageSize
      )
    : 0;

  // Custom submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setItems([]);
      setPagination(null);
      return;
    }

    await searchImages(1);
  };

  // Search images
  const searchImages = async (pageNumber) => {
    setLoading(true);
    setError("");
    setItems([]);

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

      params.set("page", pageNumber.toString());

      const response = await fetch(
        `http://localhost:3001/api/photos?${params}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to retrieve images");
      }

      const data = await response.json();

      setItems(data.items);
      setPagination(data.pagination);
      setPage(pageNumber);
    } catch (error) {
      setError(error.message);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  // Validate form
  const validateForm = () => {
    if (
      startYear &&
      !Number.isInteger(Number(startYear))
    ) {
      return "Start year must be a whole number."
    }

    if (
      endYear &&
      !Number.isInteger(Number(endYear))
    ) {
      return "End year must be a whole number."
    }

    if (
      startYear &&
      endYear &&
      Number(startYear) > Number(endYear)
    ) {
      return "Start year cannot be after end year."
    }

    return "";
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
          </div>
        ))}
      </div>

      {pagination && totalPages > 1 && (
        <div>
          <button
            onClick={() => searchImages(page - 1)}
            disabled={page === 1 || loading}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => searchImages(page + 1)}
            disabled={page === totalPages || loading}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}

export default App;