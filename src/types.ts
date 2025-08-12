export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'upcoming' | 'past';
  imageUrl?: string;
  registrationUrl?: string;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: string;
  founded: string;
  imageUrl: string;
  websiteUrl?: string;
  founders: string[];
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'upcoming' | 'past';
  imageUrl?: string;
  registrationUrl?: string;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: string;
  founded: string;
  imageUrl: string;
  websiteUrl?: string;
  founders: string[];
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  heroBackgroundUrl: string;
}