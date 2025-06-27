
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Plus,
  Search,
  Filter,
  Edit,
  Star,
  Users,
  FileText,
  TrendingUp,
  Eye,
  Download
} from "lucide-react";

interface CompanyProfileProps {
  selectedId: string | null;
  onSelectCompany: (id: string) => void;
}

export function CompanyProfile({ selectedId, onSelectCompany }: CompanyProfileProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const companies = [
    {
      id: "1",
      name: "ABC Textiles Ltd",
      type: "Buyer",
      sector: "Textiles",
      country: "India",
      status: "Approved",
      rating: 4.5,
      website: "www.abctextiles.com",
      gst: "29ABCDE1234F1Z5",
      onboardingStatus: "Approved",
      contacts: 5,
      interactions: 12,
      deals: 3
    },
    {
      id: "2", 
      name: "Global Electronics Inc",
      type: "Seller",
      sector: "Electronics",
      country: "USA",
      status: "In-Progress", 
      rating: 4.2,
      website: "www.globalelectronics.com",
      gst: "US123456789",
      onboardingStatus: "In-Progress",
      contacts: 3,
      interactions: 8,
      deals: 1
    },
    {
      id: "3",
      name: "Indo-German Motors",
      type: "Both",
      sector: "Automotive",
      country: "Germany",
      status: "Approved",
      rating: 4.8,
      website: "www.indogermanmotors.de",
      gst: "DE987654321",
      onboardingStatus: "Approved",
      contacts: 7,
      interactions: 15,
      deals: 5
    }
  ];

  const selectedCompany = companies.find(c => c.id === selectedId);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || company.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddCompany = () => {
    setIsAddingCompany(true);
    alert('Add Company form would open here. This would include fields for company details, contacts, and onboarding status.');
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    alert('Edit Profile form would open here with pre-filled company information.');
  };

  const handleAddContact = () => {
    alert('Add Contact form would open here with fields for name, designation, email, phone, etc.');
  };

  const handleEditContact = () => {
    alert('Edit Contact form would open here with pre-filled contact information.');
  };

  const handleViewWebsite = (website: string) => {
    window.open(`https://${website}`, '_blank');
  };

  if (selectedCompany) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => onSelectCompany("")}>
            ← Back to Companies
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleViewWebsite(selectedCompany.website)}>
              <Eye className="w-4 h-4 mr-2" />
              View Website
            </Button>
            <Button onClick={handleEditProfile}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedCompany.type === 'Buyer' ? 'default' : 'secondary'}>
                      {selectedCompany.type}
                    </Badge>
                    <Badge variant="outline">{selectedCompany.sector}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{selectedCompany.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge 
                variant={selectedCompany.status === 'Approved' ? 'default' : 'secondary'}
                className="h-8"
              >
                {selectedCompany.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <button 
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => handleViewWebsite(selectedCompany.website)}
                  >
                    {selectedCompany.website}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{selectedCompany.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">GST/VAT</p>
                  <p className="font-medium">{selectedCompany.gst}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contacts">Contact People</TabsTrigger>
            <TabsTrigger value="interactions">Interaction Logs</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{selectedCompany.contacts}</p>
                      <p className="text-sm text-gray-500">Contacts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{selectedCompany.interactions}</p>
                      <p className="text-sm text-gray-500">Interactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{selectedCompany.deals}</p>
                      <p className="text-sm text-gray-500">Active Deals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Contact People
                  <Button size="sm" onClick={handleAddContact}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Rajesh Kumar", designation: "Procurement Manager", email: "rajesh@abctextiles.com", phone: "+91 98765 43210" },
                    { name: "Priya Singh", designation: "Export Manager", email: "priya@abctextiles.com", phone: "+91 98765 43211" }
                  ].map((contact, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.designation}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <a href={`tel:${contact.phone}`} className="text-sm text-blue-600 hover:underline">
                                {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleEditContact}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Interactions
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Log Interaction
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Phone Call with Rajesh Kumar</h4>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Discussed organic cotton requirements. Client interested in 500MT monthly supply.
                    </p>
                    <Badge variant="default">Hot Lead</Badge>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Email Follow-up</h4>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Sent quality certificates and pricing details as requested.
                    </p>
                    <Badge variant="secondary">Follow-up</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Deal History
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Deal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Organic Cotton Supply</h4>
                      <span className="text-lg font-bold text-green-600">$45,000</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">500 MT monthly supply contract</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="default">Negotiation</Badge>
                      <span className="text-sm text-gray-500">Expected: Dec 30, 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Documents
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium">Company Registration Certificate</p>
                        <p className="text-sm text-gray-500">Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium">GST Certificate</p>
                        <p className="text-sm text-gray-500">Uploaded 1 week ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights for {selectedCompany.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Opportunity Score: 85/100</h4>
                    <p className="text-sm text-blue-800">
                      High potential buyer with consistent inquiry patterns. Recommend prioritizing this client for personalized service.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Best Contact Time</h4>
                    <p className="text-sm text-green-800">
                      Historical data shows 40% higher response rate when contacted between 10-11 AM IST on weekdays.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Next Action</h4>
                    <p className="text-sm text-yellow-800">
                      Follow up on pending quotation within 24 hours. Client typically responds within 2-3 business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Company Profiles</h1>
        <Button onClick={handleAddCompany}>
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="buyer">Buyers</option>
              <option value="seller">Sellers</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card 
                key={company.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onSelectCompany(company.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.sector}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={company.type === 'Buyer' ? 'default' : 'secondary'}>
                      {company.type}
                    </Badge>
                    <Badge variant="outline">{company.country}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{company.contacts} contacts</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{company.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
