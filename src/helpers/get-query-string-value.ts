/**
 * @description Retrieves the value corresponding to the key in the query parameters. Number, boolean, string and null will be parsed
 * @example <caption>Example using a simple parameter `/?foo=bar`</caption>
 * getQueryStringValue('foo') // 'bar'
 * @example <caption>Example using a number parameter `/?nbr=2`</caption>
 * getQueryStringValue('nbr') // 2
 * @example <caption>Example using a boolean parameter `/?bool=false`</caption>
 * getQueryStringValue('bool') // false
 * @example <caption>Example using an unexisting parameter `/`</caption>
 * getQueryStringValue('unexisting') // null
 */
export function getQueryStringValue(key: string): number | string | null | boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(key);

  if (value === null)
    return null;
  else if (value === 'true' || value === 'false')
    return JSON.parse(value);

  const nbr = parseInt(value, 10);
  if (isNaN(nbr))
    return value;
  return nbr;
}
