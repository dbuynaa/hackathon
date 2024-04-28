import { gql } from "@apollo/client";

export const VALIDATIONS = gql`
  query Validations($take: Int!, $skip: Int!) {
    Validations(take: $take, skip: $skip) {
      count
      data {
        id
        image
        author {
          id
          name
          email
        }
        content
        product {
          id
          image
          name
          status
        }
      }
    }
  }
`;

export const VALIDATION = gql`
  query Validation($where: ValidationWhereUniqueInput!) {
    validation(where: $where) {
      id
      image
      author {
        id
        name
        email
      }
      content
      product {
        id
        image
        name
        status
      }
    }
  }
`;
