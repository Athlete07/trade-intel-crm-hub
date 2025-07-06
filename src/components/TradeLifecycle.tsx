
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  Edit
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
  documents: string[];
  notes: string;
  skipReason?: string;
  dependencies: string[];
  completedDate?: string;
  dueDate?: string;
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
  const { toast } = useToast();

  const phases = [
    { id: 'pre-contract', name: 'Pre-Contract', icon: Users },
    { id: 'contract', name: 'Contract & Documentation', icon: FileText },
    { id: 'pre-shipment', name: 'Pre-Shipment', icon: Package },
    { id: 'shipment', name: 'Shipment & Transit', icon: Ship },
    { id: 'post-shipment', name: 'Post-Shipment', icon: Truck },
    { id: 'completion', name: 'Trade Completion', icon: CheckCircle2 }
  ];

  const defaultLifecycleSteps: TradeLifecycleStep[] = [
    // Pre-Contract Phase
    {
      id: 'buyer-identification',
      phase: 'pre-contract',
      step: 'Buyer Identification',
      description: 'Identify and qualify potential buyers through market research, trade shows, and business networks',
      status: 'pending',
      required: true,
      estimatedDays: 7,
      assignedTo: 'Sales Team',
      documents: ['Market Research Report', 'Buyer Database'],
      notes: '',
      dependencies: []
    },
    {
      id: 'initial-inquiry',
      phase: 'pre-contract',
      step: 'Initial Inquiry',
      description: 'Receive and process initial buyer inquiry with product specifications and requirements',
      status: 'pending',
      required: true,
      estimatedDays: 1,
      assignedTo: 'Sales Representative',
      documents: ['Inquiry Form', 'Product Specifications'],
      notes: '',
      dependencies: ['buyer-identification']
    },
    {
      id: 'buyer-verification',
      phase: 'pre-contract',
      step: 'Buyer Verification & KYC',
      description: 'Conduct Know Your Customer (KYC) checks, credit verification, and compliance screening',
      status: 'pending',
      required: true,
      estimatedDays: 3,
      assignedTo: 'Compliance Team',
      documents: ['KYC Documents', 'Credit Report', 'Company Registration'],
      notes: '',
      dependencies: ['initial-inquiry']
    },
    {
      id: 'quotation-preparation',
      phase: 'pre-contract',
      step: 'Quotation Preparation',
      description: 'Prepare detailed quotation including pricing, terms, specifications, and delivery conditions',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Sales Team',
      documents: ['Quotation', 'Product Catalog', 'Terms & Conditions'],
      notes: '',
      dependencies: ['buyer-verification']
    },
    {
      id: 'price-negotiation',
      phase: 'pre-contract',
      step: 'Price Negotiation',
      description: 'Negotiate pricing, payment terms, delivery schedules, and contract conditions',
      status: 'pending',
      required: true,
      estimatedDays: 5,
      assignedTo: 'Sales Manager',
      documents: ['Negotiation Records', 'Revised Quotations'],
      notes: '',
      dependencies: ['quotation-preparation']
    },
    {
      id: 'pro-forma-invoice',
      phase: 'pre-contract',
      step: 'Proforma Invoice',
      description: 'Issue proforma invoice with final agreed terms and conditions',
      status: 'pending',
      required: true,
      estimatedDays: 1,
      assignedTo: 'Accounts Team',
      documents: ['Proforma Invoice', 'Payment Terms'],
      notes: '',
      dependencies: ['price-negotiation']
    },

    // Contract & Documentation Phase
    {
      id: 'sales-contract',
      phase: 'contract',
      step: 'Sales Contract Signing',
      description: 'Finalize and sign the sales contract with all terms and conditions',
      status: 'pending',
      required: true,
      estimatedDays: 3,
      assignedTo: 'Legal Team',
      documents: ['Sales Contract', 'Terms Agreement', 'Signatures'],
      notes: '',
      dependencies: ['pro-forma-invoice']
    },
    {
      id: 'export-license',
      phase: 'contract',
      step: 'Export License Application',
      description: 'Apply for export license if required based on product category and destination',
      status: 'pending',
      required: false,
      estimatedDays: 14,
      assignedTo: 'Compliance Officer',
      documents: ['Export License Application', 'Product Classification'],
      notes: '',
      dependencies: ['sales-contract']
    },
    {
      id: 'letter-of-credit',
      phase: 'contract',
      step: 'Letter of Credit Receipt',
      description: 'Receive and verify Letter of Credit from buyer\'s bank',
      status: 'pending',
      required: false,
      estimatedDays: 7,
      assignedTo: 'Finance Team',
      documents: ['Letter of Credit', 'Bank Verification'],
      notes: '',
      dependencies: ['sales-contract']
    },
    {
      id: 'advance-payment',
      phase: 'contract',
      step: 'Advance Payment Receipt',
      description: 'Receive advance payment as per contract terms',
      status: 'pending',
      required: false,
      estimatedDays: 5,
      assignedTo: 'Accounts Receivable',
      documents: ['Payment Receipt', 'Bank Statement'],
      notes: '',
      dependencies: ['sales-contract']
    },

    // Pre-Shipment Phase
    {
      id: 'production-planning',
      phase: 'pre-shipment',
      step: 'Production Planning',
      description: 'Plan production schedule based on delivery requirements and specifications',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Production Manager',
      documents: ['Production Schedule', 'Material Requirements'],
      notes: '',
      dependencies: ['sales-contract']
    },
    {
      id: 'raw-material-procurement',
      phase: 'pre-shipment',
      step: 'Raw Material Procurement',
      description: 'Procure raw materials and components required for production',
      status: 'pending',
      required: true,
      estimatedDays: 10,
      assignedTo: 'Procurement Team',
      documents: ['Purchase Orders', 'Material Receipts'],
      notes: '',
      dependencies: ['production-planning']
    },
    {
      id: 'production-execution',
      phase: 'pre-shipment',
      step: 'Production Execution',
      description: 'Execute production as per specifications and quality standards',
      status: 'pending',
      required: true,
      estimatedDays: 15,
      assignedTo: 'Production Team',
      documents: ['Production Records', 'Quality Reports'],
      notes: '',
      dependencies: ['raw-material-procurement']
    },
    {
      id: 'quality-inspection',
      phase: 'pre-shipment',
      step: 'Quality Inspection',
      description: 'Conduct internal and third-party quality inspection as required',
      status: 'pending',
      required: true,
      estimatedDays: 3,
      assignedTo: 'Quality Team',
      documents: ['Inspection Certificate', 'Test Reports'],
      notes: '',
      dependencies: ['production-execution']
    },
    {
      id: 'pre-shipment-inspection',
      phase: 'pre-shipment',
      step: 'Pre-Shipment Inspection',
      description: 'Arrange pre-shipment inspection by buyer or third-party inspector',
      status: 'pending',
      required: false,
      estimatedDays: 5,
      assignedTo: 'Quality Assurance',
      documents: ['PSI Certificate', 'Inspection Report'],
      notes: '',
      dependencies: ['quality-inspection']
    },
    {
      id: 'packaging-labeling',
      phase: 'pre-shipment',
      step: 'Packaging & Labeling',
      description: 'Package goods according to specifications and apply proper labeling',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Packaging Team',
      documents: ['Packing List', 'Label Specifications'],
      notes: '',
      dependencies: ['quality-inspection']
    },

    // Shipment & Transit Phase
    {
      id: 'freight-booking',
      phase: 'shipment',
      step: 'Freight Booking',
      description: 'Book freight with shipping line or freight forwarder',
      status: 'pending',
      required: true,
      estimatedDays: 3,
      assignedTo: 'Logistics Team',
      documents: ['Booking Confirmation', 'Freight Quote'],
      notes: '',
      dependencies: ['packaging-labeling']
    },
    {
      id: 'export-documentation',
      phase: 'shipment',
      step: 'Export Documentation',
      description: 'Prepare all export documents including commercial invoice, packing list, etc.',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Documentation Team',
      documents: ['Commercial Invoice', 'Packing List', 'Export Declaration'],
      notes: '',
      dependencies: ['freight-booking']
    },
    {
      id: 'customs-clearance-export',
      phase: 'shipment',
      step: 'Export Customs Clearance',
      description: 'Clear goods through export customs and obtain necessary permits',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Customs Broker',
      documents: ['Export Permit', 'Customs Declaration'],
      notes: '',
      dependencies: ['export-documentation']
    },
    {
      id: 'cargo-loading',
      phase: 'shipment',
      step: 'Cargo Loading',
      description: 'Load cargo at port/airport and obtain Bill of Lading/Airway Bill',
      status: 'pending',
      required: true,
      estimatedDays: 1,
      assignedTo: 'Port Operations',
      documents: ['Bill of Lading', 'Loading Confirmation'],
      notes: '',
      dependencies: ['customs-clearance-export']
    },
    {
      id: 'cargo-insurance',
      phase: 'shipment',
      step: 'Cargo Insurance',
      description: 'Arrange cargo insurance if required by contract terms',
      status: 'pending',
      required: false,
      estimatedDays: 1,
      assignedTo: 'Insurance Team',
      documents: ['Insurance Certificate', 'Policy Details'],
      notes: '',
      dependencies: ['cargo-loading']
    },
    {
      id: 'shipment-tracking',
      phase: 'shipment',
      step: 'Shipment Tracking',
      description: 'Monitor shipment progress and update buyer on transit status',
      status: 'pending',
      required: true,
      estimatedDays: 0,
      assignedTo: 'Logistics Coordinator',
      documents: ['Tracking Updates', 'Transit Reports'],
      notes: '',
      dependencies: ['cargo-loading']
    },

    // Post-Shipment Phase
    {
      id: 'document-courier',
      phase: 'post-shipment',
      step: 'Document Courier',
      description: 'Send original documents to buyer or bank as per payment terms',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Documentation Team',
      documents: ['Original Documents', 'Courier Receipt'],
      notes: '',
      dependencies: ['cargo-loading']
    },
    {
      id: 'customs-clearance-import',
      phase: 'post-shipment',
      step: 'Import Customs Clearance',
      description: 'Assist buyer with import customs clearance if required',
      status: 'pending',
      required: false,
      estimatedDays: 3,
      assignedTo: 'Import Agent',
      documents: ['Import Permit', 'Duty Payment'],
      notes: '',
      dependencies: ['document-courier']
    },
    {
      id: 'cargo-delivery',
      phase: 'post-shipment',
      step: 'Cargo Delivery',
      description: 'Coordinate final delivery to buyer\'s premises',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Delivery Team',
      documents: ['Delivery Receipt', 'POD'],
      notes: '',
      dependencies: ['document-courier']
    },
    {
      id: 'payment-collection',
      phase: 'post-shipment',
      step: 'Payment Collection',
      description: 'Collect payment from buyer as per agreed payment terms',
      status: 'pending',
      required: true,
      estimatedDays: 5,
      assignedTo: 'Finance Team',
      documents: ['Payment Receipt', 'Bank Confirmation'],
      notes: '',
      dependencies: ['document-courier']
    },

    // Trade Completion Phase
    {
      id: 'delivery-confirmation',
      phase: 'completion',
      step: 'Delivery Confirmation',
      description: 'Confirm successful delivery and buyer satisfaction',
      status: 'pending',
      required: true,
      estimatedDays: 1,
      assignedTo: 'Customer Service',
      documents: ['Delivery Confirmation', 'Customer Feedback'],
      notes: '',
      dependencies: ['cargo-delivery']
    },
    {
      id: 'final-payment',
      phase: 'completion',
      step: 'Final Payment Settlement',
      description: 'Receive final payment and close all financial obligations',
      status: 'pending',
      required: true,
      estimatedDays: 2,
      assignedTo: 'Accounts Team',
      documents: ['Final Invoice', 'Payment Confirmation'],
      notes: '',
      dependencies: ['payment-collection']
    },
    {
      id: 'post-sale-support',
      phase: 'completion',
      step: 'Post-Sale Support',
      description: 'Provide post-sale support and maintain customer relationship',
      status: 'pending',
      required: false,
      estimatedDays: 0,
      assignedTo: 'Customer Success',
      documents: ['Support Records', 'Maintenance Schedule'],
      notes: '',
      dependencies: ['delivery-confirmation']
    },
    {
      id: 'trade-closure',
      phase: 'completion',
      step: 'Trade Closure',
      description: 'Close trade transaction and archive all documents',
      status: 'pending',
      required: true,
      estimatedDays: 1,
      assignedTo: 'Operations Manager',
      documents: ['Trade Summary', 'Archive Records'],
      notes: '',
      dependencies: ['final-payment']
    }
  ];

  useEffect(() => {
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

  const handleUpdateStatus = (stepId: string, newStatus: string) => {
    setLifecycleSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { 
            ...step, 
            status: newStatus as any,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined
          }
        : step
    ));
    
    toast({
      title: "Status Updated",
      description: `Step status updated to ${newStatus}`,
    });
  };

  const handleSkipStep = (stepId: string, reason: string) => {
    setLifecycleSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'skipped', skipReason: reason }
        : step
    ));
    
    setShowSkipDialog(false);
    setSkipReason('');
    
    toast({
      title: "Step Skipped",
      description: "Step has been marked as skipped with reason",
    });
  };

  const handleAddNote = (stepId: string, note: string) => {
    setLifecycleSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, notes: step.notes + (step.notes ? '\n' : '') + `${new Date().toLocaleDateString()}: ${note}` }
        : step
    ));
    
    setNewNote('');
    toast({
      title: "Note Added",
      description: "Note has been added to the step",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trade Lifecycle Management</h1>
          <p className="text-gray-600">Track and manage complete trade process from buyer identification to delivery</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{Math.round(getTotalProgress())}%</p>
            <p className="text-sm text-gray-500">Overall Progress</p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Trade Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {phases.map((phase) => {
              const Icon = phase.icon;
              const progress = getPhaseProgress(phase.id);
              
              return (
                <div 
                  key={phase.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    currentPhase === phase.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentPhase(phase.id)}
                >
                  <Icon className={`w-8 h-8 mb-2 ${currentPhase === phase.id ? 'text-blue-600' : 'text-gray-600'}`} />
                  <h3 className="font-medium text-sm">{phase.name}</h3>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const currentPhaseObj = phases.find(p => p.id === currentPhase);
              const Icon = currentPhaseObj?.icon || Clock;
              return <Icon className="w-5 h-5" />;
            })()}
            {phases.find(p => p.id === currentPhase)?.name} Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getPhaseSteps(currentPhase).map((step, index) => {
              const Icon = getStepIcon(step.status);
              
              return (
                <div key={step.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                          <span className="text-white text-sm font-medium">{index + 1}</span>
                        </div>
                        <Icon className={`w-5 h-5 ${
                          step.status === 'completed' ? 'text-green-600' :
                          step.status === 'in_progress' ? 'text-blue-600' :
                          step.status === 'blocked' ? 'text-red-600' :
                          step.status === 'skipped' ? 'text-gray-600' :
                          'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{step.step}</h3>
                          {!step.required && (
                            <Badge variant="outline" className="text-xs">Optional</Badge>
                          )}
                          <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                            {step.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Assigned To</p>
                            <p className="text-gray-600">{step.assignedTo}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Est. Duration</p>
                            <p className="text-gray-600">{step.estimatedDays} days</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Documents</p>
                            <p className="text-gray-600">{step.documents.length} required</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Dependencies</p>
                            <p className="text-gray-600">{step.dependencies.length} steps</p>
                          </div>
                        </div>

                        {step.notes && (
                          <div className="mt-3">
                            <p className="font-medium text-gray-700 mb-1">Notes:</p>
                            <div className="bg-gray-50 rounded p-2 text-sm whitespace-pre-wrap">
                              {step.notes}
                            </div>
                          </div>
                        )}

                        {step.skipReason && (
                          <div className="mt-3">
                            <p className="font-medium text-gray-700 mb-1">Skip Reason:</p>
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                              {step.skipReason}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {step.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleUpdateStatus(step.id, 'in_progress')}
                          >
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
                            >
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
                          >
                            Complete
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateStatus(step.id, 'blocked')}
                          >
                            Block
                          </Button>
                        </>
                      )}
                      
                      {step.status === 'blocked' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(step.id, 'in_progress')}
                        >
                          Unblock
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setSelectedStep(step)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Add Note Section */}
                  {selectedStep?.id === step.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a note..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          onClick={() => handleAddNote(step.id, newNote)}
                          disabled={!newNote.trim()}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skip Dialog */}
      {showSkipDialog && selectedStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Skip Step: {selectedStep.step}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Please provide a reason for skipping this step:
              </p>
              <Textarea
                placeholder="Enter skip reason..."
                value={skipReason}
                onChange={(e) => setSkipReason(e.target.value)}
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
                  onClick={() => handleSkipStep(selectedStep.id, skipReason)}
                  disabled={!skipReason.trim()}
                >
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
