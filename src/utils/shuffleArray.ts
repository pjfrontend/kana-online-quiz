export const shuffleArray = (unshuffled: any[]): any[] =>
  unshuffled
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
