import { gql } from "@apollo/client";

export const VALIDATION_CREATE = gql`
  mutation ValidationCreate($input: ValidationCreateInput!) {
    validationCreate(input: $input) {
      id
    }
  }
`;
export const VALIDATION_UPDATE = gql`
  mutation ValidationUpdate(
    $validationUpdateId: String!
    $input: ValidationCreateInput!
  ) {
    validationUpdate(id: $validationUpdateId, input: $input) {
      id
    }
  }
`;
