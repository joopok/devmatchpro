export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type Role = 'ADMIN' | 'USER' | 'CLIENT' | 'DEVELOPER';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface BaseResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> extends BaseResponse<T> {
  totalPages: number;
  currentPage: number;
  totalItems: number;
} 