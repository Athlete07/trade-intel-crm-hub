import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Building2, 
  Handshake, 
  MessageSquare, 
  Brain,
  Home,
  Settings,
  Bell,
  FileText,
  Users,
  Calendar,
  FolderOpen
} from "lucide-react";

type ViewType = 'dashboard' | 'companies' | 'deals' | 'interactions' | 'ai-insights' | 'create-deal' | 'reports' | 'notifications' | 'add-company' | 'deal-details' | 'interaction-details' | 'contacts' | 'documents' | 'tasks' | 'add-contact' | 'edit-contact' | 'add-task' | 'edit-task' | 'add-document' | 'edit-document' | 'bills' | 'company-admin';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onNotificationClick?: () => void;
  onReportClick?: () => void;
}

export function Sidebar({ currentView, onViewChange, onNotificationClick, onReportClick }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home, badge: null },
    { id: 'company-admin' as const, label: 'Company Admin', icon: Building2, badge: 'New' },
    { id: 'companies' as const, label: 'Companies', icon: Building2, badge: '127' },
    { id: 'deals' as const, label: 'Deals', icon: Handshake, badge: '23' },
    { id: 'interactions' as const, label: 'Interactions', icon: MessageSquare, badge: '8' },
    { id: 'contacts' as const, label: 'Contacts', icon: Users, badge: '245' },
    { id: 'tasks' as const, label: 'Tasks', icon: Calendar, badge: '12' },
    { id: 'documents' as const, label: 'Documents', icon: FolderOpen, badge: '156' },
    { id: 'bills' as const, label: 'Bill Generator', icon: FileText, badge: 'Pro' },
    { id: 'ai-insights' as const, label: 'AI Insights', icon: Brain, badge: null },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">EXIM CRM</h2>
            <p className="text-xs text-gray-500">Trade Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-12 ${
                  isActive ? 'bg-blue-50 border-blue-200 text-blue-700' : 'hover:bg-gray-50'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badge === 'New' ? 'default' : 'secondary'}
                    className="ml-2 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start h-12"
            onClick={onNotificationClick}
          >
            <Bell className="w-5 h-5 mr-3" />
            Notifications
            <Badge variant="destructive" className="ml-auto">3</Badge>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start h-12"
            onClick={onReportClick}
          >
            <FileText className="w-5 h-5 mr-3" />
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start h-12">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
        </div>
      </nav>
    </div>
  );
}
