import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ImageGrid from "./components/ImageGrid";
import Pagination from "./components/Pagination";

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
    <div className="app">
      <header className="header">
        <h1>NASA Image Search</h1>
      </header>

      <main>
        <SearchForm
          query={query}
          setQuery={setQuery}
          startYear={startYear}
          setStartYear={setStartYear}
          endYear={endYear}
          setEndYear={setEndYear}
          onSubmit={handleSubmit}
        />

        {loading && (
          <p className="status">Searching NASA Image and Video Library...</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        <ImageGrid items={items} />

        <Pagination
          page={page}
          totalPages={totalPages}
          loading={loading}
          onPageChange={searchImages}
        />
      </main>
    </div>
  );
}

export default App;