
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Building2,
  Package,
  DollarSign,
  Globe,
  Target,
  ArrowRight,
  User,
  Mail,
  Phone
} from "lucide-react";

interface SalesLeadFormProps {
  onLeadCreated: (leadId: string, dealData: any) => void;
  onCancel: () => void;
}

export function SalesLeadForm({ onLeadCreated, onCancel }: SalesLeadFormProps) {
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    industry: '',
    country: '',
    companySize: '',
    
    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactPosition: '',
    
    // Product Interest
    productCategory: '',
    productDescription: '',
    quantity: '',
    estimatedValue: '',
    currency: 'USD',
    
    // Business Details
    urgency: 'medium',
    budgetRange: '',
    timeframe: '',
    requirements: '',
    leadSource: '',
    
    // Trade Details
    originCountry: '',
    destinationCountry: '',
    preferredIncoterm: '',
    paymentPreference: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const productCategories = [
    'Textiles & Apparel',
    'Electronics & Components',
    'Machinery & Equipment',
    'Chemicals & Pharmaceuticals',
    'Food & Agriculture',
    'Automotive Parts',
    'Construction Materials',
    'Raw Materials',
    'Consumer Goods',
    'Industrial Equipment'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the deal first
      const dealData = {
        id: `DEAL-${Date.now()}`,
        company: formData.companyName,
        product: formData.productDescription,
        buyer: formData.companyName,
        seller: 'Our Company', // This would come from user's company profile
        quantity: formData.quantity,
        value: parseFloat(formData.estimatedValue) || 0,
        currency: formData.currency,
        incoterm: formData.preferredIncoterm,
        stage: 'Lead Qualification',
        status: 'Active',
        probability: 25,
        paymentTerm: formData.paymentPreference,
        expectedClosure: formData.timeframe,
        assignedTo: 'Current User', // This would come from auth
        countryOfOrigin: formData.originCountry,
        destinationCountry: formData.destinationCountry
      };

      // Insert into deals table
      const { data: deal, error: dealError } = await supabase
        .from('deals')
        .insert([dealData])
        .select()
        .single();

      if (dealError) throw dealError;

      // Create contact record
      const contactData = {
        id: `CONTACT-${Date.now()}`,
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        position: formData.contactPosition,
        company: formData.companyName,
        category: 'Prospect',
        status: 'Active'
      };

      await supabase
        .from('contacts')
        .insert([contactData]);

      // Create initial task for sales lifecycle
      const taskData = {
        id: `TASK-${Date.now()}`,
        title: 'Initiate Sales Lifecycle',
        description: `Begin sales lifecycle process for ${formData.companyName} - ${formData.productDescription}`,
        status: 'Pending',
        priority: formData.urgency,
        category: 'Sales',
        assignee: 'Current User',
        company: formData.companyName,
        dealId: dealData.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      await supabase
        .from('tasks')
        .insert([taskData]);

      toast({
        title: "Sales Lead Created Successfully!",
        description: `Sales lifecycle initiated for ${formData.companyName}`,
      });

      onLeadCreated(dealData.id, dealData);

    } catch (error) {
      console.error('Error creating sales lead:', error);
      toast({
        title: "Error",
        description: "Failed to create sales lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="w-6 h-6 text-blue-600" />
            Initiate Sales Lifecycle
          </CardTitle>
          <p className="text-gray-600">Create a new sales lead and begin the international buyer identification process</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Company Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    placeholder="e.g., Manufacturing, Textiles"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Company's country"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                      <SelectItem value="small">Small (11-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                      <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Primary Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="Primary contact person"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPosition">Position/Title</Label>
                  <Input
                    id="contactPosition"
                    value={formData.contactPosition}
                    onChange={(e) => handleInputChange('contactPosition', e.target.value)}
                    placeholder="e.g., Procurement Manager"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            </div>

            {/* Product Interest Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Product Interest</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productCategory">Product Category *</Label>
                  <Select onValueChange={(value) => handleInputChange('productCategory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity Required</Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="e.g., 1000 units, 50 MT"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="productDescription">Product Description *</Label>
                  <Textarea
                    id="productDescription"
                    value={formData.productDescription}
                    onChange={(e) => handleInputChange('productDescription', e.target.value)}
                    placeholder="Detailed description of the product/service required"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold">Business & Budget Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="estimatedValue">Estimated Value</Label>
                  <Input
                    id="estimatedValue"
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                    placeholder="100000"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - No rush</SelectItem>
                      <SelectItem value="medium">Medium - Standard</SelectItem>
                      <SelectItem value="high">High - Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeframe">Expected Timeframe</Label>
                  <Input
                    id="timeframe"
                    value={formData.timeframe}
                    onChange={(e) => handleInputChange('timeframe', e.target.value)}
                    placeholder="e.g., 3 months, Q2 2024"
                  />
                </div>
                <div>
                  <Label htmlFor="leadSource">Lead Source</Label>
                  <Select onValueChange={(value) => handleInputChange('leadSource', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How did you find us?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="trade-show">Trade Show</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Any special requirements, certifications, or specifications needed"
                  rows={3}
                />
              </div>
            </div>

            {/* Trade Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold">International Trade Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originCountry">Origin Country</Label>
                  <Input
                    id="originCountry"
                    value={formData.originCountry}
                    onChange={(e) => handleInputChange('originCountry', e.target.value)}
                    placeholder="Where will goods be shipped from"
                  />
                </div>
                <div>
                  <Label htmlFor="destinationCountry">Destination Country</Label>
                  <Input
                    id="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                    placeholder="Where will goods be delivered"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredIncoterm">Preferred Incoterm</Label>
                  <Select onValueChange={(value) => handleInputChange('preferredIncoterm', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Incoterm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FOB">FOB - Free on Board</SelectItem>
                      <SelectItem value="CIF">CIF - Cost, Insurance & Freight</SelectItem>
                      <SelectItem value="CFR">CFR - Cost and Freight</SelectItem>
                      <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                      <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                      <SelectItem value="DAP">DAP - Delivered at Place</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="paymentPreference">Payment Preference</Label>
                  <Select onValueChange={(value) => handleInputChange('paymentPreference', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LC">Letter of Credit</SelectItem>
                      <SelectItem value="TT">Telegraphic Transfer</SelectItem>
                      <SelectItem value="DP">Documents against Payment</SelectItem>
                      <SelectItem value="DA">Documents against Acceptance</SelectItem>
                      <SelectItem value="OA">Open Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-purple-600">
                {isSubmitting ? 'Creating...' : 'Create Sales Lead & Start Lifecycle'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
