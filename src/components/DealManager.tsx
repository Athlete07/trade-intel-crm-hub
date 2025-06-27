import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  FileText
} from "lucide-react";

interface DealManagerProps {
  onViewDetails?: (dealId: string) => void;
  onEditDeal?: (dealId: string) => void;
}

export function DealManager({ onViewDetails, onEditDeal }: DealManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [isCreatingDeal, setIsCreatingDeal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);

  const deals = [
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
      createdDate: "2024-11-01"
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
      createdDate: "2024-11-15"
    },
    {
      id: "D003",
      company: "Sunrise Exports", 
      buyer: "Indo-German Motors",
      seller: "Machinery World",
      product: "Textile Machinery",
      quantity: "2 units",
      value: 190000,
      currency: "EUR",
      stage: "Inquiry",
      probability: 40,
      incoterm: "DDP",
      paymentTerm: "50% Advance, 50% on delivery",
      assignedTo: "Hans Mueller",
      expectedClosure: "2025-02-10",
      status: "Live",
      createdDate: "2024-11-20"
    },
    {
      id: "D004",
      company: "TechFlow Solutions",
      buyer: "Innovation Labs",
      seller: "Software Systems Ltd",
      product: "Software Licenses", 
      quantity: "100 licenses",
      value: 75000,
      currency: "USD",
      stage: "Lost",
      probability: 0,
      incoterm: "N/A",
      paymentTerm: "Annual License",
      assignedTo: "Sarah Chen",
      expectedClosure: "2024-11-30",
      status: "Closed",
      createdDate: "2024-10-15"
    }
  ];

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
  const avgProbability = deals.filter(deal => deal.status === 'Live')
    .reduce((sum, deal) => sum + deal.probability, 0) / activeDeals || 0;

  const handleCreateDeal = () => {
    setIsCreatingDeal(true);
    alert('Create Deal form would open here with fields for all deal parameters including buyer, seller, product details, financial terms, etc.');
  };

  const handleEditDeal = (dealId: string) => {
    if (onEditDeal) {
      onEditDeal(dealId);
    } else {
      alert(`Edit Deal ${dealId} form would open here with pre-filled deal information.`);
    }
  };

  const handleViewDetails = (dealId: string) => {
    if (onViewDetails) {
      onViewDetails(dealId);
    } else {
      setSelectedDeal(dealId);
      alert(`Deal ${dealId} detailed view would open here showing complete deal history, documents, and timeline.`);
    }
  };

  const handleGenerateContract = (dealId: string) => {
    alert(`Contract generation for Deal ${dealId} would start here. This would create a PDF contract based on deal terms.`);
  };

  const handleDealAction = (dealId: string, action: string) => {
    switch (action) {
      case 'approve':
        alert(`Deal ${dealId} has been approved and moved to confirmed stage.`);
        break;
      case 'reject':
        alert(`Deal ${dealId} has been rejected and moved to lost stage.`);
        break;
      case 'negotiate':
        alert(`Opening negotiation panel for Deal ${dealId}.`);
        break;
      case 'clone':
        alert(`Creating a copy of Deal ${dealId} with same parameters.`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Deal Management</h1>
        <Button onClick={handleCreateDeal}>
          <Plus className="w-4 h-4 mr-2" />
          Create Deal
        </Button>
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
                <p className="text-2xl font-bold">{avgProbability.toFixed(0)}%</p>
                <p className="text-sm text-gray-500">Avg Probability</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">Due This Month</p>
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
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
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{deal.company}</h3>
                      <p className="text-sm text-gray-500">Deal ID: {deal.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStageColor(deal.stage)} className="flex items-center gap-1">
                      <StageIcon className="w-3 h-3" />
                      {deal.stage}
                    </Badge>
                  </div>
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

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(deal.id)}>
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditDeal(deal.id)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    {deal.stage === 'Confirmed' && (
                      <Button size="sm" onClick={() => handleGenerateContract(deal.id)}>
                        <FileText className="w-3 h-3 mr-1" />
                        Contract
                      </Button>
                    )}
                    {deal.stage === 'Negotiation' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleDealAction(deal.id, 'approve')}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDealAction(deal.id, 'reject')}>
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
