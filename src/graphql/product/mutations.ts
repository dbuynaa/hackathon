import { gql } from "@apollo/client";

export const PRODUCT_CREATE = gql`
  mutation ProductCreate($input: ProductCreateInput!) {
    productCreate(input: $input) {
      id
    }
  }
`;
export const PRODUCT_DELETE = gql`
  mutation ProductDelete($where: ProductWhereUniqueInput!) {
    productDelete(where: $where)
  }
`;
