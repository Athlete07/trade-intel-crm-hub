
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building, Globe, Mail, Phone, User, MapPin, DollarSign, FileText } from "lucide-react";

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

interface CompanyIntakeFormProps {
  companyType: "Buyer" | "Seller";
  onSave: (company: Company) => void;
  onCancel: () => void;
  editingCompany?: Company | null;
}

export function CompanyIntakeForm({ companyType, onSave, onCancel, editingCompany }: CompanyIntakeFormProps) {
  const [formData, setFormData] = useState<Partial<Company>>({
    name: editingCompany?.name || "",
    type: editingCompany?.type || companyType,
    industry: editingCompany?.industry || "",
    country: editingCompany?.country || "",
    city: editingCompany?.city || "",
    address: editingCompany?.address || "",
    website: editingCompany?.website || "",
    email: editingCompany?.email || "",
    phone: editingCompany?.phone || "",
    contactPerson: editingCompany?.contactPerson || "",
    contactDesignation: editingCompany?.contactDesignation || "",
    contactEmail: editingCompany?.contactEmail || "",
    contactPhone: editingCompany?.contactPhone || "",
    annualTurnover: editingCompany?.annualTurnover || "",
    employees: editingCompany?.employees || "",
    products: editingCompany?.products || "",
    certifications: editingCompany?.certifications || "",
    paymentTerms: editingCompany?.paymentTerms || "",
    creditLimit: editingCompany?.creditLimit || "",
    notes: editingCompany?.notes || "",
    registrationNumber: editingCompany?.registrationNumber || "",
    taxId: editingCompany?.taxId || "",
    bankDetails: editingCompany?.bankDetails || "",
    complianceCertifications: editingCompany?.complianceCertifications || "",
    qualityStandards: editingCompany?.qualityStandards || "",
    tradeLicense: editingCompany?.tradeLicense || "",
    exportLicense: editingCompany?.exportLicense || "",
    importLicense: editingCompany?.importLicense || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const companyData: Company = {
      id: editingCompany?.id || "",
      name: formData.name || "",
      type: formData.type || companyType,
      industry: formData.industry || "",
      country: formData.country || "",
      city: formData.city || "",
      address: formData.address || "",
      website: formData.website || "",
      email: formData.email || "",
      phone: formData.phone || "",
      contactPerson: formData.contactPerson || "",
      contactDesignation: formData.contactDesignation || "",
      contactEmail: formData.contactEmail || "",
      contactPhone: formData.contactPhone || "",
      annualTurnover: formData.annualTurnover || "",
      employees: formData.employees || "",
      products: formData.products || "",
      certifications: formData.certifications || "",
      paymentTerms: formData.paymentTerms || "",
      creditLimit: formData.creditLimit || "",
      status: editingCompany?.status || "Active",
      lastContact: editingCompany?.lastContact || new Date().toISOString().split('T')[0],
      createdDate: editingCompany?.createdDate || new Date().toISOString().split('T')[0],
      notes: formData.notes || "",
      registrationNumber: formData.registrationNumber || "",
      taxId: formData.taxId || "",
      bankDetails: formData.bankDetails || "",
      complianceCertifications: formData.complianceCertifications || "",
      qualityStandards: formData.qualityStandards || "",
      tradeLicense: formData.tradeLicense || "",
      exportLicense: formData.exportLicense,
      importLicense: formData.importLicense,
    };

    onSave(companyData);
  };

  const updateFormData = (field: keyof Company, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {editingCompany ? 'Edit Company' : `Add ${companyType} Company`}
          </h1>
          <p className="text-gray-600">
            {editingCompany ? 'Update company information' : `Complete the intake form for the ${companyType.toLowerCase()} company`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => updateFormData('industry', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => updateFormData('registrationNumber', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => updateFormData('taxId', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Primary Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Primary Contact Person
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person Name</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => updateFormData('contactPerson', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactDesignation">Designation</Label>
              <Input
                id="contactDesignation"
                value={formData.contactDesignation}
                onChange={(e) => updateFormData('contactDesignation', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Business Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="annualTurnover">Annual Turnover (USD)</Label>
              <Input
                id="annualTurnover"
                type="number"
                value={formData.annualTurnover}
                onChange={(e) => updateFormData('annualTurnover', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees}
                onChange={(e) => updateFormData('employees', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Input
                id="paymentTerms"
                value={formData.paymentTerms}
                onChange={(e) => updateFormData('paymentTerms', e.target.value)}
                placeholder="e.g., LC 30 days, 100% Advance"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditLimit">Credit Limit (USD)</Label>
              <Input
                id="creditLimit"
                type="number"
                value={formData.creditLimit}
                onChange={(e) => updateFormData('creditLimit', e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="products">Products/Services</Label>
              <Textarea
                id="products"
                value={formData.products}
                onChange={(e) => updateFormData('products', e.target.value)}
                rows={3}
                placeholder="Describe the main products or services"
              />
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Compliance & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) => updateFormData('certifications', e.target.value)}
                placeholder="e.g., ISO 9001, OEKO-TEX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualityStandards">Quality Standards</Label>
              <Input
                id="qualityStandards"
                value={formData.qualityStandards}
                onChange={(e) => updateFormData('qualityStandards', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tradeLicense">Trade License</Label>
              <Input
                id="tradeLicense"
                value={formData.tradeLicense}
                onChange={(e) => updateFormData('tradeLicense', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complianceCertifications">Compliance Certifications</Label>
              <Input
                id="complianceCertifications"
                value={formData.complianceCertifications}
                onChange={(e) => updateFormData('complianceCertifications', e.target.value)}
              />
            </div>
            {(companyType === "Seller" || formData.type === "Both") && (
              <div className="space-y-2">
                <Label htmlFor="exportLicense">Export License</Label>
                <Input
                  id="exportLicense"
                  value={formData.exportLicense}
                  onChange={(e) => updateFormData('exportLicense', e.target.value)}
                />
              </div>
            )}
            {(companyType === "Buyer" || formData.type === "Both") && (
              <div className="space-y-2">
                <Label htmlFor="importLicense">Import License</Label>
                <Input
                  id="importLicense"
                  value={formData.importLicense}
                  onChange={(e) => updateFormData('importLicense', e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Banking & Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bankDetails">Bank Details</Label>
              <Textarea
                id="bankDetails"
                value={formData.bankDetails}
                onChange={(e) => updateFormData('bankDetails', e.target.value)}
                rows={3}
                placeholder="Bank name, branch, account details"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={4}
                placeholder="Any additional information about the company"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {editingCompany ? 'Update Company' : 'Save Company'}
          </Button>
        </div>
      </form>
    </div>
  );
}
