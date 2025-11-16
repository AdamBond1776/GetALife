export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          subscription_tier: 'free' | 'premium';
          subscription_expires_at: string | null;
          searches_used_today: number;
          last_search_reset: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          subscription_tier?: 'free' | 'premium';
          subscription_expires_at?: string | null;
          searches_used_today?: number;
          last_search_reset?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          subscription_tier?: 'free' | 'premium';
          subscription_expires_at?: string | null;
          searches_used_today?: number;
          last_search_reset?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          preference_type: 'like' | 'dislike';
          category: string;
          value: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          preference_type: 'like' | 'dislike';
          category: string;
          value: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          preference_type?: 'like' | 'dislike';
          category?: string;
          value?: string;
          created_at?: string;
        };
      };
      searches: {
        Row: {
          id: string;
          user_id: string;
          search_type: 'free' | 'paid';
          query_text: string | null;
          parameters: Json;
          results: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          search_type: 'free' | 'paid';
          query_text?: string | null;
          parameters?: Json;
          results?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          search_type?: 'free' | 'paid';
          query_text?: string | null;
          parameters?: Json;
          results?: Json;
          created_at?: string;
        };
      };
      saved_searches: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          parameters: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          parameters?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          parameters?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      place_feedback: {
        Row: {
          id: string;
          user_id: string;
          search_id: string | null;
          place_name: string;
          place_data: Json;
          feedback_type: 'positive' | 'negative';
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          search_id?: string | null;
          place_name: string;
          place_data?: Json;
          feedback_type: 'positive' | 'negative';
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          search_id?: string | null;
          place_name?: string;
          place_data?: Json;
          feedback_type?: 'positive' | 'negative';
          notes?: string | null;
          created_at?: string;
        };
      };
      payment_transactions: {
        Row: {
          id: string;
          user_id: string;
          transaction_type: 'search' | 'subscription';
          amount: number;
          status: 'pending' | 'completed' | 'failed';
          stripe_payment_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          transaction_type: 'search' | 'subscription';
          amount: number;
          status?: 'pending' | 'completed' | 'failed';
          stripe_payment_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          transaction_type?: 'search' | 'subscription';
          amount?: number;
          status?: 'pending' | 'completed' | 'failed';
          stripe_payment_id?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
