
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
  Target,
  Brain,
  Lightbulb,
  Zap,
  Save,
  X
} from "lucide-react";

type ViewType = 'dashboard' | 'companies' | 'deals' | 'interactions' | 'ai-insights' | 'create-deal' | 'reports' | 'notifications' | 'add-company' | 'deal-details' | 'interaction-details' | 'contacts' | 'documents' | 'tasks' | 'add-contact' | 'edit-contact' | 'add-task' | 'edit-task' | 'add-document' | 'edit-document' | 'bills' | 'company-admin' | 'add-employee' | 'edit-employee';

interface CompanyAdminProps {
  onNavigate: (view: ViewType) => void;
  onAddEmployee: () => void;
  onEditEmployee: (employeeId: string) => void;
}

export function CompanyAdmin({ onNavigate, onAddEmployee, onEditEmployee }: CompanyAdminProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  // Document Categories with enhanced functionality
  const [documentCategories, setDocumentCategories] = useState([
    { 
      id: "legal", 
      name: "Legal Documents", 
      icon: "⚖️", 
      count: 45,
      description: "Contracts, agreements, legal certificates",
      color: "blue",
      documents: [
        { id: "DOC001", name: "Export License Certificate.pdf", size: "2.3 MB", date: "2024-11-20", status: "Active", category: "Legal" },
        { id: "DOC002", name: "Trade Agreement Contract.pdf", size: "1.8 MB", date: "2024-11-18", status: "Active", category: "Legal" },
        { id: "DOC003", name: "Power of Attorney.pdf", size: "0.9 MB", date: "2024-11-15", status: "Active", category: "Legal" }
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
        { id: "DOC004", name: "Commercial Invoice Q3.pdf", size: "3.2 MB", date: "2024-11-19", status: "Active", category: "Financial" },
        { id: "DOC005", name: "Bank Statement Nov.pdf", size: "1.5 MB", date: "2024-11-17", status: "Active", category: "Financial" }
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
        { id: "DOC006", name: "Bill of Lading BL001.pdf", size: "2.1 MB", date: "2024-11-21", status: "Active", category: "Shipping" },
        { id: "DOC007", name: "Packing List PL-456.pdf", size: "1.2 MB", date: "2024-11-20", status: "Active", category: "Shipping" }
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
        { id: "DOC008", name: "ISO Certificate.pdf", size: "1.9 MB", date: "2024-11-16", status: "Active", category: "Quality" }
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
        { id: "DOC009", name: "Marine Insurance Policy.pdf", size: "2.7 MB", date: "2024-11-14", status: "Active", category: "Insurance" }
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
        { id: "DOC010", name: "Customs Declaration.pdf", size: "1.6 MB", date: "2024-11-22", status: "Active", category: "Customs" }
      ]
    }
  ]);

  // Employee Data with enhanced information
  const [employees, setEmployees] = useState([
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
      performance: 92,
      avatar: "/placeholder.svg"
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
      performance: 88,
      avatar: "/placeholder.svg"
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
      performance: 85,
      avatar: "/placeholder.svg"
    }
  ]);

  // AI Insights Data
  const aiInsights = {
    predictions: [
      {
        title: "Market Opportunity Detection",
        insight: "Based on recent trade patterns, there's a 85% likelihood of increased demand for textiles in European markets over the next quarter.",
        confidence: 85,
        category: "Market Analysis",
        impact: "High",
        recommendation: "Consider expanding textile export operations to Germany and France."
      },
      {
        title: "Risk Assessment Alert",
        insight: "Compliance risk detected for shipments to Region X due to new regulatory changes effective next month.",
        confidence: 92,
        category: "Compliance",
        impact: "Critical",
        recommendation: "Update documentation templates and notify relevant teams immediately."
      },
      {
        title: "Performance Optimization",
        insight: "Document processing time can be reduced by 40% by implementing automated workflows for routine approvals.",
        confidence: 78,
        category: "Process Improvement",
        impact: "Medium",
        recommendation: "Implement automated approval workflows for standard documents."
      }
    ],
    trends: [
      { metric: "Export Volume", trend: "+12%", period: "This Quarter" },
      { metric: "Document Processing Time", trend: "-8%", period: "This Month" },
      { metric: "Compliance Score", trend: "+15%", period: "This Quarter" },
      { metric: "Customer Satisfaction", trend: "+22%", period: "This Month" }
    ]
  };

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

  const handleDocumentAction = (docId: string, action: string) => {
    switch (action) {
      case 'view':
        alert(`Viewing document ${docId}`);
        break;
      case 'download':
        alert(`Downloading document ${docId}`);
        break;
      case 'edit':
        alert(`Editing document ${docId}`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this document?')) {
          // Remove document from categories
          setDocumentCategories(prev => 
            prev.map(category => ({
              ...category,
              documents: category.documents?.filter(doc => doc.id !== docId) || [],
              count: category.documents?.filter(doc => doc.id !== docId).length || 0
            }))
          );
          alert('Document deleted successfully');
        }
        break;
      default:
        break;
    }
  };

  const handleCategoryUpload = (categoryId: string) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    const fileName = prompt(`Upload new document to ${category?.name}:`);
    if (fileName) {
      const newDoc = {
        id: `DOC${Date.now()}`,
        name: fileName,
        size: "1.2 MB",
        date: new Date().toISOString().split('T')[0],
        status: "Active",
        category: category?.name || "Unknown"
      };
      
      setDocumentCategories(prev => 
        prev.map(cat => 
          cat.id === categoryId 
            ? { 
                ...cat, 
                documents: [...(cat.documents || []), newDoc],
                count: cat.count + 1
              }
            : cat
        )
      );
      alert('Document uploaded successfully');
    }
  };

  const filteredDocuments = documentCategories
    .filter(category => selectedCategory === "all" || category.id === selectedCategory)
    .flatMap(category => 
      category.documents?.map(doc => ({ ...doc, categoryColor: category.color })) || []
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

  const saveProfile = () => {
    setIsEditingProfile(false);
    alert('Company profile updated successfully!');
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
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
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
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              Company Profile
            </CardTitle>
            <div className="flex gap-2">
              {isEditingProfile ? (
                <>
                  <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={saveProfile} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={() => setIsEditingProfile(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {isEditingProfile ? (
            <div className="space-y-6">
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
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{companyData.name}</p>
                        <p className="text-sm text-gray-600">{companyData.registration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{companyData.website}</p>
                        <p className="text-sm text-gray-600">{companyData.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Established {companyData.established}</p>
                        <p className="text-sm text-gray-600">{companyData.employees} employees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Annual Turnover</p>
                        <p className="text-sm text-gray-600">{companyData.turnover}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{companyData.email}</p>
                        <p className="text-sm text-gray-600">Primary Email</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{companyData.phone}</p>
                        <p className="text-sm text-gray-600">Main Office</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Head Office</p>
                        <p className="text-sm text-gray-600">{companyData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About Company</h3>
                <p className="text-gray-700 leading-relaxed">{companyData.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    ),

    documents: (
      <div className="space-y-8">
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
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleCategoryUpload(category.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Browser */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-slate-50">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Document Browser
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
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
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium min-w-48"
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
                        <Badge variant="outline" className={`text-${doc.categoryColor}-600 border-${doc.categoryColor}-200`}>
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'view')}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'download')}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'edit')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'delete')}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No documents found</p>
                  <p className="text-gray-400">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    ),

    employees: (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
            <p className="text-gray-600">Manage your team members and their information</p>
          </div>
          <Button onClick={onAddEmployee} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Employee
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <Card key={employee.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
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
                  <Button size="sm" className="flex-1" onClick={() => onEditEmployee(employee.id)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),

    'ai-insights': (
      <div className="space-y-8">
        {/* AI Insights Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">AI-Powered Business Insights</h2>
              <p className="text-gray-600">Intelligent analysis and recommendations for your business</p>
            </div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiInsights.trends.map((trend, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-blue-50 shadow-lg border-0">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{trend.metric}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">{trend.trend}</p>
                <p className="text-sm text-gray-600">{trend.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Predictions & Recommendations */}
        <div className="space-y-6">
          {aiInsights.predictions.map((prediction, index) => (
            <Card key={index} className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    prediction.impact === 'Critical' ? 'bg-red-100' :
                    prediction.impact === 'High' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    {prediction.impact === 'Critical' ? (
                      <AlertTriangle className={`w-6 h-6 ${
                        prediction.impact === 'Critical' ? 'text-red-600' :
                        prediction.impact === 'High' ? 'text-orange-600' : 'text-blue-600'
                      }`} />
                    ) : (
                      <Lightbulb className={`w-6 h-6 ${
                        prediction.impact === 'Critical' ? 'text-red-600' :
                        prediction.impact === 'High' ? 'text-orange-600' : 'text-blue-600'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{prediction.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {prediction.category}
                        </Badge>
                        <Badge className={`${
                          prediction.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                          prediction.impact === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {prediction.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{prediction.insight}</p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">AI Recommendation:</p>
                      <p className="text-sm text-gray-700">{prediction.recommendation}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Confidence: {prediction.confidence}%
                        </span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${prediction.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
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
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200">
            {[
              { id: "overview", name: "Dashboard Overview", icon: BarChart3 },
              { id: "profile", name: "Company Profile", icon: Building2 },
              { id: "documents", name: "Document Management", icon: FileText },
              { id: "employees", name: "Employee Directory", icon: Users },
              { id: "ai-insights", name: "AI Insights", icon: Brain }
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
