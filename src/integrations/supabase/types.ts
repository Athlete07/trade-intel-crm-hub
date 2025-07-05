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
      buyer_companies: {
        Row: {
          alternate_contact_name: string | null
          alternate_email: string | null
          alternate_phone: string | null
          aml_kyc_compliance: string | null
          annual_import_value: string | null
          annual_turnover: string | null
          banking_partner: string | null
          business_address: string | null
          business_category: string | null
          business_languages: string[] | null
          city: string | null
          company_name: string
          company_type: string | null
          compliance_standards: string[] | null
          contact_email: string | null
          contact_person_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string | null
          credit_rating: string | null
          currency_preferences: string[] | null
          customs_broker: string | null
          customs_registration: string | null
          designation: string | null
          duns_number: string | null
          email: string | null
          employee_count: string | null
          eori_number: string | null
          export_license_number: string | null
          freight_forwarder: string | null
          id: string
          ie_code: string | null
          import_license_number: string | null
          incorporation_date: string | null
          letter_of_credit_bank: string | null
          payment_terms_preference: string | null
          phone: string | null
          postal_code: string | null
          preferred_incoterms: string[] | null
          preferred_suppliers: string | null
          primary_markets: string[] | null
          product_categories: string[] | null
          product_certifications: string[] | null
          quality_certifications: string | null
          registration_number: string | null
          regulatory_licenses: string | null
          restricted_products: string | null
          sanctions_compliance: string | null
          source_countries: string[] | null
          state: string | null
          sustainability_requirements: string | null
          target_markets: string[] | null
          tax_id: string | null
          time_zone: string | null
          trade_finance_limit: string | null
          trading_experience: string | null
          vat_number: string | null
          website: string | null
          years_in_business: string | null
        }
        Insert: {
          alternate_contact_name?: string | null
          alternate_email?: string | null
          alternate_phone?: string | null
          aml_kyc_compliance?: string | null
          annual_import_value?: string | null
          annual_turnover?: string | null
          banking_partner?: string | null
          business_address?: string | null
          business_category?: string | null
          business_languages?: string[] | null
          city?: string | null
          company_name: string
          company_type?: string | null
          compliance_standards?: string[] | null
          contact_email?: string | null
          contact_person_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          credit_rating?: string | null
          currency_preferences?: string[] | null
          customs_broker?: string | null
          customs_registration?: string | null
          designation?: string | null
          duns_number?: string | null
          email?: string | null
          employee_count?: string | null
          eori_number?: string | null
          export_license_number?: string | null
          freight_forwarder?: string | null
          id?: string
          ie_code?: string | null
          import_license_number?: string | null
          incorporation_date?: string | null
          letter_of_credit_bank?: string | null
          payment_terms_preference?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_incoterms?: string[] | null
          preferred_suppliers?: string | null
          primary_markets?: string[] | null
          product_categories?: string[] | null
          product_certifications?: string[] | null
          quality_certifications?: string | null
          registration_number?: string | null
          regulatory_licenses?: string | null
          restricted_products?: string | null
          sanctions_compliance?: string | null
          source_countries?: string[] | null
          state?: string | null
          sustainability_requirements?: string | null
          target_markets?: string[] | null
          tax_id?: string | null
          time_zone?: string | null
          trade_finance_limit?: string | null
          trading_experience?: string | null
          vat_number?: string | null
          website?: string | null
          years_in_business?: string | null
        }
        Update: {
          alternate_contact_name?: string | null
          alternate_email?: string | null
          alternate_phone?: string | null
          aml_kyc_compliance?: string | null
          annual_import_value?: string | null
          annual_turnover?: string | null
          banking_partner?: string | null
          business_address?: string | null
          business_category?: string | null
          business_languages?: string[] | null
          city?: string | null
          company_name?: string
          company_type?: string | null
          compliance_standards?: string[] | null
          contact_email?: string | null
          contact_person_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          credit_rating?: string | null
          currency_preferences?: string[] | null
          customs_broker?: string | null
          customs_registration?: string | null
          designation?: string | null
          duns_number?: string | null
          email?: string | null
          employee_count?: string | null
          eori_number?: string | null
          export_license_number?: string | null
          freight_forwarder?: string | null
          id?: string
          ie_code?: string | null
          import_license_number?: string | null
          incorporation_date?: string | null
          letter_of_credit_bank?: string | null
          payment_terms_preference?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_incoterms?: string[] | null
          preferred_suppliers?: string | null
          primary_markets?: string[] | null
          product_categories?: string[] | null
          product_certifications?: string[] | null
          quality_certifications?: string | null
          registration_number?: string | null
          regulatory_licenses?: string | null
          restricted_products?: string | null
          sanctions_compliance?: string | null
          source_countries?: string[] | null
          state?: string | null
          sustainability_requirements?: string | null
          target_markets?: string[] | null
          tax_id?: string | null
          time_zone?: string | null
          trade_finance_limit?: string | null
          trading_experience?: string | null
          vat_number?: string | null
          website?: string | null
          years_in_business?: string | null
        }
        Relationships: []
      }
      buyer_documents: {
        Row: {
          buyer_company_id: string | null
          document_type: string | null
          file_url: string | null
          id: string
          uploaded_at: string | null
        }
        Insert: {
          buyer_company_id?: string | null
          document_type?: string | null
          file_url?: string | null
          id?: string
          uploaded_at?: string | null
        }
        Update: {
          buyer_company_id?: string | null
          document_type?: string | null
          file_url?: string | null
          id?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buyer_documents_buyer_company_id_fkey"
            columns: ["buyer_company_id"]
            isOneToOne: false
            referencedRelation: "buyer_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profile: {
        Row: {
          address: string | null
          annual_turnover: string | null
          city: string | null
          company_name: string
          company_type: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          country: string | null
          created_at: string | null
          description: string | null
          email: string | null
          employee_count: string | null
          established_date: string | null
          id: string
          industry: string | null
          logo_url: string | null
          phone: string | null
          postal_code: string | null
          registration_number: string | null
          state: string | null
          tax_id: string | null
          updated_at: string | null
          vat_number: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          annual_turnover?: string | null
          city?: string | null
          company_name: string
          company_type?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          employee_count?: string | null
          established_date?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          phone?: string | null
          postal_code?: string | null
          registration_number?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          annual_turnover?: string | null
          city?: string | null
          company_name?: string
          company_type?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          employee_count?: string | null
          established_date?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          phone?: string | null
          postal_code?: string | null
          registration_number?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Relationships: []
      }
      compliance_items: {
        Row: {
          authority: string
          category: string | null
          country: string
          created_at: string | null
          description: string | null
          expiry_date: string | null
          id: string
          priority: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          authority: string
          category?: string | null
          country: string
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          priority?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          authority?: string
          category?: string | null
          country?: string
          created_at?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          priority?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
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
      seller_companies: {
        Row: {
          alternate_contact_name: string | null
          alternate_email: string | null
          alternate_phone: string | null
          aml_kyc_compliance: string | null
          annual_export_value: string | null
          annual_turnover: string | null
          banking_partner: string | null
          business_address: string | null
          business_category: string | null
          business_languages: string[] | null
          city: string | null
          company_name: string
          company_type: string | null
          compliance_standards: string[] | null
          contact_email: string | null
          contact_person_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string | null
          credit_rating: string | null
          currency_preferences: string[] | null
          customs_broker: string | null
          customs_registration: string | null
          designation: string | null
          duns_number: string | null
          email: string | null
          employee_count: string | null
          eori_number: string | null
          export_license_number: string | null
          freight_forwarder: string | null
          id: string
          ie_code: string | null
          incorporation_date: string | null
          letter_of_credit_bank: string | null
          payment_terms_preference: string | null
          phone: string | null
          postal_code: string | null
          preferred_buyers: string | null
          preferred_incoterms: string[] | null
          primary_markets: string[] | null
          product_categories: string[] | null
          product_certifications: string[] | null
          quality_certifications: string | null
          registration_number: string | null
          regulatory_licenses: string | null
          restricted_products: string | null
          sanctions_compliance: string | null
          source_countries: string[] | null
          state: string | null
          sustainability_requirements: string | null
          target_markets: string[] | null
          tax_id: string | null
          time_zone: string | null
          trade_finance_limit: string | null
          trading_experience: string | null
          vat_number: string | null
          website: string | null
          years_in_business: string | null
        }
        Insert: {
          alternate_contact_name?: string | null
          alternate_email?: string | null
          alternate_phone?: string | null
          aml_kyc_compliance?: string | null
          annual_export_value?: string | null
          annual_turnover?: string | null
          banking_partner?: string | null
          business_address?: string | null
          business_category?: string | null
          business_languages?: string[] | null
          city?: string | null
          company_name: string
          company_type?: string | null
          compliance_standards?: string[] | null
          contact_email?: string | null
          contact_person_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          credit_rating?: string | null
          currency_preferences?: string[] | null
          customs_broker?: string | null
          customs_registration?: string | null
          designation?: string | null
          duns_number?: string | null
          email?: string | null
          employee_count?: string | null
          eori_number?: string | null
          export_license_number?: string | null
          freight_forwarder?: string | null
          id?: string
          ie_code?: string | null
          incorporation_date?: string | null
          letter_of_credit_bank?: string | null
          payment_terms_preference?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_buyers?: string | null
          preferred_incoterms?: string[] | null
          primary_markets?: string[] | null
          product_categories?: string[] | null
          product_certifications?: string[] | null
          quality_certifications?: string | null
          registration_number?: string | null
          regulatory_licenses?: string | null
          restricted_products?: string | null
          sanctions_compliance?: string | null
          source_countries?: string[] | null
          state?: string | null
          sustainability_requirements?: string | null
          target_markets?: string[] | null
          tax_id?: string | null
          time_zone?: string | null
          trade_finance_limit?: string | null
          trading_experience?: string | null
          vat_number?: string | null
          website?: string | null
          years_in_business?: string | null
        }
        Update: {
          alternate_contact_name?: string | null
          alternate_email?: string | null
          alternate_phone?: string | null
          aml_kyc_compliance?: string | null
          annual_export_value?: string | null
          annual_turnover?: string | null
          banking_partner?: string | null
          business_address?: string | null
          business_category?: string | null
          business_languages?: string[] | null
          city?: string | null
          company_name?: string
          company_type?: string | null
          compliance_standards?: string[] | null
          contact_email?: string | null
          contact_person_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          credit_rating?: string | null
          currency_preferences?: string[] | null
          customs_broker?: string | null
          customs_registration?: string | null
          designation?: string | null
          duns_number?: string | null
          email?: string | null
          employee_count?: string | null
          eori_number?: string | null
          export_license_number?: string | null
          freight_forwarder?: string | null
          id?: string
          ie_code?: string | null
          incorporation_date?: string | null
          letter_of_credit_bank?: string | null
          payment_terms_preference?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_buyers?: string | null
          preferred_incoterms?: string[] | null
          primary_markets?: string[] | null
          product_categories?: string[] | null
          product_certifications?: string[] | null
          quality_certifications?: string | null
          registration_number?: string | null
          regulatory_licenses?: string | null
          restricted_products?: string | null
          sanctions_compliance?: string | null
          source_countries?: string[] | null
          state?: string | null
          sustainability_requirements?: string | null
          target_markets?: string[] | null
          tax_id?: string | null
          time_zone?: string | null
          trade_finance_limit?: string | null
          trading_experience?: string | null
          vat_number?: string | null
          website?: string | null
          years_in_business?: string | null
        }
        Relationships: []
      }
      seller_documents: {
        Row: {
          document_type: string | null
          file_url: string | null
          id: string
          seller_company_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          document_type?: string | null
          file_url?: string | null
          id?: string
          seller_company_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          document_type?: string | null
          file_url?: string | null
          id?: string
          seller_company_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_documents_seller_company_id_fkey"
            columns: ["seller_company_id"]
            isOneToOne: false
            referencedRelation: "seller_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_arrival: string | null
          cargo: string
          carrier: string
          created_at: string | null
          departure_date: string | null
          destination: string
          estimated_arrival: string | null
          id: string
          incoterm: string | null
          mode: string
          origin: string
          priority: string | null
          status: string
          tracking_number: string
          value: string | null
          vessel: string | null
          weight: string | null
        }
        Insert: {
          actual_arrival?: string | null
          cargo: string
          carrier: string
          created_at?: string | null
          departure_date?: string | null
          destination: string
          estimated_arrival?: string | null
          id?: string
          incoterm?: string | null
          mode: string
          origin: string
          priority?: string | null
          status?: string
          tracking_number: string
          value?: string | null
          vessel?: string | null
          weight?: string | null
        }
        Update: {
          actual_arrival?: string | null
          cargo?: string
          carrier?: string
          created_at?: string | null
          departure_date?: string | null
          destination?: string
          estimated_arrival?: string | null
          id?: string
          incoterm?: string | null
          mode?: string
          origin?: string
          priority?: string | null
          status?: string
          tracking_number?: string
          value?: string | null
          vessel?: string | null
          weight?: string | null
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
      users: {
        Row: {
          company: string | null
          country: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string | null
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
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
