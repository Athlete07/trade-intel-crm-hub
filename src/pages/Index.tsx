import { useState } from "react";
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
  | "reports" 
  | "notifications" 
  | "ai-insights" 
  | "interactions"
  | "add-employee"
  | "edit-employee"
  | "deal-details";

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

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
