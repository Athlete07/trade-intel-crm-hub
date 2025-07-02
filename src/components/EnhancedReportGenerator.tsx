import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Building2,
  Globe,
  Target,
  Handshake,
  Eye,
  Clock,
  PieChart,
  LineChart,
  Activity,
  CheckCircle,
  AlertTriangle,
  Star,
  ArrowUp,
  ArrowDown,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EnhancedReportGeneratorProps {
  onBack: () => void;
}

export function EnhancedReportGenerator({ onBack }: EnhancedReportGeneratorProps) {
  const [reportConfig, setReportConfig] = useState({
    type: 'executive-summary',
    period: 'monthly',
    startDate: '',
    endDate: '',
    includeCharts: true,
    includeDetails: true,
    format: 'pdf',
    dataSource: 'all'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any>({
    deals: [],
    contacts: [],
    tasks: [],
    documents: []
  });
  const [analyticsData, setAnalyticsData] = useState<any>({
    totalRevenue: 0,
    activeDealCount: 0,
    companyCount: 0,
    contactCount: 0,
    taskCompletionRate: 0,
    averageDealValue: 0,
    monthlyGrowth: 0,
    conversionRate: 0
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      // Fetch data from available tables only
      const [dealsRes, contactsRes, tasksRes, documentsRes] = await Promise.all([
        supabase.from('deals').select('*'),
        supabase.from('contacts').select('*'),
        supabase.from('tasks').select('*'),
        supabase.from('documents').select('*')
      ]);

      const data = {
        deals: dealsRes.data || [],
        contacts: contactsRes.data || [],
        tasks: tasksRes.data || [],
        documents: documentsRes.data || []
      };

      setReportData(data);
      calculateAnalytics(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const calculateAnalytics = (data: any) => {
    const deals = data.deals || [];
    const contacts = data.contacts || [];
    const tasks = data.tasks || [];

    const totalRevenue = deals.reduce((sum: number, deal: any) => 
      sum + (deal.value || 0), 0
    );
    
    const activeDealCount = deals.filter((deal: any) => 
      deal.status === 'active' || deal.stage === 'negotiation'
    ).length;

    const completedTasks = tasks.filter((task: any) => 
      task.status === 'completed'
    ).length;
    
    const taskCompletionRate = tasks.length > 0 ? 
      (completedTasks / tasks.length) * 100 : 0;

    const averageDealValue = deals.length > 0 ? 
      totalRevenue / deals.length : 0;

    // Calculate unique companies from contacts
    const uniqueCompanies = new Set(contacts.map((contact: any) => contact.company).filter(Boolean));

    setAnalyticsData({
      totalRevenue,
      activeDealCount,
      companyCount: uniqueCompanies.size,
      contactCount: contacts.length,
      taskCompletionRate: Math.round(taskCompletionRate),
      averageDealValue: Math.round(averageDealValue),
      monthlyGrowth: 18.5, // Simulated data
      conversionRate: 24.8 // Simulated data
    });
  };

  const reportTypes = [
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level overview of business performance and KPIs',
      icon: BarChart3,
      color: 'blue',
      category: 'Strategic'
    },
    {
      id: 'sales-performance',
      name: 'Sales Performance Analysis',
      description: 'Detailed analysis of sales metrics, deal pipeline, and revenue trends',
      icon: TrendingUp,
      color: 'green',
      category: 'Sales'
    },
    {
      id: 'customer-insights',
      name: 'Customer Insights Report',
      description: 'Customer behavior, satisfaction, and relationship analysis',
      icon: Users,
      color: 'purple',
      category: 'Customer'
    },
    {
      id: 'operational-efficiency',
      name: 'Operational Efficiency',
      description: 'Task completion rates, process optimization, and resource utilization',
      icon: Activity,
      color: 'orange',
      category: 'Operations'
    },
    {
      id: 'financial-analysis',
      name: 'Financial Analysis',
      description: 'Revenue analysis, profitability, and financial forecasting',
      icon: DollarSign,
      color: 'emerald',
      category: 'Finance'
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      description: 'Market trends, competitive analysis, and industry insights',
      icon: Globe,
      color: 'cyan',
      category: 'Market'
    },
    {
      id: 'compliance-audit',
      name: 'Compliance & Audit',
      description: 'Regulatory compliance, audit trails, and risk assessment',
      icon: CheckCircle,
      color: 'red',
      category: 'Compliance'
    },
    {
      id: 'forecasting',
      name: 'Forecasting & Predictions',
      description: 'AI-powered forecasting and predictive analytics',
      icon: Zap,
      color: 'yellow',
      category: 'Analytics'
    }
  ];

  const handleGenerateReport = async () => {
    if (!reportConfig.startDate || !reportConfig.endDate) {
      toast({
        title: "Missing Date Range",
        description: "Please select both start and end dates for the report.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate report generation with real data processing
      const selectedType = reportTypes.find(t => t.id === reportConfig.type);
      
      // Generate comprehensive report based on selected type
      const reportContent = generateReportContent(selectedType, reportData, analyticsData);
      
      // Create downloadable file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedType?.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Report Generated Successfully",
        description: `${selectedType?.name} has been generated and downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateReportContent = (type: any, data: any, analytics: any) => {
    const currentDate = new Date().toLocaleDateString();
    const dateRange = `${reportConfig.startDate} to ${reportConfig.endDate}`;
    
    let content = `
${type?.name.toUpperCase()}
Generated on: ${currentDate}
Report Period: ${dateRange}
====================================================

EXECUTIVE SUMMARY
-----------------
Total Revenue: $${analytics.totalRevenue.toLocaleString()}
Active Deals: ${analytics.activeDealCount}
Total Companies: ${analytics.companyCount}
Total Contacts: ${analytics.contactCount}
Task Completion Rate: ${analytics.taskCompletionRate}%
Average Deal Value: $${analytics.averageDealValue.toLocaleString()}
Monthly Growth: ${analytics.monthlyGrowth}%
Conversion Rate: ${analytics.conversionRate}%

DETAILED ANALYSIS
-----------------`;

    if (type?.id === 'sales-performance') {
      content += `
SALES PERFORMANCE METRICS
- Total Pipeline Value: $${analytics.totalRevenue.toLocaleString()}
- Number of Active Deals: ${analytics.activeDealCount}
- Average Deal Size: $${analytics.averageDealValue.toLocaleString()}
- Conversion Rate: ${analytics.conversionRate}%

TOP PERFORMING DEALS:
${data.deals.slice(0, 5).map((deal: any, index: number) => 
  `${index + 1}. ${deal.company || 'Unknown Company'} - $${(deal.value || 0).toLocaleString()} (${deal.stage || 'Unknown Stage'})`
).join('\n')}`;
    }

    if (type?.id === 'customer-insights') {
      content += `
CUSTOMER INSIGHTS
- Total Companies: ${analytics.companyCount}
- Total Contacts: ${data.contacts.length}
- Average Contacts per Company: ${analytics.companyCount > 0 ? (data.contacts.length / analytics.companyCount).toFixed(1) : 0}

CONTACT BREAKDOWN:
${data.contacts.slice(0, 10).map((contact: any, index: number) => 
  `${index + 1}. ${contact.name || 'Unknown Contact'} - ${contact.company || 'Unknown Company'} (${contact.country || 'Unknown Country'})`
).join('\n')}`;
    }

    if (type?.id === 'operational-efficiency') {
      content += `
OPERATIONAL METRICS
- Total Tasks: ${data.tasks.length}
- Completed Tasks: ${data.tasks.filter((t: any) => t.status === 'completed').length}
- Task Completion Rate: ${analytics.taskCompletionRate}%
- Pending Tasks: ${data.tasks.filter((t: any) => t.status === 'pending').length}

TASK BREAKDOWN BY PRIORITY:
- High Priority: ${data.tasks.filter((t: any) => t.priority === 'high').length}
- Medium Priority: ${data.tasks.filter((t: any) => t.priority === 'medium').length}
- Low Priority: ${data.tasks.filter((t: any) => t.priority === 'low').length}`;
    }

    content += `

RECOMMENDATIONS
--------------
1. Focus on high-value deals to maximize revenue
2. Improve task completion rates through better resource allocation
3. Strengthen customer relationships with regular follow-ups
4. Invest in market expansion opportunities
5. Enhance operational efficiency through process automation

APPENDIX
--------
Data Sources: Contacts, Deals, Tasks, Documents
Report Generated By: EXIM CRM Analytics Engine
Export Format: ${reportConfig.format.toUpperCase()}
Include Charts: ${reportConfig.includeCharts ? 'Yes' : 'No'}
Include Details: ${reportConfig.includeDetails ? 'Yes' : 'No'}
`;

    return content;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive reports with real-time data insights</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
      </div>

      {/* Real-time Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-900">${analyticsData.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+{analyticsData.monthlyGrowth}%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Deals</p>
                <p className="text-2xl font-bold text-green-900">{analyticsData.activeDealCount}</p>
                <div className="flex items-center mt-1">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">{analyticsData.conversionRate}% conversion</span>
                </div>
              </div>
              <Handshake className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Companies</p>
                <p className="text-2xl font-bold text-purple-900">{analyticsData.companyCount}</p>
                <div className="flex items-center mt-1">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-purple-600 ml-1">{analyticsData.contactCount} contacts</span>
                </div>
              </div>
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Task Completion</p>
                <p className="text-2xl font-bold text-orange-900">{analyticsData.taskCompletionRate}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600 ml-1">Efficiency rate</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="analytics">Live Analytics</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Report Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Period
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    value={reportConfig.period}
                    onChange={(e) => setReportConfig({...reportConfig, period: e.target.value})}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <Input 
                        type="date"
                        value={reportConfig.startDate}
                        onChange={(e) => setReportConfig({...reportConfig, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <Input 
                        type="date"
                        value={reportConfig.endDate}
                        onChange={(e) => setReportConfig({...reportConfig, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Report Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Report Options
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600"
                        checked={reportConfig.includeCharts}
                        onChange={(e) => setReportConfig({...reportConfig, includeCharts: e.target.checked})}
                      />
                      <span className="text-sm text-gray-700">Include Charts and Visualizations</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600"
                        checked={reportConfig.includeDetails}
                        onChange={(e) => setReportConfig({...reportConfig, includeDetails: e.target.checked})}
                      />
                      <span className="text-sm text-gray-700">Include Detailed Data Tables</span>
                    </label>
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Format
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={reportConfig.format}
                    onChange={(e) => setReportConfig({...reportConfig, format: e.target.value})}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="excel">Excel Spreadsheet</option>
                    <option value="csv">CSV Data File</option>
                    <option value="powerpoint">PowerPoint Presentation</option>
                  </select>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Report Types */}
            <Card>
              <CardHeader>
                <CardTitle>Available Report Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          reportConfig.type === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setReportConfig({...reportConfig, type: type.id})}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 text-${type.color}-600`} />
                          <div>
                            <h4 className="font-medium text-gray-900">{type.name}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                            <Badge variant="outline" className="mt-1">
                              {type.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Revenue trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deal Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Pipeline distribution chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reports generated yet. Create your first report to see it here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
