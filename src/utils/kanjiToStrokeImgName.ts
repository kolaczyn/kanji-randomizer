export const kanjiToStrokeImgName = (kanji: string): string => {
  const imageCode =
    kanji.codePointAt(0)?.toString(16) ??
    // kanji for error
    "誤";
  return `/stroke/${imageCode}.png`;
};
