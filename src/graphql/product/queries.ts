import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query Products($take: Int!, $skip: Int!, $where: ProductsWhereInput) {
    products(take: $take, skip: $skip, where: $where) {
      count
      data {
        author {
          name
          email
          id
        }
        image
        id
        name
        status
        description
        createdAt
        categories {
          code
          name
          nameEn
          id
        }
      }
    }
  }
`;

export const PRODUCT = gql`
  query Product($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      name
      image
      description
      status
      author {
        id
        email
        name
      }
      categories {
        name
        nameEn
        id
        code
      }
      createdAt
    }
  }
`;
