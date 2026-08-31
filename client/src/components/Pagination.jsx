function Pagination({
    page,
    totalPages,
    loading,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1 || loading}
            >
                Previous
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages || loading}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;