
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { TaskManager } from "@/components/TaskManager";
import { DealManager } from "@/components/DealManager";
import { ContactManager } from "@/components/ContactManager";
import { DocumentManager } from "@/components/DocumentManager";
import { BillGenerator } from "@/components/BillGenerator";
import { EximBillGenerator } from "@/components/EximBillGenerator";
import { CompanyAdmin } from "@/components/CompanyAdmin";
import { ReportGenerator } from "@/components/ReportGenerator";
import { NotificationCenter } from "@/components/NotificationCenter";
import { AIInsights } from "@/components/AIInsights";
import { InteractionLogger } from "@/components/InteractionLogger";
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
  | "reports" 
  | "notifications" 
  | "ai-insights" 
  | "interactions";

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentView} />;
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
        return <CompanyAdmin />;
      case "reports":
        return <ReportGenerator />;
      case "notifications":
        return <NotificationCenter />;
      case "ai-insights":
        return <AIInsights />;
      case "interactions":
        return <InteractionLogger />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto p-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
