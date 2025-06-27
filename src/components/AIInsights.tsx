
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Lightbulb,
  Star,
  Users,
  DollarSign,
  Clock,
  ArrowRight
} from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      id: 1,
      type: "Opportunity",
      title: "High-Value Lead Detected",
      description: "ABC Textiles Ltd shows strong buying signals. Their recent inquiries for 500MT organic cotton align with our capacity.",
      priority: "High",
      action: "Schedule follow-up call within 24 hours",
      confidence: 92,
      impact: "$450K potential revenue"
    },
    {
      id: 2,
      type: "Risk Alert",
      title: "Deal at Risk - Indo-German Motors",
      description: "Communication gap detected. Last interaction was 5 days ago, deal value $190K is at 40% probability.",
      priority: "Medium",
      action: "Send pricing clarification and timeline update",
      confidence: 78,
      impact: "Risk of losing $190K deal"
    },
    {
      id: 3,
      type: "Market Trend",
      title: "Electronics Import Surge",
      description: "30% increase in electronics import inquiries this month. Consider expanding semiconductor component offerings.",
      priority: "Low",
      action: "Research new supplier partnerships",
      confidence: 85,
      impact: "Market expansion opportunity"
    }
  ];

  const recommendations = [
    {
      title: "Optimize Follow-up Timing",
      description: "Companies respond 40% faster when contacted between 10-11 AM on weekdays.",
      category: "Sales Process"
    },
    {
      title: "Cross-sell Opportunity",
      description: "Textile buyers often need packaging materials. Consider offering complementary products.",
      category: "Product Strategy"
    },
    {
      title: "Regional Focus",
      description: "North Indian companies show 65% higher conversion rates. Prioritize this region.",
      category: "Territory Planning"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Opportunity': return Star;
      case 'Risk Alert': return AlertTriangle;
      case 'Market Trend': return TrendingUp;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AI Insights & Recommendations</h1>
        <Button>
          <Brain className="w-4 h-4 mr-2" />
          Generate New Insights
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{insights.length}</p>
                <p className="text-sm text-gray-500">Active Insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-gray-500">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">$2.1M</p>
                <p className="text-sm text-gray-500">Identified Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-sm text-gray-500">Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => {
              const TypeIcon = getTypeIcon(insight.type);
              
              return (
                <div key={insight.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <p className="text-sm text-gray-500">{insight.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(insight.priority)}>
                        {insight.priority} Priority
                      </Badge>
                      <div className="text-sm text-gray-500">
                        {insight.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">{insight.action}</p>
                      <p className="text-sm text-gray-500">{insight.impact}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Take Action
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <Badge variant="outline" className="text-xs">
                    {rec.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
