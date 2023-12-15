import { useMemo } from "react";

const decimalToBigNum = (num: number): number =>
  Number(num.toString().replace("0.", ""));

export const useRandomNum = () =>
  useMemo(() => decimalToBigNum(Math.random()), []);
