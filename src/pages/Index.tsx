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
  Handshake,
  Menu,
  Bell,
  Settings
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
import { BillGenerator } from "@/components/BillGenerator";
import { CompanyAdmin } from "@/components/CompanyAdmin";
import { EmployeeForm } from "@/components/EmployeeForm";

type ViewType = 'dashboard' | 'companies' | 'deals' | 'interactions' | 'ai-insights' | 'create-deal' | 'reports' | 'notifications' | 'add-company' | 'deal-details' | 'interaction-details' | 'contacts' | 'documents' | 'tasks' | 'add-contact' | 'edit-contact' | 'add-task' | 'edit-task' | 'add-document' | 'edit-document' | 'bills' | 'company-admin' | 'add-employee' | 'edit-employee';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [selectedInteractionId, setSelectedInteractionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      case 'tasks':
        setCurrentView('add-task');
        break;
      case 'contacts':
        setCurrentView('add-contact');
        break;
      default:
        const action = prompt('Quick Add:\n1. Company\n2. Deal\n3. Task\n4. Contact\n5. Employee\nEnter your choice (1-5):');
        switch (action) {
          case '1':
            setCurrentView('add-company');
            break;
          case '2':
            setCurrentView('create-deal');
            break;
          case '3':
            setCurrentView('add-task');
            break;
          case '4':
            setCurrentView('add-contact');
            break;
          case '5':
            setCurrentView('add-employee');
            break;
        }
        break;
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
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

  const handleAddEmployee = (employeeData: any) => {
    console.log('Employee added:', employeeData);
    alert('Employee added successfully!');
    setCurrentView('company-admin');
  };

  const handleEditEmployee = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setCurrentView('edit-employee');
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'companies':
        return <CompanyProfile selectedId={selectedCompanyId} onSelectCompany={setSelectedCompanyId} />;
      case 'company-admin':
        return <CompanyAdmin onNavigate={handleNavigation} onAddEmployee={() => setCurrentView('add-employee')} onEditEmployee={handleEditEmployee} />;
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
      case 'bills':
        return <BillGenerator />;
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
      case 'add-employee':
        return <EmployeeForm onSave={handleAddEmployee} onCancel={() => setCurrentView('company-admin')} />;
      case 'edit-employee':
        return selectedEmployeeId ? (
          <EmployeeForm 
            employeeId={selectedEmployeeId}
            onSave={handleAddEmployee} 
            onCancel={() => setCurrentView('company-admin')} 
          />
        ) : <CompanyAdmin onNavigate={handleNavigation} onAddEmployee={() => setCurrentView('add-employee')} onEditEmployee={handleEditEmployee} />;
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
      case 'company-admin':
        return 'Company Administration';
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
      case 'bills':
        return 'Bill Generator';
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
      case 'add-employee':
        return 'Add New Employee';
      case 'edit-employee':
        return 'Edit Employee';
      default:
        return 'EXIM Intelligence CRM';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#1a1d23]">
      <div className="flex">
        <Sidebar 
          currentView={currentView} 
          onViewChange={handleNavigation}
          onNotificationClick={() => setCurrentView('notifications')}
          onReportClick={() => setCurrentView('reports')}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* ServiceNow-inspired Header */}
          <header className="bg-white dark:bg-[#2c3e50] border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2"
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {getViewTitle()}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Smart Export-Import Business Management Platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search across platform..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className="w-4 h-4" />
                </Button>
                
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings className="w-4 h-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  className="bg-[#0073e6] hover:bg-[#005bb5] text-white px-4 py-2 rounded-lg font-medium" 
                  onClick={handleQuickAdd}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="max-w-full">
              {renderMainContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
