'use server';

/**
 * Fetches data from the specified API endpoint using server-side fetch.
 * This function is designed to work with the external API configured via NEXT_PUBLIC_API_URL.
 *
 * @param {string} url - The API endpoint path to fetch data from. Will be appended to the base API URL from environment variables.
 * @param {string} [method="GET"] - The HTTP method to use for the request. Supports: GET, POST, PUT, PATCH, DELETE, etc.
 * @param {object|FormData|null} [body=null] - The request body data to send. Can be a plain object (will be JSON stringified) or FormData for file uploads.
 * @param {string|null} [token=null] - Authorization Bearer token to be included in the Authorization header. If provided, will be prefixed with "Bearer ".
 * @param {string} [type="json"] - The expected response type. Options: "json" (default), "file-csv" for CSV downloads, "form-data" for multipart uploads.
 * @returns {Promise<object|Response>} Returns a parsed JSON object by default. If `type` is "file-csv", returns the raw Response object for file handling.
 * @throws {Error} Throws an error if the fetch request fails or if the response cannot be parsed as JSON
 *
 *  @example
 * // Basic GET request
 * const users = await fetchData("/users");
 *
 * @example
 * // POST request with authentication
 * const newUser = await fetchData("/users", "POST", { name: "John", email: "john@example.com" }, "your-jwt-token");
 *
 * @example
 * // File upload with FormData
 * const formData = new FormData();
 * formData.append("file", file);
 * const result = await fetchData("/upload", "POST", formData, token, "form-data");
 *
 * @example
 * // CSV file download
 * const csvResponse = await fetchData("/export/users", "GET", null, token, "file-csv");
 * const blob = await csvResponse.blob();
 */
export async function fetchData(
  url: string,
  method = 'GET',
  body: any | FormData = null,
  token: any = null,
  type: string = 'json'
) {
  const headers: any = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (type !== 'form-data') {
    headers['Content-Type'] =
      type === 'file-csv' ? 'text/csv' : 'application/json';
  }

  const options: any = {
    method,
    headers,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : null,
    cache: 'no-store'
  };

  console.log('options', options);

  const endpoint = process.env.NEXT_PUBLIC_API_URL + url;

  console.log('endpoint', endpoint);

  const response = await fetch(endpoint, options);
  const responseInJSON = response.json() as any;

  if (type == 'file-csv') {
    return response;
  }

  return responseInJSON;
}
