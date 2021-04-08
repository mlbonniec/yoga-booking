export function getQueryValue(key: string): number | string | null{
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(key);

  if (value === null)
    return null

  const nbr = parseInt(value, 10);
  if (isNaN(nbr))
    return value;
  return nbr;
}
