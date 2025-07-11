
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  PackageCheck,
  FileText,
  Truck,
  ShieldCheck,
  AlertTriangle,
  Clock,
  BarChart3
} from "lucide-react";

interface TradeLifecycleProps {
  onBack: () => void;
  dealId?: string;
}

type StepStatus = 'pending' | 'completed';
type PhaseStatus = 'pending' | 'completed';

interface TradeStep {
  id: string;
  name: string;
  status: StepStatus;
}

interface TradePhase {
  id: string;
  name: string;
  status: PhaseStatus;
  progress: number;
  steps: TradeStep[];
  completedAt?: string;
}

export function TradeLifecycle({ onBack, dealId }: TradeLifecycleProps) {
  const [tradePhases, setTradePhases] = useState<TradePhase[]>([
    {
      id: 'contract',
      name: 'Contract Execution',
      status: 'pending' as PhaseStatus,
      progress: 0,
      steps: [
        { id: 'draft', name: 'Draft Contract', status: 'pending' as StepStatus },
        { id: 'review', name: 'Review Legal Terms', status: 'pending' as StepStatus },
        { id: 'negotiate', name: 'Negotiate Terms', status: 'pending' as StepStatus },
        { id: 'sign', name: 'Sign Contract', status: 'pending' as StepStatus }
      ]
    },
    {
      id: 'documentation',
      name: 'Documentation',
      status: 'pending' as PhaseStatus,
      progress: 0,
      steps: [
        { id: 'prepare', name: 'Prepare Documents', status: 'pending' as StepStatus },
        { id: 'lc', name: 'Issue Letter of Credit', status: 'pending' as StepStatus },
        { id: 'insurance', name: 'Arrange Insurance', status: 'pending' as StepStatus },
        { id: 'customs', name: 'Customs Clearance Prep', status: 'pending' as StepStatus }
      ]
    },
    {
      id: 'production',
      name: 'Production',
      status: 'pending' as PhaseStatus,
      progress: 0,
      steps: [
        { id: 'plan', name: 'Production Planning', status: 'pending' as StepStatus },
        { id: 'manufacture', name: 'Manufacturing', status: 'pending' as StepStatus },
        { id: 'inspect', name: 'Quality Inspection', status: 'pending' as StepStatus },
        { id: 'package', name: 'Packaging', status: 'pending' as StepStatus }
      ]
    },
    {
      id: 'shipment',
      name: 'Shipment',
      status: 'pending' as PhaseStatus,
      progress: 0,
      steps: [
        { id: 'book', name: 'Book Shipment', status: 'pending' as StepStatus },
        { id: 'load', name: 'Load Goods', status: 'pending' as StepStatus },
        { id: 'transport', name: 'Transport to Port', status: 'pending' as StepStatus },
        { id: 'export', name: 'Export Clearance', status: 'pending' as StepStatus }
      ]
    },
    {
      id: 'delivery',
      name: 'Delivery',
      status: 'pending' as PhaseStatus,
      progress: 0,
      steps: [
        { id: 'track', name: 'Track Shipment', status: 'pending' as StepStatus },
        { id: 'import', name: 'Import Clearance', status: 'pending' as StepStatus },
        { id: 'deliver', name: 'Final Delivery', status: 'pending' as StepStatus },
        { id: 'payment', name: 'Final Payment', status: 'pending' as StepStatus }
      ]
    }
  ]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();
  
  const [associatedDeal, setAssociatedDeal] = useState<any>(null);

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

  const overallProgress = tradePhases.reduce((acc, phase) => {
    const completed = phase.steps.filter(step => completedSteps.includes(step.id)).length;
    return acc + (completed / phase.steps.length) * (100 / tradePhases.length);
  }, 0);

  const handleStepCompletion = (phaseId: string, stepId: string, completed: boolean) => {
    setTradePhases(prevPhases => {
      return prevPhases.map(phase => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            steps: phase.steps.map(step => {
              if (step.id === stepId) {
                return { ...step, status: completed ? 'completed' as StepStatus : 'pending' as StepStatus };
              }
              return step;
            })
          };
        }
        return phase;
      });
    });

    if (completed) {
      setCompletedSteps(prev => [...prev, stepId]);
    } else {
      setCompletedSteps(prev => prev.filter(id => id !== stepId));
    }
  };

  const handleCompletePhase = async (phaseId: string) => {
    const updatedPhases = tradePhases.map(phase => {
      if (phase.id === phaseId) {
        const completedStepsInPhase = phase.steps.filter(step => 
          completedSteps.includes(step.id) || step.status === 'completed'
        ).length;
        const totalSteps = phase.steps.length;
        
        return {
          ...phase,
          status: 'completed' as PhaseStatus,
          completedAt: new Date().toISOString(),
          progress: 100
        };
      }
      return phase;
    });

    setTradePhases(updatedPhases);

    toast({
      title: "Phase Completed!",
      description: `${updatedPhases.find(p => p.id === phaseId)?.name} phase has been completed.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Deal Context */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trade Lifecycle Management</h1>
            {associatedDeal && (
              <p className="text-gray-600">
                Trade Execution: {associatedDeal.company} - {associatedDeal.product}
                <Badge variant="outline" className="ml-2">
                  ${associatedDeal.value?.toLocaleString()} {associatedDeal.currency}
                </Badge>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {Math.round(overallProgress)}% Complete
          </Badge>
          <Button onClick={() => setShowAnalytics(!showAnalytics)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {showAnalytics ? 'Hide' : 'Show'} Analytics
          </Button>
        </div>
      </div>

      {/* Trade Lifecycle Phases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tradePhases.map(phase => (
          <Card key={phase.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {phase.id === 'contract' && <FileText className="w-5 h-5" />}
                {phase.id === 'documentation' && <FileText className="w-5 h-5" />}
                {phase.id === 'production' && <PackageCheck className="w-5 h-5" />}
                {phase.id === 'shipment' && <Truck className="w-5 h-5" />}
                {phase.id === 'delivery' && <ShieldCheck className="w-5 h-5" />}
                {phase.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {phase.status === 'completed' ? 'Completed' : 'In Progress'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={overallProgress} />
              <div className="space-y-2">
                {phase.steps.map(step => (
                  <div key={step.id} className="flex items-center justify-between">
                    <Label htmlFor={step.id} className="flex items-center">
                      <Checkbox
                        id={step.id}
                        checked={completedSteps.includes(step.id) || step.status === 'completed'}
                        onCheckedChange={(checked) => handleStepCompletion(phase.id, step.id, checked === true)}
                        className="mr-2"
                      />
                      {step.name}
                    </Label>
                  </div>
                ))}
              </div>
              {phase.status !== 'completed' ? (
                <Button onClick={() => handleCompletePhase(phase.id)}>
                  Complete {phase.name}
                </Button>
              ) : (
                <Badge variant="outline">Completed</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle>Trade Lifecycle Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here, we would display analytics related to the trade lifecycle, such as:</p>
            <ul className="list-disc pl-5">
              <li>Average time to complete each phase</li>
              <li>Bottlenecks in the process</li>
              <li>Success rate of shipments</li>
              <li>Potential risks and delays</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
