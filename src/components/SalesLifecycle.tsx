
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  SkipForward,
  Target,
  Search,
  Users,
  MessageSquare,
  HandshakeIcon,
  TrendingUp,
  Globe,
  ArrowRight,
  Eye,
  Phone,
  Mail,
  Building,
  DollarSign,
  Star,
  Filter,
  Database,
  BarChart3,
  Shield,
  Award,
  Zap,
  FileText,
  CheckSquare,
  AlertTriangle,
  Lightbulb
} from "lucide-react";

interface SalesLifecycleStep {
  id: string;
  phase: string;
  step: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'blocked';
  required: boolean;
  estimatedDays: number;
  actualDays?: number;
  assignedTo?: string;
  deliverables: Deliverable[];
  notes: string;
  skipReason?: string;
  dependencies: string[];
  completedDate?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tools: Tool[];
  metrics: SalesMetric[];
  bestPractices: string[];
  challenges: Challenge[];
  successCriteria: string[];
}

interface Deliverable {
  name: string;
  description: string;
  template?: string;
  status: 'pending' | 'in_progress' | 'completed';
  quality: 'draft' | 'review' | 'approved';
}

interface Tool {
  name: string;
  category: string;
  purpose: string;
  cost: string;
  integration: boolean;
}

interface SalesMetric {
  name: string;
  target: string;
  current?: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface Challenge {
  issue: string;
  impact: 'low' | 'medium' | 'high';
  solution: string;
  prevention: string;
}

interface SalesLifecycleProps {
  campaignId?: string;
  onBack: () => void;
}

export function SalesLifecycle({ campaignId = "sample-campaign", onBack }: SalesLifecycleProps) {
  const [lifecycleSteps, setLifecycleSteps] = useState<SalesLifecycleStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<SalesLifecycleStep | null>(null);
  const [currentPhase, setCurrentPhase] = useState('research');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const phases = [
    { id: 'research', name: 'Market Research & Intelligence', icon: Search, color: 'bg-purple-500' },
    { id: 'identification', name: 'Buyer Identification & Profiling', icon: Target, color: 'bg-blue-500' },
    { id: 'qualification', name: 'Lead Qualification & Scoring', icon: Filter, color: 'bg-indigo-500' },
    { id: 'engagement', name: 'Initial Engagement & Outreach', icon: MessageSquare, color: 'bg-green-500' },
    { id: 'relationship', name: 'Relationship Building & Nurturing', icon: Users, color: 'bg-orange-500' },
    { id: 'conversion', name: 'Conversion & Deal Closing', icon: HandshakeIcon, color: 'bg-red-500' }
  ];

  const salesLifecycleSteps: SalesLifecycleStep[] = [
    // Research Phase
    {
      id: 'global-market-analysis',
      phase: 'research',
      step: 'Global Market Analysis & Opportunity Assessment',
      description: 'Conduct comprehensive analysis of global markets, identify high-potential regions, analyze market size, growth trends, regulatory environment, and competitive landscape for international expansion',
      status: 'pending',
      required: true,
      estimatedDays: 15,
      assignedTo: 'Market Intelligence Team',
      priority: 'critical',
      deliverables: [
        { name: 'Global Market Report', description: 'Comprehensive 50+ page market analysis', status: 'pending', quality: 'draft' },
        { name: 'Opportunity Matrix', description: 'Market prioritization framework', status: 'pending', quality: 'draft' },
        { name: 'Competitive Intelligence', description: 'Key competitors analysis', status: 'pending', quality: 'draft' },
        { name: 'Regulatory Compliance Map', description: 'Country-wise regulations', status: 'pending', quality: 'draft' }
      ],
      notes: '',
      dependencies: [],
      tools: [
        { name: 'Euromonitor International', category: 'Market Research', purpose: 'Global market data and insights', cost: '$25,000/year', integration: false },
        { name: 'Statista', category: 'Statistics', purpose: 'Market statistics and trends', cost: '$5,000/year', integration: true },
        { name: 'IBISWorld', category: 'Industry Analysis', purpose: 'Industry reports and forecasts', cost: '$8,000/year', integration: false },
        { name: 'Trade Map (ITC)', category: 'Trade Data', purpose: 'International trade statistics', cost: 'Free', integration: true }
      ],
      metrics: [
        { name: 'Market Coverage', target: '95%', unit: '%', trend: 'up' },
        { name: 'Countries Analyzed', target: '50+', unit: 'countries', trend: 'up' },
        { name: 'Data Accuracy', target: '98%', unit: '%', trend: 'stable' },
        { name: 'Research Depth Score', target: '9/10', unit: 'score', trend: 'up' }
      ],
      bestPractices: [
        'Use multiple data sources for validation and accuracy',
        'Include both quantitative and qualitative research methods',
        'Focus on emerging markets with high growth potential',
        'Consider cultural and regulatory factors in analysis',
        'Update market data quarterly for accuracy'
      ],
      challenges: [
        { issue: 'Data availability in emerging markets', impact: 'medium', solution: 'Local research partnerships', prevention: 'Build network of local researchers' },
        { issue: 'Currency fluctuation impact', impact: 'high', solution: 'Use PPP adjusted figures', prevention: 'Regular data updates' },
        { issue: 'Regulatory changes', impact: 'high', solution: 'Legal consultation', prevention: 'Continuous monitoring system' }
      ],
      successCriteria: [
        'Comprehensive coverage of target markets',
        'Actionable insights and recommendations',
        'Clear market prioritization framework',
        'Regulatory compliance roadmap'
      ]
    },
    {
      id: 'buyer-persona-development',
      phase: 'research',
      step: 'International Buyer Persona Development',
      description: 'Create detailed buyer personas for different international markets, including demographic profiles, business characteristics, purchasing behavior, pain points, and decision-making processes',
      status: 'pending',
      required: true,
      estimatedDays: 12,
      assignedTo: 'Customer Research Team',
      priority: 'high',
      deliverables: [
        { name: 'Buyer Persona Profiles', description: '5-7 detailed persona documents', status: 'pending', quality: 'draft' },
        { name: 'Journey Mapping', description: 'Customer journey for each persona', status: 'pending', quality: 'draft' },
        { name: 'Pain Point Analysis', description: 'Comprehensive pain point documentation', status: 'pending', quality: 'draft' },
        { name: 'Messaging Framework', description: 'Persona-specific messaging guide', status: 'pending', quality: 'draft' }
      ],
      notes: '',
      dependencies: ['global-market-analysis'],
      tools: [
        { name: 'HubSpot Personas', category: 'Persona Development', purpose: 'Create and manage buyer personas', cost: '$800/month', integration: true },
        { name: 'Typeform', category: 'Survey', purpose: 'Customer research surveys', cost: '$70/month', integration: true },
        { name: 'Hotjar', category: 'User Research', purpose: 'Website behavior analysis', cost: '$99/month', integration: true },
        { name: 'Zoom', category: 'Interviews', purpose: 'Customer interviews', cost: '$19.99/month', integration: false }
      ],
      metrics: [
        { name: 'Personas Created', target: '7', unit: 'personas', trend: 'up' },
        { name: 'Research Participants', target: '100+', unit: 'interviews', trend: 'up' },
        { name: 'Data Points per Persona', target: '50+', unit: 'data points', trend: 'up' },
        { name: 'Validation Accuracy', target: '90%', unit: '%', trend: 'stable' }
      ],
      bestPractices: [
        'Conduct interviews with existing international customers',
        'Include cultural and regional preferences',
        'Validate personas with sales team feedback',
        'Update personas quarterly based on new data',
        'Create negative personas to avoid wrong targets'
      ],
      challenges: [
        { issue: 'Cultural differences in responses', impact: 'medium', solution: 'Local interview partners', prevention: 'Cultural training for researchers' },
        { issue: 'Language barriers', impact: 'medium', solution: 'Native speaker interviewers', prevention: 'Multilingual research team' },
        { issue: 'Limited access to target customers', impact: 'high', solution: 'Partner with local distributors', prevention: 'Build international network' }
      ],
      successCriteria: [
        'Detailed and actionable buyer personas',
        'Clear customer journey mapping',
        'Validated pain points and solutions',
        'Sales team adoption of personas'
      ]
    },

    // Identification Phase
    {
      id: 'prospect-database-building',
      phase: 'identification',
      step: 'International Prospect Database Development',
      description: 'Build comprehensive database of potential international buyers using multiple data sources, trade directories, industry associations, and digital intelligence platforms',
      status: 'pending',
      required: true,
      estimatedDays: 20,
      assignedTo: 'Business Intelligence Team',
      priority: 'critical',
      deliverables: [
        { name: 'Master Prospect Database', description: '10,000+ qualified prospects', status: 'pending', quality: 'draft' },
        { name: 'Data Quality Report', description: 'Database accuracy and completeness metrics', status: 'pending', quality: 'draft' },
        { name: 'Segmentation Framework', description: 'Prospect categorization system', status: 'pending', quality: 'draft' },
        { name: 'Contact Enrichment Results', description: 'Enhanced contact information', status: 'pending', quality: 'draft' }
      ],
      notes: '',
      dependencies: ['buyer-persona-development'],
      tools: [
        { name: 'ZoomInfo', category: 'B2B Database', purpose: 'Contact and company intelligence', cost: '$15,000/year', integration: true },
        { name: 'LinkedIn Sales Navigator', category: 'Social Selling', purpose: 'Professional network prospecting', cost: '$80/month/user', integration: true },
        { name: 'Kompass', category: 'Global Directory', purpose: 'International business directory', cost: '$5,000/year', integration: false },
        { name: 'Apollo.io', category: 'Sales Intelligence', purpose: 'Contact finding and enrichment', cost: '$49/month/user', integration: true }
      ],
      metrics: [
        { name: 'Database Size', target: '10,000+', unit: 'prospects', trend: 'up' },
        { name: 'Data Accuracy', target: '95%', unit: '%', trend: 'stable' },
        { name: 'Email Deliverability', target: '98%', unit: '%', trend: 'up' },
        { name: 'Contact Completeness', target: '90%', unit: '%', trend: 'up' }
      ],
      bestPractices: [
        'Use multiple data sources for validation',
        'Implement regular data cleansing processes',
        'Segment prospects by industry and region',
        'Maintain GDPR and data privacy compliance',
        'Regular database updates and verification'
      ],
      challenges: [
        { issue: 'Data privacy regulations', impact: 'high', solution: 'Compliance framework implementation', prevention: 'Legal consultation and training' },
        { issue: 'Data decay and outdated information', impact: 'medium', solution: 'Automated data refresh systems', prevention: 'Monthly data validation processes' },
        { issue: 'Duplicate and inconsistent records', impact: 'medium', solution: 'Data deduplication tools', prevention: 'Standardized data entry protocols' }
      ],
      successCriteria: [
        'High-quality prospect database established',
        'Compliance with data protection regulations',
        'Effective segmentation and categorization',
        'Integration with CRM and sales tools'
      ]
    },

    // Qualification Phase
    {
      id: 'lead-scoring-system',
      phase: 'qualification',
      step: 'Advanced Lead Scoring & Qualification System',
      description: 'Implement sophisticated lead scoring system using behavioral data, firmographic information, and engagement metrics to prioritize high-potential international prospects',
      status: 'pending',
      required: true,
      estimatedDays: 8,
      assignedTo: 'Sales Operations Team',
      priority: 'high',
      deliverables: [
        { name: 'Lead Scoring Model', description: 'Mathematical scoring framework', status: 'pending', quality: 'draft' },
        { name: 'Qualification Criteria', description: 'BANT+ qualification framework', status: 'pending', quality: 'draft' },
        { name: 'Scoring Dashboard', description: 'Real-time lead scoring interface', status: 'pending', quality: 'draft' },
        { name: 'Training Materials', description: 'Sales team training on qualification', status: 'pending', quality: 'draft' }
      ],
      notes: '',
      dependencies: ['prospect-database-building'],
      tools: [
        { name: 'HubSpot Lead Scoring', category: 'Marketing Automation', purpose: 'Automated lead scoring', cost: '$800/month', integration: true },
        { name: 'Salesforce Einstein', category: 'AI Analytics', purpose: 'Predictive lead scoring', cost: '$150/user/month', integration: true },
        { name: 'Marketo', category: 'Marketing Automation', purpose: 'Lead nurturing and scoring', cost: '$1,195/month', integration: true },
        { name: 'Leadspace', category: 'Lead Intelligence', purpose: 'B2B lead scoring and insights', cost: '$99/month', integration: false }
      ],
      metrics: [
        { name: 'Scoring Accuracy', target: '85%', unit: '%', trend: 'up' },
        { name: 'Lead Conversion Rate', target: '15%', unit: '%', trend: 'up' },
        { name: 'Sales Qualified Leads', target: '200/month', unit: 'leads', trend: 'up' },
        { name: 'Time to Qualification', target: '3 days', unit: 'days', trend: 'down' }
      ],
      bestPractices: [
        'Include both demographic and behavioral factors',
        'Regular calibration with sales feedback',
        'A/B testing of scoring parameters',
        'Integration with CRM for seamless workflow',
        'Continuous model refinement and optimization'
      ],
      challenges: [
        { issue: 'Inconsistent data quality', impact: 'high', solution: 'Data validation rules', prevention: 'Automated data quality checks' },
        { issue: 'Changing buyer behavior', impact: 'medium', solution: 'Regular model updates', prevention: 'Continuous monitoring and adjustment' },
        { issue: 'Sales team adoption', impact: 'medium', solution: 'Training and change management', prevention: 'User-friendly interface and clear benefits' }
      ],
      successCriteria: [
        'Accurate lead scoring implementation',
        'Improved sales team efficiency',
        'Higher conversion rates',
        'Clear qualification process'
      ]
    },

    // Engagement Phase
    {
      id: 'multichannel-outreach',
      phase: 'engagement',
      step: 'Multi-Channel International Outreach Campaign',
      description: 'Execute comprehensive outreach strategy using email, LinkedIn, phone calls, and regional channels to engage with qualified international prospects',
      status: 'pending',
      required: true,
      estimatedDays: 25,
      assignedTo: 'International Sales Team',
      priority: 'critical',
      deliverables: [
        { name: 'Outreach Sequences', description: 'Multi-touch campaign sequences', status: 'pending', quality: 'draft' },
        { name: 'Localized Content', description: 'Region-specific messaging', status: 'pending', quality: 'draft' },
        { name: 'Response Tracking', description: 'Engagement metrics dashboard', status: 'pending', quality: 'draft' },
        { name: 'Follow-up Protocols', description: 'Systematic follow-up procedures', status: 'pending', quality: 'draft' }
      ],
      notes: '',
      dependencies: ['lead-scoring-system'],
      tools: [
        { name: 'Outreach.io', category: 'Sales Engagement', purpose: 'Email and call sequences', cost: '$100/user/month', integration: true },
        { name: 'SalesLoft', category: 'Sales Engagement', purpose: 'Multi-channel outreach', cost: '$125/user/month', integration: true },
        { name: 'LinkedIn Sales Navigator', category: 'Social Selling', purpose: 'LinkedIn outreach', cost: '$80/month/user', integration: true },
        { name: 'Calendly', category: 'Scheduling', purpose: 'Meeting scheduling', cost: '$12/month/user', integration: true }
      ],
      metrics: [
        { name: 'Email Open Rate', target: '25%', unit: '%', trend: 'up' },
        { name: 'Response Rate', target: '8%', unit: '%', trend: 'up' },
        { name: 'Meeting Booking Rate', target: '12%', unit: '%', trend: 'up' },
        { name: 'Pipeline Generated', target: '$500K', unit: 'USD', trend: 'up' }
      ],
      bestPractices: [
        'Personalize messages for each region/culture',
        'Respect local time zones for outreach',
        'Use native language when possible',
        'Cultural sensitivity in messaging',
        'Multi-channel approach for higher engagement'
      ],
      challenges: [
        { issue: 'Time zone coordination', impact: 'medium', solution: 'Regional sales team deployment', prevention: 'Global coverage strategy' },
        { issue: 'Language barriers', impact: 'high', solution: 'Multilingual sales team', prevention: 'Language training and local hiring' },
        { issue: 'Cultural misunderstandings', impact: 'medium', solution: 'Cultural training programs', prevention: 'Local market expertise' }
      ],
      successCriteria: [
        'High engagement rates across channels',
        'Quality meetings with prospects',
        'Strong pipeline generation',
        'Positive brand perception internationally'
      ]
    }
    // Additional phases would continue with similar detail...
  ];

  useEffect(() => {
    // Initialize with sample data
    setLifecycleSteps(salesLifecycleSteps.slice(0, 4)); // Show first 4 steps for demo
  }, []);

  const getPhaseSteps = (phaseId: string) => {
    return lifecycleSteps.filter(step => step.phase === phaseId);
  };

  const getStatusIcon = (status: string) => {
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

  const getPhaseProgress = (phaseId: string) => {
    const phaseSteps = getPhaseSteps(phaseId);
    const completedSteps = phaseSteps.filter(step => step.status === 'completed' || step.status === 'skipped');
    return phaseSteps.length > 0 ? (completedSteps.length / phaseSteps.length) * 100 : 0;
  };

  const getTotalProgress = () => {
    const completedSteps = lifecycleSteps.filter(step => step.status === 'completed' || step.status === 'skipped');
    return (completedSteps.length / lifecycleSteps.length) * 100;
  };

  const renderStepDetails = (step: SalesLifecycleStep) => (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="tools">Tools & Tech</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="practices">Best Practices</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">{step.estimatedDays} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span className="font-medium">{step.actualDays || 'In progress'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Success Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {step.successCriteria.slice(0, 2).map((criteria, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckSquare className="w-3 h-3 text-green-600" />
                      <span className="truncate">{criteria}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Priority Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`text-xs ${getPriorityColor(step.priority)}`}>
                  {step.priority.toUpperCase()} PRIORITY
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deliverables" className="space-y-4">
          <div className="grid gap-4">
            {step.deliverables.map((deliverable, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{deliverable.name}</h4>
                      <p className="text-sm text-gray-600">{deliverable.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={deliverable.status === 'completed' ? 'default' : 'secondary'}>
                      {deliverable.status}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${
                      deliverable.quality === 'approved' ? 'border-green-500 text-green-700' :
                      deliverable.quality === 'review' ? 'border-yellow-500 text-yellow-700' :
                      'border-gray-500 text-gray-700'
                    }`}>
                      {deliverable.quality}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4">
            {step.tools.map((tool, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">{tool.name}</h4>
                      <p className="text-sm text-gray-600">{tool.purpose}</p>
                      <p className="text-xs text-gray-500">{tool.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{tool.cost}</p>
                    {tool.integration && (
                      <Badge variant="outline" className="text-xs mt-1">
                        Integrated
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4">
            {step.metrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">{metric.name}</h4>
                      <p className="text-sm text-gray-600">Target: {metric.target} {metric.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{metric.current || 'TBD'}</span>
                    <TrendingUp className={`w-4 h-4 ${
                      metric.trend === 'up' ? 'text-green-600' :
                      metric.trend === 'down' ? 'text-red-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practices" className="space-y-4">
          <div className="grid gap-3">
            {step.bestPractices.map((practice, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <p className="text-sm">{practice}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4">
            {step.challenges.map((challenge, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{challenge.issue}</h4>
                        <p className="text-sm text-gray-600 mt-1">Impact: {challenge.impact}</p>
                      </div>
                    </div>
                    <Badge className={`${
                      challenge.impact === 'high' ? 'bg-red-100 text-red-800' :
                      challenge.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {challenge.impact} IMPACT
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-sm text-blue-800">Solution</h5>
                      <p className="text-sm text-blue-700">{challenge.solution}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-sm text-green-800">Prevention</h5>
                      <p className="text-sm text-green-700">{challenge.prevention}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">International Sales Lifecycle</h1>
            <p className="text-gray-600">Strategic buyer identification and acquisition process</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold text-purple-600">{Math.round(getTotalProgress())}%</p>
            <p className="text-sm text-gray-500">Campaign Progress</p>
          </div>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Phase Overview */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Sales Process Overview
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
                    'border-purple-500 bg-purple-50 shadow-lg' : 
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

      {/* Current Phase Steps */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            {(() => {
              const currentPhaseObj = phases.find(p => p.id === currentPhase);
              const Icon = currentPhaseObj?.icon || Clock;
              return <Icon className="w-6 h-6 text-purple-600" />;
            })()}
            {phases.find(p => p.id === currentPhase)?.name} - Detailed Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {getPhaseSteps(currentPhase).map((step, index) => {
              const Icon = getStatusIcon(step.status);
              
              return (
                <Card key={step.id} className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
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
                              <p className="font-semibold text-gray-700 text-sm">Owner</p>
                              <p className="text-gray-600 text-sm">{step.assignedTo}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Duration</p>
                              <p className="text-gray-600 text-sm">{step.estimatedDays} days</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Deliverables</p>
                              <p className="text-gray-600 text-sm">{step.deliverables.length} items</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-semibold text-gray-700 text-sm">Tools</p>
                              <p className="text-gray-600 text-sm">{step.tools.length} platforms</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
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
    </div>
  );
}
