// Global type definitions for the backend

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
  message?: string;
}

export interface PaginatedApiResponse<T = any> extends ApiResponse<T> {
  data: {
    items: T[];
    pagination: PaginationResponse;
  };
}

// User-related types
export interface UserFilter {
  search?: string;
  industry?: string;
  graduationYear?: number;
  aiExpertise?: string;
  availableForMentoring?: boolean;
}

// Event-related types
export interface EventFilter {
  status?: string;
  upcoming?: boolean;
}

// Startup-related types
export interface StartupFilter {
  status?: string;
  industry?: string;
  stage?: string;
}

// Mentorship-related types
export interface MentorshipFilter {
  expertise?: string;
}