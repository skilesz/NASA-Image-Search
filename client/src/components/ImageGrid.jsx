function ImageGrid({ items }) {
    if (items.length === 0) {
        return null;
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