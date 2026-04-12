/**
 * Dynamic product route: resolves `[uid]` on the server, then hydrates the client
 * details view. In Next.js App Router (v15+), `params` is async and must be
 * awaited—otherwise `uid` is undefined and client fetches never run.
 */
import ProductDetails from "@/components/productDetails/productDetails";

type ProductPageProps = {
  params: Promise<{ uid: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { uid } = await params;

  return <ProductDetails uid={uid} />;
}
