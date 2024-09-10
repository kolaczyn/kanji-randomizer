export const textToLvl = (text: string) => {
  const currentLevel = text.replace("level-n", "");
  const asNum = parseInt(currentLevel, 10);
  const asNumNormalized = isNaN(asNum) ? Infinity : asNum;
  return asNumNormalized;
};
