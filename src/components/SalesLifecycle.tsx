import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  User,
  DollarSign,
  AlertTriangle,
  Link2,
  Calendar,
  ListChecks
} from "lucide-react";

interface SalesLifecycleProps {
  onBack: () => void;
  onCompleted?: (dealId: string) => void;
  dealId?: string;
}

export function SalesLifecycle({ onBack, onCompleted, dealId }: SalesLifecycleProps) {
  const [salesPhases, setSalesPhases] = useState([
    {
      id: 'lead-qualification',
      name: 'Lead Qualification',
      description: 'Verify lead potential and fit',
      status: 'pending' as const,
      progress: 0,
      steps: [
        { id: 'identify-needs', name: 'Identify Needs', status: 'pending' as const, description: 'Understand client requirements' },
        { id: 'verify-budget', name: 'Verify Budget', status: 'pending' as const, description: 'Confirm budget availability' },
        { id: 'assess-timeline', name: 'Assess Timeline', status: 'pending' as const, description: 'Check project timeline' }
      ]
    },
    {
      id: 'needs-analysis',
      name: 'Needs Analysis',
      description: 'Deep dive into client needs',
      status: 'pending' as const,
      progress: 0,
      steps: [
        { id: 'collect-data', name: 'Collect Data', status: 'pending' as const, description: 'Gather detailed data' },
        { id: 'analyze-requirements', name: 'Analyze Requirements', status: 'pending' as const, description: 'Analyze specific requirements' },
        { id: 'propose-solutions', name: 'Propose Solutions', status: 'pending' as const, description: 'Offer tailored solutions' }
      ]
    },
    {
      id: 'proposal',
      name: 'Proposal',
      description: 'Present formal proposal',
      status: 'pending' as const,
      progress: 0,
      steps: [
        { id: 'prepare-offer', name: 'Prepare Offer', status: 'pending' as const, description: 'Create detailed offer' },
        { id: 'present-proposal', name: 'Present Proposal', status: 'pending' as const, description: 'Present to client' },
        { id: 'address-questions', name: 'Address Questions', status: 'pending' as const, description: 'Answer client questions' }
      ]
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      description: 'Finalize terms and conditions',
      status: 'pending' as const,
      progress: 0,
      steps: [
        { id: 'discuss-terms', name: 'Discuss Terms', status: 'pending' as const, description: 'Discuss contract terms' },
        { id: 'address-concerns', name: 'Address Concerns', status: 'pending' as const, description: 'Resolve client concerns' },
        { id: 'finalize-agreement', name: 'Finalize Agreement', status: 'pending' as const, description: 'Reach final agreement' }
      ]
    }
  ]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showMetrics, setShowMetrics] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
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

  const overallProgress = salesPhases.reduce((acc, phase) => {
    const completed = phase.steps.filter(step => completedSteps.includes(step.id)).length;
    return acc + (completed / phase.steps.length) * (100 / salesPhases.length);
  }, 0);

  const handleStepCompletion = (phaseId: string, stepId: string) => {
    const isCompleted = completedSteps.includes(stepId);

    if (isCompleted) {
      setCompletedSteps(prev => prev.filter(id => id !== stepId));
    } else {
      setCompletedSteps(prev => [...prev, stepId]);
    }

    const updatedPhases = salesPhases.map(phase => {
      if (phase.id === phaseId) {
        const completed = phase.steps.filter(step => completedSteps.includes(step.id)).length;
        const progress = (completed / phase.steps.length) * 100;
        return { ...phase, progress };
      }
      return phase;
    });

    setSalesPhases(updatedPhases);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes(prev => [...prev, newNote]);
      setNewNote('');
    }
  };

  const handleCompletePhase = async (phaseId: string) => {
    const updatedPhases = salesPhases.map(phase => {
      if (phase.id === phaseId) {
        const completedSteps = phase.steps.filter(step => 
          completedSteps.includes(step.id) || step.status === 'completed'
        ).length;
        const totalSteps = phase.steps.length;
        
        return {
          ...phase,
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
          progress: 100
        };
      }
      return phase;
    });

    setSalesPhases(updatedPhases);

    // Check if all phases are completed
    const allCompleted = updatedPhases.every(phase => phase.status === 'completed');
    
    if (allCompleted && dealId && onCompleted) {
      // Update deal status in database
      try {
        await supabase
          .from('deals')
          .update({ 
            stage: 'Contract Execution',
            probability: 85 
          })
          .eq('id', dealId);

        toast({
          title: "Sales Lifecycle Completed!",
          description: "Transitioning to Trade Lifecycle...",
        });

        // Call the completion handler after a short delay
        setTimeout(() => {
          onCompleted(dealId);
        }, 2000);
      } catch (error) {
        console.error('Error updating deal:', error);
      }
    }

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
            <h1 className="text-3xl font-bold text-gray-900">Sales Lifecycle Management</h1>
            {associatedDeal && (
              <p className="text-gray-600">
                Managing: {associatedDeal.company} - {associatedDeal.product} 
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
          <Button onClick={() => setShowMetrics(!showMetrics)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {showMetrics ? 'Hide' : 'Show'} Metrics
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesPhases.map(phase => (
            <Card key={phase.id}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{phase.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{Math.round(phase.progress)}%</p>
                    <p className="text-xs text-gray-500">{phase.steps.length} Steps</p>
                  </div>
                  <Progress value={phase.progress} className="w-24 h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Sales Phases */}
      <div className="space-y-8">
        {salesPhases.map(phase => (
          <Card key={phase.id}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">{phase.name}</CardTitle>
                <Badge variant={phase.status === 'completed' ? 'default' : 'secondary'}>
                  {phase.status === 'completed' ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{phase.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {phase.steps.map(step => (
                  <div key={step.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={step.id}
                        checked={completedSteps.includes(step.id)}
                        onCheckedChange={() => handleStepCompletion(phase.id, step.id)}
                      />
                      <Label htmlFor={step.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {step.name}
                      </Label>
                    </div>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </div>
                ))}
              </div>
              {phase.status !== 'completed' && (
                <Button onClick={() => handleCompletePhase(phase.id)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Complete Phase
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="p-3 border rounded-md bg-gray-50">
                {note}
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a note..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
              />
              <Button onClick={handleAddNote}>Add Note</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
