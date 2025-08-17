import { gql } from "@apollo/client";

export const GET_LOCATIONS_BY_PAGE = gql`
  query GetLocationsByPage($page: Int) {
    locations(page: $page) {
      results {
        id
        name
        residents {
          id
          name
        }
      }
    }
  }
`;
