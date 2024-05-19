import { gql } from "@apollo/client";

export const COMPANY_CREATE = gql`
  mutation companyCreate($input: CompanyCreateInput!) {
    companyCreate(input: $input) {
      id
    }
  }
`;
export const COMAPNY_UPDATE = gql`
  mutation companyUpdate($id: String!, $input: CompanyUpdateInput!) {
    companyUpdate(id: $id, input: $input) {
      id
    }
  }
`;

export const COMPANY_DELETE = gql`
  mutation companyDelete($where: CompanyWhereUniqueInput!) {
    companyDelete(where: $where)
  }
`;
