export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface AxiosResponse<T> {
  data: ApiResponse<T>;
  status: number;
  statusText: string;
}
