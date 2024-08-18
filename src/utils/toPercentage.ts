export const toPercentage = (num: number, total: number): `${string}%` =>
  `${((num / total) * 100).toFixed(1)}%`;
