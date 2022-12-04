import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GQL_API_URL,
  headers: {
    "content-type": "application/json",
  },
  cache: new InMemoryCache(),
});

export default client;
