
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Phone, 
  Mail, 
  Calendar,
  Search,
  Plus,
  BarChart3,
  Filter,
  Globe,
  Target,
  Handshake
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { CompanyProfile } from "@/components/CompanyProfile";
import { DealManager } from "@/components/DealManager";
import { InteractionLogger } from "@/components/InteractionLogger";
import { AIInsights } from "@/components/AIInsights";
import { Dashboard } from "@/components/Dashboard";
import { CreateDealForm } from "@/components/CreateDealForm";
import { ReportGenerator } from "@/components/ReportGenerator";
import { NotificationCenter } from "@/components/NotificationCenter";

type ViewType = 'dashboard' | 'companies' | 'deals' | 'interactions' | 'ai-insights' | 'create-deal' | 'reports' | 'notifications';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setSelectedCompanyId(null);
  };

  const handleQuickAdd = () => {
    switch (currentView) {
      case 'companies':
        // This will be handled by the CompanyProfile component
        break;
      case 'deals':
        setCurrentView('create-deal');
        break;
      case 'interactions':
        // This will be handled by the InteractionLogger component
        break;
      default:
        // Show options for what to add
        const action = prompt('Quick Add:\n1. Company\n2. Deal\n3. Interaction\nEnter your choice (1-3):');
        switch (action) {
          case '1':
            setCurrentView('companies');
            break;
          case '2':
            setCurrentView('create-deal');
            break;
          case '3':
            setCurrentView('interactions');
            break;
        }
        break;
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // Implement global search functionality here
    }
  };

  const handleCreateDeal = (dealData: any) => {
    console.log('Deal created:', dealData);
    alert('Deal created successfully!');
    setCurrentView('deals');
  };

  const handleCancelDealCreation = () => {
    setCurrentView('deals');
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'companies':
        return <CompanyProfile selectedId={selectedCompanyId} onSelectCompany={setSelectedCompanyId} />;
      case 'deals':
        return <DealManager />;
      case 'create-deal':
        return <CreateDealForm onSave={handleCreateDeal} onCancel={handleCancelDealCreation} />;
      case 'interactions':
        return <InteractionLogger />;
      case 'ai-insights':
        return <AIInsights />;
      case 'reports':
        return <ReportGenerator onBack={() => setCurrentView('dashboard')} />;
      case 'notifications':
        return <NotificationCenter onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'companies':
        return 'Company Management';
      case 'deals':
        return 'Deal Pipeline';
      case 'create-deal':
        return 'Create New Deal';
      case 'interactions':
        return 'Sales Interactions';
      case 'ai-insights':
        return 'AI Insights & Recommendations';
      case 'reports':
        return 'Report Generator';
      case 'notifications':
        return 'Notification Center';
      default:
        return 'EXIM Intelligence CRM';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <Sidebar 
          currentView={currentView} 
          onViewChange={handleNavigation}
          onNotificationClick={() => setCurrentView('notifications')}
          onReportClick={() => setCurrentView('reports')}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {getViewTitle()}
                  </h1>
                  <p className="text-gray-600">
                    Smart Export-Import Business Management Platform
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search companies, deals, contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                    <Button variant="outline" size="sm" onClick={handleSearch}>
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleQuickAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Quick Add
                  </Button>
                </div>
              </div>
            </header>

            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
