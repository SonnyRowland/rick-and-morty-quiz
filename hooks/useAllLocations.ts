import { useEffect, useState } from "react";

import { LocationType } from "@/types";
import { GET_LOCATIONS_BY_PAGE } from "@/graphql/queries/locations";
import client from "@/graphql/apolloClient";

const TOTAL_PAGES = 7;

export const useAllLocations = () => {
  const [allLocations, setAllLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        let allLocations = [];

        for (let page = 1; page <= TOTAL_PAGES; page++) {
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

    fetchAllPages();
  }, []);
  return { allLocations };
};
