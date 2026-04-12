"use client";

import { useState } from "react";

function InfoBlock({ data }: any) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No information available</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((item: any, i: number) => (
        <div key={i}>
          <h4 className="font-semibold mb-1">{item.enLabel}</h4>
          <ul className="list-disc ml-5 text-gray-600">
            {item.values.map((v: any, idx: number) => (
              <li key={idx}>{v.enName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function TabsSection({ product }: any) {
  const [tab, setTab] = useState("basic");

  const tabs = [
    { key: "basic", label: "Basic Info" },
    { key: "details", label: "Details" },
    { key: "terms", label: "Terms" },
    { key: "warranty", label: "Warranty" },
  ];

  return (
    <div className="mt-14">
      {/* Tabs */}
      <div className="flex gap-8 border-b">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-sm font-medium ${
              tab === t.key
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {tab === "basic" && (
          <InfoBlock data={product.productAttributes} />
        )}
        {tab === "details" && (
          <InfoBlock data={product.detailedDescriptions} />
        )}
        {tab === "terms" && (
          <InfoBlock data={product.deliveries} />
        )}
        {tab === "warranty" && (
          <InfoBlock data={product.serviceAndDeliveries} />
        )}
      </div>
    </div>
  );
}