/**
 * Custom error class for fetchJson.
 */
export class FetchError extends Error {
  constructor(
    message: string,
    public response?: Response,
    public data?: unknown // we could also determine the acceptable types and list them instead of using `unknown`
  ) {
    super(message);
  }
}

/**
 * Fetches JSON data from a given URL and returns the parsed content.
 * We could use Axios as well, but fetch is a built-in browser API and we
 * are trying to keep the dependencies to a minimum. But that means we have
 * to handle some things manually, like parsing JSON and error handling.
 *
 * @param url - The URL to fetch JSON data from.
 * @param options - Optional fetch options (e.g., headers).
 * @returns Parsed JSON data as a JavaScript object.
 * @throws FetchError if the request fails or the response is not JSON.
 */

export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    // If we have any parsing or network errors, this block will catch them and
    // throw a FetchError instead. This makes it easier to handle errors in the
    // calling code.
    if (!response.ok) {
      throw new FetchError(`Failed to fetch: ${response.statusText}`, response);
    }

    // Attempt to parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle JSON parse errors or network issues
    if (error instanceof SyntaxError) {
      throw new FetchError("Failed to parse JSON", undefined, error);
    }
    throw error;
  }
}
