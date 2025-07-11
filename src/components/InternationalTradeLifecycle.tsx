
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Globe,
  Truck,
  Shield,
  Ship,
  Plane,
  Building2,
  CreditCard,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Eye,
  Download,
  Star
} from "lucide-react";

interface TradeLifecycleProps {
  onBack: () => void;
  dealId?: string;
}

interface TradePhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  progress: number;
  workflows: TradeWorkflow[];
  kpis: TradeKPI[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceScore: number;
  estimatedDuration: number;
  actualDuration: number;
}

interface TradeWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  department: string;
  dueDate: string;
  completedDate?: string;
  documents: TradeDocument[];
  checkpoints: TradeCheckpoint[];
  dependencies: string[];
  estimatedHours: number;
  actualHours: number;
  approvalRequired: boolean;
  approver?: string;
}

interface TradeDocument {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'draft' | 'review' | 'approved' | 'rejected';
  required: boolean;
  template?: string;
  version: string;
  lastModified: string;
}

interface TradeCheckpoint {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  required: boolean;
  verificationMethod: string;
  evidence?: string;
  verifiedBy?: string;
  verificationDate?: string;
}

interface TradeKPI {
  metric: string;
  target: number;
  actual: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'time' | 'cost' | 'quality' | 'compliance';
}

export function InternationalTradeLifecycle({ onBack, dealId }: TradeLifecycleProps) {
  const [tradePhases, setTradePhases] = useState<TradePhase[]>([
    {
      id: 'contract-execution',
      name: 'Contract Execution & Legal Framework',
      description: 'International sales contract finalization and legal documentation',
      status: 'pending',
      progress: 0,
      riskLevel: 'high',
      complianceScore: 95,
      estimatedDuration: 15,
      actualDuration: 0,
      kpis: [
        { metric: 'Contract Turnaround', target: 7, actual: 0, unit: 'days', trend: 'stable', category: 'time' },
        { metric: 'Legal Compliance', target: 100, actual: 95, unit: '%', trend: 'up', category: 'compliance' }
      ],
      workflows: [
        {
          id: 'contract-drafting',
          name: 'Master Sales Contract Drafting',
          description: 'Prepare comprehensive international sales contract with INCOTERMS',
          status: 'pending',
          priority: 'critical',
          assignee: 'Legal Team',
          department: 'Legal',
          dueDate: '2024-01-20',
          estimatedHours: 24,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Chief Legal Officer',
          dependencies: [],
          documents: [
            { id: 'contract-001', name: 'Master Sales Agreement', type: 'Contract', status: 'pending', required: true, template: 'MSA-Template-v2.1', version: '1.0', lastModified: '' },
            { id: 'incoterms-001', name: 'INCOTERMS Specification', type: 'Commercial', status: 'pending', required: true, template: 'INCOTERMS-2020', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-001', name: 'INCOTERMS Correctly Applied', description: 'Verify correct INCOTERMS 2020 application', status: 'pending', required: true, verificationMethod: 'Legal Review' },
            { id: 'cp-002', name: 'Force Majeure Clauses', description: 'Include comprehensive force majeure provisions', status: 'pending', required: true, verificationMethod: 'Legal Review' },
            { id: 'cp-003', name: 'Governing Law Specified', description: 'Clear jurisdiction and governing law clauses', status: 'pending', required: true, verificationMethod: 'Legal Review' }
          ]
        },
        {
          id: 'credit-terms',
          name: 'Payment Terms & Credit Assessment',
          description: 'Establish secure payment mechanisms and credit evaluation',
          status: 'pending',
          priority: 'high',
          assignee: 'Finance Team',
          department: 'Finance',
          dueDate: '2024-01-22',
          estimatedHours: 16,
          actualHours: 0,
          approvalRequired: true,
          approver: 'CFO',
          dependencies: ['contract-drafting'],
          documents: [
            { id: 'credit-001', name: 'Credit Assessment Report', type: 'Financial', status: 'pending', required: true, template: 'Credit-Analysis-v3.0', version: '1.0', lastModified: '' },
            { id: 'payment-001', name: 'Payment Security Matrix', type: 'Financial', status: 'pending', required: true, template: 'Payment-Security-v2.0', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-004', name: 'Credit Rating Verified', description: 'Minimum B+ credit rating confirmed', status: 'pending', required: true, verificationMethod: 'Credit Bureau Check' },
            { id: 'cp-005', name: 'Payment Security Established', description: 'LC or bank guarantee secured', status: 'pending', required: true, verificationMethod: 'Bank Confirmation' }
          ]
        }
      ]
    },
    {
      id: 'trade-documentation',
      name: 'International Trade Documentation',
      description: 'Complete trade documentation and regulatory compliance',
      status: 'pending',
      progress: 0,
      riskLevel: 'high',
      complianceScore: 92,
      estimatedDuration: 20,
      actualDuration: 0,
      kpis: [
        { metric: 'Documentation Accuracy', target: 99.5, actual: 0, unit: '%', trend: 'stable', category: 'quality' },
        { metric: 'Customs Clearance Time', target: 3, actual: 0, unit: 'days', trend: 'stable', category: 'time' }
      ],
      workflows: [
        {
          id: 'export-documentation',
          name: 'Export Documentation Package',
          description: 'Prepare complete export documentation suite',
          status: 'pending',
          priority: 'critical',
          assignee: 'Trade Compliance',
          department: 'Operations',
          dueDate: '2024-01-25',
          estimatedHours: 20,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Trade Compliance Manager',
          dependencies: [],
          documents: [
            { id: 'invoice-001', name: 'Commercial Invoice', type: 'Commercial', status: 'pending', required: true, template: 'CI-Template-v4.0', version: '1.0', lastModified: '' },
            { id: 'packing-001', name: 'Packing List', type: 'Logistics', status: 'pending', required: true, template: 'PL-Template-v3.0', version: '1.0', lastModified: '' },
            { id: 'certificate-001', name: 'Certificate of Origin', type: 'Regulatory', status: 'pending', required: true, template: 'CO-Form-A', version: '1.0', lastModified: '' },
            { id: 'inspection-001', name: 'Pre-shipment Inspection Certificate', type: 'Quality', status: 'pending', required: true, template: 'PSI-Certificate', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-006', name: 'HS Code Classification', description: 'Accurate Harmonized System code assignment', status: 'pending', required: true, verificationMethod: 'Customs Expert Review' },
            { id: 'cp-007', name: 'Value Declaration Accuracy', description: 'Correct valuation for customs purposes', status: 'pending', required: true, verificationMethod: 'Financial Audit' }
          ]
        },
        {
          id: 'regulatory-compliance',
          name: 'Regulatory Compliance & Licensing',
          description: 'Ensure all regulatory requirements and licenses are in place',
          status: 'pending',
          priority: 'critical',
          assignee: 'Compliance Officer',
          department: 'Compliance',
          dueDate: '2024-01-27',
          estimatedHours: 16,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Chief Compliance Officer',
          dependencies: ['export-documentation'],
          documents: [
            { id: 'license-001', name: 'Export License', type: 'Regulatory', status: 'pending', required: true, template: 'Export-License-App', version: '1.0', lastModified: '' },
            { id: 'sanctions-001', name: 'Sanctions Screening Report', type: 'Compliance', status: 'pending', required: true, template: 'Sanctions-Check-v2.0', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-008', name: 'Export Control Compliance', description: 'No restricted dual-use items', status: 'pending', required: true, verificationMethod: 'Export Control Review' },
            { id: 'cp-009', name: 'Sanctions Clearance', description: 'Buyer not on sanctions lists', status: 'pending', required: true, verificationMethod: 'Automated Screening' }
          ]
        }
      ]
    },
    {
      id: 'production-fulfillment',
      name: 'Production & Order Fulfillment',
      description: 'Manufacturing coordination and quality assurance',
      status: 'pending',
      progress: 0,
      riskLevel: 'medium',
      complianceScore: 88,
      estimatedDuration: 45,
      actualDuration: 0,
      kpis: [
        { metric: 'Production Timeline', target: 100, actual: 0, unit: '%', trend: 'stable', category: 'time' },
        { metric: 'Quality Score', target: 99, actual: 0, unit: '%', trend: 'up', category: 'quality' },
        { metric: 'Cost Variance', target: 5, actual: 0, unit: '%', trend: 'stable', category: 'cost' }
      ],
      workflows: [
        {
          id: 'production-planning',
          name: 'Production Planning & Scheduling',
          description: 'Detailed production planning with resource allocation',
          status: 'pending',
          priority: 'high',
          assignee: 'Production Manager',
          department: 'Manufacturing',
          dueDate: '2024-02-01',
          estimatedHours: 12,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Operations Director',
          dependencies: [],
          documents: [
            { id: 'prod-plan-001', name: 'Master Production Schedule', type: 'Planning', status: 'pending', required: true, template: 'MPS-Template-v2.0', version: '1.0', lastModified: '' },
            { id: 'resource-001', name: 'Resource Allocation Plan', type: 'Planning', status: 'pending', required: true, template: 'Resource-Plan-v1.5', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-010', name: 'Capacity Verification', description: 'Production capacity confirmed for delivery date', status: 'pending', required: true, verificationMethod: 'Capacity Analysis' },
            { id: 'cp-011', name: 'Material Availability', description: 'All raw materials secured', status: 'pending', required: true, verificationMethod: 'Inventory Check' }
          ]
        },
        {
          id: 'quality-control',
          name: 'Quality Control & Testing',
          description: 'Comprehensive quality assurance and testing protocols',
          status: 'pending',
          priority: 'critical',
          assignee: 'QC Manager',
          department: 'Quality',
          dueDate: '2024-02-15',
          estimatedHours: 32,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Quality Director',
          dependencies: ['production-planning'],
          documents: [
            { id: 'qc-plan-001', name: 'Quality Control Plan', type: 'Quality', status: 'pending', required: true, template: 'QCP-Template-v3.0', version: '1.0', lastModified: '' },
            { id: 'test-cert-001', name: 'Test Certificates', type: 'Quality', status: 'pending', required: true, template: 'Test-Cert-v2.0', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-012', name: 'Incoming Material QC', description: 'All raw materials pass quality tests', status: 'pending', required: true, verificationMethod: 'Lab Testing' },
            { id: 'cp-013', name: 'Final Product Inspection', description: 'Finished goods meet specifications', status: 'pending', required: true, verificationMethod: 'Final Inspection' }
          ]
        }
      ]
    },
    {
      id: 'logistics-shipping',
      name: 'Logistics & International Shipping',
      description: 'Transportation coordination and logistics management',
      status: 'pending',
      progress: 0,
      riskLevel: 'medium',
      complianceScore: 90,
      estimatedDuration: 25,
      actualDuration: 0,
      kpis: [
        { metric: 'On-time Shipment', target: 95, actual: 0, unit: '%', trend: 'stable', category: 'time' },
        { metric: 'Shipping Cost Efficiency', target: 90, actual: 0, unit: '%', trend: 'up', category: 'cost' },
        { metric: 'Cargo Security Score', target: 100, actual: 0, unit: '%', trend: 'stable', category: 'quality' }
      ],
      workflows: [
        {
          id: 'freight-booking',
          name: 'Freight Booking & Transportation',
          description: 'Secure appropriate transportation and freight services',
          status: 'pending',
          priority: 'high',
          assignee: 'Logistics Coordinator',
          department: 'Logistics',
          dueDate: '2024-02-20',
          estimatedHours: 16,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Logistics Manager',
          dependencies: [],
          documents: [
            { id: 'booking-001', name: 'Freight Booking Confirmation', type: 'Logistics', status: 'pending', required: true, template: 'FB-Confirmation', version: '1.0', lastModified: '' },
            { id: 'insurance-001', name: 'Cargo Insurance Policy', type: 'Insurance', status: 'pending', required: true, template: 'Cargo-Insurance', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-014', name: 'Freight Rate Optimization', description: 'Best available rate secured', status: 'pending', required: true, verificationMethod: 'Rate Comparison' },
            { id: 'cp-015', name: 'Transit Time Confirmation', description: 'Delivery schedule meets contract terms', status: 'pending', required: true, verificationMethod: 'Schedule Verification' }
          ]
        },
        {
          id: 'export-clearance',
          name: 'Export Clearance & Customs',
          description: 'Complete export customs clearance procedures',
          status: 'pending',
          priority: 'critical',
          assignee: 'Customs Broker',
          department: 'Logistics',
          dueDate: '2024-02-22',
          estimatedHours: 8,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Trade Compliance Manager',
          dependencies: ['freight-booking'],
          documents: [
            { id: 'customs-001', name: 'Customs Declaration', type: 'Customs', status: 'pending', required: true, template: 'Export-Declaration', version: '1.0', lastModified: '' },
            { id: 'aes-001', name: 'AES Filing Confirmation', type: 'Customs', status: 'pending', required: true, template: 'AES-Filing', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-016', name: 'Customs Documentation Review', description: 'All customs documents verified', status: 'pending', required: true, verificationMethod: 'Customs Review' },
            { id: 'cp-017', name: 'Export Clearance Obtained', description: 'Goods cleared for export', status: 'pending', required: true, verificationMethod: 'Customs Clearance' }
          ]
        }
      ]
    },
    {
      id: 'delivery-settlement',
      name: 'Delivery & Financial Settlement',
      description: 'Final delivery coordination and payment processing',
      status: 'pending',
      progress: 0,
      riskLevel: 'low',
      complianceScore: 94,
      estimatedDuration: 10,
      actualDuration: 0,
      kpis: [
        { metric: 'Delivery Accuracy', target: 99, actual: 0, unit: '%', trend: 'stable', category: 'quality' },
        { metric: 'Payment Collection', target: 100, actual: 0, unit: '%', trend: 'stable', category: 'cost' },
        { metric: 'Customer Satisfaction', target: 4.5, actual: 0, unit: '/5', trend: 'up', category: 'quality' }
      ],
      workflows: [
        {
          id: 'shipment-tracking',
          name: 'Shipment Tracking & Monitoring',
          description: 'Real-time shipment tracking and status updates',
          status: 'pending',
          priority: 'medium',
          assignee: 'Customer Service',
          department: 'Customer Service',
          dueDate: '2024-02-25',
          estimatedHours: 20,
          actualHours: 0,
          approvalRequired: false,
          dependencies: [],
          documents: [
            { id: 'tracking-001', name: 'Shipment Tracking Report', type: 'Logistics', status: 'pending', required: true, template: 'Tracking-Report', version: '1.0', lastModified: '' },
            { id: 'delivery-001', name: 'Delivery Confirmation', type: 'Delivery', status: 'pending', required: true, template: 'Delivery-Confirmation', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-018', name: 'Real-time Tracking Active', description: 'GPS/RFID tracking operational', status: 'pending', required: true, verificationMethod: 'System Check' },
            { id: 'cp-019', name: 'Customer Notifications Sent', description: 'Proactive status updates provided', status: 'pending', required: true, verificationMethod: 'Notification Log' }
          ]
        },
        {
          id: 'payment-collection',
          name: 'Payment Processing & Collection',
          description: 'Secure payment collection and reconciliation',
          status: 'pending',
          priority: 'critical',
          assignee: 'Accounts Receivable',
          department: 'Finance',
          dueDate: '2024-02-28',
          estimatedHours: 8,
          actualHours: 0,
          approvalRequired: true,
          approver: 'Finance Director',
          dependencies: ['shipment-tracking'],
          documents: [
            { id: 'invoice-final-001', name: 'Final Invoice', type: 'Financial', status: 'pending', required: true, template: 'Final-Invoice', version: '1.0', lastModified: '' },
            { id: 'payment-001', name: 'Payment Confirmation', type: 'Financial', status: 'pending', required: true, template: 'Payment-Confirmation', version: '1.0', lastModified: '' }
          ],
          checkpoints: [
            { id: 'cp-020', name: 'Payment Terms Verified', description: 'Payment received per contract terms', status: 'pending', required: true, verificationMethod: 'Bank Confirmation' },
            { id: 'cp-021', name: 'Financial Reconciliation', description: 'All financial records reconciled', status: 'pending', required: true, verificationMethod: 'Financial Audit' }
          ]
        }
      ]
    }
  ]);

  const [currentPhase, setCurrentPhase] = useState(0);
  const [associatedDeal, setAssociatedDeal] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (dealId) {
      loadAssociatedDeal();
    }
  }, [dealId]);

  const loadAssociatedDeal = async () => {
    if (!dealId) return;
    
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('id', dealId)
        .single();

      if (error) throw error;
      setAssociatedDeal(data);
    } catch (error) {
      console.error('Error loading associated deal:', error);
    }
  };

  const overallProgress = tradePhases.reduce((acc, phase) => acc + phase.progress, 0) / tradePhases.length;

  const handleCompleteCheckpoint = (phaseId: string, workflowId: string, checkpointId: string) => {
    setTradePhases(prev => 
      prev.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            workflows: phase.workflows.map(workflow => {
              if (workflow.id === workflowId) {
                return {
                  ...workflow,
                  checkpoints: workflow.checkpoints.map(cp => 
                    cp.id === checkpointId 
                      ? { ...cp, status: 'completed', verificationDate: new Date().toISOString() }
                      : cp
                  )
                };
              }
              return workflow;
            })
          };
        }
        return phase;
      })
    );
  };

  const handleCompleteWorkflow = (phaseId: string, workflowId: string) => {
    setTradePhases(prev => 
      prev.map(phase => {
        if (phase.id === phaseId) {
          const updatedWorkflows = phase.workflows.map(workflow => 
            workflow.id === workflowId 
              ? { ...workflow, status: 'completed' as const, completedDate: new Date().toISOString() }
              : workflow
          );
          
          const completedWorkflows = updatedWorkflows.filter(w => w.status === 'completed').length;
          const newProgress = (completedWorkflows / updatedWorkflows.length) * 100;
          
          return { ...phase, workflows: updatedWorkflows, progress: newProgress };
        }
        return phase;
      })
    );

    toast({
      title: "Workflow Completed!",
      description: "Trade workflow has been marked as completed.",
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-700 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">International Trade Lifecycle</h1>
            <p className="text-gray-600">End-to-End Trade Management | INCOTERMS 2020 Compliant</p>
            {associatedDeal && (
              <Badge variant="outline" className="mt-2">
                {associatedDeal.company} - ${associatedDeal.value?.toLocaleString()} {associatedDeal.currency}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {Math.round(overallProgress)}% Complete
          </Badge>
          <Badge className={getRiskColor(tradePhases[currentPhase]?.riskLevel || 'low')}>
            Risk: {tradePhases[currentPhase]?.riskLevel?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Executive Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Trade Efficiency</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Cycle Time</p>
                <p className="text-2xl font-bold">85d</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Cost Efficiency</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Compliance</p>
                <p className="text-2xl font-bold">{tradePhases[currentPhase]?.complianceScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Quality Score</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tradePhases.map((phase, index) => (
          <Card 
            key={phase.id} 
            className={`cursor-pointer transition-all ${currentPhase === index ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setCurrentPhase(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getStatusColor(phase.status)}>
                  {phase.status}
                </Badge>
                <span className="text-sm font-medium">{Math.round(phase.progress)}%</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{phase.name}</h3>
              <Progress value={phase.progress} className="h-2" />
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{phase.estimatedDuration}d est.</span>
                <span>{phase.complianceScore}% compliant</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Phase Details */}
      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="kpis">KPIs & Analytics</TabsTrigger>
          <TabsTrigger value="documents">Document Center</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Dashboard</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          {tradePhases[currentPhase]?.workflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      workflow.status === 'completed' ? 'bg-green-100 text-green-600' :
                      workflow.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {workflow.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(workflow.priority)}>
                      {workflow.priority}
                    </Badge>
                    <Badge className={getStatusColor(workflow.status)}>
                      {workflow.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium">Assignee</Label>
                    <p className="text-sm">{workflow.assignee}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm">{workflow.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <p className="text-sm">{workflow.dueDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Est. Hours</Label>
                    <p className="text-sm">{workflow.estimatedHours}h</p>
                  </div>
                </div>

                {/* Quality Checkpoints */}
                <div className="space-y-2 mb-4">
                  <Label className="text-sm font-medium">Quality Checkpoints</Label>
                  {workflow.checkpoints.map((checkpoint) => (
                    <div key={checkpoint.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={checkpoint.status === 'completed'}
                          onChange={() => handleCompleteCheckpoint(tradePhases[currentPhase].id, workflow.id, checkpoint.id)}
                          className="rounded"
                        />
                        <div>
                          <span className={checkpoint.required ? 'font-medium' : ''}>{checkpoint.name}</span>
                          <p className="text-xs text-gray-500">{checkpoint.description}</p>
                        </div>
                        {checkpoint.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      </div>
                      {checkpoint.status === 'completed' && (
                        <Badge className="bg-green-100 text-green-600">Verified</Badge>
                      )}
                    </div>
                  ))}
                </div>

                {/* Documents */}
                <div className="mb-4">
                  <Label className="text-sm font-medium">Required Documents</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {workflow.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 border rounded text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <div>
                            <span className={doc.required ? 'font-medium' : ''}>{doc.name}</span>
                            <p className="text-xs text-gray-500">v{doc.version} • {doc.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(doc.status)} variant="outline">
                            {doc.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {workflow.approvalRequired && (
                  <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium">Approval Required</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Approver: {workflow.approver}
                    </p>
                  </div>
                )}

                {workflow.status !== 'completed' && (
                  <Button 
                    onClick={() => handleCompleteWorkflow(tradePhases[currentPhase].id, workflow.id)}
                    className="w-full"
                  >
                    Complete Workflow
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kpis">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tradePhases[currentPhase]?.kpis.map((kpi, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {kpi.category === 'time' && <Clock className="w-5 h-5 text-blue-600" />}
                    {kpi.category === 'cost' && <DollarSign className="w-5 h-5 text-green-600" />}
                    {kpi.category === 'quality' && <Star className="w-5 h-5 text-yellow-600" />}
                    {kpi.category === 'compliance' && <Shield className="w-5 h-5 text-purple-600" />}
                    {kpi.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span>Target: {kpi.target}{kpi.unit}</span>
                    <span>Actual: {kpi.actual}{kpi.unit}</span>
                  </div>
                  <Progress value={(kpi.actual / kpi.target) * 100} className="h-3" />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        kpi.trend === 'up' ? 'text-green-600' : 
                        kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      <span className="text-sm capitalize">{kpi.trend}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {kpi.category.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['INCOTERMS 2020 Guide', 'Letter of Credit Template', 'Export Declaration Form', 'Quality Certificate Template'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>{doc}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tradePhases[currentPhase]?.workflows.flatMap(w => w.documents).slice(0, 4).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          <p className="text-xs text-gray-500">Version {doc.version}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'INCOTERMS 2020 Compliance', status: 'compliant', score: 100 },
                    { name: 'Export Control Regulations', status: 'compliant', score: 95 },
                    { name: 'AML/KYC Requirements', status: 'compliant', score: 98 },
                    { name: 'International Sanctions', status: 'compliant', score: 100 },
                    { name: 'Trade Documentation Standards', status: 'review', score: 88 },
                    { name: 'Quality Assurance Protocols', status: 'compliant', score: 92 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center gap-3">
                        <Shield className={`w-5 h-5 ${
                          item.status === 'compliant' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <p className="text-sm text-gray-500">{item.score}% compliance score</p>
                        </div>
                      </div>
                      <Badge className={item.status === 'compliant' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Trade Lifecycle Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradePhases.map((phase, index) => (
                  <div key={phase.id} className="flex items-center gap-4 p-4 border rounded">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentPhase ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{phase.name}</h4>
                      <p className="text-sm text-gray-600">{phase.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Duration: {phase.estimatedDuration} days</span>
                        <Progress value={phase.progress} className="w-24 h-2" />
                        <span className="text-xs font-medium">{Math.round(phase.progress)}%</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.status}
                    </Badge>
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
