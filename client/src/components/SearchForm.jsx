function SearchForm({
    query,
    setQuery,
    startYear,
    setStartYear,
    endYear,
    setEndYear,
    onSubmit,
}) {
    return (
        <form className="search-form" onSubmit={onSubmit}>
            <div className="form-group search-field">
                <label htmlFor="query">Search</label>
                <input
                    id="query"
                    type="text"
                    placeholder="e.g. Curiosity"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="startYear">Start Year</label>
                <input
                    id="startYear"
                    type="number"
                    placeholder="YYYY"
                    value={startYear}
                    onChange={(event) => setStartYear(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlForm="endYear">End Year</label>
                <input
                    id="endYear"
                    type="number"
                    placeholder="YYYY"
                    value={endYear}
                    onChange={(event) => setEndYear(event.target.value)}
                />
            </div>

            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;