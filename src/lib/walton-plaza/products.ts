/**
 * Product queries for Walton Plaza GraphQL API.
 */
import type { Product } from "@/types/product";
import { waltonPlazaGraphqlFetch } from "./graphql-client";

/** Paginated catalog: used by the home page grid. */
const LIST_PRODUCTS_QUERY = `
  query ListProducts($skip: Int, $limit: Int) {
    getProducts(pagination: { skip: $skip, limit: $limit }) {
      statusCode
      message
      result {
        products {
          uid
          enName
          images { url }
          productAttributes {
            enLabel
            values { enName }
          }
          detailedDescriptions {
            enLabel
            values { enName }
          }
          deliveries {
            enLabel
            values { enName }
          }
          serviceAndDeliveries {
            enLabel
            values { enName }
          }
          priceAndStocks {
            enLabel
            values { enName }
          }
          variants {
            mrpPrice
            ebsItemCode
            posItemCode
            quantity
            discount {
              amount
              value
              type
            }
          }
        }
      }
    }
  }
`;

/** Single product by `uid` from the `[uid]` route. */
const PRODUCT_BY_UID_QUERY = `
  query ProductByUid($uid: String) {
    getProducts(
      filter: { uid: $uid }
      pagination: { skip: 0, limit: 1 }
    ) {
      result {
        products {
          uid
          enName
          images { url }
          productAttributes { enLabel values { enName } }
          detailedDescriptions { enLabel values { enName } }
          deliveries { enLabel values { enName } }
          serviceAndDeliveries { enLabel values { enName } }
          variants {
            mrpPrice
            quantity
            discount { amount value type }
          }
        }
      }
    }
  }
`;

type GetProductsPayload = {
  getProducts?: {
    result?: {
      products?: Product[] | null;
    } | null;
  } | null;
};

/** Loads a page of products for the catalog grid. */
export async function fetchProductsList(
  skip = 0,
  limit = 10
): Promise<Product[]> {
  const data = await waltonPlazaGraphqlFetch<GetProductsPayload>({
    query: LIST_PRODUCTS_QUERY,
    variables: { skip, limit },
  });

  return data.getProducts?.result?.products ?? [];
}

/** Returns one product or `null` if the API returns an empty list. */
export async function fetchProductByUid(uid: string): Promise<Product | null> {
  const data = await waltonPlazaGraphqlFetch<GetProductsPayload>({
    query: PRODUCT_BY_UID_QUERY,
    variables: { uid },
  });

  return data.getProducts?.result?.products?.[0] ?? null;
}
