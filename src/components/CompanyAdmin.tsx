
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
  Activity,
  Settings,
  Upload,
  Download,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";

export function CompanyAdmin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Company Profile Data
  const [companyData, setCompanyData] = useState({
    name: "Global Trade Solutions Ltd",
    logo: "/placeholder.svg",
    registration: "CIN: L74999DL2018PTC334567",
    industry: "Export-Import & International Trade",
    website: "www.globaltrade.com",
    email: "info@globaltrade.com",
    phone: "+91-11-4567-8901",
    address: "Tower A, Business Park, New Delhi - 110001, India",
    established: "2018",
    employees: "150-200",
    turnover: "$50M - $100M",
    description: "Leading EXIM consulting and trade facilitation company specializing in international business development, export documentation, and compliance management."
  });

  // Document Categories with actual functionality
  const [documentCategories, setDocumentCategories] = useState([
    { 
      id: "legal", 
      name: "Legal Documents", 
      icon: "⚖️", 
      count: 45,
      description: "Contracts, agreements, legal certificates",
      color: "blue",
      documents: [
        { id: "DOC001", name: "Export License Certificate.pdf", size: "2.3 MB", date: "2024-11-20" },
        { id: "DOC002", name: "Trade Agreement Contract.pdf", size: "1.8 MB", date: "2024-11-18" },
        { id: "DOC003", name: "Power of Attorney.pdf", size: "0.9 MB", date: "2024-11-15" }
      ]
    },
    { 
      id: "financial", 
      name: "Financial Records", 
      icon: "💰", 
      count: 32,
      description: "Invoices, receipts, financial statements",
      color: "green",
      documents: [
        { id: "DOC004", name: "Commercial Invoice Q3.pdf", size: "3.2 MB", date: "2024-11-19" },
        { id: "DOC005", name: "Bank Statement Nov.pdf", size: "1.5 MB", date: "2024-11-17" }
      ]
    },
    { 
      id: "shipping", 
      name: "Shipping & Logistics", 
      icon: "🚢", 
      count: 28,
      description: "BOL, packing lists, customs documents",
      color: "purple",
      documents: [
        { id: "DOC006", name: "Bill of Lading BL001.pdf", size: "2.1 MB", date: "2024-11-21" },
        { id: "DOC007", name: "Packing List PL-456.pdf", size: "1.2 MB", date: "2024-11-20" }
      ]
    },
    { 
      id: "quality", 
      name: "Quality & Compliance", 
      icon: "✅", 
      count: 18,
      description: "Certificates, inspection reports, standards",
      color: "orange",
      documents: [
        { id: "DOC008", name: "ISO Certificate.pdf", size: "1.9 MB", date: "2024-11-16" }
      ]
    },
    { 
      id: "insurance", 
      name: "Insurance", 
      icon: "🛡️", 
      count: 12,
      description: "Insurance policies, claims, coverage",
      color: "red",
      documents: [
        { id: "DOC009", name: "Marine Insurance Policy.pdf", size: "2.7 MB", date: "2024-11-14" }
      ]
    },
    { 
      id: "customs", 
      name: "Customs & Trade", 
      icon: "🌍", 
      count: 25,
      description: "Customs declarations, trade certificates",
      color: "cyan",
      documents: [
        { id: "DOC010", name: "Customs Declaration.pdf", size: "1.6 MB", date: "2024-11-22" }
      ]
    }
  ]);

  // Employee Data
  const employees = [
    {
      id: "EMP001",
      name: "Rajesh Kumar",
      role: "Export Manager",
      department: "International Trade",
      email: "rajesh.kumar@globaltrade.com",
      phone: "+91-98765-43210",
      location: "New Delhi",
      joinDate: "2019-03-15",
      status: "Active",
      projects: 12,
      tasksCompleted: 89,
      performance: 92
    },
    {
      id: "EMP002", 
      name: "Sarah Chen",
      role: "Documentation Specialist", 
      department: "Compliance",
      email: "sarah.chen@globaltrade.com",
      phone: "+91-98765-43211",
      location: "Mumbai",
      joinDate: "2020-07-20",
      status: "Active",
      projects: 8,
      tasksCompleted: 76,
      performance: 88
    },
    {
      id: "EMP003",
      name: "Hans Mueller", 
      role: "Quality Analyst",
      department: "Quality Assurance",
      email: "hans.mueller@globaltrade.com", 
      phone: "+91-98765-43212",
      location: "Bangalore",
      joinDate: "2021-01-10",
      status: "Active",
      projects: 6,
      tasksCompleted: 54,
      performance: 85
    }
  ];

  // Activity Log
  const recentActivities = [
    {
      id: "ACT001",
      type: "document_upload",
      user: "Sarah Chen",
      action: "uploaded new document",
      target: "Export License Certificate.pdf",
      timestamp: "2024-11-23T10:30:00Z",
      category: "legal"
    },
    {
      id: "ACT002", 
      type: "task_completion",
      user: "Rajesh Kumar",
      action: "completed task",
      target: "Market Research - Europe",
      timestamp: "2024-11-23T09:15:00Z",
      category: "task"
    },
    {
      id: "ACT003",
      type: "deal_created", 
      user: "Hans Mueller",
      action: "created new deal",
      target: "ABC Textiles Export Deal",
      timestamp: "2024-11-23T08:45:00Z",
      category: "deal"
    }
  ];

  const handleDocumentCategoryAction = (categoryId: string, action: string) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    
    switch (action) {
      case 'view':
        alert(`Viewing ${category?.name} category with ${category?.count} documents`);
        break;
      case 'upload':
        alert(`Upload new document to ${category?.name} category`);
        // Here you would integrate with the document uploader
        break;
      case 'manage':
        alert(`Managing ${category?.name} category settings`);
        break;
      default:
        break;
    }
  };

  const filteredDocuments = documentCategories
    .filter(category => selectedCategory === "all" || category.id === selectedCategory)
    .flatMap(category => 
      category.documents?.map(doc => ({ ...doc, category: category.name, categoryId: category.id })) || []
    )
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const dashboardStats = {
    totalDocuments: documentCategories.reduce((sum, cat) => sum + cat.count, 0),
    totalEmployees: employees.length,
    activeProjects: employees.reduce((sum, emp) => sum + emp.projects, 0),
    completionRate: Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length)
  };

  const tabContent = {
    overview: (
      <div className="space-y-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              label: "Total Documents", 
              value: dashboardStats.totalDocuments, 
              icon: FileText, 
              color: "blue",
              change: "+12%"
            },
            { 
              label: "Active Employees", 
              value: dashboardStats.totalEmployees, 
              icon: Users, 
              color: "green",
              change: "+5%"
            },
            { 
              label: "Active Projects", 
              value: dashboardStats.activeProjects, 
              icon: Target, 
              color: "purple",
              change: "+18%"
            },
            { 
              label: "Avg Performance", 
              value: `${dashboardStats.completionRate}%`, 
              icon: TrendingUp, 
              color: "orange",
              change: "+3%"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm font-medium text-${stat.color}-600 mt-1`}>{stat.change} this month</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      <span className="text-blue-600">{activity.user}</span> {activity.action} 
                      <span className="font-semibold"> {activity.target}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {activity.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    ),

    profile: (
      <Card className="bg-white shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-blue-600" />
            Company Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                <Input 
                  value={companyData.name}
                  onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Registration Number</label>
                <Input 
                  value={companyData.registration}
                  onChange={(e) => setCompanyData({...companyData, registration: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Industry</label>
                <Input 
                  value={companyData.industry}
                  onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                <Input 
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <Input 
                  value={companyData.email}
                  onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <Input 
                  value={companyData.phone}
                  onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Established</label>
                <Input 
                  value={companyData.established}
                  onChange={(e) => setCompanyData({...companyData, established: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Annual Turnover</label>
                <Input 
                  value={companyData.turnover}
                  onChange={(e) => setCompanyData({...companyData, turnover: e.target.value})}
                  className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Company Address</label>
            <Textarea 
              value={companyData.address}
              onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
              rows={3}
              className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Company Description</label>
            <Textarea 
              value={companyData.description}
              onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
              rows={4}
              className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    ),

    documents: (
      <div className="space-y-6">
        {/* Document Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentCategories.map((category) => (
            <Card key={category.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{category.count}</p>
                    <p className="text-xs text-gray-500">documents</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDocumentCategoryAction(category.id, 'view')}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleDocumentCategoryAction(category.id, 'upload')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDocumentCategoryAction(category.id, 'manage')}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Search and Filter */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Document Browser
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium"
              >
                <option value="all">All Categories</option>
                {documentCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Document List */}
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Category: {doc.category}</span>
                        <span>Size: {doc.size}</span>
                        <span>Date: {doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    ),

    employees: (
      <Card className="bg-white shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            Employee Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <Card key={employee.id} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {employee.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{employee.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{employee.department}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <p className="font-bold text-blue-600">{employee.projects}</p>
                        <p className="text-gray-600">Projects</p>
                      </div>
                      <div>
                        <p className="font-bold text-green-600">{employee.tasksCompleted}</p>
                        <p className="text-gray-600">Tasks</p>
                      </div>
                      <div>
                        <p className="font-bold text-purple-600">{employee.performance}%</p>
                        <p className="text-gray-600">Performance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Company Administration
              </h1>
              <p className="text-lg text-gray-600">Central hub for company management and operations</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            {[
              { id: "overview", name: "Dashboard Overview", icon: BarChart3 },
              { id: "profile", name: "Company Profile", icon: Building2 },
              { id: "documents", name: "Document Categories", icon: FileText },
              { id: "employees", name: "Employee Directory", icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {tabContent[activeTab as keyof typeof tabContent]}
      </div>
    </div>
  );
}
