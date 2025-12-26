import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export default async function DbTestPage() {
  const count = await prisma.product.count();

  return (
    <div style={{ padding: 40 }}>
      <h1>Database connection OK</h1>
      <p>Product count: {count}</p>
    </div>
  );
}
