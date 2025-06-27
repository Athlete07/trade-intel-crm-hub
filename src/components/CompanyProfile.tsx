
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddCompanyForm } from "./AddCompanyForm";
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
  Star
} from "lucide-react";

interface CompanyProfileProps {
  selectedId: string | null;
  onSelectCompany: (id: string) => void;
}

export function CompanyProfile({ selectedId, onSelectCompany }: CompanyProfileProps) {
  const [companies, setCompanies] = useState([
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
      notes: "Reliable partner with consistent orders. Prefers organic materials."
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
      notes: "High-volume buyer with quarterly contracts. Tech-focused requirements."
    },
    {
      id: "COMP003",
      name: "Indo-German Motors",
      industry: "Automotive",
      type: "Seller",
      country: "Germany", 
      city: "Stuttgart",
      address: "789 Automotive Street, Stuttgart, Germany 70173",
      website: "www.indogermanmotors.de",
      email: "export@indogermanmotors.de",
      phone: "+49 711 123 4567",
      contactPerson: "Hans Mueller",
      contactDesignation: "Export Manager",
      contactEmail: "hans@indogermanmotors.de",
      contactPhone: "+49 711 123 4568",
      annualTurnover: "15000000",
      employees: "300",
      products: "Precision Auto Parts, Engine Components, Automotive Tools",
      certifications: "ISO/TS 16949, ISO 9001",
      paymentTerms: "50% Advance, 50% on delivery",
      creditLimit: "200000",
      status: "Active",
      lastContact: "2024-11-23",
      createdDate: "2024-03-10",
      notes: "German engineering quality. Strict on delivery timelines and specifications."
    }
  ]);

  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit' | 'details'>('list');
  const [editingCompany, setEditingCompany] = useState<any>(null);
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
    setCurrentView('add');
    setEditingCompany(null);
  };

  const handleEditCompany = (company: any) => {
    setEditingCompany(company);
    setCurrentView('edit');
  };

  const handleSaveCompany = (companyData: any) => {
    if (editingCompany) {
      // Update existing company
      setCompanies(prev => prev.map(c => c.id === companyData.id ? companyData : c));
      alert('Company updated successfully!');
    } else {
      // Add new company
      setCompanies(prev => [...prev, companyData]);
      alert('Company added successfully!');
    }
    setCurrentView('list');
    setEditingCompany(null);
  };

  const handleViewDetails = (company: any) => {
    setEditingCompany(company);
    setCurrentView('details');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingCompany(null);
  };

  if (currentView === 'add' || currentView === 'edit') {
    return (
      <AddCompanyForm 
        onSave={handleSaveCompany}
        onCancel={handleCancel}
        editingCompany={editingCompany}
      />
    );
  }

  if (currentView === 'details' && editingCompany) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Company Details</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleEditCompany(editingCompany)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Back to List
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{editingCompany.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{editingCompany.industry}</Badge>
                  <Badge variant="outline">{editingCompany.type}</Badge>
                  <Badge variant={editingCompany.status === 'Active' ? 'default' : 'destructive'}>
                    {editingCompany.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{editingCompany.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium">{editingCompany.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employees</p>
                  <p className="font-medium">{editingCompany.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Turnover</p>
                  <p className="font-medium">${parseInt(editingCompany.annualTurnover || '0').toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{editingCompany.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="font-medium text-blue-600">{editingCompany.website}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Email</p>
                  <p className="font-medium">{editingCompany.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Phone</p>
                  <p className="font-medium">{editingCompany.phone}</p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Primary Contact</h4>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-500">Name:</span> <span className="font-medium">{editingCompany.contactPerson}</span></p>
                    <p><span className="text-sm text-gray-500">Designation:</span> <span className="font-medium">{editingCompany.contactDesignation}</span></p>
                    <p><span className="text-sm text-gray-500">Email:</span> <span className="font-medium">{editingCompany.contactEmail}</span></p>
                    <p><span className="text-sm text-gray-500">Phone:</span> <span className="font-medium">{editingCompany.contactPhone}</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Products/Services</p>
                <p className="font-medium">{editingCompany.products}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Certifications</p>
                <p className="font-medium">{editingCompany.certifications}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Terms</p>
                  <p className="font-medium">{editingCompany.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Credit Limit</p>
                  <p className="font-medium">${parseInt(editingCompany.creditLimit || '0').toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-medium">{editingCompany.createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Contact</p>
                  <p className="font-medium">{editingCompany.lastContact}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium">{editingCompany.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
        <Button onClick={handleAddCompany}>
          <Plus className="w-4 h-4 mr-2" />
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
              <option value="buyer">Buyers Only</option>
              <option value="seller">Sellers Only</option>
              <option value="both">Both</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
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
    </div>
  );
}
