
import { useState } from "react";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Handshake, 
  Users, 
  FileText, 
  Receipt, 
  Building2, 
  BarChart3, 
  Bell, 
  Brain, 
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  Globe,
  Building,
  User,
  LogOut,
  Workflow,
  Ship,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ModernSidebarProps {
  currentView: string;
  onViewChange: (view: any) => void;
  user?: SupabaseUser | null;
  onLogout?: () => void;
}

export function ModernSidebar({ currentView, onViewChange, user, onLogout }: ModernSidebarProps) {
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(false);
  const [isComplianceExpanded, setIsComplianceExpanded] = useState(false);
  const [isTradeExpanded, setIsTradeExpanded] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { 
      id: "trade", 
      label: "Trade Management", 
      icon: Workflow,
      hasSubmenu: true,
      submenu: [
        { id: "trade-lifecycle", label: "Trade Lifecycle", icon: Workflow },
        { id: "deals", label: "Deals", icon: Handshake },
        { id: "logistics", label: "Logistics & Shipping", icon: Ship }
      ]
    },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "companies", label: "Companies", icon: Building },
    { id: "contacts", label: "Contacts", icon: Users },
    { 
      id: "documents", 
      label: "Documents", 
      icon: FileText,
      hasSubmenu: true,
      submenu: [
        { id: "documents", label: "Document Manager", icon: FileText },
        { id: "bills", label: "Bill Generator", icon: Receipt },
        { id: "exim-bills", label: "EXIM Documents", icon: Globe }
      ]
    },
    { 
      id: "compliance", 
      label: "Compliance", 
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { id: "compliance", label: "Compliance Manager", icon: Settings },
      ]
    },
    { id: "company-admin", label: "Company Admin", icon: Building2 },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "ai-insights", label: "AI Insights", icon: Brain },
    { id: "interactions", label: "Interactions", icon: MessageSquare },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === "documents") {
      setIsDocumentsExpanded(!isDocumentsExpanded);
    } else if (itemId === "compliance") {
      setIsComplianceExpanded(!isComplianceExpanded);
    } else if (itemId === "trade") {
      setIsTradeExpanded(!isTradeExpanded);
    } else {
      onViewChange(itemId);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">EXIM CRM</h2>
            <p className="text-sm text-gray-600">Trade Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-4 flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left font-medium transition-all duration-200 ${
                  currentView === item.id || 
                  (item.hasSubmenu && item.id === "documents" && (currentView === "documents" || currentView === "bills" || currentView === "exim-bills")) ||
                  (item.hasSubmenu && item.id === "compliance" && currentView === "compliance") ||
                  (item.hasSubmenu && item.id === "trade" && (currentView === "trade-lifecycle" || currentView === "deals" || currentView === "logistics"))
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
                {item.hasSubmenu && (
                  <div className="ml-auto">
                    {(item.id === "documents" && isDocumentsExpanded) || 
                     (item.id === "compliance" && isComplianceExpanded) ||
                     (item.id === "trade" && isTradeExpanded) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </Button>
              
              {item.hasSubmenu && item.id === "documents" && isDocumentsExpanded && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      className={`w-full justify-start text-left font-medium transition-all duration-200 ${
                        currentView === subItem.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => onViewChange(subItem.id)}
                    >
                      <subItem.icon className="w-4 h-4 mr-3" />
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              )}

              {item.hasSubmenu && item.id === "compliance" && isComplianceExpanded && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      className={`w-full justify-start text-left font-medium transition-all duration-200 ${
                        currentView === subItem.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => onViewChange(subItem.id)}
                    >
                      <subItem.icon className="w-4 h-4 mr-3" />
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              )}

              {item.hasSubmenu && item.id === "trade" && isTradeExpanded && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant="ghost"
                      className={`w-full justify-start text-left font-medium transition-all duration-200 ${
                        currentView === subItem.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => onViewChange(subItem.id)}
                    >
                      <subItem.icon className="w-4 h-4 mr-3" />
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start text-left ${
                currentView === "profile"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onViewChange("profile")}
            >
              <User className="w-4 h-4 mr-2" />
              My Profile
            </Button>
            
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left text-gray-700 hover:bg-gray-100"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">EXIM CRM v2.0</p>
          <p className="text-xs text-gray-400 mt-1">Trade Solutions</p>
        </div>
      </div>
    </div>
  );
}
