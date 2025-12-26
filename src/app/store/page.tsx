import Link from "next/link";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Product = {
  id: number;
  name: string;
  images: string[];
};

export default async function StorePage() {
  const products: Product[] = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      images: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <section className="store-page">
      <div className="product-row">
        {products.map((product) => {
          const image = product.images?.[0];

          return (
            <Link
              key={product.id}
              href={`/store/${product.id}`}
              className="product-item"
            >
              <h2 className="product-name">{product.name}</h2>

              {image && (
                <img
                  src={image}
                  alt={product.name}
                  className="product-thumb"
                />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

