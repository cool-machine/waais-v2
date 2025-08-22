const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
  message?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    graduationYear?: number;
    degree?: string;
  }) {
    return this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me');
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // User endpoints
  async getUsers(params?: {
    search?: string;
    industry?: string;
    graduationYear?: number;
    aiExpertise?: string;
    availableForMentoring?: boolean;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.request<{ 
      users: any[]; 
      pagination: { page: number; limit: number; total: number; pages: number } 
    }>(`/users${query ? `?${query}` : ''}`);
  }

  async getUserById(id: string) {
    return this.request<{ user: any }>(`/users/${id}`);
  }

  async updateProfile(profileData: any) {
    return this.request<{ profile: any }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserEvents() {
    return this.request<{ registrations: any[] }>('/users/me/events');
  }

  async getUserMentorships() {
    return this.request<{ mentorships: any[]; requests: any[] }>('/users/me/mentorships');
  }

  // Event endpoints
  async getEvents(params?: {
    status?: string;
    upcoming?: boolean;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.request<{ 
      events: any[]; 
      pagination: { page: number; limit: number; total: number; pages: number } 
    }>(`/events${query ? `?${query}` : ''}`);
  }

  async getEventById(id: string) {
    return this.request<{ event: any }>(`/events/${id}`);
  }

  async createEvent(eventData: any) {
    return this.request<{ event: any }>('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id: string, eventData: any) {
    return this.request<{ event: any }>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async registerForEvent(eventId: string) {
    return this.request<{ registration: any }>(`/events/${eventId}/register`, {
      method: 'POST',
    });
  }

  async unregisterFromEvent(eventId: string) {
    return this.request(`/events/${eventId}/register`, {
      method: 'DELETE',
    });
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Startup endpoints
  async getStartups(params?: {
    status?: string;
    industry?: string;
    stage?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.request<{ 
      startups: any[]; 
      pagination: { page: number; limit: number; total: number; pages: number } 
    }>(`/startups${query ? `?${query}` : ''}`);
  }

  async getStartupById(id: string) {
    return this.request<{ startup: any }>(`/startups/${id}`);
  }

  async createStartup(startupData: any) {
    return this.request<{ startup: any }>('/startups', {
      method: 'POST',
      body: JSON.stringify(startupData),
    });
  }

  async updateStartup(id: string, startupData: any) {
    return this.request<{ startup: any }>(`/startups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(startupData),
    });
  }

  async applyToStartup(startupId: string, message: string) {
    return this.request<{ application: any }>(`/startups/${startupId}/apply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getUserStartupApplications() {
    return this.request<{ applications: any[] }>('/startups/me/applications');
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    return this.request<{ application: any }>(`/startups/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteStartup(id: string) {
    return this.request(`/startups/${id}`, {
      method: 'DELETE',
    });
  }

  // Mentorship endpoints
  async getMentorships(params?: {
    expertise?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.request<{ 
      mentorships: any[]; 
      pagination: { page: number; limit: number; total: number; pages: number } 
    }>(`/mentorships${query ? `?${query}` : ''}`);
  }

  async getMentorshipById(id: string) {
    return this.request<{ mentorship: any }>(`/mentorships/${id}`);
  }

  async createMentorship(mentorshipData: any) {
    return this.request<{ mentorship: any }>('/mentorships', {
      method: 'POST',
      body: JSON.stringify(mentorshipData),
    });
  }

  async updateMentorship(id: string, mentorshipData: any) {
    return this.request<{ mentorship: any }>(`/mentorships/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mentorshipData),
    });
  }

  async requestMentorship(mentorshipId: string, message: string) {
    return this.request<{ request: any }>(`/mentorships/${mentorshipId}/request`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async updateMentorshipRequestStatus(requestId: string, status: string) {
    return this.request<{ request: any }>(`/mentorships/requests/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteMentorship(id: string) {
    return this.request(`/mentorships/${id}`, {
      method: 'DELETE',
    });
  }

  // Newsletter endpoints
  async subscribeToNewsletter(email: string) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async unsubscribeFromNewsletter(email: string) {
    return this.request('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getNewsletterSubscriptions(params?: {
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.request<{ 
      subscriptions: any[]; 
      pagination: { page: number; limit: number; total: number; pages: number } 
    }>(`/newsletter/subscriptions${query ? `?${query}` : ''}`);
  }

  async getNewsletterStats() {
    return this.request<{ stats: any }>('/newsletter/stats');
  }

  async linkNewsletterToAccount() {
    return this.request('/newsletter/link-account', {
      method: 'POST',
    });
  }

  // Partner endpoints
  async getPartners(params?: {
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.request<{ 
      partners: any[]; 
      pagination: { page: number; limit: number; total: number; pages: number } 
    }>(`/partners${query ? `?${query}` : ''}`);
  }

  async getPartnerById(id: string) {
    return this.request<{ partner: any }>(`/partners/${id}`);
  }

  async createPartner(partnerData: any) {
    return this.request<{ partner: any }>('/partners', {
      method: 'POST',
      body: JSON.stringify(partnerData),
    });
  }

  async updatePartner(id: string, partnerData: any) {
    return this.request<{ partner: any }>(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(partnerData),
    });
  }

  async deletePartner(id: string) {
    return this.request(`/partners/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);