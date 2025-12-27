import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.colorVariant.deleteMany();
  await prisma.gSMVariant.deleteMany();
  await prisma.product.deleteMany();

  /* =========================
     COPTIC BOUND (COLOR OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Coptic Bound",
      images: [
        "/products/copticbound/main.png",
        "/products/copticbound/lemongrass.png",
        "/products/copticbound/terracotta.png",
        "/products/copticbound/gulaab.png",
      ],
      sizes: ["6 INCH X 8 INCH"],
      description:
        "Hand-stitched with the traditional Coptic binding technique, this sketchbook opens completely flat — perfect for wide spreads and seamless sketching.",
      variants: {
        create: [
          {
            gsm: "180 GSM",
            price: 600,
            colors: {
              create: [
                { name: "Lemongrass", type: "COLOR" },
                { name: "Terracotta", type: "COLOR" },
                { name: "Gulaab", type: "COLOR" },
              ],
            },
          },
          {
            gsm: "90 GSM",
            price: 400,
            colors: {
              create: [
                { name: "Lemongrass", type: "COLOR" },
                { name: "Terracotta", type: "COLOR", soldOut: true },
              ],
            },
          },
        ],
      },
    },
  });

  /* =========================
     CASE BOUND (COLOR OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Case Bound",
      images: [
        "/products/casebound/main.png",
        "/products/casebound/lemongrass.png",
        "/products/casebound/terracotta.png",
        "/products/casebound/gulaab.png",
        "/products/casebound/book1.png",
        "/products/casebound/book2.png",
        "/products/casebound/book3.png",
        "/products/casebound/book4.png",
      ],
      sizes: ["6 INCH X 8 INCH"],
      description:
        "Crafted with a classic hardbound cover, this sketchbook is built to last.",
      variants: {
        create: [
          {
            gsm: "120 GSM",
            price: 450,
            colors: {
              create: [
                { name: "Lemongrass", type: "COLOR" },
                { name: "Terracotta", type: "COLOR" },
                { name: "Gulaab", type: "COLOR" },
              ],
            },
          },
        ],
      },
    },
  });

  /* =========================
     FIELD BOOK (NO OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Field Book",
      images: [
        "/products/fieldbook/main.png",
        "/products/fieldbook/orange.png",
        "/products/fieldbook/black.png",
        "/products/fieldbook/green.png",
        "/products/fieldbook/yellow.png",
        "/products/fieldbook/bundle.png",
      ],
      sizes: ["4 INCH X 6 INCH"],
      description:
        "Pocket-size notebooks designed for quick ideas, sketches, and thoughts on the go.",
      variants: {
        create: [
          {
            gsm: "120 GSM",
            price: 400,
            colors: {
              create: [], // IMPORTANT: explicitly empty
            },
          },
        ],
      },
    },
  });

  /* =========================
     ROUGH PAD (FORMAT OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Rough Pad",
      images: [
        "/products/roughpad/main.png",
        "/products/roughpad/book1.png",
        "/products/roughpad/book2.png",
        "/products/roughpad/book3.png",
        "/products/roughpad/book4.png",
        "/products/roughpad/book5.png",
      ],
      sizes: ["21.5CM X 28CM", "28CM X 43CM"],
      description:
        "A large-format rough pad ideal for exploratory sketching and drafting.",
      variants: {
        create: [
          {
            gsm: "50 GSM",
            price: 200,
            colors: {
              create: [
                { name: "COMPACT A3", type: "FORMAT" },
                { name: "COMPACT A4", type: "FORMAT" },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded correctly");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
