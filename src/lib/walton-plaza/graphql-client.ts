/**
 * Thin GraphQL HTTP client for Walton Plaza. Centralizes URL, JSON envelope,
 * and error handling so feature code can assume either `data` or a thrown Error.
 */
export const WALTON_PLAZA_GRAPHQL_URL =
  "https://devapi.waltonplaza.com.bd/graphql" as const;

type GraphQLErrorPayload = {
  errors?: { message: string }[];
};

/** POSTs `{ query, variables? }` and returns the `data` payload. */
export async function waltonPlazaGraphqlFetch<TData>(
  body: Record<string, unknown>
): Promise<TData> {
  const res = await fetch(WALTON_PLAZA_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json = (await res.json()) as GraphQLErrorPayload & { data?: TData };

  // GraphQL may return HTTP 200 with top-level `errors` and no usable `data`.
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (json.data === undefined) {
    throw new Error("GraphQL response missing data");
  }

  return json.data;
}
