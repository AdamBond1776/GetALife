export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  subscription_tier: 'free' | 'premium';
  subscription_expires_at: string | null;
  searches_used_today: number;
  last_search_reset: string;
  created_at: string;
  updated_at: string;
}

export interface SearchParams {
  placeType?: string;
  cuisine?: string;
  activity?: string;
  budget?: number;
  partySize?: number;
  location?: string;
  preferences?: string[];
}

export interface Recommendation {
  name: string;
  description: string;
  estimatedCost: number;
  address: string;
  rating?: number;
  category: string;
  whyRecommended: string;
}

export interface UserPreference {
  id: string;
  preference_type: 'like' | 'dislike';
  category: string;
  value: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  parameters: SearchParams;
  created_at: string;
  updated_at: string;
}
