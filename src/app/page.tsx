/**
 * Home route: product catalog shell (server component) + client-side list/grid.
 */
import ProductList from "@/components/product/product";

export default function HomePage() {
  return (
    <div className="p-10 pt-30">
      <h1 className="mb-4 text-center text-3xl font-bold uppercase">
        Products Page
      </h1>
      <ProductList />
    </div>
  );
}
