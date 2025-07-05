
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  FileText,
  Users,
  Target,
  Package,
  Ship,
  Building2,
  BarChart3,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Shield,
  Truck,
  Brain,
  MessageSquare,
  CheckSquare,
  Award,
  Zap,
  Menu,
  X
} from "lucide-react";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ModernSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user: SupabaseUser;
  onLogout: () => void;
}

export function ModernSidebar({ currentView, onViewChange, user, onLogout }: ModernSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-600",
      notifications: 0
    },
    {
      id: "bills",
      label: "Bill Generator",
      icon: FileText,
      color: "text-purple-600",
      notifications: 0
    },
    {
      id: "deals",
      label: "Deal Management",
      icon: Target,
      color: "text-green-600",
      notifications: 3
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: Users,
      color: "text-orange-600",
      notifications: 0
    },
    {
      id: "documents",
      label: "Documents",
      icon: Package,
      color: "text-indigo-600",
      notifications: 1
    },
    {
      id: "logistics",
      label: "Logistics",
      icon: Truck,
      color: "text-cyan-600",
      notifications: 2
    },
    {
      id: "compliance",
      label: "Compliance",
      icon: Shield,
      color: "text-emerald-600",
      notifications: 0
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2,
      color: "text-pink-600",
      notifications: 0
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      color: "text-violet-600",
      notifications: 0
    },
    {
      id: "ai-insights",
      label: "AI Insights",
      icon: Brain,
      color: "text-amber-600",
      notifications: 0
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: CheckSquare,
      color: "text-rose-600",
      notifications: 5
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      color: "text-red-600",
      notifications: 12
    }
  ];

  const handleNavigation = (viewId: string) => {
    onViewChange(viewId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-lg hover:shadow-xl transition-shadow"
          size="sm"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-80'}
        fixed lg:relative h-full bg-white shadow-2xl transition-all duration-300 z-50 border-r border-gray-100
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      EXIM CRM
                    </h1>
                    <p className="text-xs text-gray-500">International Trade Platform</p>
                  </div>
                </div>
              )}
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                variant="ghost"
                size="sm"
                className="hidden lg:flex text-gray-500 hover:text-gray-700"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-4 space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`
                      w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 shadow-lg border-2 border-blue-200' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                      }
                    `}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <span className="font-medium">{item.label}</span>
                        </div>
                        
                        {item.notifications > 0 && (
                          <Badge className={`
                            ${isActive ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'}
                            px-2 py-1 text-xs font-bold min-w-[20px] h-5 flex items-center justify-center
                          `}>
                            {item.notifications > 99 ? '99+' : item.notifications}
                          </Badge>
                        )}
                      </>
                    )}

                    {isCollapsed && item.notifications > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {item.notifications > 9 ? '9+' : item.notifications}
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-gray-100 space-y-4">
            {/* User Profile */}
            <div 
              onClick={() => handleNavigation('profile')}
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50
                ${currentView === 'profile' ? 'bg-blue-50 border-2 border-blue-200' : ''}
              `}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={() => handleNavigation('company-admin')}
                variant="ghost"
                className={`
                  w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50
                  ${isCollapsed ? 'px-3' : 'px-4'}
                `}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && "Settings"}
              </Button>
              
              <Button
                onClick={onLogout}
                variant="ghost"
                className={`
                  w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50
                  ${isCollapsed ? 'px-3' : 'px-4'}
                `}
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && "Sign Out"}
              </Button>
            </div>

            {/* Status Indicator */}
            {!isCollapsed && (
              <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">System Online</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
