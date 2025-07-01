
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CompanyIntakeForm } from "./CompanyIntakeForm";
import { CompanyTypeSelector } from "./CompanyTypeSelector";
import { CompanyDetailsView } from "./CompanyDetailsView";
import { 
  Building2, 
  Users, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Edit,
  Eye,
  Filter,
  Star,
  Building
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  type: "Buyer" | "Seller" | "Both";
  industry: string;
  country: string;
  city: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  contactPerson: string;
  contactDesignation: string;
  contactEmail: string;
  contactPhone: string;
  annualTurnover: string;
  employees: string;
  products: string;
  certifications: string;
  paymentTerms: string;
  creditLimit: string;
  status: "Active" | "Inactive" | "Pending";
  lastContact: string;
  createdDate: string;
  notes: string;
  registrationNumber: string;
  taxId: string;
  bankDetails: string;
  complianceCertifications: string;
  qualityStandards: string;
  tradeLicense: string;
  exportLicense?: string;
  importLicense?: string;
}

export function CompaniesManager() {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "COMP001",
      name: "ABC Textiles Ltd",
      industry: "Textiles",
      type: "Buyer",
      country: "India",
      city: "Mumbai",
      address: "123 Industrial Area, Mumbai, Maharashtra 400001",
      website: "www.abctextiles.com",
      email: "info@abctextiles.com",
      phone: "+91 22 1234 5678",
      contactPerson: "Rajesh Kumar",
      contactDesignation: "Procurement Manager",
      contactEmail: "rajesh@abctextiles.com",
      contactPhone: "+91 98765 43210",
      annualTurnover: "5000000",
      employees: "150",
      products: "Organic Cotton, Synthetic Fabrics, Textile Machinery",
      certifications: "ISO 9001, OEKO-TEX",
      paymentTerms: "LC 30 days",
      creditLimit: "100000",
      status: "Active",
      lastContact: "2024-11-25",
      createdDate: "2024-01-15",
      notes: "Reliable partner with consistent orders. Prefers organic materials.",
      registrationNumber: "CIN123456789",
      taxId: "GST123456789",
      bankDetails: "HDFC Bank, Mumbai Branch",
      complianceCertifications: "FIDR, BIS",
      qualityStandards: "ISO 9001:2015",
      tradeLicense: "TL/MUM/2024/001",
      importLicense: "IMP/2024/001"
    },
    {
      id: "COMP002",
      name: "Global Electronics Inc",
      industry: "Electronics",
      type: "Both",
      country: "USA",
      city: "San Francisco",
      address: "456 Tech Boulevard, San Francisco, CA 94107",
      website: "www.globalelectronics.com",
      email: "business@globalelectronics.com",
      phone: "+1 415 555 0123",
      contactPerson: "Sarah Chen",
      contactDesignation: "Supply Chain Manager",
      contactEmail: "sarah@globalelectronics.com",
      contactPhone: "+1 415 555 0124",
      annualTurnover: "25000000",
      employees: "500",
      products: "Semiconductors, Circuit Boards, Electronic Components",
      certifications: "ISO 14001, RoHS, CE",
      paymentTerms: "100% Advance",
      creditLimit: "500000",
      status: "Active",
      lastContact: "2024-11-24",
      createdDate: "2024-02-20",
      notes: "High-volume buyer with quarterly contracts. Tech-focused requirements.",
      registrationNumber: "EIN987654321",
      taxId: "TAX987654321",
      bankDetails: "Wells Fargo, San Francisco",
      complianceCertifications: "FCC, UL Listed",
      qualityStandards: "ISO 14001:2015",
      tradeLicense: "US/SF/2024/002",
      exportLicense: "EXP/2024/002",
      importLicense: "IMP/2024/002"
    }
  ]);

  const [currentView, setCurrentView] = useState<'list' | 'type-selector' | 'intake-form' | 'details'>('list');
  const [selectedCompanyType, setSelectedCompanyType] = useState<"Buyer" | "Seller" | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || company.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddCompany = () => {
    setCurrentView('type-selector');
    setEditingCompany(null);
  };

  const handleTypeSelected = (type: "Buyer" | "Seller") => {
    setSelectedCompanyType(type);
    setCurrentView('intake-form');
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setSelectedCompanyType(company.type === "Both" ? "Buyer" : company.type);
    setCurrentView('intake-form');
  };

  const handleSaveCompany = (companyData: Company) => {
    if (editingCompany) {
      setCompanies(prev => prev.map(c => c.id === companyData.id ? companyData : c));
    } else {
      const newCompany = {
        ...companyData,
        id: `COMP${String(companies.length + 1).padStart(3, '0')}`,
        createdDate: new Date().toISOString().split('T')[0],
        status: "Active" as const
      };
      setCompanies(prev => [...prev, newCompany]);
    }
    setCurrentView('list');
    setEditingCompany(null);
    setSelectedCompanyType(null);
  };

  const handleViewDetails = (company: Company) => {
    setEditingCompany(company);
    setCurrentView('details');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingCompany(null);
    setSelectedCompanyType(null);
  };

  if (currentView === 'type-selector') {
    return (
      <CompanyTypeSelector 
        onTypeSelected={handleTypeSelected}
        onCancel={handleCancel}
      />
    );
  }

  if (currentView === 'intake-form') {
    return (
      <CompanyIntakeForm 
        companyType={selectedCompanyType!}
        onSave={handleSaveCompany}
        onCancel={handleCancel}
        editingCompany={editingCompany}
      />
    );
  }

  if (currentView === 'details' && editingCompany) {
    return (
      <CompanyDetailsView 
        company={editingCompany}
        onEdit={() => handleEditCompany(editingCompany)}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Companies Management</h1>
        <Button onClick={handleAddCompany} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Company
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{companies.length}</p>
                <p className="text-sm text-gray-500">Total Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {companies.filter(c => c.type === 'Buyer' || c.type === 'Both').length}
                </p>
                <p className="text-sm text-gray-500">Buyers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {companies.filter(c => c.type === 'Seller' || c.type === 'Both').length}
                </p>
                <p className="text-sm text-gray-500">Sellers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {new Set(companies.map(c => c.country)).size}
                </p>
                <p className="text-sm text-gray-500">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search companies by name, industry, or country..."
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
              <option value="buyer">Buyers Only</option>
              <option value="seller">Sellers Only</option>
              <option value="both">Both</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-500">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{company.type}</Badge>
                  <Badge variant={company.status === 'Active' ? 'default' : 'destructive'}>
                    {company.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{company.city}, {company.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{company.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employees</p>
                  <p className="font-medium">{company.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Contact</p>
                  <p className="font-medium">{company.lastContact}</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-500 mb-2">Products/Services</p>
                <p className="text-sm font-medium line-clamp-2">{company.products}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(company)}>
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditCompany(company)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Annual Revenue</p>
                  <p className="font-semibold text-green-600">
                    ${parseInt(company.annualTurnover || '0').toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or add a new company.</p>
            <Button onClick={handleAddCompany}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Company
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
