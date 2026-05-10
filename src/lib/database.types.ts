export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          provider: "kakao" | "google" | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          provider?: "kakao" | "google" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      anniversaries: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          date_type: "lunar" | "solar";
          month: number;
          day: number;
          is_leap_month: boolean;
          repeat_type: "yearly" | "monthly" | "once";
          category: "birthday" | "memorial" | "anniversary" | "holiday" | "other";
          start_year: number | null;
          milestone_mode: "korean_age" | "international_age" | "anniversary_years" | null;
          is_builtin: boolean;
          builtin_key: string | null;
          is_enabled: boolean;
          default_notification_days: number[];
          notification_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["anniversaries"]["Row"]> & {
          owner_id: string;
          name: string;
          date_type: "lunar" | "solar";
          month: number;
          day: number;
          repeat_type: "yearly" | "monthly" | "once";
          category: "birthday" | "memorial" | "anniversary" | "holiday" | "other";
        };
        Update: Partial<Database["public"]["Tables"]["anniversaries"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
