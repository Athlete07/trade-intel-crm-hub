
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SalesLeadForm } from "./SalesLeadForm";
import {
  Plus,
  Search,
  Filter,
  Target,
  Globe,
  Handshake,
  ArrowRight,
  Building2,
  DollarSign,
  Clock,
  User,
  Workflow,
  Package,
  TrendingUp,
  Eye,
  Edit
} from "lucide-react";

interface Deal {
  id: string;
  company: string;
  product: string;
  value: number;
  currency: string;
  stage: string;
  status: string;
  probability: number;
  lifecyclePhase: 'sales' | 'trade' | 'completed';
  expectedClosure: string;
  assignedTo: string;
}

interface EnhancedDealManagerProps {
  onNavigateToSalesLifecycle?: (dealId: string) => void;
  onNavigateToTradeLifecycle?: (dealId: string) => void;
}

export function EnhancedDealManager({ 
  onNavigateToSalesLifecycle, 
  onNavigateToTradeLifecycle 
}: EnhancedDealManagerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {
    filterDeals();
  }, [deals, searchTerm, selectedStage]);

  const loadDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const dealsWithLifecycle = (data || []).map(deal => ({
        ...deal,
        lifecyclePhase: getLifecyclePhase(deal.stage),
        value: deal.value || 0
      }));

      setDeals(dealsWithLifecycle);
    } catch (error) {
      console.error('Error loading deals:', error);
      toast({
        title: "Error",
        description: "Failed to load deals",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getLifecyclePhase = (stage: string): 'sales' | 'trade' | 'completed' => {
    const salesStages = ['Lead Qualification', 'Needs Analysis', 'Proposal', 'Negotiation'];
    const tradeStages = ['Contract Execution', 'Documentation', 'Production', 'Shipment', 'Delivery'];
    
    if (salesStages.includes(stage)) return 'sales';
    if (tradeStages.includes(stage)) return 'trade';
    return 'completed';
  };

  const filterDeals = () => {
    let filtered = deals;

    if (searchTerm) {
      filtered = filtered.filter(deal => 
        deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStage !== 'all') {
      filtered = filtered.filter(deal => deal.stage === selectedStage);
    }

    setFilteredDeals(filtered);
  };

  const handleNewLead = (dealId: string, dealData: any) => {
    setShowNewLeadForm(false);
    loadDeals(); // Refresh the deals list
    toast({
      title: "Success!",
      description: "Sales lifecycle has been initiated. You can now track progress.",
    });
  };

  const getStageColor = (stage: string) => {
    const stageColors: { [key: string]: string } = {
      'Lead Qualification': 'bg-blue-100 text-blue-800',
      'Needs Analysis': 'bg-purple-100 text-purple-800',
      'Proposal': 'bg-yellow-100 text-yellow-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Contract Execution': 'bg-green-100 text-green-800',
      'Documentation': 'bg-indigo-100 text-indigo-800',
      'Production': 'bg-pink-100 text-pink-800',
      'Shipment': 'bg-cyan-100 text-cyan-800',
      'Delivery': 'bg-emerald-100 text-emerald-800',
      'Completed': 'bg-gray-100 text-gray-800'
    };
    return stageColors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityIcon = (lifecyclePhase: string) => {
    switch (lifecyclePhase) {
      case 'sales': return <Target className="w-4 h-4" />;
      case 'trade': return <Globe className="w-4 h-4" />;
      default: return <Handshake className="w-4 h-4" />;
    }
  };

  const salesDeals = filteredDeals.filter(deal => deal.lifecyclePhase === 'sales');
  const tradeDeals = filteredDeals.filter(deal => deal.lifecyclePhase === 'trade');
  const completedDeals = filteredDeals.filter(deal => deal.lifecyclePhase === 'completed');

  const stats = {
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, deal) => sum + deal.value, 0),
    salesPhase: salesDeals.length,
    tradePhase: tradeDeals.length,
    avgProbability: deals.length ? Math.round(deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length) : 0
  };

  if (showNewLeadForm) {
    return (
      <SalesLeadForm 
        onLeadCreated={handleNewLead}
        onCancel={() => setShowNewLeadForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrated Lifecycle Management</h1>
          <p className="text-gray-600">Manage your sales and trade lifecycles from lead to delivery</p>
        </div>
        <Button 
          onClick={() => setShowNewLeadForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Sales Lead
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Handshake className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalDeals}</p>
                <p className="text-sm text-gray-500">Total Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${(stats.totalValue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-gray-500">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.salesPhase}</p>
                <p className="text-sm text-gray-500">Sales Phase</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.tradePhase}</p>
                <p className="text-sm text-gray-500">Trade Phase</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.avgProbability}%</p>
                <p className="text-sm text-gray-500">Avg Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search deals by company or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All Stages</option>
          <option value="Lead Qualification">Lead Qualification</option>
          <option value="Needs Analysis">Needs Analysis</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Contract Execution">Contract Execution</option>
          <option value="Documentation">Documentation</option>
          <option value="Production">Production</option>
          <option value="Shipment">Shipment</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales-phase">Sales Phase ({salesDeals.length})</TabsTrigger>
          <TabsTrigger value="trade-phase">Trade Phase ({tradeDeals.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedDeals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Lifecycle Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Sales Lifecycle Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesDeals.slice(0, 3).map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{deal.company}</h4>
                        <p className="text-sm text-gray-500">{deal.product}</p>
                        <Badge className={getStageColor(deal.stage)} variant="secondary">
                          {deal.stage}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${deal.value.toLocaleString()}</p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigateToSalesLifecycle?.(deal.id)}
                        >
                          <Workflow className="w-4 h-4 mr-1" />
                          Sales LC
                        </Button>
                      </div>
                    </div>
                  ))}
                  {salesDeals.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No deals in sales phase</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trade Lifecycle Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Trade Lifecycle Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tradeDeals.slice(0, 3).map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{deal.company}</h4>
                        <p className="text-sm text-gray-500">{deal.product}</p>
                        <Badge className={getStageColor(deal.stage)} variant="secondary">
                          {deal.stage}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${deal.value.toLocaleString()}</p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigateToTradeLifecycle?.(deal.id)}
                        >
                          <Globe className="w-4 h-4 mr-1" />
                          Trade LC
                        </Button>
                      </div>
                    </div>
                  ))}
                  {tradeDeals.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No deals in trade phase</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales-phase" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {salesDeals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{deal.company}</h3>
                        <p className="text-gray-600">{deal.product}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                          <span className="text-sm text-gray-500">Probability: {deal.probability}%</span>
                          <span className="text-sm text-gray-500">Value: ${deal.value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigateToSalesLifecycle?.(deal.id)}
                      >
                        <Workflow className="w-4 h-4 mr-2" />
                        Manage Sales LC
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
            {salesDeals.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Sales Phase Deals</h3>
                  <p className="text-gray-600 mb-4">Start by creating a new sales lead to begin the lifecycle process.</p>
                  <Button onClick={() => setShowNewLeadForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Lead
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trade-phase" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {tradeDeals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{deal.company}</h3>
                        <p className="text-gray-600">{deal.product}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                          <span className="text-sm text-gray-500">Expected: {deal.expectedClosure}</span>
                          <span className="text-sm text-gray-500">Value: ${deal.value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigateToTradeLifecycle?.(deal.id)}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Manage Trade LC
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
            {tradeDeals.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Trade Phase Deals</h3>
                  <p className="text-gray-600">Deals will appear here once they complete the sales lifecycle.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {completedDeals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <Handshake className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{deal.company}</h3>
                        <p className="text-gray-600">{deal.product}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                          <span className="text-sm text-gray-500">Completed: {deal.expectedClosure}</span>
                          <span className="text-sm text-gray-500">Value: ${deal.value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {completedDeals.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Handshake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Deals</h3>
                  <p className="text-gray-600">Completed deals will appear here once they finish both lifecycles.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
