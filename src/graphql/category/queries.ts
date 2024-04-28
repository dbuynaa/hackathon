import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Categories {
    categories {
      name
      nameEn
      code
      order
      parentCode
      children {
        code
        name
        nameEn
        order
        parentCode
      }
    }
  }
`;
