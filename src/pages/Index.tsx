
import { useState, useEffect } from "react";
import { ModernDashboard } from "@/components/ModernDashboard";
import { TaskManager } from "@/components/TaskManager";
import { DealManager } from "@/components/DealManager";
import { ContactManager } from "@/components/ContactManager";
import { DocumentManager } from "@/components/DocumentManager";
import { BillGenerator } from "@/components/BillGenerator";
import { EximBillGenerator } from "@/components/EximBillGenerator";
import { CompanyAdmin } from "@/components/CompanyAdmin";
import { CompanyProfile } from "@/components/CompanyProfile";
import { ReportGenerator } from "@/components/ReportGenerator";
import { RealTimeNotificationCenter } from "@/components/RealTimeNotificationCenter";
import { ComplianceManager } from "@/components/ComplianceManager";
import { LogisticsManager } from "@/components/LogisticsManager";
import { AIInsights } from "@/components/AIInsights";
import { InteractionLogger } from "@/components/InteractionLogger";
import { EmployeeForm } from "@/components/EmployeeForm";
import { ModernSidebar } from "@/components/ModernSidebar";
import { CompaniesManager } from "@/components/CompaniesManager";
import { AuthPage } from "@/components/AuthPage";
import { UserProfile } from "@/components/UserProfile";
import { CompanyHolistic } from "@/components/CompanyHolistic";
import { LogisticsAnalytics } from "@/components/LogisticsAnalytics";
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
  | "add-task"
  | "edit-task"
  | "add-document"
  | "edit-document"
  | "reports" 
  | "notifications" 
  | "ai-insights" 
  | "interactions"
  | "add-employee"
  | "edit-employee"
  | "deal-details"
  | "interaction-details"
  | "compliance"
  | "logistics"
  | "profile"
  | "company-holistic"
  | "logistics-analytics";

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

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentView("company-holistic");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <ModernDashboard onNavigate={handleDashboardNavigate} />;
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
          <CompaniesManager 
            onSelectCompany={handleCompanySelect}
          />
        );
      case "reports":
        return <ReportGenerator onBack={handleBackToDashboard} />;
      case "notifications":
        return <RealTimeNotificationCenter onBack={handleBackToDashboard} />;
      case "ai-insights":
        return <AIInsights />;
      case "interactions":
        return <InteractionLogger />;
      case "compliance":
        return <ComplianceManager />;
      case "logistics":
        return <LogisticsManager />;
      case "profile":
        return <UserProfile user={user} onBack={handleBackToDashboard} onLogout={handleLogout} />;
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
      case "company-holistic":
        return (
          <CompanyHolistic 
            companyId={selectedCompanyId || "default"}
            onBack={() => setCurrentView("companies")}
          />
        );
      case "logistics-analytics":
        return (
          <LogisticsAnalytics 
            onBack={() => setCurrentView("logistics")}
          />
        );
      default:
        return <ModernDashboard onNavigate={handleDashboardNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="w-10 h-10 bg-white rounded-lg"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading EXIM CRM</h2>
          <p className="text-gray-600">Preparing your international trade platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ModernSidebar 
        currentView={currentView} 
        onViewChange={handleViewChange}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
