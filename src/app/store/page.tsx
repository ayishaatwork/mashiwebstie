import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "Coptic Bound" },
  { id: 2, name: "Case Bound" },
  { id: 3, name: "Field Book" },
];

export default function StorePage() {
  return (
    <section className="store-page">
      <div className="product-row">
        {PRODUCTS.map((product) => (
          <Link
            key={product.id}
            href={`/store/${product.id}`}
            className="product-item"
          >
            <h2 className="product-name">{product.name}</h2>
            <img
              src={`/images/${product.name
                .toLowerCase()
                .replace(/\s+/g, "")}.png`}
              alt={product.name}
              className="product-thumb"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
