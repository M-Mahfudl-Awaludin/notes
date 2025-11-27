import axios from 'axios';

const BASE_URL = 'https://story-api.dicoding.dev/v1';
const TOKEN_KEY = 'dicoding_token';

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const payload = error.response?.data || {
      error: true,
      message: error.message || 'Unexpected error',
    };
    return Promise.reject({
      ...payload,
      status: error.response?.status,
    });
  },
);

export function apiGet(path, params = {}, config = {}) {
  return apiClient.get(path, { params, ...config });
}

export function apiPost(path, data = {}, config = {}) {
  return apiClient.post(path, data, config);
}

export function apiPostForm(path, formData, config = {}) {
  return apiClient.post(
    path,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config,
    },
  );
}

export { apiClient };
