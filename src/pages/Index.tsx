import { useState, useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { TaskManager } from "@/components/TaskManager";
import { DealManager } from "@/components/DealManager";
import { ContactManager } from "@/components/ContactManager";
import { DocumentManager } from "@/components/DocumentManager";
import { BillGenerator } from "@/components/BillGenerator";
import { EximBillGenerator } from "@/components/EximBillGenerator";
import { CompanyAdmin } from "@/components/CompanyAdmin";
import { CompanyProfile } from "@/components/CompanyProfile";
import { ReportGenerator } from "@/components/ReportGenerator";
import { NotificationCenter } from "@/components/NotificationCenter";
import { AIInsights } from "@/components/AIInsights";
import { InteractionLogger } from "@/components/InteractionLogger";
import { EmployeeForm } from "@/components/EmployeeForm";
import { Sidebar } from "@/components/Sidebar";
import { CompaniesManager } from "@/components/CompaniesManager";
import { AuthPage } from "@/components/AuthPage";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';

type ViewType = 
  | "dashboard" 
  | "tasks" 
  | "deals" 
  | "contacts" 
  | "documents" 
  | "bills" 
  | "exim-bills"
  | "company-admin" 
  | "companies"
  | "create-deal"
  | "add-company"
  | "add-contact"
  | "edit-contact"
  | "reports" 
  | "notifications" 
  | "ai-insights" 
  | "interactions"
  | "add-employee"
  | "edit-employee"
  | "deal-details"
  | "interaction-details";

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setCurrentView("dashboard");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView("dashboard");
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleDashboardNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleCompanyAdminNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setCurrentView("add-employee");
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setCurrentView("edit-employee");
  };

  const handleSaveEmployee = (employee: any) => {
    // Handle employee save logic here
    console.log("Saving employee:", employee);
    setCurrentView("company-admin");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={handleDashboardNavigate} />;
      case "tasks":
        return <TaskManager />;
      case "deals":
        return <DealManager />;
      case "contacts":
        return <ContactManager />;
      case "documents":
        return <DocumentManager />;
      case "bills":
        return <BillGenerator />;
      case "exim-bills":
        return <EximBillGenerator />;
      case "company-admin":
        return (
          <CompanyAdmin 
            onNavigate={handleCompanyAdminNavigate}
            onAddEmployee={handleAddEmployee}
            onEditEmployee={handleEditEmployee}
          />
        );
      case "companies":
        return (
          <CompanyProfile 
            selectedId={selectedCompanyId}
            onSelectCompany={setSelectedCompanyId}
          />
        );
      case "reports":
        return <ReportGenerator onBack={handleBackToDashboard} />;
      case "notifications":
        return <NotificationCenter onBack={handleBackToDashboard} />;
      case "ai-insights":
        return <AIInsights />;
      case "interactions":
        return <InteractionLogger />;
      case "add-employee":
        return (
          <EmployeeForm 
            onBack={() => setCurrentView("company-admin")}
            onSave={handleSaveEmployee}
          />
        );
      case "edit-employee":
        return (
          <EmployeeForm 
            onBack={() => setCurrentView("company-admin")}
            onSave={handleSaveEmployee}
            employee={selectedEmployee}
          />
        );
      default:
        return <Dashboard onNavigate={handleDashboardNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading EXIM CRM...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
