import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  SkipForward,
  FileText,
  Users,
  Package,
  Truck,
  Ship,
  DollarSign,
  Shield,
  Globe,
  ArrowRight,
  Plus,
  Eye,
  Edit,
  Calendar,
  User,
  Building,
  CreditCard,
  MapPin,
  CheckSquare,
  AlertTriangle,
  Info,
  Download,
  Upload,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";

interface TradeLifecycleStep {
  id: string;
  phase: string;
  step: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'blocked';
  required: boolean;
  estimatedDays: number;
  actualDays?: number;
  assignedTo?: string;
  documents: DocumentRequirement[];
  notes: string;
  skipReason?: string;
  dependencies: string[];
  completedDate?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  compliance: ComplianceRequirement[];
  costs: CostEstimate[];
  stakeholders: Stakeholder[];
  risks: RiskAssessment[];
  kpis: KPI[];
}

interface DocumentRequirement {
  name: string;
  required: boolean;
  template?: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  description: string;
}

interface ComplianceRequirement {
  standard: string;
  authority: string;
  country: string;
  validity: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
}

interface CostEstimate {
  category: string;
  estimated: number;
  actual?: number;
  currency: string;
  notes: string;
}

interface Stakeholder {
  role: string;
  name: string;
  contact: string;
  responsibility: string;
}

interface RiskAssessment {
  type: string;
  level: 'low' | 'medium' | 'high';
  mitigation: string;
  impact: string;
}

interface KPI {
  metric: string;
  target: string;
  actual?: string;
  unit: string;
}

interface TradeLifecycleProps {
  dealId?: string;
  onBack: () => void;
}

export function TradeLifecycle({ dealId = "sample-deal", onBack }: TradeLifecycleProps) {
  const [lifecycleSteps, setLifecycleSteps] = useState<TradeLifecycleStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<TradeLifecycleStep | null>(null);
  const [newNote, setNewNote] = useState('');
  const [skipReason, setSkipReason] = useState('');
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('pre-contract');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const phases = [
    { id: 'pre-contract', name: 'Pre-Contract & Buyer Qualification', icon: Users, color: 'bg-blue-500' },
    { id: 'contract', name: 'Contract & Legal Documentation', icon: FileText, color: 'bg-purple-500' },
    { id: 'pre-shipment', name: 'Production & Pre-Shipment', icon: Package, color: 'bg-orange-500' },
    { id: 'shipment', name: 'Shipment & Transit Management', icon: Ship, color: 'bg-teal-500' },
    { id: 'post-shipment', name: 'Post-Shipment & Delivery', icon: Truck, color: 'bg-green-500' },
    { id: 'completion', name: 'Trade Completion & Settlement', icon: CheckCircle2, color: 'bg-emerald-500' }
  ];

  // Enhanced lifecycle steps with comprehensive details
  const defaultLifecycleSteps: TradeLifecycleStep[] = [
    // Pre-Contract Phase
    {
      id: 'market-research',
      phase: 'pre-contract',
      step: 'Market Research & Analysis',
      description: 'Conduct comprehensive market research to identify potential buyers, market trends, pricing strategies, and competitive landscape analysis',
      status: 'pending',
      required: true,
      estimatedDays: 10,
      assignedTo: 'Market Research Team',
      priority: 'high',
      documents: [
        { name: 'Market Analysis Report', required: true, status: 'pending', description: 'Comprehensive market study' },
        { name: 'Competitor Analysis', required: true, status: 'pending', description: 'Competitive landscape review' },
        { name: 'Price Benchmarking Report', required: false, status: 'pending', description: 'Market price analysis' }
      ],
      notes: '',
      dependencies: [],
      compliance: [
        { standard: 'Market Research Ethics', authority: 'Industry Standards', country: 'Global', validity: 'Ongoing', status: 'pending' }
      ],
      costs: [
        { category: 'Research Tools', estimated: 5000, currency: 'USD', notes: 'Market intelligence platforms' },
        { category: 'Consultant Fees', estimated: 15000, currency: 'USD', notes: 'External market experts' }
      ],
      stakeholders: [
        { role: 'Market Analyst', name: 'TBD', contact: '', responsibility: 'Lead market research activities' },
        { role: 'Industry Expert', name: 'TBD', contact: '', responsibility: 'Provide market insights' }
      ],
      risks: [
        { type: 'Data Accuracy', level: 'medium', mitigation: 'Multiple data sources validation', impact: 'Incorrect market strategy' }
      ],
      kpis: [
        { metric: 'Market Coverage', target: '95%', unit: '%' },
        { metric: 'Lead Generation', target: '50', unit: 'qualified leads' }
      ]
    },
    {
      id: 'buyer-identification',
      phase: 'pre-contract',
      step: 'Buyer Identification & Database Building',
      description: 'Systematically identify and qualify potential international buyers through various channels including trade directories, industry associations, and digital platforms',
      status: 'pending',
      required: true,
      estimatedDays: 14,
      assignedTo: 'Business Development Team',
      priority: 'critical',
      documents: [
        { name: 'Buyer Database', required: true, status: 'pending', description: 'Comprehensive buyer contact database' },
        { name: 'Qualification Criteria', required: true, status: 'pending', description: 'Buyer assessment framework' },
        { name: 'Source Tracking Sheet', required: false, status: 'pending', description: 'Lead source documentation' }
      ],
      notes: '',
      dependencies: ['market-research'],
      compliance: [
        { standard: 'GDPR Compliance', authority: 'EU Commission', country: 'EU', validity: 'Ongoing', status: 'pending' },
        { standard: 'Data Protection', authority: 'Local Authority', country: 'Various', validity: 'Ongoing', status: 'pending' }
      ],
      costs: [
        { category: 'Database Access', estimated: 8000, currency: 'USD', notes: 'Trade directory subscriptions' },
        { category: 'CRM System', estimated: 12000, currency: 'USD', notes: 'Customer relationship management' }
      ],
      stakeholders: [
        { role: 'BD Manager', name: 'TBD', contact: '', responsibility: 'Lead buyer identification' },
        { role: 'Data Analyst', name: 'TBD', contact: '', responsibility: 'Database management' }
      ],
      risks: [
        { type: 'Data Quality', level: 'medium', mitigation: 'Regular database updates', impact: 'Poor lead quality' },
        { type: 'Compliance Risk', level: 'high', mitigation: 'Legal review of data practices', impact: 'Legal penalties' }
      ],
      kpis: [
        { metric: 'Database Size', target: '1000', unit: 'qualified buyers' },
        { metric: 'Response Rate', target: '15%', unit: '%' }
      ]
    },
    // Contract & Documentation Phase
    {
      id: 'contract-negotiation',
      phase: 'contract',
      step: 'Contract Negotiation & Finalization',
      description: 'Negotiate terms and conditions, finalize contract details, and obtain necessary approvals',
      status: 'pending',
      required: true,
      estimatedDays: 7,
      assignedTo: 'Legal Team',
      priority: 'high',
      documents: [
        { name: 'Draft Contract', required: true, status: 'pending', description: 'Initial contract draft' },
        { name: 'Final Contract', required: true, status: 'pending', description: 'Signed contract document' },
        { name: 'Amendments', required: false, status: 'pending', description: 'Contract amendments and addenda' }
      ],
      notes: '',
      dependencies: ['buyer-identification'],
      compliance: [
        { standard: 'International Trade Law', authority: 'Legal Department', country: 'Global', validity: 'Ongoing', status: 'pending' }
      ],
      costs: [
        { category: 'Legal Fees', estimated: 10000, currency: 'USD', notes: 'Contract review and negotiation' }
      ],
      stakeholders: [
        { role: 'Legal Counsel', name: 'TBD', contact: '', responsibility: 'Contract drafting and review' },
        { role: 'Sales Manager', name: 'TBD', contact: '', responsibility: 'Contract negotiation' }
      ],
      risks: [
        { type: 'Contract Disputes', level: 'high', mitigation: 'Clear terms and legal review', impact: 'Delays and financial loss' }
      ],
      kpis: [
        { metric: 'Contract Approval Time', target: '5 days', unit: 'days' },
        { metric: 'Contract Compliance Rate', target: '100%', unit: '%' }
      ]
    },
    // Pre-Shipment Phase
    {
      id: 'production-scheduling',
      phase: 'pre-shipment',
      step: 'Production Scheduling & Quality Control',
      description: 'Plan production timelines, ensure quality standards, and prepare for shipment',
      status: 'pending',
      required: true,
      estimatedDays: 20,
      assignedTo: 'Production Team',
      priority: 'medium',
      documents: [
        { name: 'Production Schedule', required: true, status: 'pending', description: 'Detailed production plan' },
        { name: 'Quality Reports', required: true, status: 'pending', description: 'Quality control documentation' }
      ],
      notes: '',
      dependencies: ['contract-negotiation'],
      compliance: [
        { standard: 'ISO 9001', authority: 'Quality Assurance', country: 'Global', validity: 'Annual', status: 'pending' }
      ],
      costs: [
        { category: 'Production Costs', estimated: 50000, currency: 'USD', notes: 'Raw materials and labor' }
      ],
      stakeholders: [
        { role: 'Production Manager', name: 'TBD', contact: '', responsibility: 'Oversee production' },
        { role: 'Quality Inspector', name: 'TBD', contact: '', responsibility: 'Quality assurance' }
      ],
      risks: [
        { type: 'Production Delays', level: 'medium', mitigation: 'Buffer time and contingency plans', impact: 'Shipment delays' }
      ],
      kpis: [
        { metric: 'On-time Production', target: '95%', unit: '%' },
        { metric: 'Defect Rate', target: '<1%', unit: '%' }
      ]
    },
    // Shipment & Transit Phase
    {
      id: 'shipment-booking',
      phase: 'shipment',
      step: 'Shipment Booking & Documentation',
      description: 'Book shipment with carriers, prepare shipping documents, and coordinate logistics',
      status: 'pending',
      required: true,
      estimatedDays: 5,
      assignedTo: 'Logistics Team',
      priority: 'high',
      documents: [
        { name: 'Bill of Lading', required: true, status: 'pending', description: 'Shipping contract document' },
        { name: 'Packing List', required: true, status: 'pending', description: 'Details of shipped goods' },
        { name: 'Export Declaration', required: true, status: 'pending', description: 'Customs export documents' }
      ],
      notes: '',
      dependencies: ['production-scheduling'],
      compliance: [
        { standard: 'Incoterms 2020', authority: 'Trade Compliance', country: 'Global', validity: 'Ongoing', status: 'pending' }
      ],
      costs: [
        { category: 'Freight Charges', estimated: 15000, currency: 'USD', notes: 'Carrier fees' },
        { category: 'Insurance', estimated: 2000, currency: 'USD', notes: 'Cargo insurance' }
      ],
      stakeholders: [
        { role: 'Logistics Coordinator', name: 'TBD', contact: '', responsibility: 'Shipment booking and tracking' },
        { role: 'Customs Broker', name: 'TBD', contact: '', responsibility: 'Customs clearance' }
      ],
      risks: [
        { type: 'Customs Delays', level: 'high', mitigation: 'Proper documentation and compliance', impact: 'Delivery delays' }
      ],
      kpis: [
        { metric: 'On-time Shipment', target: '98%', unit: '%' },
        { metric: 'Customs Clearance Time', target: '2 days', unit: 'days' }
      ]
    },
    // Post-Shipment Phase
    {
      id: 'delivery-confirmation',
      phase: 'post-shipment',
      step: 'Delivery Confirmation & Customer Feedback',
      description: 'Confirm delivery with buyer, collect feedback, and resolve any issues',
      status: 'pending',
      required: true,
      estimatedDays: 3,
      assignedTo: 'Customer Service',
      priority: 'medium',
      documents: [
        { name: 'Delivery Receipt', required: true, status: 'pending', description: 'Proof of delivery' },
        { name: 'Customer Feedback Form', required: false, status: 'pending', description: 'Feedback documentation' }
      ],
      notes: '',
      dependencies: ['shipment-booking'],
      compliance: [
        { standard: 'Customer Satisfaction Standards', authority: 'Quality Assurance', country: 'Global', validity: 'Ongoing', status: 'pending' }
      ],
      costs: [
        { category: 'Customer Service', estimated: 3000, currency: 'USD', notes: 'Support and follow-up' }
      ],
      stakeholders: [
        { role: 'Customer Service Rep', name: 'TBD', contact: '', responsibility: 'Manage delivery confirmation' }
      ],
      risks: [
        { type: 'Customer Dissatisfaction', level: 'medium', mitigation: 'Prompt issue resolution', impact: 'Loss of future business' }
      ],
      kpis: [
        { metric: 'Customer Satisfaction Score', target: '90%', unit: '%' },
        { metric: 'Issue Resolution Time', target: '24 hours', unit: 'hours' }
      ]
    },
    // Trade Completion Phase
    {
      id: 'final-settlement',
      phase: 'completion',
      step: 'Final Payment & Trade Closure',
      description: 'Receive final payment, close trade records, and archive documentation',
      status: 'pending',
      required: true,
      estimatedDays: 5,
      assignedTo: 'Finance Team',
      priority: 'high',
      documents: [
        { name: 'Final Invoice', required: true, status: 'pending', description: 'Invoice for final payment' },
        { name: 'Payment Confirmation', required: true, status: 'pending', description: 'Proof of payment' },
        { name: 'Trade Archive', required: true, status: 'pending', description: 'Archived trade documents' }
      ],
      notes: '',
      dependencies: ['delivery-confirmation'],
      compliance: [
        { standard: 'Financial Reporting Standards', authority: 'Finance Department', country: 'Global', validity: 'Annual', status: 'pending' }
      ],
      costs: [
        { category: 'Bank Charges', estimated: 500, currency: 'USD', notes: 'Transaction fees' }
      ],
      stakeholders: [
        { role: 'Accountant', name: 'TBD', contact: '', responsibility: 'Manage final payments and records' }
      ],
      risks: [
        { type: 'Payment Delays', level: 'high', mitigation: 'Clear payment terms and follow-up', impact: 'Cash flow issues' }
      ],
      kpis: [
        { metric: 'Payment Collection Time', target: '5 days', unit: 'days' },
        { metric: 'Trade Closure Rate', target: '100%', unit: '%' }
      ]
    }
  ];

  useEffect(() => {
    // Initialize with sample data - in real app, fetch from database
    setLifecycleSteps(defaultLifecycleSteps);
  }, []);

  const getPhaseSteps = (phaseId: string) => {
    return lifecycleSteps.filter(step => step.phase === phaseId);
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'in_progress': return Clock;
      case 'blocked': return AlertCircle;
      case 'skipped': return SkipForward;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'blocked': return 'bg-red-500';
      case 'skipped': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUpdateStatus = (stepId: string, newStatus: string) => {
    setLifecycleSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { 
            ...step, 
            status: newStatus as any,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
            actualDays: newStatus === 'completed' ? Math.floor(Math.random() * step.estimatedDays) + 1 : undefined
          }
        : step
    ));
    
    toast({
      title: "Status Updated",
      description: `Step status updated to ${newStatus}`,
    });
  };

  const getPhaseProgress = (phaseId: string) => {
    const phaseSteps = getPhaseSteps(phaseId);
    const completedSteps = phaseSteps.filter(step => step.status === 'completed' || step.status === 'skipped');
    return phaseSteps.length > 0 ? (completedSteps.length / phaseSteps.length) * 100 : 0;
  };

  const getTotalProgress = () => {
    const completedSteps = lifecycleSteps.filter(step => step.status === 'completed' || step.status === 'skipped');
    return (completedSteps.length / lifecycleSteps.length) * 100;
  };

  const renderStepDetails = (step: TradeLifecycleStep) => (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="stakeholders">Team</TabsTrigger>
          <TabsTrigger value="risks">Risks & KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estimated:</span>
                    <span className="font-medium">{step.estimatedDays} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Actual:</span>
                    <span className="font-medium">{step.actualDays || 'In progress'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Due Date:</span>
                    <span className="font-medium">{step.dueDate || 'TBD'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{step.assignedTo}</span>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(step.priority)}`}>
                    {step.priority.toUpperCase()} PRIORITY
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                      {step.status.toUpperCase()}
                    </Badge>
                  </div>
                  <Progress value={step.status === 'completed' ? 100 : step.status === 'in_progress' ? 50 : 0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {step.documents.map((doc, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                    {doc.required && <Badge variant="outline" className="text-red-600">Required</Badge>}
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4">
            {step.compliance.map((comp, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">{comp.standard}</h4>
                      <p className="text-sm text-gray-600">{comp.authority} - {comp.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={comp.status === 'approved' ? 'default' : 'secondary'}>
                      {comp.status}
                    </Badge>
                    <span className="text-sm text-gray-500">Valid: {comp.validity}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid gap-4">
            {step.costs.map((cost, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    <div>
                      <h4 className="font-medium">{cost.category}</h4>
                      <p className="text-sm text-gray-600">{cost.notes}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{cost.estimated.toLocaleString()} {cost.currency}</p>
                    {cost.actual && (
                      <p className="text-sm text-gray-600">Actual: {cost.actual.toLocaleString()} {cost.currency}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stakeholders" className="space-y-4">
          <div className="grid gap-4">
            {step.stakeholders.map((stakeholder, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">{stakeholder.role}</h4>
                      <p className="text-sm text-gray-600">{stakeholder.responsibility}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stakeholder.name || 'TBD'}</span>
                    {stakeholder.contact && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost"><Phone className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost"><Mail className="w-4 h-4" /></Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Risk Assessment
              </h3>
              <div className="grid gap-3">
                {step.risks.map((risk, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{risk.type}</h4>
                        <p className="text-sm text-gray-600">{risk.mitigation}</p>
                      </div>
                      <Badge className={`${
                        risk.level === 'high' ? 'bg-red-100 text-red-800' :
                        risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.level} RISK
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                Key Performance Indicators
              </h3>
              <div className="grid gap-3">
                {step.kpis.map((kpi, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{kpi.metric}</h4>
                        <p className="text-sm text-gray-600">Target: {kpi.target} {kpi.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{kpi.actual || 'Pending'}</p>
                        {kpi.actual && <p className="text-sm text-gray-600">{kpi.unit}</p>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">International Trade Lifecycle</h1>
            <p className="text-gray-600">Comprehensive end-to-end trade process management</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">{Math.round(getTotalProgress())}%</p>
            <p className="text-sm text-gray-500">Overall Progress</p>
          </div>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Enhanced Progress Overview */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            Trade Process Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {phases.map((phase) => {
              const Icon = phase.icon;
              const progress = getPhaseProgress(phase.id);
              
              return (
                <div 
                  key={phase.id}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                    currentPhase === phase.id ? 
                    'border-blue-500 bg-blue-50 shadow-lg' : 
                    'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                  }`}
                  onClick={() => setCurrentPhase(phase.id)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${phase.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2">{phase.name}</h3>
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{Math.round(progress)}%</span>
                      <span>{getPhaseSteps(phase.id).length} steps</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Current Phase Steps */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            {(() => {
              const currentPhaseObj = phases.find(p => p.id === currentPhase);
              const Icon = currentPhaseObj?.icon || Clock;
              return <Icon className="w-6 h-6 text-blue-600" />;
            })()}
            {phases.find(p => p.id === currentPhase)?.name} - Detailed Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {getPhaseSteps(currentPhase).map((step, index) => {
              const Icon = getStepIcon(step.status);
              
              return (
                <Card key={step.id} className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)} text-white font-bold text-sm`}>
                            {index + 1}
                          </div>
                          <Icon className={`w-6 h-6 ${
                            step.status === 'completed' ? 'text-green-600' :
                            step.status === 'in_progress' ? 'text-blue-600' :
                            step.status === 'blocked' ? 'text-red-600' :
                            step.status === 'skipped' ? 'text-gray-600' :
                            'text-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-bold">{step.step}</h3>
                            {!step.required && (
                              <Badge variant="outline" className="text-xs">Optional</Badge>
                            )}
                            <Badge variant={step.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                              {step.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={`text-xs ${getPriorityColor(step.priority)}`}>
                              {step.priority.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Assigned To</p>
                              <p className="text-gray-600 text-sm">{step.assignedTo}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Duration</p>
                              <p className="text-gray-600 text-sm">{step.estimatedDays} days (est.)</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Documents</p>
                              <p className="text-gray-600 text-sm">{step.documents.length} required</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Stakeholders</p>
                              <p className="text-gray-600 text-sm">{step.stakeholders.length} involved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {step.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleUpdateStatus(step.id, 'in_progress')}
                              className="flex items-center gap-2"
                            >
                              <Clock className="w-4 h-4" />
                              Start
                            </Button>
                            {!step.required && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedStep(step);
                                  setShowSkipDialog(true);
                                }}
                                className="flex items-center gap-2"
                              >
                                <SkipForward className="w-4 h-4" />
                                Skip
                              </Button>
                            )}
                          </>
                        )}
                        
                        {step.status === 'in_progress' && (
                          <>
                            <Button 
                              size="sm"
                              onClick={() => handleUpdateStatus(step.id, 'completed')}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Complete
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUpdateStatus(step.id, 'blocked')}
                              className="flex items-center gap-2"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Block
                            </Button>
                          </>
                        )}
                        
                        {step.status === 'blocked' && (
                          <Button 
                            size="sm"
                            onClick={() => handleUpdateStatus(step.id, 'in_progress')}
                            className="flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            Unblock
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedStep(selectedStep?.id === step.id ? null : step)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          {selectedStep?.id === step.id ? 'Hide' : 'Details'}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Detailed Step Information */}
                    {selectedStep?.id === step.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        {renderStepDetails(step)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skip Dialog */}
      {showSkipDialog && selectedStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SkipForward className="w-5 h-5" />
                Skip Step: {selectedStep.step}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Please provide a detailed reason for skipping this step:
              </p>
              <Textarea
                placeholder="Enter skip reason..."
                value={skipReason}
                onChange={(e) => setSkipReason(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowSkipDialog(false);
                    setSkipReason('');
                    setSelectedStep(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setLifecycleSteps(prev => prev.map(step => 
                      step.id === selectedStep.id 
                        ? { ...step, status: 'skipped', skipReason: skipReason }
                        : step
                    ));
                    setShowSkipDialog(false);
                    setSkipReason('');
                    setSelectedStep(null);
                    toast({
                      title: "Step Skipped",
                      description: "Step has been marked as skipped with reason",
                    });
                  }}
                  disabled={!skipReason.trim()}
                  className="flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip Step
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
