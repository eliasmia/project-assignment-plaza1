/**
 * Shared shapes for Walton Plaza product payloads (list + detail). Optional
 * fields mirror GraphQL nullability; callers should null-check sections.
 */
export interface ProductSection {  enLabel: string;
  values: { enName: string }[];
}

export interface VariantDiscount {
  amount: number;
  value: number;
  type: "flat" | "percentage";
}

export interface ProductVariant {
  mrpPrice: number;
  quantity: number;
  ebsItemCode?: string;
  posItemCode?: string;
  discount?: VariantDiscount | null;
}

export interface Product {
  uid: string;
  enName: string;
  images: { url: string }[];
  productAttributes?: ProductSection[] | null;
  detailedDescriptions?: ProductSection[] | null;
  deliveries?: ProductSection[] | null;
  serviceAndDeliveries?: ProductSection[] | null;
  priceAndStocks?: ProductSection[] | null;
  variants: ProductVariant[];
}
