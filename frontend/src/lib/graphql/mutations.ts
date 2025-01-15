import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
    mutation CreateOrder($client: String!, $items: [OrderItemInput!]!, $shippingInfo: String!, $totalPrice: Float!) {
        createOrder(client: $client, items: $items, shippingInfo: $shippingInfo, totalPrice: $totalPrice) {
            client
            shippingInfo
            totalPrice
        }
    }
`;
