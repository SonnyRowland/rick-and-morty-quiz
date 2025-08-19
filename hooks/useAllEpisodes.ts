import { useEffect, useState } from "react";

import { EpisodeType } from "@/types";
import client from "@/graphql/apolloClient";
import { GET_EPISODES_BY_PAGE } from "@/graphql/queries/episodes";

const TOTAL_PAGES = 3;

export const useAllEpisodes = () => {
  const [allEpisodes, setAllEpisodes] = useState<EpisodeType[]>([]);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        let allEpisodes = [];

        for (let page = 1; page <= TOTAL_PAGES; page++) {
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

    fetchAllPages();
  }, []);

  return { allEpisodes };
};
