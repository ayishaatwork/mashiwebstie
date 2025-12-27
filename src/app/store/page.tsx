import Link from "next/link";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Product = {
  id: number;
  name: string;
};

function imageFromName(name: string) {
  return `/images/${name.toLowerCase().replace(/\s+/g, "")}.png`;
}

export default async function StorePage() {
  const products: Product[] = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <section className="store-page">
      <div className="product-row">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/store/${product.id}`}
            className="product-item"
          >
            <img
              src={imageFromName(product.name)}
              alt={product.name}
              className="product-thumb"
            />
            <h2 className="product-name">{product.name}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}

