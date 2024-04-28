import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products($take: Int!, $skip: Int!, $where: ProductsWhereInput) {
    products(take: $take, skip: $skip, where: $where) {
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
        status
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

export const PRODUCT = gql`
  query Product($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      auditer {
        name
        roleKey
        email
      }
      categories {
        name
        nameEn
        code
      }
      status
      name
      image
      id
      description
      createdAt
      Vendor {
        id
      }
    }
  }
`;
