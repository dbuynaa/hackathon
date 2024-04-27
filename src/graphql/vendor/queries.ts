import { gql } from "@apollo/client";

export const VENDORS = gql`
  query Vendors($take: Int!, $skip: Int!) {
    vendors(take: $take, skip: $skip) {
      count
      data {
        name
        contact
        email
        status
      }
    }
  }
`;
