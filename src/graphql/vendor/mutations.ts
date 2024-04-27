import { gql } from "@apollo/client";

export const VENDOR_CREATE = gql`
  mutation VendorCreate($input: VendorCreateInput!) {
    vendorCreate(input: $input) {
      id
      email
      contact
      name
      status
    }
  }
`;

export const VENDOR_DELETE = gql`
  mutation VendorDelete($where: VendorWhereUniqueInput!) {
    vendorDelete(where: $where)
  }
`;
