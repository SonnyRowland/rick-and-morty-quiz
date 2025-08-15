import { gql } from "@apollo/client";

export const GET_RANDOM_CHARACTER = gql`
  query GetRandomCharacter($id: ID!) {
    character(id: $id) {
      name
      image
    }
  }
`;

export const GET_CHARACTERS_BY_PAGE = gql`
  query GetCharactersByPage($page: Int) {
    characters(page: $page) {
      info {
        pages
        count
      }
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

export const GET_RANDOM_CHARACTER = gql`
  query GetRandomCharacter($id: ID!) {
    character(id: $id) {
      name
      image
    }
  }
`;
