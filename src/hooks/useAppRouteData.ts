import { useParams } from "react-router-dom";
import { Level } from "../types.ts";

export const useAppRouteData = () => {
  const params = useParams();
  const lvl = params.level as Level;
  const isKanji = lvl.startsWith("n");

  return {
    isKanji,
  };
};
