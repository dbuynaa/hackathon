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

export const VENDOR = gql`
  query Vendor($where: VendorWhereUniqueInput!) {
  vendor(where: $where) {
    id
    email
    name
    status
    contact
  }
}
`;
