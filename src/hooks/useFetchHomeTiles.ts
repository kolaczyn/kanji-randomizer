import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../const/env.ts";
import { HomeTilesDto } from "../types.ts";

export const useFetchHomeTiles = () => {
  return useQuery({
    queryFn: async () => {
      const res = await axios.get<HomeTilesDto>(
        `${API_BASE_URL}/v2/home/tiles`,
      );
      return res.data;
    },
    queryKey: ["home-tiles"],
  });
};
