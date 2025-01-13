import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
    mutation CreateOrder($client: String!, $shoeRef: ID!, $size: Int!, $shippingInfo: String!) {
        createOrder(client: $client, shoeRef: $shoeRef, size: $size, shippingInfo: $shippingInfo) {
            orderId
            client
            shoeRef
            size
            shippingInfo
        }
    }
`;