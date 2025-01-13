import { gql } from "@apollo/client";

export const GET_SHOES = gql`
    query GetShoes($brand: String) {
        getShoes(brand: $brand) {
            id
            brand
            availableSizes
            price
        }
    }
`;