import { gql } from "@apollo/client";

export const GET_CHARACTERS_BY_FILTER = gql`
  query GetCharactersByFilter($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        name
        image
        species
        status
        episode {
          id
        }
      }
    }
  }
`;

export const GET_CHARACTERS_BY_PAGE = gql`
  query GetCharactersByPage($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
        status
        episode {
          id
        }
      }
    }
  }
`;
