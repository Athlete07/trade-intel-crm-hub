
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  User, 
  DollarSign, 
  FileText, 
  Calendar,
  Edit,
  Star
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

interface CompanyDetailsViewProps {
  company: Company;
  onEdit: () => void;
  onCancel: () => void;
}

export function CompanyDetailsView({ company, onEdit, onCancel }: CompanyDetailsViewProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-600">{company.industry} • {company.city}, {company.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">{company.type}</Badge>
          <Badge variant={company.status === 'Active' ? 'default' : 'destructive'}>
            {company.status}
          </Badge>
          <Button onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Company
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  ${parseInt(company.annualTurnover || '0').toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Annual Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{company.employees}</p>
                <p className="text-sm text-gray-500">Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  ${parseInt(company.creditLimit || '0').toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Credit Limit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{company.lastContact}</p>
                <p className="text-sm text-gray-500">Last Contact</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <p className="font-medium">{company.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium">{company.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Number</p>
                <p className="font-medium">{company.registrationNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tax ID</p>
                <p className="font-medium">{company.taxId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created Date</p>
                <p className="font-medium">{company.createdDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company Type</p>
                <p className="font-medium">{company.type}</p>
              </div>
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
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{company.address}</p>
              <p className="text-sm text-gray-500 mt-1">{company.city}, {company.country}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </p>
                <p className="font-medium">{company.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </p>
                <p className="font-medium">{company.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Website
                </p>
                <p className="font-medium">{company.website || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Primary Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-medium">{company.contactPerson || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium">{company.contactDesignation || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{company.contactEmail || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{company.contactPhone || 'N/A'}</p>
              </div>
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
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Payment Terms</p>
                <p className="font-medium">{company.paymentTerms || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Credit Limit</p>
                <p className="font-medium">${parseInt(company.creditLimit || '0').toLocaleString()}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-gray-500">Products/Services</p>
              <p className="font-medium">{company.products || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Certifications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Compliance & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Certifications</p>
                <p className="font-medium">{company.certifications || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quality Standards</p>
                <p className="font-medium">{company.qualityStandards || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trade License</p>
                <p className="font-medium">{company.tradeLicense || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Compliance Certifications</p>
                <p className="font-medium">{company.complianceCertifications || 'N/A'}</p>
              </div>
              {company.exportLicense && (
                <div>
                  <p className="text-sm text-gray-500">Export License</p>
                  <p className="font-medium">{company.exportLicense}</p>
                </div>
              )}
              {company.importLicense && (
                <div>
                  <p className="text-sm text-gray-500">Import License</p>
                  <p className="font-medium">{company.importLicense}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        {company.bankDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Banking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Bank Details</p>
              <p className="font-medium">{company.bankDetails}</p>
            </CardContent>
          </Card>
        )}

        {/* Additional Notes */}
        {company.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{company.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
