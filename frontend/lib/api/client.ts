const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      console.warn(`API request failed: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn(`Network error fetching ${endpoint}:`, error);
    return null;
  }
}
