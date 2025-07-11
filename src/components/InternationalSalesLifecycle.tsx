
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Globe,
  Target,
  TrendingUp,
  Shield,
  Calendar,
  DollarSign,
  Building2,
  Phone,
  Mail,
  Star,
  BookOpen,
  PieChart
} from "lucide-react";

interface SalesLifecycleProps {
  onBack: () => void;
  onCompleted?: (dealId: string) => void;
  dealId?: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dueDate?: string;
  completedDate?: string;
  approver?: string;
  documents: string[];
  checkpoints: Checkpoint[];
  estimatedHours: number;
  actualHours: number;
  dependencies: string[];
}

interface Checkpoint {
  id: string;
  name: string;
  required: boolean;
  status: 'pending' | 'completed';
  evidence?: string;
  verifiedBy?: string;
  verificationDate?: string;
}

interface SalesPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  steps: WorkflowStep[];
  kpis: PhaseKPI[];
  riskLevel: 'low' | 'medium' | 'high';
  complianceScore: number;
}

interface PhaseKPI {
  metric: string;
  target: number;
  actual: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export function InternationalSalesLifecycle({ onBack, onCompleted, dealId }: SalesLifecycleProps) {
  const [salesPhases, setSalesPhases] = useState<SalesPhase[]>([
    {
      id: 'prospect-identification',
      name: 'Prospect Identification & Qualification',
      description: 'ISO 9001:2015 compliant lead qualification process',
      status: 'pending',
      progress: 0,
      riskLevel: 'low',
      complianceScore: 95,
      kpis: [
        { metric: 'Lead Score', target: 80, actual: 0, unit: 'points', trend: 'stable' },
        { metric: 'Response Time', target: 24, actual: 0, unit: 'hours', trend: 'stable' }
      ],
      steps: [
        {
          id: 'market-research',
          name: 'Market Research & Analysis',
          description: 'Comprehensive market analysis using international trade data',
          status: 'pending',
          priority: 'high',
          estimatedHours: 16,
          actualHours: 0,
          documents: ['Market Analysis Report', 'Competitor Mapping', 'Trade Statistics'],
          dependencies: [],
          checkpoints: [
            { id: 'cp1', name: 'Market Size Analysis Completed', required: true, status: 'pending' },
            { id: 'cp2', name: 'Competitive Landscape Mapped', required: true, status: 'pending' },
            { id: 'cp3', name: 'Regulatory Requirements Identified', required: true, status: 'pending' }
          ]
        },
        {
          id: 'lead-scoring',
          name: 'BANT Lead Scoring',
          description: 'Budget, Authority, Need, Timeline qualification framework',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 8,
          actualHours: 0,
          documents: ['BANT Assessment', 'Credit Report', 'Financial Analysis'],
          dependencies: ['market-research'],
          checkpoints: [
            { id: 'cp4', name: 'Budget Verified (>$100K)', required: true, status: 'pending' },
            { id: 'cp5', name: 'Decision Maker Identified', required: true, status: 'pending' },
            { id: 'cp6', name: 'Genuine Need Confirmed', required: true, status: 'pending' },
            { id: 'cp7', name: 'Timeline Realistic (<6 months)', required: true, status: 'pending' }
          ]
        },
        {
          id: 'compliance-check',
          name: 'Regulatory Compliance Verification',
          description: 'AML/KYC and international trade compliance screening',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 12,
          actualHours: 0,
          documents: ['KYC Documentation', 'Sanctions Screening', 'Trade License Verification'],
          dependencies: ['lead-scoring'],
          checkpoints: [
            { id: 'cp8', name: 'AML/KYC Cleared', required: true, status: 'pending' },
            { id: 'cp9', name: 'No Sanctions Match', required: true, status: 'pending' },
            { id: 'cp10', name: 'Trade Licenses Valid', required: true, status: 'pending' }
          ]
        }
      ]
    },
    {
      id: 'needs-assessment',
      name: 'Comprehensive Needs Assessment',
      description: 'Solution Engineering & Requirements Analysis',
      status: 'pending',
      progress: 0,
      riskLevel: 'medium',
      complianceScore: 92,
      kpis: [
        { metric: 'Requirements Clarity', target: 90, actual: 0, unit: '%', trend: 'stable' },
        { metric: 'Stakeholder Alignment', target: 85, actual: 0, unit: '%', trend: 'stable' }
      ],
      steps: [
        {
          id: 'stakeholder-mapping',
          name: 'Stakeholder Analysis & Mapping',
          description: 'Identify all decision makers and influencers',
          status: 'pending',
          priority: 'high',
          estimatedHours: 10,
          actualHours: 0,
          documents: ['Stakeholder Matrix', 'Org Chart', 'Influence Map'],
          dependencies: [],
          checkpoints: [
            { id: 'cp11', name: 'All Stakeholders Identified', required: true, status: 'pending' },
            { id: 'cp12', name: 'Decision Process Mapped', required: true, status: 'pending' },
            { id: 'cp13', name: 'Key Influencers Engaged', required: true, status: 'pending' }
          ]
        },
        {
          id: 'requirements-gathering',
          name: 'Technical Requirements Gathering',
          description: 'Detailed specification of product/service requirements',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 20,
          actualHours: 0,
          documents: ['Requirements Specification', 'Technical Standards', 'Quality Criteria'],
          dependencies: ['stakeholder-mapping'],
          checkpoints: [
            { id: 'cp14', name: 'Functional Requirements Documented', required: true, status: 'pending' },
            { id: 'cp15', name: 'Quality Standards Defined', required: true, status: 'pending' },
            { id: 'cp16', name: 'Compliance Requirements Clear', required: true, status: 'pending' }
          ]
        },
        {
          id: 'solution-design',
          name: 'Solution Architecture & Design',
          description: 'Custom solution design based on requirements',
          status: 'pending',
          priority: 'high',
          estimatedHours: 24,
          actualHours: 0,
          documents: ['Solution Blueprint', 'Implementation Plan', 'Risk Assessment'],
          dependencies: ['requirements-gathering'],
          checkpoints: [
            { id: 'cp17', name: 'Solution Architecture Approved', required: true, status: 'pending' },
            { id: 'cp18', name: 'Implementation Roadmap Created', required: true, status: 'pending' },
            { id: 'cp19', name: 'Risk Mitigation Plan Ready', required: true, status: 'pending' }
          ]
        }
      ]
    },
    {
      id: 'proposal-development',
      name: 'Strategic Proposal Development',
      description: 'Value-based proposal with ROI analysis',
      status: 'pending',
      progress: 0,
      riskLevel: 'medium',
      complianceScore: 88,
      kpis: [
        { metric: 'Proposal Score', target: 85, actual: 0, unit: 'points', trend: 'stable' },
        { metric: 'Value Proposition Clarity', target: 90, actual: 0, unit: '%', trend: 'stable' }
      ],
      steps: [
        {
          id: 'value-proposition',
          name: 'Value Proposition Development',
          description: 'Quantified business value and ROI analysis',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 16,
          actualHours: 0,
          documents: ['ROI Analysis', 'Business Case', 'Value Matrix'],
          dependencies: [],
          checkpoints: [
            { id: 'cp20', name: 'ROI Calculator Built', required: true, status: 'pending' },
            { id: 'cp21', name: 'Value Drivers Quantified', required: true, status: 'pending' },
            { id: 'cp22', name: 'Business Case Validated', required: true, status: 'pending' }
          ]
        },
        {
          id: 'pricing-strategy',
          name: 'Strategic Pricing & Terms',
          description: 'Competitive pricing with flexible terms',
          status: 'pending',
          priority: 'high',
          estimatedHours: 12,
          actualHours: 0,
          documents: ['Pricing Model', 'Terms Sheet', 'Payment Options'],
          dependencies: ['value-proposition'],
          checkpoints: [
            { id: 'cp23', name: 'Pricing Strategy Approved', required: true, status: 'pending' },
            { id: 'cp24', name: 'Payment Terms Optimized', required: true, status: 'pending' },
            { id: 'cp25', name: 'Competitive Analysis Done', required: true, status: 'pending' }
          ]
        },
        {
          id: 'proposal-creation',
          name: 'Comprehensive Proposal Creation',
          description: 'Professional proposal with all supporting documents',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 20,
          actualHours: 0,
          documents: ['Master Proposal', 'Executive Summary', 'Technical Appendix'],
          dependencies: ['pricing-strategy'],
          checkpoints: [
            { id: 'cp26', name: 'Proposal Quality Reviewed', required: true, status: 'pending' },
            { id: 'cp27', name: 'Legal Terms Approved', required: true, status: 'pending' },
            { id: 'cp28', name: 'Executive Summary Compelling', required: true, status: 'pending' }
          ]
        }
      ]
    },
    {
      id: 'negotiation-closure',
      name: 'Negotiation & Deal Closure',
      description: 'Professional negotiation and contract finalization',
      status: 'pending',
      progress: 0,
      riskLevel: 'high',
      complianceScore: 90,
      kpis: [
        { metric: 'Win Rate', target: 75, actual: 0, unit: '%', trend: 'stable' },
        { metric: 'Contract Value', target: 100, actual: 0, unit: '%', trend: 'stable' }
      ],
      steps: [
        {
          id: 'negotiation-strategy',
          name: 'Negotiation Strategy & Planning',
          description: 'Structured negotiation approach with fallback positions',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 8,
          actualHours: 0,
          documents: ['Negotiation Plan', 'BATNA Analysis', 'Concession Matrix'],
          dependencies: [],
          checkpoints: [
            { id: 'cp29', name: 'Negotiation Strategy Set', required: true, status: 'pending' },
            { id: 'cp30', name: 'BATNA Identified', required: true, status: 'pending' },
            { id: 'cp31', name: 'Team Roles Defined', required: true, status: 'pending' }
          ]
        },
        {
          id: 'contract-negotiation',
          name: 'Contract Terms Negotiation',
          description: 'Detailed contract terms and conditions negotiation',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 16,
          actualHours: 0,
          documents: ['Contract Draft', 'Terms Schedule', 'Amendment Log'],
          dependencies: ['negotiation-strategy'],
          checkpoints: [
            { id: 'cp32', name: 'Key Terms Agreed', required: true, status: 'pending' },
            { id: 'cp33', name: 'Risk Allocation Settled', required: true, status: 'pending' },
            { id: 'cp34', name: 'Payment Terms Finalized', required: true, status: 'pending' }
          ]
        },
        {
          id: 'deal-closure',
          name: 'Deal Closure & Documentation',
          description: 'Final contract execution and deal closure',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 12,
          actualHours: 0,
          documents: ['Signed Contract', 'Closure Report', 'Handover Document'],
          dependencies: ['contract-negotiation'],
          checkpoints: [
            { id: 'cp35', name: 'Contract Executed', required: true, status: 'pending' },
            { id: 'cp36', name: 'Payment Schedule Set', required: true, status: 'pending' },
            { id: 'cp37', name: 'Handover Completed', required: true, status: 'pending' }
          ]
        }
      ]
    }
  ]);

  const [currentPhase, setCurrentPhase] = useState(0);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
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

  const overallProgress = salesPhases.reduce((acc, phase) => acc + phase.progress, 0) / salesPhases.length;

  const handleCompleteCheckpoint = (phaseId: string, stepId: string, checkpointId: string) => {
    setSalesPhases(prev => 
      prev.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            steps: phase.steps.map(step => {
              if (step.id === stepId) {
                return {
                  ...step,
                  checkpoints: step.checkpoints.map(cp => 
                    cp.id === checkpointId 
                      ? { ...cp, status: 'completed', verificationDate: new Date().toISOString() }
                      : cp
                  )
                };
              }
              return step;
            })
          };
        }
        return phase;
      })
    );
  };

  const handleCompleteStep = (phaseId: string, stepId: string) => {
    setSalesPhases(prev => 
      prev.map(phase => {
        if (phase.id === phaseId) {
          const updatedSteps = phase.steps.map(step => 
            step.id === stepId 
              ? { ...step, status: 'completed' as const, completedDate: new Date().toISOString() }
              : step
          );
          
          const completedSteps = updatedSteps.filter(s => s.status === 'completed').length;
          const newProgress = (completedSteps / updatedSteps.length) * 100;
          
          return { ...phase, steps: updatedSteps, progress: newProgress };
        }
        return phase;
      })
    );

    toast({
      title: "Step Completed!",
      description: "Workflow step has been marked as completed.",
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
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
            <h1 className="text-3xl font-bold text-gray-900">International Sales Lifecycle</h1>
            <p className="text-gray-600">ISO 9001:2015 Compliant | Enterprise-Grade Workflow Management</p>
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
          <Badge className={getRiskColor(salesPhases[currentPhase]?.riskLevel || 'low')}>
            Risk: {salesPhases[currentPhase]?.riskLevel?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold">73%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Avg. Cycle Time</p>
                <p className="text-2xl font-bold">42d</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Pipeline Value</p>
                <p className="text-2xl font-bold">$2.4M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Compliance Score</p>
                <p className="text-2xl font-bold">{salesPhases[currentPhase]?.complianceScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {salesPhases.map((phase, index) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Phase Details */}
      <Tabs defaultValue="workflow" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="kpis">KPIs & Metrics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-4">
          {salesPhases[currentPhase]?.steps.map((step) => (
            <Card key={step.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100 text-green-600' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.name}</CardTitle>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`priority-${step.priority}`}>
                      {step.priority}
                    </Badge>
                    <Badge className={getStatusColor(step.status)}>
                      {step.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium">Estimated Hours</Label>
                    <p className="text-lg">{step.estimatedHours}h</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Assignee</Label>
                    <p className="text-lg">{step.assignee || 'Unassigned'}</p>
                  </div>
                </div>

                {/* Checkpoints */}
                <div className="space-y-2 mb-4">
                  <Label className="text-sm font-medium">Quality Checkpoints</Label>
                  {step.checkpoints.map((checkpoint) => (
                    <div key={checkpoint.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={checkpoint.status === 'completed'}
                          onChange={() => handleCompleteCheckpoint(salesPhases[currentPhase].id, step.id, checkpoint.id)}
                          className="rounded"
                        />
                        <span className={checkpoint.required ? 'font-medium' : ''}>{checkpoint.name}</span>
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
                  <div className="flex flex-wrap gap-2 mt-1">
                    {step.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                {step.status !== 'completed' && (
                  <Button 
                    onClick={() => handleCompleteStep(salesPhases[currentPhase].id, step.id)}
                    className="w-full"
                  >
                    Mark Step Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kpis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salesPhases[currentPhase]?.kpis.map((kpi, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{kpi.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span>Target: {kpi.target}{kpi.unit}</span>
                    <span>Actual: {kpi.actual}{kpi.unit}</span>
                  </div>
                  <Progress value={(kpi.actual / kpi.target) * 100} className="h-3" />
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 
                      kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <span className="text-sm capitalize">{kpi.trend}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>ISO 9001:2015 Quality Management</span>
                  </div>
                  <Badge className="bg-green-100 text-green-600">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span>International Trade Regulations</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-600">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span>AML/KYC Compliance</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-600">Current</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Master Service Agreement Template', 'Risk Assessment Framework', 'Quality Assurance Checklist', 'Compliance Audit Trail'].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>{doc}</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
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
