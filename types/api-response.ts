export interface ApiResponse<T> {
  error: boolean;
  message: string;
  data: T;
}

export type ApiListResponse<T> = {
  error: boolean;
  message: string;
  data: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};
