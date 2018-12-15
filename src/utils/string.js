export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelize(string) {
  const [firstWord, ...otherWords] = string.split('-');

  if (otherWords.length === 0) return string;

  const capitalizedWords = otherWords.map(word => capitalize(word));

  return firstWord + capitalizedWords.join('');
}
