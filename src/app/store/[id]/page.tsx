import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: PageProps) {
  const productId = Number(params.id);

  // Guard: invalid URL
  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      sizes: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="product-page">
      <h1 className="product-title">{product.name}</h1>

      {/* Primary image */}
      {product.images?.[0] && (
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-main-image"
        />
      )}

      {/* Description */}
      {product.description && (
        <p className="product-description">{product.description}</p>
      )}

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <ul className="product-sizes">
          {product.sizes.map((size) => (
            <li key={size}>{size}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
