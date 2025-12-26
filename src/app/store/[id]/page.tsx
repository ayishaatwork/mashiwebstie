import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  return (
    <pre style={{ padding: 20 }}>
      {JSON.stringify(
        {
          params,
          productId,
          product,
        },
        null,
        2
      )}
    </pre>
  );
}

