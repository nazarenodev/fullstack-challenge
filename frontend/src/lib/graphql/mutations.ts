import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
    mutation CreateOrder($client: String!, $shoeRef: ID!, $size: Int!, $shippingInfo: String!) {
        createOrder(client: $client, shoeRef: $shoeRef, size: $size, shippingInfo: $shippingInfo) {
            client
            shoeRef
            size
            shippingInfo
        }
    }
`;

/**
 * mutation MyMutation {
  createOrder(client: "C001", items: [{shoeId: "S001", brand: "Nike", size: 42, price: 100, quantity: 1}], shippingInfo: "", totalPrice: 100) {
    client
    shippingInfo
    totalPrice
  }
}
 */