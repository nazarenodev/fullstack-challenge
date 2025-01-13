import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: {
        'x-api-key': apiKey || ''
    },
    cache: new InMemoryCache
})

export default client;