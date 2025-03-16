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
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          slug: string
          excerpt: string
          published: boolean
          author: string
          cover_image: string
          category: 'wedding' | 'garden'
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          slug: string
          excerpt: string
          published?: boolean
          author: string
          cover_image: string
          category: 'wedding' | 'garden'
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          slug?: string
          excerpt?: string
          published?: boolean
          author?: string
          cover_image?: string
          category?: 'wedding' | 'garden'
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          service: 'wedding' | 'garden'
          message: string
          status: 'new' | 'read' | 'replied' | 'archived'
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          service: 'wedding' | 'garden'
          message: string
          status?: 'new' | 'read' | 'replied' | 'archived'
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          service?: 'wedding' | 'garden'
          message?: string
          status?: 'new' | 'read' | 'replied' | 'archived'
        }
      }
    }
  }
}