"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = makeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
