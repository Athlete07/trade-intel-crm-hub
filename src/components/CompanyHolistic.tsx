
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Building,
  Users,
  Handshake,
  FileText,
  CheckSquare,
  Truck,
  Shield,
  TrendingUp,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Plus,
  Eye,
  Activity,
  BarChart3,
  AlertTriangle,
  Clock,
  Target,
  Star
} from "lucide-react";

interface CompanyHolisticProps {
  companyId: string;
  onBack: () => void;
}

interface CompanyData {
  id: string;
  name: string;
  industry: string;
  type: "Buyer" | "Seller" | "Both";
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  status: "Active" | "Inactive";
  establishedDate: string;
  employees: string;
  annualRevenue: string;
  rating: number;
  lastActivity: string;
}

interface ActivityData {
  tasks: any[];
  deals: any[];
  contacts: any[];
  documents: any[];
  logistics: any[];
  compliance: any[];
}

export function CompanyHolistic({ companyId, onBack }: CompanyHolisticProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [activities, setActivities] = useState<ActivityData>({
    tasks: [],
    deals: [],
    contacts: [],
    documents: [],
    logistics: [],
    compliance: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data - in production, this would fetch from your database
    const mockCompanyData: CompanyData = {
      id: companyId,
      name: "Global Tech Solutions Ltd",
      industry: "Technology",
      type: "Both",
      address: "123 Business District",
      city: "Mumbai",
      country: "India",
      email: "info@globaltech.com",
      phone: "+91 22 1234 5678",
      website: "www.globaltech.com",
      status: "Active",
      establishedDate: "2015-03-15",
      employees: "500-1000",
      annualRevenue: "$50M - $100M",
      rating: 4.5,
      lastActivity: "2024-12-01"
    };

    const mockActivities: ActivityData = {
      tasks: [
        {
          id: "T001",
          title: "Finalize Product Specifications",
          status: "In Progress",
          assignee: "John Doe",
          dueDate: "2024-12-15",
          priority: "High"
        },
        {
          id: "T002",
          title: "Quality Inspection Schedule",
          status: "Pending",
          assignee: "Jane Smith",
          dueDate: "2024-12-20",
          priority: "Medium"
        }
      ],
      deals: [
        {
          id: "D001",
          product: "Industrial Machinery",
          value: 2500000,
          stage: "Negotiation",
          expectedClosure: "2024-12-30",
          probability: 75
        },
        {
          id: "D002",
          product: "Software Licenses",
          value: 450000,
          stage: "Proposal",
          expectedClosure: "2025-01-15",
          probability: 60
        }
      ],
      contacts: [
        {
          id: "C001",
          name: "Rajesh Kumar",
          designation: "CTO",
          email: "rajesh@globaltech.com",
          phone: "+91 98765 43210",
          lastContact: "2024-11-28"
        },
        {
          id: "C002",
          name: "Priya Sharma",
          designation: "Procurement Head",
          email: "priya@globaltech.com",
          phone: "+91 98765 43211",
          lastContact: "2024-11-25"
        }
      ],
      documents: [
        {
          id: "DOC001",
          name: "Company Registration Certificate",
          type: "Legal",
          uploadDate: "2024-11-15",
          status: "Verified"
        },
        {
          id: "DOC002",
          name: "ISO 9001 Certificate",
          type: "Compliance",
          uploadDate: "2024-11-10",
          status: "Active"
        }
      ],
      logistics: [
        {
          id: "L001",
          shipmentId: "SH001",
          product: "Industrial Equipment",
          origin: "Mumbai, India",
          destination: "Dubai, UAE",
          status: "In Transit",
          eta: "2024-12-10"
        }
      ],
      compliance: [
        {
          id: "COMP001",
          title: "Export License",
          status: "Active",
          expiryDate: "2025-06-30",
          authority: "DGFT India"
        },
        {
          id: "COMP002",
          title: "ISO 14001 Environmental",
          status: "Renewal Due",
          expiryDate: "2024-12-31",
          authority: "ISO Certification Body"
        }
      ]
    };

    setCompanyData(mockCompanyData);
    setActivities(mockActivities);
    setIsLoading(false);
  }, [companyId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'in transit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="text-center py-12">
        <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Company Not Found</h3>
        <p className="text-gray-600 mb-4">The requested company could not be found.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{companyData.name}</h1>
            <p className="text-gray-600">{companyData.industry} • {companyData.city}, {companyData.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">{companyData.type}</Badge>
          <Badge variant={companyData.status === 'Active' ? 'default' : 'destructive'}>
            {companyData.status}
          </Badge>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Company
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Handshake className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activities.deals.length}</p>
                <p className="text-sm text-gray-500">Active Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activities.tasks.length}</p>
                <p className="text-sm text-gray-500">Open Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{activities.contacts.length}</p>
                <p className="text-sm text-gray-500">Key Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{activities.documents.length}</p>
                <p className="text-sm text-gray-500">Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{activities.compliance.length}</p>
                <p className="text-sm text-gray-500">Compliance Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="logistics">Logistics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium">{companyData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{companyData.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Established</p>
                    <p className="font-medium">{companyData.establishedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employees</p>
                    <p className="font-medium">{companyData.employees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Revenue</p>
                    <p className="font-medium">{companyData.annualRevenue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(companyData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{companyData.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Handshake className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New deal created</p>
                      <p className="text-xs text-gray-500">Industrial Machinery - $2.5M</p>
                    </div>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Task completed</p>
                      <p className="text-xs text-gray-500">Document verification</p>
                    </div>
                    <span className="text-xs text-gray-500">3 days ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-4 h-4 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New contact added</p>
                      <p className="text-xs text-gray-500">Rajesh Kumar - CTO</p>
                    </div>
                    <span className="text-xs text-gray-500">5 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Deals</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>
          <div className="space-y-4">
            {activities.deals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{deal.product}</h4>
                      <p className="text-gray-600">Deal ID: {deal.id}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">Value: ${deal.value.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">Expected: {deal.expectedClosure}</span>
                        <span className="text-sm text-gray-500">Probability: {deal.probability}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(deal.stage)}>{deal.stage}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Company Tasks</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
          <div className="space-y-4">
            {activities.tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-gray-600">Assigned to: {task.assignee}</p>
                      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Key Contacts</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Contact
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.contacts.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{contact.name}</h4>
                      <p className="text-gray-600">{contact.designation}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Last contact: {contact.lastContact}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Company Documents</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
          <div className="space-y-4">
            {activities.documents.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{doc.name}</h4>
                        <p className="text-gray-600">Type: {doc.type}</p>
                        <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Logistics & Shipments</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Shipment
            </Button>
          </div>
          <div className="space-y-4">
            {activities.logistics.map((shipment) => (
              <Card key={shipment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Truck className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold">{shipment.product}</h4>
                        <p className="text-gray-600">Shipment ID: {shipment.shipmentId}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{shipment.origin} → {shipment.destination}</span>
                        </div>
                        <p className="text-sm text-gray-500">ETA: {shipment.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(shipment.status)}>{shipment.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Compliance & Certifications</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Compliance Item
            </Button>
          </div>
          <div className="space-y-4">
            {activities.compliance.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Shield className="w-8 h-8 text-red-600" />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-gray-600">Authority: {item.authority}</p>
                        <p className="text-sm text-gray-500">Expires: {item.expiryDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
