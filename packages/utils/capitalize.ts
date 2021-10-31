export function capitalize(word: any) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}
