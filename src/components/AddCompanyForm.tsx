
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  User,
  Save,
  X,
  Plus
} from "lucide-react";

interface AddCompanyFormProps {
  onSave: (company: any) => void;
  onCancel: () => void;
  editingCompany?: any;
}

export function AddCompanyForm({ onSave, onCancel, editingCompany }: AddCompanyFormProps) {
  const [formData, setFormData] = useState({
    name: editingCompany?.name || '',
    industry: editingCompany?.industry || '',
    type: editingCompany?.type || 'Buyer',
    country: editingCompany?.country || '',
    city: editingCompany?.city || '',
    address: editingCompany?.address || '',
    website: editingCompany?.website || '',
    email: editingCompany?.email || '',
    phone: editingCompany?.phone || '',
    contactPerson: editingCompany?.contactPerson || '',
    contactDesignation: editingCompany?.contactDesignation || '',
    contactEmail: editingCompany?.contactEmail || '',
    contactPhone: editingCompany?.contactPhone || '',
    annualTurnover: editingCompany?.annualTurnover || '',
    employees: editingCompany?.employees || '',
    products: editingCompany?.products || '',
    certifications: editingCompany?.certifications || '',
    paymentTerms: editingCompany?.paymentTerms || '',
    creditLimit: editingCompany?.creditLimit || '',
    notes: editingCompany?.notes || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.industry || !formData.country) {
      alert('Please fill in all required fields (Company Name, Industry, Country)');
      return;
    }

    const companyData = {
      ...formData,
      id: editingCompany?.id || `COMP${Date.now()}`,
      createdDate: editingCompany?.createdDate || new Date().toISOString().split('T')[0],
      status: editingCompany?.status || 'Active',
      lastContact: editingCompany?.lastContact || new Date().toISOString().split('T')[0]
    };

    onSave(companyData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {editingCompany ? 'Edit Company' : 'Add New Company'}
        </h1>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <Input 
                  placeholder="Enter company name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  required
                >
                  <option value="">Select industry</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <Input 
                    placeholder="Country" 
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input 
                    placeholder="City" 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Textarea 
                  placeholder="Full address" 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <Input 
                  placeholder="https://www.company.com" 
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Email
                </label>
                <Input 
                  type="email"
                  placeholder="info@company.com" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Phone
                </label>
                <Input 
                  placeholder="+1 234 567 8900" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>
                <Input 
                  placeholder="Full name" 
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Designation
                </label>
                <Input 
                  placeholder="Manager, Director, etc." 
                  value={formData.contactDesignation}
                  onChange={(e) => handleInputChange('contactDesignation', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <Input 
                  type="email"
                  placeholder="contact@company.com" 
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <Input 
                  placeholder="+1 234 567 8900" 
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Turnover (USD)
                  </label>
                  <Input 
                    placeholder="1000000" 
                    value={formData.annualTurnover}
                    onChange={(e) => handleInputChange('annualTurnover', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees
                  </label>
                  <Input 
                    placeholder="50" 
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Products/Services
                </label>
                <Textarea 
                  placeholder="List main products or services offered" 
                  value={formData.products}
                  onChange={(e) => handleInputChange('products', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications
                </label>
                <Input 
                  placeholder="ISO 9001, CE, etc." 
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Financial & Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                >
                  <option value="">Select payment terms</option>
                  <option value="100% Advance">100% Advance</option>
                  <option value="50% Advance, 50% on delivery">50% Advance, 50% on delivery</option>
                  <option value="LC 30 days">LC 30 days</option>
                  <option value="LC 60 days">LC 60 days</option>
                  <option value="LC 90 days">LC 90 days</option>
                  <option value="30 days credit">30 days credit</option>
                  <option value="60 days credit">60 days credit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Limit (USD)
                </label>
                <Input 
                  placeholder="100000" 
                  value={formData.creditLimit}
                  onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <Textarea 
                  placeholder="Any additional information about the company" 
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {editingCompany ? 'Update Company' : 'Save Company'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
