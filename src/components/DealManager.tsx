
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  Building2,
  Globe,
  Edit,
  Eye,
  FileText,
  Settings,
  Download,
  X
} from "lucide-react";

interface DealManagerProps {
  onViewDetails?: (dealId: string) => void;
  onEditDeal?: (dealId: string) => void;
}

export function DealManager({ onViewDetails, onEditDeal }: DealManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);

  const [deals, setDeals] = useState([
    {
      id: "D001",
      company: "MegaCorp Industries",
      buyer: "ABC Textiles Ltd",
      seller: "Steel Components Inc",
      product: "Steel Components",
      quantity: "500 MT",
      value: 450000,
      currency: "USD",
      stage: "Confirmed",
      probability: 95,
      incoterm: "CIF",
      paymentTerm: "LC 30 days",
      assignedTo: "Rajesh Kumar",
      expectedClosure: "2024-12-15",
      status: "Live",
      createdDate: "2024-11-01",
      hsCode: "7208.51.00",
      portOfLoading: "Mumbai, India",
      portOfDischarge: "Hamburg, Germany",
      countryOfOrigin: "India",
      destinationCountry: "Germany"
    },
    {
      id: "D002", 
      company: "Pacific Traders",
      buyer: "Global Electronics Inc",
      seller: "Component Solutions",
      product: "Electronic Parts",
      quantity: "10,000 units",
      value: 280000,
      currency: "USD",
      stage: "Negotiation",
      probability: 70,
      incoterm: "FOB",
      paymentTerm: "100% Advance",
      assignedTo: "Priya Singh",
      expectedClosure: "2025-01-20",
      status: "Live",
      createdDate: "2024-11-15",
      hsCode: "8542.31.00",
      portOfLoading: "Shenzhen, China",
      portOfDischarge: "Los Angeles, USA",
      countryOfOrigin: "China",
      destinationCountry: "USA"
    }
  ]);

  const [newDeal, setNewDeal] = useState({
    company: "",
    buyer: "",
    seller: "",
    product: "",
    quantity: "",
    value: 0,
    currency: "USD",
    incoterm: "FOB",
    paymentTerm: "",
    assignedTo: "",
    expectedClosure: "",
    hsCode: "",
    portOfLoading: "",
    portOfDischarge: "",
    countryOfOrigin: "",
    destinationCountry: "",
    productCategory: "",
    qualityStandards: "",
    packagingRequirements: "",
    inspectionRequirements: "",
    insuranceRequirements: "",
    specialTerms: ""
  });

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === "all" || deal.stage.toLowerCase() === filterStage;
    return matchesSearch && matchesFilter;
  });

  const totalValue = deals.reduce((sum, deal) => {
    if (deal.status === 'Live') {
      return sum + (deal.value * deal.probability / 100);
    }
    return sum;
  }, 0);

  const activeDeals = deals.filter(deal => deal.status === 'Live').length;

  const handleCreateDeal = () => {
    if (!newDeal.company || !newDeal.buyer || !newDeal.product || !newDeal.value) {
      alert('Please fill in all required fields');
      return;
    }

    const deal = {
      ...newDeal,
      id: `D${String(deals.length + 1).padStart(3, '0')}`,
      stage: "Inquiry",
      probability: 30,
      status: "Live",
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setDeals([...deals, deal]);
    setNewDeal({
      company: "",
      buyer: "",
      seller: "",
      product: "",
      quantity: "",
      value: 0,
      currency: "USD",
      incoterm: "FOB",
      paymentTerm: "",
      assignedTo: "",
      expectedClosure: "",
      hsCode: "",
      portOfLoading: "",
      portOfDischarge: "",
      countryOfOrigin: "",
      destinationCountry: "",
      productCategory: "",
      qualityStandards: "",
      packagingRequirements: "",
      inspectionRequirements: "",
      insuranceRequirements: "",
      specialTerms: ""
    });
    setShowCreateDeal(false);
    alert(`Deal ${deal.id} created successfully!`);
  };

  const handleExportData = () => {
    const selectedData = selectedDeals.length > 0 
      ? deals.filter(deal => selectedDeals.includes(deal.id))
      : deals;
    
    const csvContent = [
      'Deal ID,Company,Buyer,Seller,Product,Value,Currency,Stage,Status,Created Date',
      ...selectedData.map(deal => 
        `${deal.id},${deal.company},${deal.buyer},${deal.seller},${deal.product},${deal.value},${deal.currency},${deal.stage},${deal.status},${deal.createdDate}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deals_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Exported ${selectedData.length} deals to CSV`);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Confirmed': return 'default';
      case 'Negotiation': return 'secondary';
      case 'Inquiry': return 'outline';
      case 'Lost': return 'destructive';
      default: return 'outline';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Confirmed': return CheckCircle;
      case 'Negotiation': return TrendingUp;
      case 'Inquiry': return Clock;
      case 'Lost': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Deal Management</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={() => setShowCreateDeal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Deal
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${(totalValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-500">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activeDeals}</p>
                <p className="text-sm text-gray-500">Active Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{deals.filter(d => d.stage === 'Confirmed').length}</p>
                <p className="text-sm text-gray-500">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{deals.filter(d => d.stage === 'Negotiation').length}</p>
                <p className="text-sm text-gray-500">In Negotiation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="inquiry">Inquiry</option>
              <option value="negotiation">Negotiation</option>
              <option value="confirmed">Confirmed</option>
              <option value="lost">Lost</option>
            </select>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDeals(filteredDeals.map(d => d.id));
                  } else {
                    setSelectedDeals([]);
                  }
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Select All ({selectedDeals.length})</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDeals.map((deal) => {
          const StageIcon = getStageIcon(deal.stage);
          
          return (
            <Card key={deal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDeals.includes(deal.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDeals([...selectedDeals, deal.id]);
                        } else {
                          setSelectedDeals(selectedDeals.filter(id => id !== deal.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{deal.company}</h3>
                      <p className="text-sm text-gray-500">Deal ID: {deal.id}</p>
                    </div>
                  </div>
                  <Badge variant={getStageColor(deal.stage)} className="flex items-center gap-1">
                    <StageIcon className="w-3 h-3" />
                    {deal.stage}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Product</p>
                    <p className="font-medium">{deal.product}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Value</p>
                    <p className="font-medium text-green-600">
                      {deal.currency} {deal.value.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{deal.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Probability</p>
                    <p className="font-medium">{deal.probability}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Buyer</p>
                    <p className="font-medium">{deal.buyer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Seller</p>
                    <p className="font-medium">{deal.seller}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Incoterm</p>
                    <p className="font-medium">{deal.incoterm}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment</p>
                    <p className="font-medium">{deal.paymentTerm}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Assigned to</p>
                    <p className="font-medium">{deal.assignedTo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Expected Closure</p>
                    <p className="font-medium">{deal.expectedClosure}</p>
                  </div>
                </div>

                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails?.(deal.id)}>
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onEditDeal?.(deal.id)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    {deal.stage === 'Confirmed' && (
                      <Button size="sm">
                        <FileText className="w-3 h-3 mr-1" />
                        Contract
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Deal Modal */}
      {showCreateDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Deal</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateDeal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name *</label>
                    <Input
                      value={newDeal.company}
                      onChange={(e) => setNewDeal({...newDeal, company: e.target.value})}
                      placeholder="Company facilitating the deal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Product *</label>
                    <Input
                      value={newDeal.product}
                      onChange={(e) => setNewDeal({...newDeal, product: e.target.value})}
                      placeholder="Product description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Buyer *</label>
                    <Input
                      value={newDeal.buyer}
                      onChange={(e) => setNewDeal({...newDeal, buyer: e.target.value})}
                      placeholder="Buying company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Seller *</label>
                    <Input
                      value={newDeal.seller}
                      onChange={(e) => setNewDeal({...newDeal, seller: e.target.value})}
                      placeholder="Selling company"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial Terms */}
              <div>
                <h3 className="font-semibold mb-4">Commercial Terms</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity *</label>
                    <Input
                      value={newDeal.quantity}
                      onChange={(e) => setNewDeal({...newDeal, quantity: e.target.value})}
                      placeholder="e.g., 500 MT, 10,000 units"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Value *</label>
                    <Input
                      type="number"
                      value={newDeal.value}
                      onChange={(e) => setNewDeal({...newDeal, value: Number(e.target.value)})}
                      placeholder="Deal value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select
                      value={newDeal.currency}
                      onChange={(e) => setNewDeal({...newDeal, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                      <option value="CNY">CNY</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Incoterm</label>
                    <select
                      value={newDeal.incoterm}
                      onChange={(e) => setNewDeal({...newDeal, incoterm: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="FOB">FOB - Free On Board</option>
                      <option value="CIF">CIF - Cost, Insurance & Freight</option>
                      <option value="CFR">CFR - Cost & Freight</option>
                      <option value="EXW">EXW - Ex Works</option>
                      <option value="DDP">DDP - Delivered Duty Paid</option>
                      <option value="FCA">FCA - Free Carrier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Terms</label>
                    <Input
                      value={newDeal.paymentTerm}
                      onChange={(e) => setNewDeal({...newDeal, paymentTerm: e.target.value})}
                      placeholder="e.g., LC 30 days, 100% Advance"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">HS Code</label>
                    <Input
                      value={newDeal.hsCode}
                      onChange={(e) => setNewDeal({...newDeal, hsCode: e.target.value})}
                      placeholder="Harmonized System Code"
                    />
                  </div>
                </div>
              </div>

              {/* Logistics Information */}
              <div>
                <h3 className="font-semibold mb-4">Logistics Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Port of Loading</label>
                    <Input
                      value={newDeal.portOfLoading}
                      onChange={(e) => setNewDeal({...newDeal, portOfLoading: e.target.value})}
                      placeholder="e.g., Mumbai, India"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Port of Discharge</label>
                    <Input
                      value={newDeal.portOfDischarge}
                      onChange={(e) => setNewDeal({...newDeal, portOfDischarge: e.target.value})}
                      placeholder="e.g., Hamburg, Germany"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country of Origin</label>
                    <Input
                      value={newDeal.countryOfOrigin}
                      onChange={(e) => setNewDeal({...newDeal, countryOfOrigin: e.target.value})}
                      placeholder="Manufacturing country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Destination Country</label>
                    <Input
                      value={newDeal.destinationCountry}
                      onChange={(e) => setNewDeal({...newDeal, destinationCountry: e.target.value})}
                      placeholder="Final destination"
                    />
                  </div>
                </div>
              </div>

              {/* Quality & Compliance */}
              <div>
                <h3 className="font-semibold mb-4">Quality & Compliance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quality Standards</label>
                    <Input
                      value={newDeal.qualityStandards}
                      onChange={(e) => setNewDeal({...newDeal, qualityStandards: e.target.value})}
                      placeholder="e.g., ISO 9001, CE marking"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Inspection Requirements</label>
                    <Input
                      value={newDeal.inspectionRequirements}
                      onChange={(e) => setNewDeal({...newDeal, inspectionRequirements: e.target.value})}
                      placeholder="Third-party inspection requirements"
                    />
                  </div>
                </div>
              </div>

              {/* Management */}
              <div>
                <h3 className="font-semibold mb-4">Deal Management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Assigned To</label>
                    <Input
                      value={newDeal.assignedTo}
                      onChange={(e) => setNewDeal({...newDeal, assignedTo: e.target.value})}
                      placeholder="Responsible person"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Closure</label>
                    <Input
                      type="date"
                      value={newDeal.expectedClosure}
                      onChange={(e) => setNewDeal({...newDeal, expectedClosure: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Special Terms */}
              <div>
                <label className="block text-sm font-medium mb-2">Special Terms & Conditions</label>
                <Textarea
                  value={newDeal.specialTerms}
                  onChange={(e) => setNewDeal({...newDeal, specialTerms: e.target.value})}
                  placeholder="Any special conditions, terms, or requirements"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowCreateDeal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDeal}>
                  Create Deal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Deal Settings</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Default Currency</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </div>
              <div>
                <h4 className="font-medium mb-2">Default Incoterm</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="FOB">FOB - Free On Board</option>
                  <option value="CIF">CIF - Cost, Insurance & Freight</option>
                  <option value="EXW">EXW - Ex Works</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-assign" className="w-4 h-4 text-blue-600" />
                <label htmlFor="auto-assign" className="text-sm">Auto-assign deals to available team members</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="email-notifications" className="w-4 h-4 text-blue-600" />
                <label htmlFor="email-notifications" className="text-sm">Send email notifications for deal updates</label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowSettings(false)}>Cancel</Button>
                <Button onClick={() => {
                  alert('Settings saved successfully!');
                  setShowSettings(false);
                }}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
