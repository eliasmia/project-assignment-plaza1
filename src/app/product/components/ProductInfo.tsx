"use client";

import { useState } from "react";

export default function ProductInfo({ product }: any) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  if (!product) {
    return <p className="p-4">Loading product...</p>;
  }

  const variant = product?.variants?.[selectedVariant];

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.enName}</h1>

      <p className="mt-2">
        Price: ৳{variant?.discount?.value || variant?.mrpPrice || "N/A"}
      </p>
    </div>
  );
}