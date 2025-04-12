export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string | null
          experience_years: number | null
          linkedin_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: string | null
          experience_years?: number | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: string | null
          experience_years?: number | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ideas: {
        Row: {
          id: string
          title: string
          industry: string | null
          problem: string | null
          progress: number
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          industry?: string | null
          problem?: string | null
          progress?: number
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          industry?: string | null
          problem?: string | null
          progress?: number
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      startups: {
        Row: {
          id: string
          name: string
          description: string | null
          stage: string | null
          idea_id: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          stage?: string | null
          idea_id?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          stage?: string | null
          idea_id?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}