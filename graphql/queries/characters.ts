import { gql } from "@apollo/client";

export const GET_CHARACTER_NAME_LOCATION = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      location {
        name
      }
      species
      gender
    }
  }
`;
