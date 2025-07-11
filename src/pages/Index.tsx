import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModernSidebar } from "@/components/ModernSidebar";
import { ModernDashboard } from "@/components/ModernDashboard";
import { EnhancedDealManager } from "@/components/EnhancedDealManager";
import { SalesLifecycle } from "@/components/SalesLifecycle";
import { TradeLifecycle } from "@/components/TradeLifecycle";
import { EnterpriseLifecycleManager } from "@/components/EnterpriseLifecycleManager";
import { InternationalStandardsCompliance } from "@/components/InternationalStandardsCompliance";
import { AuthPage } from "@/components/AuthPage";
import { TaskBoard } from "@/components/TaskBoard";
import { ContactManager } from "@/components/ContactManager";
import { CompaniesManager } from "@/components/CompaniesManager";
import { DocumentManager } from "@/components/DocumentManager";
import { BillGenerator } from "@/components/BillGenerator";
import { EximBillGenerator } from "@/components/EximBillGenerator";
import { LogisticsManager } from "@/components/LogisticsManager";
import { ComplianceManager } from "@/components/ComplianceManager";
import { CompanyAdmin } from "@/components/CompanyAdmin";
import { EnhancedReportGenerator } from "@/components/EnhancedReportGenerator";
import { RealTimeNotificationCenter } from "@/components/RealTimeNotificationCenter";
import { AIInsights } from "@/components/AIInsights";
import { InteractionLogger } from "@/components/InteractionLogger";
import { UserProfile } from "@/components/UserProfile";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';

export default function Index() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  // Mock data for tasks
  const mockTasks = [
    {
      id: "1",
      title: "Review contract terms",
      status: "pending",
      priority: "High",
      assignee: "John Doe",
      company: "ABC Corp",
      dueDate: "2024-01-15",
      actualHours: 4,
      estimatedHours: 6,
      progress: 65,
      riskLevel: "Medium",
      tags: ["Contract", "Review"]
    },
    {
      id: "2", 
      title: "Prepare shipping documents",
      status: "in-progress",
      priority: "Critical",
      assignee: "Jane Smith",
      company: "XYZ Ltd",
      dueDate: "2024-01-12",
      actualHours: 8,
      estimatedHours: 10,
      progress: 80,
      riskLevel: "High",
      tags: ["Shipping", "Documents"]
    }
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (user: User) => {
    setUser(user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView("dashboard");
  };

  const handleNavigateToSalesLifecycle = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentView("sales-lifecycle");
  };

  const handleNavigateToTradeLifecycle = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentView("trade-lifecycle");
  };

  const handleNavigateToEnterpriseLifecycle = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentView("enterprise-lifecycle");
  };

  const handleSalesLifecycleCompleted = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentView("trade-lifecycle");
  };

  const handleSelectCompany = (companyId: string) => {
    console.log('Selected company:', companyId);
    // Add company selection logic here
  };

  const handleViewTask = (taskId: string) => {
    console.log('View task:', taskId);
    // Add task viewing logic here
  };

  const handleEditTask = (taskId: string) => {
    console.log('Edit task:', taskId);
    // Add task editing logic here
  };

  const handleAddEmployee = () => {
    console.log('Add employee');
    // Add employee creation logic here
  };

  const handleEditEmployee = (employeeId: string) => {
    console.log('Edit employee:', employeeId);
    // Add employee editing logic here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <ModernDashboard onNavigate={setCurrentView} />;
      
      case "deals":
        return (
          <EnhancedDealManager
            onNavigateToSalesLifecycle={handleNavigateToSalesLifecycle}
            onNavigateToTradeLifecycle={handleNavigateToTradeLifecycle}
          />
        );
      
      case "sales-lifecycle":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentView("deals")}
              >
                ← Back to Deals
              </Button>
              <Button
                onClick={() => selectedDealId && handleNavigateToEnterpriseLifecycle(selectedDealId)}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Enterprise View
              </Button>
            </div>
            <SalesLifecycle
              onBack={() => setCurrentView("deals")}
              onCompleted={handleSalesLifecycleCompleted}
              dealId={selectedDealId || undefined}
            />
          </div>
        );
      
      case "trade-lifecycle":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentView("deals")}
              >
                ← Back to Deals
              </Button>
              <Button
                onClick={() => selectedDealId && handleNavigateToEnterpriseLifecycle(selectedDealId)}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Enterprise View
              </Button>
            </div>
            <TradeLifecycle
              onBack={() => setCurrentView("deals")}
              dealId={selectedDealId || undefined}
            />
          </div>
        );

      case "enterprise-lifecycle":
        return selectedDealId ? (
          <EnterpriseLifecycleManager
            dealId={selectedDealId}
            onBack={() => setCurrentView("deals")}
          />
        ) : (
          <div className="text-center p-8">
            <p>No deal selected for enterprise lifecycle management.</p>
            <Button onClick={() => setCurrentView("deals")} className="mt-4">
              Return to Deals
            </Button>
          </div>
        );

      case "compliance":
        return (
          <div className="space-y-6">
            <InternationalStandardsCompliance />
            <ComplianceManager />
          </div>
        );
      
      case "tasks":
        return (
          <TaskBoard 
            tasks={mockTasks}
            onBack={() => setCurrentView("dashboard")}
            onViewTask={handleViewTask}
            onEditTask={handleEditTask}
          />
        );
      case "contacts":
        return <ContactManager />;
      case "companies":
        return <CompaniesManager onSelectCompany={handleSelectCompany} />;
      case "documents":
        return <DocumentManager />;
      case "bills":
        return <BillGenerator />;
      case "exim-bills":
        return <EximBillGenerator />;
      case "logistics":
        return <LogisticsManager />;
      case "company-admin":
        return (
          <CompanyAdmin 
            onNavigate={setCurrentView}
            onAddEmployee={handleAddEmployee}
            onEditEmployee={handleEditEmployee}
          />
        );
      case "reports":
        return <EnhancedReportGenerator onBack={() => setCurrentView("dashboard")} />;
      case "notifications":
        return <RealTimeNotificationCenter onBack={() => setCurrentView("dashboard")} />;
      case "ai-insights":
        return <AIInsights />;
      case "interactions":
        return <InteractionLogger />;
      case "profile":
        return (
          <UserProfile 
            user={user} 
            onBack={() => setCurrentView("dashboard")}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <ModernDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <ModernSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
