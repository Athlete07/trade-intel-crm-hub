
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield,
  FileCheck,
  AlertTriangle,
  Clock,
  Users,
  Globe,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  Upload,
  Calendar,
  DollarSign,
  Scale,
  Building2,
  Workflow,
  Star
} from "lucide-react";

interface EnterpriseLifecycleManagerProps {
  dealId: string;
  onBack: () => void;
}

interface ComplianceItem {
  id: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'not-applicable';
  evidence: string[];
  dueDate: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
}

interface RiskAssessment {
  id: string;
  category: string;
  description: string;
  probability: number;
  impact: number;
  riskScore: number;
  mitigation: string;
  status: 'open' | 'mitigated' | 'closed';
  owner: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dependencies: string[];
  deliverables: string[];
  approver: string;
  criticalPath: boolean;
}

export function EnterpriseLifecycleManager({ dealId, onBack }: EnterpriseLifecycleManagerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [deal, setDeal] = useState<any>(null);
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [auditTrail, setAuditTrail] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadDealData();
    initializeEnterpriseData();
  }, [dealId]);

  const loadDealData = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('id', dealId)
        .single();

      if (error) throw error;
      setDeal(data);
    } catch (error) {
      console.error('Error loading deal:', error);
    }
  };

  const initializeEnterpriseData = () => {
    // Initialize compliance framework (ISO 9001, ISO 14001, OHSAS 18001, etc.)
    setComplianceItems([
      {
        id: 'iso-9001',
        requirement: 'ISO 9001 Quality Management System',
        status: 'compliant',
        evidence: ['QMS Certificate', 'Process Documentation'],
        dueDate: '2024-12-31',
        owner: 'Quality Manager',
        priority: 'high'
      },
      {
        id: 'aeo-status',
        requirement: 'Authorized Economic Operator (AEO)',
        status: 'pending',
        evidence: ['Application Submitted'],
        dueDate: '2024-06-30',
        owner: 'Compliance Officer',
        priority: 'high'
      },
      {
        id: 'kyc-compliance',
        requirement: 'Know Your Customer (KYC) Verification',
        status: 'compliant',
        evidence: ['Customer Due Diligence Report', 'Financial Statements'],
        dueDate: '2024-03-31',
        owner: 'Risk Manager',
        priority: 'high'
      },
      {
        id: 'ctpat',
        requirement: 'C-TPAT Certification (US Trade)',
        status: 'non-compliant',
        evidence: [],
        dueDate: '2024-08-31',
        owner: 'Security Manager',
        priority: 'medium'
      },
      {
        id: 'gdpr',
        requirement: 'GDPR Data Protection Compliance',
        status: 'compliant',
        evidence: ['Privacy Policy', 'Data Processing Agreement'],
        dueDate: '2024-05-25',
        owner: 'Data Protection Officer',
        priority: 'medium'
      }
    ]);

    // Initialize risk assessment matrix
    setRiskAssessments([
      {
        id: 'currency-risk',
        category: 'Financial Risk',
        description: 'Currency exchange rate fluctuation risk',
        probability: 70,
        impact: 80,
        riskScore: 56,
        mitigation: 'Forward contract hedging strategy implemented',
        status: 'mitigated',
        owner: 'Treasury Manager'
      },
      {
        id: 'political-risk',
        category: 'Country Risk',
        description: 'Political instability in destination country',
        probability: 30,
        impact: 90,
        riskScore: 27,
        mitigation: 'Political risk insurance coverage obtained',
        status: 'mitigated',
        owner: 'Risk Manager'
      },
      {
        id: 'supply-chain-risk',
        category: 'Operational Risk',
        description: 'Supply chain disruption due to force majeure',
        probability: 40,
        impact: 70,
        riskScore: 28,
        mitigation: 'Alternative supplier agreements in place',
        status: 'open',
        owner: 'Supply Chain Manager'
      },
      {
        id: 'credit-risk',
        category: 'Financial Risk',
        description: 'Customer payment default risk',
        probability: 25,
        impact: 85,
        riskScore: 21,
        mitigation: 'Letter of Credit and trade credit insurance',
        status: 'mitigated',
        owner: 'Credit Manager'
      }
    ]);

    // Initialize enterprise milestones
    setMilestones([
      {
        id: 'contract-negotiation',
        name: 'Contract Negotiation & Finalization',
        description: 'Complete commercial and legal terms negotiation',
        dueDate: '2024-02-15',
        status: 'completed',
        dependencies: [],
        deliverables: ['Signed Contract', 'Payment Terms Agreement'],
        approver: 'Legal Director',
        criticalPath: true
      },
      {
        id: 'lc-arrangement',
        name: 'Letter of Credit Arrangement',
        description: 'Establish LC with advising and confirming banks',
        dueDate: '2024-02-28',
        status: 'in-progress',
        dependencies: ['contract-negotiation'],
        deliverables: ['LC Application', 'Bank Confirmation'],
        approver: 'Finance Director',
        criticalPath: true
      },
      {
        id: 'quality-inspection',
        name: 'Pre-shipment Quality Inspection',
        description: 'Third-party quality inspection and certification',
        dueDate: '2024-03-15',
        status: 'pending',
        dependencies: ['production-completion'],
        deliverables: ['Inspection Certificate', 'Quality Report'],
        approver: 'Quality Director',
        criticalPath: true
      },
      {
        id: 'export-clearance',
        name: 'Export License & Customs Clearance',
        description: 'Obtain export permits and clear customs',
        dueDate: '2024-03-20',
        status: 'pending',
        dependencies: ['quality-inspection'],
        deliverables: ['Export License', 'Customs Clearance'],
        approver: 'Trade Director',
        criticalPath: true
      }
    ]);

    // Initialize audit trail
    setAuditTrail([
      {
        id: '1',
        timestamp: '2024-01-15T10:30:00Z',
        user: 'john.smith@company.com',
        action: 'Deal Created',
        details: 'New international trade deal initiated',
        category: 'Lifecycle'
      },
      {
        id: '2',
        timestamp: '2024-01-16T14:20:00Z',
        user: 'jane.doe@company.com',
        action: 'Risk Assessment Completed',
        details: 'Comprehensive risk assessment matrix updated',
        category: 'Risk Management'
      },
      {
        id: '3',
        timestamp: '2024-01-17T09:15:00Z',
        user: 'compliance@company.com',
        action: 'Compliance Check Initiated',
        details: 'ISO 9001 compliance verification started',
        category: 'Compliance'
      }
    ]);
  };

  const getComplianceStats = () => {
    const total = complianceItems.length;
    const compliant = complianceItems.filter(item => item.status === 'compliant').length;
    const pending = complianceItems.filter(item => item.status === 'pending').length;
    const nonCompliant = complianceItems.filter(item => item.status === 'non-compliant').length;
    
    return { total, compliant, pending, nonCompliant, complianceRate: (compliant / total) * 100 };
  };

  const getRiskStats = () => {
    const totalRisks = riskAssessments.length;
    const highRisks = riskAssessments.filter(risk => risk.riskScore > 50).length;
    const mitigatedRisks = riskAssessments.filter(risk => risk.status === 'mitigated').length;
    const avgRiskScore = riskAssessments.reduce((sum, risk) => sum + risk.riskScore, 0) / totalRisks;
    
    return { totalRisks, highRisks, mitigatedRisks, avgRiskScore };
  };

  const getMilestoneStats = () => {
    const total = milestones.length;
    const completed = milestones.filter(m => m.status === 'completed').length;
    const inProgress = milestones.filter(m => m.status === 'in-progress').length;
    const overdue = milestones.filter(m => m.status === 'overdue').length;
    
    return { total, completed, inProgress, overdue, completionRate: (completed / total) * 100 };
  };

  const complianceStats = getComplianceStats();
  const riskStats = getRiskStats();
  const milestoneStats = getMilestoneStats();

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'compliant': 'bg-green-100 text-green-800',
      'non-compliant': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'not-applicable': 'bg-gray-100 text-gray-800',
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'overdue': 'bg-red-100 text-red-800',
      'open': 'bg-orange-100 text-orange-800',
      'mitigated': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Deals
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Enterprise Lifecycle Management</h1>
          {deal && (
            <p className="text-gray-600">
              {deal.company} - {deal.product} | Value: ${deal.value?.toLocaleString()} {deal.currency}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Enterprise Grade
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{complianceStats.complianceRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-500">Compliance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{riskStats.avgRiskScore.toFixed(1)}</p>
                <p className="text-sm text-gray-500">Avg Risk Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{milestoneStats.completionRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-500">Milestone Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">AAA</p>
                <p className="text-sm text-gray-500">Credit Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Process Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="w-5 h-5" />
                  Enterprise Process Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                    <span className="font-medium">Sales Lifecycle</span>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                    <span className="font-medium">Contract & Documentation</span>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Production & Quality</span>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Logistics & Shipment</span>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">Post-Shipment</span>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Critical Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-800">C-TPAT Non-Compliance</h4>
                      <p className="text-sm text-red-600">Security certification required for US trade</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                    <div>
                      <h4 className="font-medium text-yellow-800">LC Expiry Approaching</h4>
                      <p className="text-sm text-yellow-600">Letter of Credit expires in 15 days</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                    <div>
                      <h4 className="font-medium text-orange-800">Supply Chain Risk</h4>
                      <p className="text-sm text-orange-600">Force majeure risk requires mitigation</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Shield className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {complianceItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{item.requirement}</h3>
                      <p className="text-sm text-gray-600">Owner: {item.owner} | Due: {item.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  </div>
                  {item.evidence.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Evidence:</h4>
                      <div className="flex gap-2">
                        {item.evidence.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileCheck className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {riskAssessments.map((risk) => (
              <Card key={risk.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{risk.description}</h3>
                      <p className="text-sm text-gray-600">{risk.category} | Owner: {risk.owner}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(risk.status)}>{risk.status}</Badge>
                      <div className="text-right">
                        <p className="font-bold text-lg">{risk.riskScore}</p>
                        <p className="text-xs text-gray-500">Risk Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Probability</p>
                      <Progress value={risk.probability} className="h-2" />
                      <p className="text-xs text-gray-500">{risk.probability}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Impact</p>
                      <Progress value={risk.impact} className="h-2" />
                      <p className="text-xs text-gray-500">{risk.impact}%</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Mitigation Strategy:</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{risk.mitigation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {milestones.map((milestone) => (
              <Card key={milestone.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{milestone.name}</h3>
                        {milestone.criticalPath && (
                          <Badge variant="destructive" className="text-xs">Critical Path</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                      <p className="text-sm text-gray-500">Due: {milestone.dueDate} | Approver: {milestone.approver}</p>
                    </div>
                    <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                  </div>
                  {milestone.deliverables.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Deliverables:</h4>
                      <div className="flex gap-2">
                        {milestone.deliverables.map((deliverable, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {deliverable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {milestone.dependencies.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Dependencies:</h4>
                      <div className="flex gap-2">
                        {milestone.dependencies.map((dep, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Document Management Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Commercial Documents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sales Contract</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Commercial Invoice</span>
                      <Clock className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Packing List</span>
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Trade Finance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Letter of Credit</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bill of Exchange</span>
                      <Clock className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Insurance Policy</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Compliance & Certificates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Certificate of Origin</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quality Certificate</span>
                      <Clock className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Export License</span>
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Audit Trail & Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditTrail.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{entry.action}</h4>
                      <p className="text-sm text-gray-600">{entry.details}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()} | {entry.user}
                      </p>
                    </div>
                    <Badge variant="outline">{entry.category}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
