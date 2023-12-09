// this is not the perfect solution, but it should do just fine for array of strings
const cloneArray = <T>(arr: T[]): T[] => JSON.parse(JSON.stringify(arr));

export const shuffleArray = <T>(array: T[]): T[] => {
  const output = cloneArray(array);
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
};
