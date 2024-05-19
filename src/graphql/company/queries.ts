import { gql } from "@apollo/client";

export const COMPANIES = gql`
  query Companies($take: Int!, $skip: Int!) {
    companies(take: $take, skip: $skip) {
      data {
        email
        id
      }
      count
    }
  }
`;

export const COMPANY = gql`
  query Company($where: CompanyWhereUniqueInput!) {
    company(where: $where) {
      id
      email
    }
  }
`;
