
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  FileText,
  Clock,
  Globe,
  Ship,
  AlertCircle,
  CheckCircle2,
  Target,
  Workflow,
  ArrowRight
} from "lucide-react";

interface ModernDashboardProps {
  onNavigate: (view: string) => void;
}

export function ModernDashboard({ onNavigate }: ModernDashboardProps) {
  const stats = [
    {
      title: "Active Deals",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Monthly Revenue",
      value: "$2.4M",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Active Shipments",
      value: "18",
      change: "-3%",
      trend: "down",
      icon: Ship,
      color: "text-purple-600"
    },
    {
      title: "Global Clients",
      value: "156",
      change: "+15%",
      trend: "up",
      icon: Globe,
      color: "text-orange-600"
    }
  ];

  const recentDeals = [
    {
      id: "D001",
      company: "Steel Dynamics Inc",
      product: "Steel Coils",
      value: "$450K",
      status: "In Transit",
      progress: 75,
      lifecycle: "shipment"
    },
    {
      id: "D002", 
      company: "Textile Global Ltd",
      product: "Cotton Fabric",
      value: "$280K",
      status: "Documentation",
      progress: 45,
      lifecycle: "contract"
    },
    {
      id: "D003",
      company: "Electronics Export Co",
      product: "Components",
      value: "$680K",
      status: "Production",
      progress: 30,
      lifecycle: "pre-shipment"
    }
  ];

  const tradeLifecycleOverview = [
    { phase: "Pre-Contract", count: 8, color: "bg-blue-500" },
    { phase: "Contract & Docs", count: 5, color: "bg-green-500" },
    { phase: "Pre-Shipment", count: 6, color: "bg-yellow-500" },
    { phase: "In Transit", count: 3, color: "bg-purple-500" },
    { phase: "Post-Shipment", count: 2, color: "bg-orange-500" }
  ];

  const urgentTasks = [
    {
      id: 1,
      title: "Export License Application Due",
      deal: "Steel Dynamics Inc",
      dueDate: "Today",
      priority: "high",
      lifecycle: "contract"
    },
    {
      id: 2,
      title: "Quality Inspection Scheduled",
      deal: "Textile Global Ltd", 
      dueDate: "Tomorrow",
      priority: "medium",
      lifecycle: "pre-shipment"
    },
    {
      id: 3,
      title: "Payment Collection Follow-up",
      deal: "Electronics Export Co",
      dueDate: "2 days",
      priority: "high",
      lifecycle: "post-shipment"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trade Control Center</h1>
          <p className="text-gray-600">Monitor and manage your international trade operations</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate('trade-lifecycle')} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Workflow className="w-4 h-4 mr-2" />
            Trade Lifecycle
          </Button>
          <Button variant="outline" onClick={() => onNavigate('deals')}>
            <Target className="w-4 h-4 mr-2" />
            View All Deals
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trade Lifecycle Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            Trade Lifecycle Overview
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => onNavigate('trade-lifecycle')}>
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tradeLifecycleOverview.map((phase, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${phase.color} flex items-center justify-center mb-2`}>
                  <span className="text-white font-bold text-lg">{phase.count}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{phase.phase}</p>
                <p className="text-xs text-gray-500">Active Deals</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Deals</CardTitle>
            <Button variant="outline" size="sm" onClick={() => onNavigate('deals')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeals.map((deal) => (
                <div key={deal.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{deal.company}</h4>
                      <p className="text-sm text-gray-600">{deal.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{deal.value}</p>
                      <Badge variant="secondary">{deal.status}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{deal.progress}%</span>
                    </div>
                    <Progress value={deal.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Phase: {deal.lifecycle}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onNavigate('trade-lifecycle')}
                    >
                      View Lifecycle
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Urgent Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Urgent Tasks
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => onNavigate('tasks')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{task.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{task.deal}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                        <Badge 
                          variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="p-6 h-auto flex-col gap-2"
              onClick={() => onNavigate('create-deal')}
            >
              <DollarSign className="w-6 h-6" />
              <span>New Deal</span>
            </Button>
            <Button 
              variant="outline" 
              className="p-6 h-auto flex-col gap-2"
              onClick={() => onNavigate('add-contact')}
            >
              <Users className="w-6 h-6" />
              <span>Add Contact</span>
            </Button>
            <Button 
              variant="outline" 
              className="p-6 h-auto flex-col gap-2"
              onClick={() => onNavigate('documents')}
            >
              <FileText className="w-6 h-6" />
              <span>Documents</span>
            </Button>
            <Button 
              variant="outline" 
              className="p-6 h-auto flex-col gap-2"
              onClick={() => onNavigate('trade-lifecycle')}
            >
              <Workflow className="w-6 h-6" />
              <span>Lifecycle</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
