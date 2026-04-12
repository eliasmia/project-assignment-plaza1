"use client";

/**
 * Product detail UI for `/product/[uid]`. Receives `uid` from the server page
 * (after `params` is awaited). Refetches when `uid` changes.
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProductByUid } from "@/lib/walton-plaza/products";
import type { Product, ProductVariant } from "@/types/product";

type ProductDetailsProps = {
  uid: string;
};

export default function ProductDetails({ uid }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    async function load() {
      setError(null);
      setLoading(true);
      try {
        const p = await fetchProductByUid(uid);
        if (!cancelled) {
          setProduct(p);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load product");
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  if (!uid) {
    return <p className="p-10">Invalid product link.</p>;
  }

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600">{error}</p>;
  }

  if (!product) {
    return <p className="p-10">Product not found</p>;
  }

  const variants: ProductVariant[] = product.variants ?? [];
  // Keep selection in range if the API returns fewer variants than before.
  const safeIndex =
    selectedVariant < variants.length ? selectedVariant : 0;
  const variant = variants[safeIndex];
  return (
    <div className="mx-auto max-w-6xl p-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          {product.images?.[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.enName}
              width={800}
              height={400}
              className="h-[400px] w-full rounded border object-contain"
              unoptimized
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center bg-gray-200">
              No Image
            </div>
          )}
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.enName}</h1>

          <div className="mb-4 text-xl">
            {variant?.discount ? (
              <>
                <span className="mr-2 font-bold text-red-500">
                  ৳{variant.discount.value}
                </span>
                <span className="mr-2 line-through text-gray-500">
                  ৳{variant.mrpPrice}
                </span>
                <span className="text-green-600">
                  {variant.discount.type === "percentage"
                    ? `${variant.discount.amount}% OFF`
                    : `Save ৳${variant.discount.amount}`}
                </span>
              </>
            ) : (
              <span className="font-bold">
                ৳{variant?.mrpPrice ?? "N/A"}
              </span>
            )}
          </div>

          {variants.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 font-semibold">Variants</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedVariant(i)}
                    className={`rounded border px-3 py-1 ${
                      safeIndex === i
                        ? "bg-black text-white"
                        : "hover:border-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            {variant && variant.quantity > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          <button
            type="button"
            className="rounded bg-black px-6 py-2 text-white hover:opacity-90"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Product Details</h2>

        {product.productAttributes && product.productAttributes.length > 0 ? (
          product.productAttributes.map((item, i) => (
            <div key={i} className="mb-3">
              <h4 className="font-semibold">{item.enLabel}</h4>
              <ul className="ml-5 list-disc">
                {item.values.map((v, idx) => (
                  <li key={idx}>{v.enName}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No details available</p>
        )}
      </div>
    </div>
  );
}
