import { gql } from "@apollo/client";

export const CATEGORIES = gql`
  query Categories {
    categories {
      name
      nameEn
      code
      order
    }
  }
`;
