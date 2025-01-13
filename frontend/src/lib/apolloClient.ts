import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://fmavtf6tvja5die4gnqk4funum.appsync-api.eu-central-1.amazonaws.com/graphql', // Put on .env latter
    headers: {
        'x-api-key': '',
    },
    cache: new InMemoryCache
})

export default client;