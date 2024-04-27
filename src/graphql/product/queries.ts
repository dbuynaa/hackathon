import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products($take: Int!, $skip: Int!) {
    products(take: $take, skip: $skip) {
      data {
        auditer {
          id
          roleKey
          name
          email
        }
        categories {
          name
          nameEn
          order
        }
        createdAt
        description
        id
        image
        name
      }
      count
    }
  }
`;
