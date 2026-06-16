import { API_URL } from '@shared/lib/constants';
import type { ApiResponse, Product, Category, Brand, Banner } from '@shared/types';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }
    const query = searchParams.toString();
    return this.request<T>(`${endpoint}${query ? `?${query}` : ''}`);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL);

export const productApi = {
  getAll: (params?: Record<string, string | number | undefined>) =>
    api.get<ApiResponse<Product>>('/products', params),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getFeatured: () => api.get<Product[]>('/products/featured'),
  getNew: () => api.get<Product[]>('/products/new'),
  getSale: () => api.get<Product[]>('/products/sale'),
  getTrending: () => api.get<Product[]>('/products/trending'),
  search: (query: string) => api.get<Product[]>('/products/search', { q: query }),
};

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
};

export const brandApi = {
  getAll: () => api.get<Brand[]>('/brands'),
};

export const bannerApi = {
  getAll: () => api.get<Banner[]>('/banners'),
};
