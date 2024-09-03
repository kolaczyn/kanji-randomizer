import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../const/env.ts";
import { HomeScreenStatsDto } from "../types.ts";

export const useFetchHomeScreenStats = () => {
  return useQuery({
    queryFn: async () => {
      const res = await axios.get<HomeScreenStatsDto>(
        `${API_BASE_URL}/home-screen-stats`,
      );
      return res.data;
    },
    queryKey: ["home-screen-stats"],
  });
};
