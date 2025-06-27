
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
  TrendingUp
} from "lucide-react";

interface CompanyProfileProps {
  selectedId: string | null;
  onSelectCompany: (id: string) => void;
}

export function CompanyProfile({ selectedId, onSelectCompany }: CompanyProfileProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

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

  if (selectedCompany) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => onSelectCompany("")}>
            ← Back to Companies
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
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
                  <p className="font-medium">{selectedCompany.website}</p>
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
              <Card>
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
              <Card>
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
              <Card>
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
                  <Button size="sm">
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
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.designation}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{contact.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{contact.phone}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
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
                <CardTitle>Recent Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Interaction logs will be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals">
            <Card>
              <CardHeader>
                <CardTitle>Deal History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Deal information will be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Company documents will be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">AI-generated insights will be displayed here...</p>
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
        <Button>
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
