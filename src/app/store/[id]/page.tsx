import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { id?: string };
}) {
  if (!params?.id) {
    return (
      <pre style={{ padding: 20 }}>
        Missing route param: {JSON.stringify(params, null, 2)}
      </pre>
    );
  }

  const productId = parseInt(params.id, 10);

  if (Number.isNaN(productId)) {
    return (
      <pre style={{ padding: 20 }}>
        Invalid id: {params.id}
      </pre>
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
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

