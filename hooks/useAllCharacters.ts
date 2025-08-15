import { useEffect, useState } from "react";
import client from "../graphql/apolloClient";
import { GET_CHARACTERS_BY_PAGE } from "../graphql/queries/characters";

const TOTAL_PAGES = 42;

type ResultsType = {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  episode: { id: string }[];
};

export const useAllCharacters = () => {
  const [allCharacters, setAllCharacters] = useState<ResultsType[]>([]);

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
