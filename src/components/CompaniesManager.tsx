
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Building,
  Search,
  Plus,
  Eye,
  Edit,
  MapPin,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone
} from "lucide-react";

interface CompaniesManagerProps {
  onSelectCompany: (companyId: string) => void;
}

export function CompaniesManager({ onSelectCompany }: CompaniesManagerProps) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      // Load buyer companies
      const { data: buyerData, error: buyerError } = await supabase
        .from('buyer_companies')
        .select('*');

      // Load seller companies
      const { data: sellerData, error: sellerError } = await supabase
        .from('seller_companies')
        .select('*');

      if (buyerError) console.error('Error loading buyer companies:', buyerError);
      if (sellerError) console.error('Error loading seller companies:', sellerError);

      const allCompanies = [
        ...(buyerData || []).map(company => ({
          ...company,
          type: 'Buyer',
          name: company.company_name
        })),
        ...(sellerData || []).map(company => ({
          ...company,
          type: 'Seller',
          name: company.company_name
        }))
      ];

      setCompanies(allCompanies);
    } catch (error) {
      console.error('Error loading companies:', error);
      toast({
        title: "Error",
        description: "Failed to load companies",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.business_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.country?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || company.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleViewCompany = (companyId: string) => {
    onSelectCompany(companyId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies Management</h1>
          <p className="text-gray-600">Manage your business relationships and company profiles</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Company
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
          className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Companies</option>
          <option value="buyer">Buyers</option>
          <option value="seller">Sellers</option>
        </select>
      </div>

      {/* Companies Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading companies...</p>
          </div>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Companies Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' 
                ? "No companies match your current filters." 
                : "Start by adding your first company to manage business relationships."}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add First Company
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                        {company.name || 'Unnamed Company'}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {company.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>{company.business_category || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{company.city ? `${company.city}, ${company.country}` : 'Location not specified'}</span>
                  </div>
                  {company.contact_person_name && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{company.contact_person_name}</span>
                    </div>
                  )}
                  {company.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="line-clamp-1">{company.email}</span>
                    </div>
                  )}
                  {company.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{company.phone}</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="line-clamp-1">{company.website}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button
                    onClick={() => handleViewCompany(company.id)}
                    className="flex-1"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{companies.length}</p>
                <p className="text-sm text-gray-500">Total Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{companies.filter(c => c.type === 'Buyer').length}</p>
                <p className="text-sm text-gray-500">Buyers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{companies.filter(c => c.type === 'Seller').length}</p>
                <p className="text-sm text-gray-500">Sellers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{new Set(companies.map(c => c.country).filter(Boolean)).size}</p>
                <p className="text-sm text-gray-500">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
