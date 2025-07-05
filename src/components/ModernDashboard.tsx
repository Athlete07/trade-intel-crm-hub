
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  Ship, 
  Plane, 
  Truck,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Bell,
  Settings,
  Filter,
  Download,
  Plus,
  Search,
  ArrowRight,
  Building2,
  Shield,
  Award,
  Target,
  Zap
} from "lucide-react";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";

interface ModernDashboardProps {
  onNavigate: (view: string) => void;
}

export function ModernDashboard({ onNavigate }: ModernDashboardProps) {
  const [timeRange, setTimeRange] = useState("30d");

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2,847,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      description: "Monthly recurring revenue growth"
    },
    {
      title: "Active Deals",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "from-blue-500 to-cyan-600",
      description: "Deals in progress this quarter"
    },
    {
      title: "Shipments",
      value: "3,891",
      change: "-2.1%",
      trend: "down",
      icon: Ship,
      color: "from-purple-500 to-violet-600",
      description: "International shipments processed"
    },
    {
      title: "Compliance Rate",
      value: "98.7%",
      change: "+1.3%",
      trend: "up",
      icon: Shield,
      color: "from-orange-500 to-amber-600",
      description: "Document compliance success rate"
    }
  ];

  const quickActions = [
    {
      title: "Create Invoice",
      description: "Generate international compliant invoices",
      icon: FileText,
      color: "from-blue-600 to-purple-600",
      action: () => onNavigate("bills")
    },
    {
      title: "New Deal",
      description: "Start tracking a new business deal",
      icon: Plus,
      color: "from-green-600 to-emerald-600",
      action: () => onNavigate("deals")
    },
    {
      title: "Add Contact",
      description: "Register new business contact",
      icon: Users,
      color: "from-purple-600 to-pink-600",
      action: () => onNavigate("contacts")
    },
    {
      title: "Upload Document",
      description: "Store important trade documents",
      icon: Package,
      color: "from-orange-600 to-red-600",
      action: () => onNavigate("documents")
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "invoice",
      title: "Commercial Invoice #INV-2024-001",
      description: "Generated for ABC Trading Co.",
      time: "2 hours ago",
      status: "completed",
      icon: FileText,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "deal",
      title: "Export Deal - Electronics",
      description: "Deal value: $125,000 - Stage: Negotiation",
      time: "4 hours ago",
      status: "in-progress",
      icon: Target,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "shipment",
      title: "Ocean Freight - Container #MSKU7834",
      description: "Shanghai to Los Angeles - ETA: 5 days",
      time: "6 hours ago",
      status: "in-transit",
      icon: Ship,
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "document",
      title: "Bill of Lading Updated",
      description: "Document compliance verified",
      time: "1 day ago",
      status: "completed",
      icon: Award,
      color: "text-orange-600"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Review LC Documents",
      description: "Letter of Credit #LC-2024-078",
      dueDate: "Today",
      priority: "high",
      category: "trade-finance"
    },
    {
      id: 2,
      title: "Customs Clearance Follow-up",
      description: "Shipment #SH-2024-156",
      dueDate: "Tomorrow",
      priority: "medium",
      category: "logistics"
    },
    {
      id: 3,
      title: "Client Meeting - Export Strategy",
      description: "ABC International Ltd.",
      dueDate: "Dec 8",
      priority: "high",
      category: "business"
    },
    {
      id: 4,
      title: "Compliance Audit Preparation",
      description: "Q4 Documentation Review",
      dueDate: "Dec 10",
      priority: "medium",
      category: "compliance"
    }
  ];

  const marketInsights = [
    {
      region: "Asia-Pacific",
      trend: "up",
      change: "+15.2%",
      value: "$1.2M",
      description: "Strong electronics export growth"
    },
    {
      region: "Europe",
      trend: "up",
      change: "+8.7%",
      value: "$890K",
      description: "Automotive parts demand rising"
    },
    {
      region: "North America",
      trend: "down",
      change: "-3.1%",
      value: "$756K",
      description: "Seasonal adjustment in textiles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              EXIM Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Welcome back! Here's what's happening with your international trade operations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white shadow-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
            
            return (
              <EnhancedCard key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                <EnhancedCardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      kpi.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      {kpi.change}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-xs text-gray-500">{kpi.description}</p>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            );
          })}
        </div>

        {/* Quick Actions */}
        <EnhancedCard className="bg-white shadow-xl border-0">
          <EnhancedCardHeader className="pb-6">
            <EnhancedCardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="w-7 h-7 text-blue-600" />
              Quick Actions
            </EnhancedCardTitle>
          </EnhancedCardHeader>
          <EnhancedCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                
                return (
                  <div 
                    key={index}
                    onClick={action.action}
                    className="group cursor-pointer bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <EnhancedCard className="bg-white shadow-xl border-0 h-full">
              <EnhancedCardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <EnhancedCardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Activity className="w-7 h-7 text-blue-600" />
                    Recent Activities
                  </EnhancedCardTitle>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">
                    View All
                  </Button>
                </div>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    
                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          activity.status === "completed" ? "bg-green-100" :
                          activity.status === "in-progress" ? "bg-blue-100" : "bg-orange-100"
                        }`}>
                          <IconComponent className={`w-6 h-6 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                        <Badge className={`
                          ${activity.status === "completed" ? "bg-green-100 text-green-700" :
                            activity.status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}
                        `}>
                          {activity.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <EnhancedCard className="bg-white shadow-xl border-0">
              <EnhancedCardHeader className="pb-4">
                <EnhancedCardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  Upcoming Tasks
                </EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                          {task.title}
                        </h4>
                        <Badge className={`text-xs ${
                          task.priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                      <p className="text-xs text-gray-500">{task.dueDate}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </EnhancedCardContent>
            </EnhancedCard>

            {/* Market Insights */}
            <EnhancedCard className="bg-white shadow-xl border-0">
              <EnhancedCardHeader className="pb-4">
                <EnhancedCardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Market Insights
                </EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => {
                    const TrendIcon = insight.trend === "up" ? TrendingUp : TrendingDown;
                    
                    return (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm text-gray-900">{insight.region}</h4>
                          <div className={`flex items-center gap-1 text-xs font-semibold ${
                            insight.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            <TrendIcon className="w-3 h-3" />
                            {insight.change}
                          </div>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mb-1">{insight.value}</p>
                        <p className="text-xs text-gray-600">{insight.description}</p>
                      </div>
                    );
                  })}
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>
        </div>
      </div>
    </div>
  );
}
