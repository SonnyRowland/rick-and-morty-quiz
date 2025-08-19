import { useEffect, useState } from "react";

import client from "@/graphql/apolloClient";
import { GET_CHARACTERS_BY_PAGE } from "@/graphql/queries/characters";
import { CharacterType } from "@/types";

const TOTAL_PAGES = 42;

export const useAllCharacters = () => {
  const [allCharacters, setAllCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        let allChars = [];

        for (let page = 1; page <= TOTAL_PAGES; page++) {
          const { data } = await client.query({
            query: GET_CHARACTERS_BY_PAGE,
            variables: { page },
          });
          allChars.push(...data.characters.results);
        }

        setAllCharacters(allChars);
      } catch (err) {
        console.error("Error fetching characters: ", err);
      }
    };

    fetchAllPages();
  }, []);

  return { allCharacters };
};
