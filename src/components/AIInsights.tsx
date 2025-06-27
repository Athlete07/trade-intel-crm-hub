
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Target,
  Users,
  Star,
  Clock,
  ArrowRight,
  Zap
} from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      id: 1,
      type: "Lead Scoring",
      title: "High-Value Lead Identified",
      description: "ABC Textiles Ltd shows 85% conversion probability based on interaction patterns and engagement level.",
      priority: "High",
      action: "Schedule follow-up call within 48 hours",
      confidence: 92,
      icon: Target,
      color: "green"
    },
    {
      id: 2,
      type: "Deal Risk",
      title: "Indo-German Motors Deal at Risk",
      description: "Deal probability dropped from 70% to 40% after last interaction. Client concerns about delivery timeline need immediate attention.",
      priority: "Critical",
      action: "Arrange urgent meeting with technical team",
      confidence: 87,
      icon: AlertTriangle,
      color: "red"
    },
    {
      id: 3,
      type: "Opportunity",
      title: "Cross-Sell Opportunity Detected",
      description: "Global Electronics Inc has shown interest in expanding product range. Historical data suggests 78% success rate for similar expansions.",
      priority: "Medium",
      action: "Prepare comprehensive product catalog",
      confidence: 78,
      icon: Lightbulb,
      color: "blue"
    },
    {
      id: 4,
      type: "Pattern Analysis",
      title: "Seasonal Demand Spike Predicted",
      description: "AI analysis of 3-year data indicates 45% increase in textile machinery demand expected in Q1 2025.",
      priority: "Medium",
      action: "Prepare inventory and supplier relationships",
      confidence: 84,
      icon: TrendingUp,
      color: "purple"
    }
  ];

  const summaries = [
    {
      title: "This Week's Performance",
      metrics: [
        { label: "Total Interactions", value: "23", change: "+15%" },
        { label: "New Opportunities", value: "5", change: "+25%" },
        { label: "Average Lead Score", value: "76", change: "+8%" },
        { label: "Follow-ups Due", value: "12", change: "-5%" }
      ]
    },
    {
      title: "AI Recommendations",
      recommendations: [
        "Focus on textile industry leads - 23% higher conversion rate",
        "Schedule follow-ups on Tuesdays - 31% better response rate", 
        "Include technical specifications in initial proposals - increases success by 19%",
        "Leverage referrals from satisfied clients - 2.4x higher close rate"
      ]
    }
  ];

  const leadMatchings = [
    {
      buyer: "TechCorp Solutions",
      requirement: "Electronic Components",
      matchedSeller: "Component Masters Ltd",
      matchScore: 94,
      reason: "Perfect product match, excellent delivery track record, competitive pricing"
    },
    {
      buyer: "Fashion Forward Inc",
      requirement: "Organic Cotton",
      matchedSeller: "Green Textiles Co",
      matchScore: 89,
      reason: "Certified organic supplier, bulk capacity, established export experience"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getInsightColor = (color: string) => {
    const colors = {
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      blue: 'text-blue-600 bg-blue-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600">Smart analytics and recommendations for your business</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Zap className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* AI-Powered Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getInsightColor(insight.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <p className="text-sm text-gray-500">{insight.type}</p>
                    </div>
                  </div>
                  <Badge variant={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{insight.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-900 mb-1">Recommended Action:</p>
                  <p className="text-sm text-blue-700">{insight.action}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      AI Confidence: {insight.confidence}%
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Take Action
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {summaries[0].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {summaries[0].metrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-xs text-green-600 mt-1">{metric.change}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              {summaries[1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summaries[1].recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Lead Matching */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Smart Lead Matching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leadMatchings.map((match, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{match.buyer}</h4>
                    <p className="text-sm text-gray-600">Looking for: {match.requirement}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-green-600">{match.matchScore}%</span>
                    </div>
                    <p className="text-sm text-gray-500">Match Score</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-900">Matched with: {match.matchedSeller}</p>
                      <p className="text-sm text-green-700">{match.reason}</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Business Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ask me anything about your business</h3>
                <p className="text-sm text-gray-600">Get instant insights, predictions, and recommendations</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g., Which leads should I prioritize this week?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Ask AI
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
