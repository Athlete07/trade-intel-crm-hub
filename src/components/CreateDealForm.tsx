
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Building2, 
  Package, 
  Calendar,
  User,
  Save,
  X,
  FileText
} from "lucide-react";

interface CreateDealFormProps {
  onSave: (deal: any) => void;
  onCancel: () => void;
  editingDeal?: any;
}

export function CreateDealForm({ onSave, onCancel, editingDeal }: CreateDealFormProps) {
  const [formData, setFormData] = useState({
    company: editingDeal?.company || '',
    buyer: editingDeal?.buyer || '',
    seller: editingDeal?.seller || '',
    product: editingDeal?.product || '',
    productDescription: editingDeal?.productDescription || '',
    quantity: editingDeal?.quantity || '',
    unit: editingDeal?.unit || 'MT',
    value: editingDeal?.value || '',
    currency: editingDeal?.currency || 'USD',
    stage: editingDeal?.stage || 'Inquiry',
    probability: editingDeal?.probability || '40',
    incoterm: editingDeal?.incoterm || 'FOB',
    paymentTerm: editingDeal?.paymentTerm || '',
    expectedClosure: editingDeal?.expectedClosure || '',
    assignedTo: editingDeal?.assignedTo || '',
    department: editingDeal?.department || '',
    origin: editingDeal?.origin || '',
    destination: editingDeal?.destination || '',
    specifications: editingDeal?.specifications || '',
    notes: editingDeal?.notes || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-update probability based on stage
    if (field === 'stage') {
      let newProbability = '40';
      switch (value) {
        case 'Inquiry': newProbability = '40'; break;
        case 'Negotiation': newProbability = '70'; break;
        case 'Confirmed': newProbability = '95'; break;
        case 'Lost': newProbability = '0'; break;
      }
      setFormData(prev => ({
        ...prev,
        probability: newProbability
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.product || !formData.value) {
      alert('Please fill in all required fields (Company, Product, Value)');
      return;
    }

    const dealData = {
      ...formData,
      id: editingDeal?.id || `D${String(Date.now()).slice(-3).padStart(3, '0')}`,
      createdDate: editingDeal?.createdDate || new Date().toISOString().split('T')[0],
      status: editingDeal?.status || 'Live'
    };

    onSave(dealData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {editingDeal ? 'Edit Deal' : 'Create New Deal'}
        </h1>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deal Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Deal Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Company *
                </label>
                <Input 
                  placeholder="Select or enter company name" 
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buyer Company
                  </label>
                  <Input 
                    placeholder="Buyer name" 
                    value={formData.buyer}
                    onChange={(e) => handleInputChange('buyer', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seller Company
                  </label>
                  <Input 
                    placeholder="Seller name" 
                    value={formData.seller}
                    onChange={(e) => handleInputChange('seller', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deal Stage
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.stage}
                  onChange={(e) => handleInputChange('stage', e.target.value)}
                >
                  <option value="Inquiry">Inquiry</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Success Probability (%)
                </label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  placeholder="70" 
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <Input 
                  placeholder="Product or service name" 
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <Textarea 
                  placeholder="Detailed product description" 
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <Input 
                    placeholder="500" 
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                  >
                    <option value="MT">MT (Metric Tons)</option>
                    <option value="KG">KG (Kilograms)</option>
                    <option value="Units">Units</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Containers">Containers</option>
                    <option value="Pallets">Pallets</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Specifications
                </label>
                <Textarea 
                  placeholder="Technical specifications, quality standards, etc." 
                  value={formData.specifications}
                  onChange={(e) => handleInputChange('specifications', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Financial Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal Value *
                  </label>
                  <Input 
                    type="number"
                    placeholder="450000" 
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="CNY">CNY</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incoterm
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.incoterm}
                  onChange={(e) => handleInputChange('incoterm', e.target.value)}
                >
                  <option value="FOB">FOB (Free On Board)</option>
                  <option value="CIF">CIF (Cost, Insurance, Freight)</option>
                  <option value="CFR">CFR (Cost and Freight)</option>
                  <option value="EXW">EXW (Ex Works)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                  <option value="FCA">FCA (Free Carrier)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.paymentTerm}
                  onChange={(e) => handleInputChange('paymentTerm', e.target.value)}
                >
                  <option value="">Select payment terms</option>
                  <option value="100% Advance">100% Advance</option>
                  <option value="50% Advance, 50% on delivery">50% Advance, 50% on delivery</option>
                  <option value="LC 30 days">LC 30 days</option>
                  <option value="LC 60 days">LC 60 days</option>
                  <option value="LC 90 days">LC 90 days</option>
                  <option value="30 days credit">30 days credit</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Logistics & Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Logistics & Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Closure Date
                </label>
                <Input 
                  type="date"
                  value={formData.expectedClosure}
                  onChange={(e) => handleInputChange('expectedClosure', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <Input 
                  placeholder="Sales person name" 
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="">Select department</option>
                  <option value="Export Sales">Export Sales</option>
                  <option value="Import Division">Import Division</option>
                  <option value="Technical Sales">Technical Sales</option>
                  <option value="Business Development">Business Development</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origin Country
                  </label>
                  <Input 
                    placeholder="Country of origin" 
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Country
                  </label>
                  <Input 
                    placeholder="Destination country" 
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deal Notes
                </label>
                <Textarea 
                  placeholder="Additional notes, special conditions, etc." 
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
            {editingDeal ? 'Update Deal' : 'Create Deal'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
