"use client";

import { getCart, saveCart } from "@/lib/cart";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/* COLOR HEX MAP */
const COLOR_MAP: Record<string, string> = {
  lemongrass: "#555B29",
  terracotta: "#603E2F",
  gulaab: "#93483A",
};

/* TYPES */
type Product = {
  id: number;
  name: string;
  images: string[];
  sizes: string[];
  description: string;
  variants: GSMVariant[];
};

type GSMVariant = {
  gsm: string;
  price: number;
  colors: ColorVariant[];
};

type ColorVariant = {
  name: string;
  type: "COLOR" | "FORMAT";
  soldOut?: boolean;
};

export default function ProductPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<GSMVariant | null>(null);
  const [selectedOption, setSelectedOption] = useState<ColorVariant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* FETCH PRODUCT */
  useEffect(() => {
    if (!rawId) return;

    fetch(`/api/products/${rawId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data: Product) => {
        const firstVariant = data.variants[0];

        setProduct(data);
        setSelectedVariant(firstVariant);
        setSelectedOption(
          firstVariant.colors?.find((o) => !o.soldOut) ?? null
        );
        setImageIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [rawId]);

  if (loading) return <p>Loading product…</p>;
  if (error || !product || !selectedVariant) {
    return <p>{error ?? "Product unavailable"}</p>;
  }

  const colorOptions =
    selectedVariant.colors?.filter((o) => o.type === "COLOR") ?? [];

  const formatOptions =
    selectedVariant.colors?.filter((o) => o.type === "FORMAT") ?? [];

  return (
    <main className="product-page">
      <div className="product-layout">
        {/* IMAGE */}
        <div className="product-media">
          <img
            src={product.images[imageIndex]}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* DETAILS */}
        <div className="product-details">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <span className="product-price">Rs.{selectedVariant.price}</span>
          </div>

          {/* COLORS */}
          {colorOptions.length > 0 && (
            <div className="product-meta-row">
              <div className="product-badges">
                {colorOptions.map((color) => {
                  const key = color.name.toLowerCase().trim();
                  const colorHex = COLOR_MAP[key] ?? "#000";

                  const imageIdx = product.images.findIndex((img) =>
                    img.toLowerCase().includes(key)
                  );

                  return (
                    <div
                      key={color.name}
                      className={`color-swatch ${
                        selectedOption?.name === color.name ? "active" : ""
                      } ${color.soldOut ? "sold-out" : ""}`}
                      style={
                        { "--swatch-color": colorHex } as React.CSSProperties
                      }
                      onClick={() => {
                        if (color.soldOut) return;
                        setSelectedOption(color);
                        if (imageIdx >= 0) setImageIndex(imageIdx);
                      }}
                    >
                      <span className="color-text">{color.name}</span>
                      <span className="color-dot" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FORMAT OPTIONS */}
          {formatOptions.length > 0 && (
            <div className="product-meta-row">
              <div className="product-badges">
                {formatOptions.map((opt) => (
                  <span
                    key={opt.name}
                    className={`product-badge ${
                      selectedOption?.name === opt.name ? "active" : ""
                    }`}
                    onClick={() => setSelectedOption(opt)}
                  >
                    {opt.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* GSM */}
          <div className="product-meta-row">
            <div className="product-badges">
              {product.variants.map((variant) => (
                <span
                  key={variant.gsm}
                  className={`product-badge ${
                    selectedVariant.gsm === variant.gsm ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setSelectedOption(
                      variant.colors?.find((o) => !o.soldOut) ?? null
                    );
                  }}
                >
                  {variant.gsm}
                </span>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* INFO */}
          <div className="product-meta-row">
            <h2 className="product-section-title">Item info</h2>
            <p>
              <strong>Size:</strong> {product.sizes.join(", ")}
            </p>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );

  function handleAddToCart() {
    if (!product || !selectedVariant) return;

    const cart = getCart();

    cart.push({
      id: product.id,
      name: product.name,
      price: selectedVariant.price,
      image: product.images[imageIndex],
      gsm: selectedVariant.gsm,
      color: selectedOption?.name ?? "",
      size: product.sizes[0],
      quantity: 1,
    });

    saveCart(cart);
  }
}



