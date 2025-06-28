
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp,
  Upload,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Activity,
  Download,
  Settings
} from "lucide-react";

interface CompanyAdminProps {
  onNavigate?: (view: string) => void;
}

export function CompanyAdmin({ onNavigate }: CompanyAdminProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const companyData = {
    name: "EXIM Global Trading Ltd",
    logo: "/api/placeholder/100/100",
    registrationNumber: "CIN-U51909DL2018PTC123456",
    industry: "Import-Export Trading",
    website: "www.eximglobal.com",
    email: "admin@eximglobal.com",
    phone: "+91-11-2345-6789",
    address: "Sector 18, Gurgaon, Haryana 122015, India",
    establishedDate: "2018-03-15",
    gstin: "07AABCE2207R1Z5",
    ieCode: "AABCE2207R",
    panNumber: "AABCE2207R",
    employees: 47,
    documentsCount: 1247,
    activeDeals: 23,
    monthlyRevenue: "$2.4M"
  };

  const employeeDirectory = [
    {
      id: "EMP001",
      name: "Rajesh Kumar",
      role: "Export Manager",
      department: "Operations",
      email: "rajesh@eximglobal.com",
      phone: "+91-9876543210",
      location: "Delhi",
      joinDate: "2020-01-15",
      status: "Active",
      tasksAssigned: 12,
      tasksCompleted: 8,
      performance: 85,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: "EMP002",
      name: "Sarah Chen",
      role: "Documentation Specialist",
      department: "Compliance",
      email: "sarah@eximglobal.com",
      phone: "+91-9876543211",
      location: "Mumbai",
      joinDate: "2019-08-22",
      status: "Active",
      tasksAssigned: 18,
      tasksCompleted: 16,
      performance: 92,
      avatar: "/api/placeholder/40/40"
    },
    {
      id: "EMP003",
      name: "Hans Mueller",
      role: "Quality Control Manager",
      department: "Quality",
      email: "hans@eximglobal.com",
      phone: "+91-9876543212",
      location: "Bangalore",
      joinDate: "2021-03-10",
      status: "Active",
      tasksAssigned: 8,
      tasksCompleted: 6,
      performance: 78,
      avatar: "/api/placeholder/40/40"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "document",
      action: "uploaded",
      item: "Export License - ABC Textiles",
      user: "Rajesh Kumar",
      timestamp: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      type: "task",
      action: "completed",
      item: "Quality Inspection Report",
      user: "Hans Mueller",
      timestamp: "4 hours ago",
      status: "success"
    },
    {
      id: 3,
      type: "deal",
      action: "updated",
      item: "Global Electronics Deal",
      user: "Sarah Chen",
      timestamp: "6 hours ago",
      status: "info"
    },
    {
      id: 4,
      type: "alert",
      action: "flagged",
      item: "Document expiring soon",
      user: "System",
      timestamp: "1 day ago",
      status: "warning"
    }
  ];

  const documentCategories = [
    { name: "Legal Documents", count: 156, trend: "+12%", color: "blue" },
    { name: "Financial Records", count: 289, trend: "+8%", color: "green" },
    { name: "Shipping Documents", count: 234, trend: "+15%", color: "purple" },
    { name: "Quality Certificates", count: 98, trend: "+5%", color: "orange" },
    { name: "Insurance Papers", count: 67, trend: "+3%", color: "red" },
    { name: "Customs Documents", count: 403, trend: "+22%", color: "cyan" }
  ];

  const aiInsights = [
    {
      type: "alert",
      title: "Document Compliance Alert",
      message: "12 export licenses are expiring within the next 30 days",
      severity: "high",
      action: "Review & Renew"
    },
    {
      type: "trend",
      title: "Performance Insight",
      message: "Document processing time has improved by 25% this month",
      severity: "positive",
      action: "Continue Current Process"
    },
    {
      type: "recommendation",
      title: "Optimization Suggestion",
      message: "Consider automating Bill of Lading generation for faster processing",
      severity: "medium",
      action: "Implement Automation"
    }
  ];

  const handleEmployeeAction = (empId: string, action: string) => {
    switch (action) {
      case 'view':
        alert(`Viewing profile for employee ${empId}`);
        break;
      case 'assign-task':
        alert(`Assigning task to employee ${empId}`);
        break;
      case 'edit':
        alert(`Editing employee ${empId}`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Admin Control Hub</h1>
          <p className="text-gray-600">Central management for all company operations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Company Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-3xl font-bold text-blue-600">{companyData.employees}</p>
                <p className="text-sm text-green-600">+3 this month</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents</p>
                <p className="text-3xl font-bold text-green-600">{companyData.documentsCount}</p>
                <p className="text-sm text-green-600">+127 this month</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-3xl font-bold text-purple-600">{companyData.activeDeals}</p>
                <p className="text-sm text-green-600">+5 this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-orange-600">{companyData.monthlyRevenue}</p>
                <p className="text-sm text-green-600">+18% from last month</p>
              </div>
              <Building2 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Company Overview' },
            { id: 'employees', name: 'Employee Directory' },
            { id: 'documents', name: 'Document Categories' },
            { id: 'activity', name: 'Recent Activity' },
            { id: 'insights', name: 'AI Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{companyData.name}</h3>
                  <p className="text-gray-600">{companyData.industry}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{companyData.website}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{companyData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{companyData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{companyData.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Legal Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Registration No:</span>
                    <p className="font-medium">{companyData.registrationNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">GSTIN:</span>
                    <p className="font-medium">{companyData.gstin}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">IEC Code:</span>
                    <p className="font-medium">{companyData.ieCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">PAN:</span>
                    <p className="font-medium">{companyData.panNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Categories Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.count} documents</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-green-600">
                        {category.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline" onClick={() => onNavigate?.('documents')}>
                <FileText className="w-4 h-4 mr-2" />
                Manage All Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'employees' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Employee Directory
              </span>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeDirectory.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.role} • {employee.department}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {employee.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {employee.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-sm">
                        <span className="text-gray-500">Tasks:</span>
                        <span className="font-medium ml-1">
                          {employee.tasksCompleted}/{employee.tasksAssigned}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Performance:</span>
                        <span className={`font-medium ml-1 ${
                          employee.performance >= 90 ? 'text-green-600' :
                          employee.performance >= 80 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {employee.performance}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEmployeeAction(employee.id, 'view')}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEmployeeAction(employee.id, 'assign-task')}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEmployeeAction(employee.id, 'edit')}>
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'activity' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 border-l-4 border-blue-200 bg-gray-50 rounded-r-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100 text-green-600' :
                    activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'document' && <FileText className="w-4 h-4" />}
                    {activity.type === 'task' && <Calendar className="w-4 h-4" />}
                    {activity.type === 'deal' && <TrendingUp className="w-4 h-4" />}
                    {activity.type === 'alert' && <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      <span className="capitalize">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-xs text-gray-500">by {activity.user} • {activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                AI-Powered Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    insight.severity === 'high' ? 'border-red-500 bg-red-50' :
                    insight.severity === 'positive' ? 'border-green-500 bg-green-50' :
                    'border-yellow-500 bg-yellow-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-700 mb-3">{insight.message}</p>
                        <Badge variant={
                          insight.severity === 'high' ? 'destructive' :
                          insight.severity === 'positive' ? 'default' : 'secondary'
                        }>
                          {insight.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
