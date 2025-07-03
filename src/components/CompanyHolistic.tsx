
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
import { supabase } from "@/integrations/supabase/client";
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
  Star,
  Search
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
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadCompanyData();
    loadActivities();
  }, [companyId]);

  const loadCompanyData = async () => {
    try {
      // Try to load from buyer_companies first
      const { data: buyerData, error: buyerError } = await supabase
        .from('buyer_companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (buyerData && !buyerError) {
        setCompanyData({
          id: buyerData.id,
          name: buyerData.company_name || 'Unknown Company',
          industry: buyerData.business_category || 'Not specified',
          type: 'Buyer',
          address: buyerData.business_address || '',
          city: buyerData.city || '',
          country: buyerData.country || '',
          email: buyerData.email || '',
          phone: buyerData.phone || '',
          website: buyerData.website || '',
          status: 'Active',
          establishedDate: buyerData.incorporation_date || '',
          employees: buyerData.employee_count || '',
          annualRevenue: buyerData.annual_turnover || '',
          rating: 4.5,
          lastActivity: new Date().toISOString().split('T')[0]
        });
        return;
      }

      // Try seller_companies if not found in buyer_companies
      const { data: sellerData, error: sellerError } = await supabase
        .from('seller_companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (sellerData && !sellerError) {
        setCompanyData({
          id: sellerData.id,
          name: sellerData.company_name || 'Unknown Company',
          industry: sellerData.business_category || 'Not specified',
          type: 'Seller',
          address: sellerData.business_address || '',
          city: sellerData.city || '',
          country: sellerData.country || '',
          email: sellerData.email || '',
          phone: sellerData.phone || '',
          website: sellerData.website || '',
          status: 'Active',
          establishedDate: sellerData.incorporation_date || '',
          employees: sellerData.employee_count || '',
          annualRevenue: sellerData.annual_turnover || '',
          rating: 4.5,
          lastActivity: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error loading company data:', error);
      toast({
        title: "Error",
        description: "Failed to load company data",
        variant: "destructive",
      });
    }
  };

  const loadActivities = async () => {
    try {
      // Load tasks
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('company', companyId);

      // Load deals
      const { data: dealsData } = await supabase
        .from('deals')
        .select('*')
        .eq('company', companyId);

      // Load contacts
      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .eq('company', companyId);

      // Load documents
      const { data: documentsData } = await supabase
        .from('documents')
        .select('*')
        .eq('company', companyId);

      // Load shipments
      const { data: shipmentsData } = await supabase
        .from('shipments')
        .select('*');

      setActivities({
        tasks: tasksData || [],
        deals: dealsData || [],
        contacts: contactsData || [],
        documents: documentsData || [],
        logistics: shipmentsData || [],
        compliance: [] // Mock compliance data for now
      });
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': case 'completed': case 'verified': return 'bg-green-100 text-green-800';
      case 'inactive': case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'in transit': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredTasks = activities.tasks.filter(task =>
    task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignee?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeals = activities.deals.filter(deal =>
    deal.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.buyer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = activities.contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Truck className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{activities.logistics.length}</p>
                <p className="text-sm text-gray-500">Shipments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search across all data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deals">Deals ({activities.deals.length})</TabsTrigger>
          <TabsTrigger value="tasks">Tasks ({activities.tasks.length})</TabsTrigger>
          <TabsTrigger value="contacts">Contacts ({activities.contacts.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({activities.documents.length})</TabsTrigger>
          <TabsTrigger value="logistics">Logistics ({activities.logistics.length})</TabsTrigger>
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
                    <p className="font-medium">{companyData.establishedDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employees</p>
                    <p className="font-medium">{companyData.employees || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Revenue</p>
                    <p className="font-medium">{companyData.annualRevenue || 'N/A'}</p>
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
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{companyData.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{companyData.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{companyData.website || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Handshake className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Active Deals</span>
                    </div>
                    <Badge variant="secondary">{activities.deals.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Pending Tasks</span>
                    </div>
                    <Badge variant="secondary">{activities.tasks.filter(t => t.status !== 'completed').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Active Shipments</span>
                    </div>
                    <Badge variant="secondary">{activities.logistics.filter(s => s.status === 'pending' || s.status === 'in_transit').length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Company Deals</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>
          <div className="space-y-4">
            {filteredDeals.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Handshake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Deals Found</h3>
                  <p className="text-gray-600">No deals are associated with this company yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredDeals.map((deal) => (
                <Card key={deal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{deal.product || 'Unnamed Deal'}</h4>
                        <p className="text-gray-600">Deal ID: {deal.id}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500">Value: ${deal.value?.toLocaleString() || '0'}</span>
                          <span className="text-sm text-gray-500">Expected: {deal.expectedClosure || 'TBD'}</span>
                          <span className="text-sm text-gray-500">Probability: {deal.probability || 0}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(deal.stage || 'pending')}>{deal.stage || 'Pending'}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Found</h3>
                  <p className="text-gray-600">No tasks are associated with this company yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{task.title || 'Unnamed Task'}</h4>
                        <p className="text-gray-600">Assigned to: {task.assignee || 'Unassigned'}</p>
                        <p className="text-sm text-gray-500">Due: {task.dueDate || 'No due date'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getPriorityColor(task.priority)}>{task.priority || 'Medium'}</Badge>
                        <Badge className={getStatusColor(task.status || 'pending')}>{task.status || 'Pending'}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Company Contacts</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Contact
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContacts.length === 0 ? (
              <Card className="col-span-2">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Contacts Found</h3>
                  <p className="text-gray-600">No contacts are associated with this company yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredContacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{contact.name || 'Unnamed Contact'}</h4>
                        <p className="text-gray-600">{contact.designation || contact.position || 'No title'}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{contact.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{contact.phone || 'No phone'}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
            {activities.documents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
                  <p className="text-gray-600">No documents are associated with this company yet.</p>
                </CardContent>
              </Card>
            ) : (
              activities.documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-semibold">{doc.name}</h4>
                          <p className="text-gray-600">Type: {doc.type || 'Unknown'}</p>
                          <p className="text-sm text-gray-500">Uploaded: {doc.upload_date || 'Unknown date'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(doc.status || 'active')}>{doc.status || 'Active'}</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
            {activities.logistics.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Shipments Found</h3>
                  <p className="text-gray-600">No shipments are associated with this company yet.</p>
                </CardContent>
              </Card>
            ) : (
              activities.logistics.map((shipment) => (
                <Card key={shipment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Truck className="w-8 h-8 text-green-600" />
                        <div>
                          <h4 className="font-semibold">{shipment.cargo || 'Unknown Cargo'}</h4>
                          <p className="text-gray-600">Tracking: {shipment.tracking_number}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{shipment.origin} → {shipment.destination}</span>
                          </div>
                          <p className="text-sm text-gray-500">ETA: {shipment.estimated_arrival || 'TBD'}</p>
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
              ))
            )}
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
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance Tracking</h3>
              <p className="text-gray-600">Compliance tracking will be implemented based on company requirements.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
