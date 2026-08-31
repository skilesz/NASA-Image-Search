function ImageGrid({ items, loading, error }) {
    if (loading || error) {
        return null;
    }

    if (items.length === 0) {
        return <p className="no-results">No images found.</p>;
    }

    return (
        <div className="image-grid">
            {items.map((item) => (
                <article className="image-card" key={item.id}>
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                    />

                    <div className="image-card-content">
                        <h2>{item.title}</h2>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default ImageGrid;