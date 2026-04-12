"use client";

import { useState } from "react";

export default function ImageGallery({ images }: any) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div className="border rounded-xl p-4 bg-white">
        <img
          src={images?.[selected]?.url || "/placeholder.png"}
          className="w-full h-[420px] object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4">
        {images?.map((img: any, i: number) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`border rounded-lg p-1 cursor-pointer ${
              selected === i ? "border-black" : "border-gray-300"
            }`}
          >
            <img src={img.url} className="w-16 h-16 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}