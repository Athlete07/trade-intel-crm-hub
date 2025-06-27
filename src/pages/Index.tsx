
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

type ViewType = 'dashboard' | 'companies' | 'deals' | 'interactions' | 'ai-insights';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'companies':
        return <CompanyProfile selectedId={selectedCompanyId} onSelectCompany={setSelectedCompanyId} />;
      case 'deals':
        return <DealManager />;
      case 'interactions':
        return <InteractionLogger />;
      case 'ai-insights':
        return <AIInsights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    EXIM Intelligence CRM
                  </h1>
                  <p className="text-gray-600">
                    Smart Export-Import Business Management Platform
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
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
