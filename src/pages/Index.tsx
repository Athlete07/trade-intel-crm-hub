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
import { AddCompanyForm } from "@/components/AddCompanyForm";
import { DealDetails } from "@/components/DealDetails";
import { InteractionDetails } from "@/components/InteractionDetails";
import { ContactManager } from "@/components/ContactManager";
import { DocumentManager } from "@/components/DocumentManager";
import { TaskManager } from "@/components/TaskManager";
import { ContactForm } from "@/components/ContactForm";
import { TaskForm } from "@/components/TaskForm";
import { DocumentForm } from "@/components/DocumentForm";

type ViewType = 'dashboard' | 'companies' | 'deals' | 'interactions' | 'ai-insights' | 'create-deal' | 'reports' | 'notifications' | 'add-company' | 'deal-details' | 'interaction-details' | 'contacts' | 'documents' | 'tasks' | 'add-contact' | 'edit-contact' | 'add-task' | 'edit-task' | 'add-document' | 'edit-document';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [selectedInteractionId, setSelectedInteractionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    setSelectedCompanyId(null);
    setSelectedDealId(null);
    setSelectedInteractionId(null);
  };

  const handleQuickAdd = () => {
    switch (currentView) {
      case 'companies':
        setCurrentView('add-company');
        break;
      case 'deals':
        setCurrentView('create-deal');
        break;
      case 'interactions':
        // This will be handled by the InteractionLogger component
        break;
      default:
        // Show options for what to add
        const action = prompt('Quick Add:\n1. Company\n2. Deal\n3. Interaction\n4. Task\n5. Contact\nEnter your choice (1-5):');
        switch (action) {
          case '1':
            setCurrentView('add-company');
            break;
          case '2':
            setCurrentView('create-deal');
            break;
          case '3':
            setCurrentView('interactions');
            break;
          case '4':
            setCurrentView('tasks');
            break;
          case '5':
            setCurrentView('contacts');
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

  const handleAddCompany = (companyData: any) => {
    console.log('Company added:', companyData);
    alert('Company added successfully!');
    setCurrentView('companies');
  };

  const handleCancelCompanyCreation = () => {
    setCurrentView('companies');
  };

  const handleViewDealDetails = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentView('deal-details');
  };

  const handleEditDeal = (dealId: string) => {
    // This would open the deal for editing
    setCurrentView('create-deal');
  };

  const handleViewInteractionDetails = (interactionId: string) => {
    setSelectedInteractionId(interactionId);
    setCurrentView('interaction-details');
  };

  const handleEditInteraction = (interactionId: string) => {
    // This would open the interaction for editing
    alert(`Editing interaction ${interactionId}`);
  };

  const handleAddContact = (contactData: any) => {
    console.log('Contact added:', contactData);
    alert('Contact added successfully!');
    setCurrentView('contacts');
  };

  const handleEditContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setCurrentView('edit-contact');
  };

  const handleAddTask = (taskData: any) => {
    console.log('Task added:', taskData);
    alert('Task created successfully!');
    setCurrentView('tasks');
  };

  const handleEditTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentView('edit-task');
  };

  const handleAddDocument = (documentData: any) => {
    console.log('Document added:', documentData);
    alert('Document uploaded successfully!');
    setCurrentView('documents');
  };

  const handleEditDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setCurrentView('edit-document');
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'companies':
        return <CompanyProfile selectedId={selectedCompanyId} onSelectCompany={setSelectedCompanyId} />;
      case 'deals':
        return <DealManager onViewDetails={handleViewDealDetails} onEditDeal={handleEditDeal} />;
      case 'create-deal':
        return <CreateDealForm onSave={handleCreateDeal} onCancel={handleCancelDealCreation} />;
      case 'interactions':
        return <InteractionLogger onViewDetails={handleViewInteractionDetails} onEditInteraction={handleEditInteraction} />;
      case 'ai-insights':
        return <AIInsights />;
      case 'reports':
        return <ReportGenerator onBack={() => setCurrentView('dashboard')} />;
      case 'notifications':
        return <NotificationCenter onBack={() => setCurrentView('dashboard')} />;
      case 'add-company':
        return <AddCompanyForm onSave={handleAddCompany} onCancel={handleCancelCompanyCreation} />;
      case 'deal-details':
        return selectedDealId ? (
          <DealDetails 
            dealId={selectedDealId} 
            onBack={() => setCurrentView('deals')} 
            onEdit={handleEditDeal}
          />
        ) : <DealManager onViewDetails={handleViewDealDetails} onEditDeal={handleEditDeal} />;
      case 'interaction-details':
        return selectedInteractionId ? (
          <InteractionDetails 
            interactionId={selectedInteractionId} 
            onBack={() => setCurrentView('interactions')} 
            onEdit={handleEditInteraction}
          />
        ) : <InteractionLogger onViewDetails={handleViewInteractionDetails} onEditInteraction={handleEditInteraction} />;
      case 'contacts':
        return <ContactManager />;
      case 'documents':
        return <DocumentManager />;
      case 'tasks':
        return <TaskManager />;
      case 'add-contact':
        return <ContactForm onSave={handleAddContact} onCancel={() => setCurrentView('contacts')} />;
      case 'edit-contact':
        return selectedContactId ? (
          <ContactForm 
            contactId={selectedContactId}
            onSave={handleAddContact} 
            onCancel={() => setCurrentView('contacts')} 
          />
        ) : <ContactManager />;
      case 'add-task':
        return <TaskForm onSave={handleAddTask} onCancel={() => setCurrentView('tasks')} />;
      case 'edit-task':
        return selectedTaskId ? (
          <TaskForm 
            taskId={selectedTaskId}
            onSave={handleAddTask} 
            onCancel={() => setCurrentView('tasks')} 
          />
        ) : <TaskManager />;
      case 'add-document':
        return <DocumentForm onSave={handleAddDocument} onCancel={() => setCurrentView('documents')} />;
      case 'edit-document':
        return selectedDocumentId ? (
          <DocumentForm 
            documentId={selectedDocumentId}
            onSave={handleAddDocument} 
            onCancel={() => setCurrentView('documents')} 
          />
        ) : <DocumentManager />;
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
      case 'add-company':
        return 'Add New Company';
      case 'deal-details':
        return 'Deal Details';
      case 'interaction-details':
        return 'Interaction Details';
      case 'contacts':
        return 'Contact Management';
      case 'documents':
        return 'Document Management';
      case 'tasks':
        return 'Task Management';
      case 'add-contact':
        return 'Add New Contact';
      case 'edit-contact':
        return 'Edit Contact';
      case 'add-task':
        return 'Create New Task';
      case 'edit-task':
        return 'Edit Task';
      case 'add-document':
        return 'Upload New Document';
      case 'edit-document':
        return 'Edit Document';
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
