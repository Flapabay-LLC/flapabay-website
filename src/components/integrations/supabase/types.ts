export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string
          guest_id: string
          host_id: string
          id: string
          last_message_at: string
          property_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          guest_id: string
          host_id: string
          id?: string
          last_message_at?: string
          property_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          guest_id?: string
          host_id?: string
          id?: string
          last_message_at?: string
          property_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          categories: string[]
          created_at: string | null
          description: string
          duration: number
          host_id: string | null
          id: string
          images: string[]
          is_published: boolean | null
          location: string
          max_participants: number
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          categories?: string[]
          created_at?: string | null
          description: string
          duration: number
          host_id?: string | null
          id?: string
          images?: string[]
          is_published?: boolean | null
          location: string
          max_participants: number
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          categories?: string[]
          created_at?: string | null
          description?: string
          duration?: number
          host_id?: string | null
          id?: string
          images?: string[]
          is_published?: boolean | null
          location?: string
          max_participants?: number
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          reference_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          reference_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          reference_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[]
          bathrooms: number
          bedrooms: number
          created_at: string | null
          description: string
          guests: number
          host_id: string | null
          id: string
          images: string[]
          is_published: boolean | null
          location: string
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          amenities?: string[]
          bathrooms: number
          bedrooms: number
          created_at?: string | null
          description: string
          guests: number
          host_id?: string | null
          id?: string
          images?: string[]
          is_published?: boolean | null
          location: string
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          amenities?: string[]
          bathrooms?: number
          bedrooms?: number
          created_at?: string | null
          description?: string
          guests?: number
          host_id?: string | null
          id?: string
          images?: string[]
          is_published?: boolean | null
          location?: string
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trips: {
        Row: {
          check_in: string
          check_in_code: string | null
          check_out: string
          created_at: string
          guests: number
          has_checked_in: boolean | null
          has_checked_out: boolean | null
          id: string
          image_url: string | null
          location: string
          payment_amount: number | null
          payment_method: string | null
          payment_status: string | null
          property_id: string
          refund_amount: number | null
          refund_reason: string | null
          refund_status: string | null
          special_requests: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          check_in: string
          check_in_code?: string | null
          check_out: string
          created_at?: string
          guests: number
          has_checked_in?: boolean | null
          has_checked_out?: boolean | null
          id?: string
          image_url?: string | null
          location: string
          payment_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          property_id: string
          refund_amount?: number | null
          refund_reason?: string | null
          refund_status?: string | null
          special_requests?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          check_in?: string
          check_in_code?: string | null
          check_out?: string
          created_at?: string
          guests?: number
          has_checked_in?: boolean | null
          has_checked_out?: boolean | null
          id?: string
          image_url?: string | null
          location?: string
          payment_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          property_id?: string
          refund_amount?: number | null
          refund_reason?: string | null
          refund_status?: string | null
          special_requests?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          currency: string | null
          id: string
          language: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          id?: string
          language?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          id?: string
          language?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
