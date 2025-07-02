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
      contacts: {
        Row: {
          address: string | null
          category: string | null
          city: string | null
          company: string | null
          country: string | null
          createddate: string | null
          createdDate: string | null
          designation: string | null
          email: string | null
          id: string
          language: string | null
          linkedin: string | null
          name: string | null
          notes: string | null
          phone: string | null
          position: string | null
          postalcode: string | null
          postalCode: string | null
          preferredcontact: string | null
          preferredContact: string | null
          preferredcontactmethod: string | null
          rating: number | null
          state: string | null
          status: string | null
          tags: string | null
          timezone: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          category?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          createddate?: string | null
          createdDate?: string | null
          designation?: string | null
          email?: string | null
          id: string
          language?: string | null
          linkedin?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          postalcode?: string | null
          postalCode?: string | null
          preferredcontact?: string | null
          preferredContact?: string | null
          preferredcontactmethod?: string | null
          rating?: number | null
          state?: string | null
          status?: string | null
          tags?: string | null
          timezone?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          category?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          createddate?: string | null
          createdDate?: string | null
          designation?: string | null
          email?: string | null
          id?: string
          language?: string | null
          linkedin?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          position?: string | null
          postalcode?: string | null
          postalCode?: string | null
          preferredcontact?: string | null
          preferredContact?: string | null
          preferredcontactmethod?: string | null
          rating?: number | null
          state?: string | null
          status?: string | null
          tags?: string | null
          timezone?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      deals: {
        Row: {
          assignedTo: string | null
          buyer: string | null
          company: string | null
          countryOfOrigin: string | null
          currency: string | null
          destinationCountry: string | null
          expectedClosure: string | null
          hsCode: string | null
          id: string
          incoterm: string | null
          inspectionRequirements: string | null
          paymentTerm: string | null
          portOfDischarge: string | null
          portOfLoading: string | null
          probability: number | null
          product: string | null
          qualityStandards: string | null
          quantity: string | null
          seller: string | null
          specialTerms: string | null
          stage: string | null
          status: string | null
          value: number | null
        }
        Insert: {
          assignedTo?: string | null
          buyer?: string | null
          company?: string | null
          countryOfOrigin?: string | null
          currency?: string | null
          destinationCountry?: string | null
          expectedClosure?: string | null
          hsCode?: string | null
          id: string
          incoterm?: string | null
          inspectionRequirements?: string | null
          paymentTerm?: string | null
          portOfDischarge?: string | null
          portOfLoading?: string | null
          probability?: number | null
          product?: string | null
          qualityStandards?: string | null
          quantity?: string | null
          seller?: string | null
          specialTerms?: string | null
          stage?: string | null
          status?: string | null
          value?: number | null
        }
        Update: {
          assignedTo?: string | null
          buyer?: string | null
          company?: string | null
          countryOfOrigin?: string | null
          currency?: string | null
          destinationCountry?: string | null
          expectedClosure?: string | null
          hsCode?: string | null
          id?: string
          incoterm?: string | null
          inspectionRequirements?: string | null
          paymentTerm?: string | null
          portOfDischarge?: string | null
          portOfLoading?: string | null
          probability?: number | null
          product?: string | null
          qualityStandards?: string | null
          quantity?: string | null
          seller?: string | null
          specialTerms?: string | null
          stage?: string | null
          status?: string | null
          value?: number | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          company: string | null
          description: string | null
          file_url: string | null
          id: string
          name: string
          size: number | null
          status: string | null
          tags: string[] | null
          type: string | null
          upload_date: string | null
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          company?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          name: string
          size?: number | null
          status?: string | null
          tags?: string[] | null
          type?: string | null
          upload_date?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          company?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          name?: string
          size?: number | null
          status?: string | null
          tags?: string[] | null
          type?: string | null
          upload_date?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          actualHours: number | null
          approvalRequired: boolean | null
          approver: string | null
          assignee: string | null
          attachments: Json | null
          budget: number | null
          category: string | null
          clientContact: string | null
          company: string | null
          completedHours: number | null
          completionCriteria: string | null
          contingencyPlan: string | null
          createdDate: string | null
          currency: string | null
          dealId: string | null
          dependencies: string[] | null
          description: string | null
          dueDate: string | null
          dueTime: string | null
          estimatedHours: number | null
          id: string
          locationRequired: string | null
          milestones: string[] | null
          notes: string | null
          priority: string | null
          progress: number | null
          reminders: string[] | null
          requiredSkills: string[] | null
          resources: string[] | null
          reviewDate: string | null
          riskLevel: string | null
          status: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          actualHours?: number | null
          approvalRequired?: boolean | null
          approver?: string | null
          assignee?: string | null
          attachments?: Json | null
          budget?: number | null
          category?: string | null
          clientContact?: string | null
          company?: string | null
          completedHours?: number | null
          completionCriteria?: string | null
          contingencyPlan?: string | null
          createdDate?: string | null
          currency?: string | null
          dealId?: string | null
          dependencies?: string[] | null
          description?: string | null
          dueDate?: string | null
          dueTime?: string | null
          estimatedHours?: number | null
          id: string
          locationRequired?: string | null
          milestones?: string[] | null
          notes?: string | null
          priority?: string | null
          progress?: number | null
          reminders?: string[] | null
          requiredSkills?: string[] | null
          resources?: string[] | null
          reviewDate?: string | null
          riskLevel?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          actualHours?: number | null
          approvalRequired?: boolean | null
          approver?: string | null
          assignee?: string | null
          attachments?: Json | null
          budget?: number | null
          category?: string | null
          clientContact?: string | null
          company?: string | null
          completedHours?: number | null
          completionCriteria?: string | null
          contingencyPlan?: string | null
          createdDate?: string | null
          currency?: string | null
          dealId?: string | null
          dependencies?: string[] | null
          description?: string | null
          dueDate?: string | null
          dueTime?: string | null
          estimatedHours?: number | null
          id?: string
          locationRequired?: string | null
          milestones?: string[] | null
          notes?: string | null
          priority?: string | null
          progress?: number | null
          reminders?: string[] | null
          requiredSkills?: string[] | null
          resources?: string[] | null
          reviewDate?: string | null
          riskLevel?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
