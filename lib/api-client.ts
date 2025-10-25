interface RequestConfig {
  token?: string;
}

export interface ApiError {
  message: string;
  status?: number;
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

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    'http://54.38.158.40:8080/billeterie-api/api/v1';

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

    const data = await response.json();

    if (data.error) {
      console.error('API Error:', data.message);
      const error: ApiError = {
        message: data.message || 'Une erreur est survenue'
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error('Fetch Error:', error);

    if (error && typeof error === 'object' && 'message' in error) {
      throw error;
    }

    const apiError: ApiError = {
      message:
        error instanceof Error ? error.message : 'Une erreur est survenue'
    };
    throw apiError;
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
