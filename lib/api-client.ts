interface RequestConfig {
  token?: string;
}

export async function callApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: unknown,
  config: RequestConfig = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const url = `${baseUrl}${endpoint}`;
  console.log('Calling URL:', url);

  if (config.token) {
    headers['Authorization'] = `Bearer ${config.token}`;
    console.log(
      'Adding Authorization header with token:',
      config.token.substring(0, 20) + '...'
    );
  } else {
    console.log('No token provided for API call');
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data as T;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Une erreur est survenue'
    );
  }
}

export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    callApi<T>(endpoint, 'GET', undefined, config),

  post: <T>(endpoint: string, data?: object, config?: RequestConfig) =>
    callApi<T>(endpoint, 'POST', data, config),

  put: <T>(endpoint: string, data?: object, config?: RequestConfig) =>
    callApi<T>(endpoint, 'PUT', data, config),

  patch: <T>(endpoint: string, data?: object, config?: RequestConfig) =>
    callApi<T>(endpoint, 'PATCH', data, config),

  delete: <T>(endpoint: string, config?: RequestConfig) =>
    callApi<T>(endpoint, 'DELETE', undefined, config)
};
