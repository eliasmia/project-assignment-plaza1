"use client";

/**
 * Client-side product
 */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProductsList } from "@/lib/walton-plaza/products";
import type { Product } from "@/types/product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      try {
        const list = await fetchProductsList(0, 10);
        if (!cancelled) {setProducts(list);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load products");
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
  }, []);

  if (loading) {
    return <p className="p-10 flex items-center justify-center">Loading...</p>;
  }
  if (error) {
    return <p className="p-10 flex items-center justify-center text-red-600">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="p-10 flex items-center justify-center">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-10 md:grid-cols-2">
      {products.map((product) => {
        const variant = product?.variants?.[0];
        return (
          <div key={product.uid} className="rounded border p-4 shadow">
            <h2 className="mb-2 text-xl font-bold">
              <Link href={`/product/${product.uid}`}>{product.enName}</Link>
            </h2>

            {product.images?.[0]?.url ? (
              <Link href={`/product/${product.uid}`}>
              <Image
                src={product.images[0].url}
                alt={product.enName}
                width={192}
                height={128}
                className="mb-3 h-32 w-48 object-contain hover:scale-115 transition-transform duration-200"
                unoptimized
              />
              </Link>
            ) : (
              <div className="mb-3 flex h-32 w-48 items-center justify-center bg-gray-200">
                No Image
              </div>
            )}

            <div className="text-lg">
              {variant?.discount ? (
                <>
                  <span className="mr-2 font-bold text-red-500">
                    ৳{variant.discount.value}
                  </span>
                  <br />
                  <span className="mr-2 line-through text-gray-500">
                    ৳{variant.mrpPrice}
                  </span>
                  <br />
                  <span className="text-green-600">
                    {variant.discount.type === "percentage"
                      ? `${variant.discount.amount}% OFF`
                      : `Save ৳${variant.discount.amount}`}
                  </span>
                </>
              ) : (
                <span className="font-bold text-red-900">
                  ৳{variant?.mrpPrice ?? "N/A"}
                </span>
              )}
            </div>

            <div className="mt-2">
              {variant && variant.quantity > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
