import { useEffect, useState } from "react";
import client from "@/graphql/apolloClient";

import { CharacterType, EpisodeType, LocationType } from "@/types";
import { GET_CHARACTERS_BY_PAGE } from "@/graphql/queries/characters";
import { GET_EPISODES_BY_PAGE } from "@/graphql/queries/episodes";
import { GET_LOCATIONS_BY_PAGE } from "@/graphql/queries/locations";

const TOTAL_PAGES_CHARACTERS = 42;
const TOTAL_PAGES_EPISODES = 3;
const TOTAL_PAGES_LOCATIONS = 7;

export const useApi = () => {
  const [allCharacters, setAllCharacters] = useState<CharacterType[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<EpisodeType[]>([]);
  const [allLocations, setAllLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let allChars = [];

        for (let page = 1; page <= TOTAL_PAGES_CHARACTERS; page++) {
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

    const fetchAllEpisodes = async () => {
      try {
        let allEpisodes = [];

        for (let page = 1; page <= TOTAL_PAGES_EPISODES; page++) {
          const { data } = await client.query({
            query: GET_EPISODES_BY_PAGE,
            variables: { page },
          });

          allEpisodes.push(...data.episodes.results);
        }

        setAllEpisodes(allEpisodes);
      } catch (err) {
        console.error("Error fetching episodes: ", err);
      }
    };

    const fetchAllLocations = async () => {
      try {
        let allLocations = [];

        for (let page = 1; page <= TOTAL_PAGES_LOCATIONS; page++) {
          const { data } = await client.query({
            query: GET_LOCATIONS_BY_PAGE,
            variables: { page },
          });

          allLocations.push(...data.locations.results);
        }

        setAllLocations(allLocations);
      } catch (err) {
        console.error("Error fetching locations: ", err);
      }
    };

    fetchAllCharacters();
    fetchAllEpisodes();
    fetchAllLocations();
  }, []);

  return { allCharacters, allEpisodes, allLocations };
};
