import axios, { AxiosError, type AxiosInstance } from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Shared Axios instance for all backend calls.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Normalizes Axios errors into a readable message.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      detail?: string;
      message?: string;
    }>;

    if (axiosError.code === 'ECONNABORTED') {
      return 'The request timed out. The prediction service may be slow to respond — please try again.';
    }

    if (!axiosError.response) {
      return 'Could not reach the prediction service. Make sure the FastAPI backend is running.';
    }

    const serverMessage =
      axiosError.response.data?.detail ||
      axiosError.response.data?.message;

    if (serverMessage) {
      return serverMessage;
    }

    return `The prediction service returned an error (status ${axiosError.response.status}).`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred while requesting a prediction.';
}