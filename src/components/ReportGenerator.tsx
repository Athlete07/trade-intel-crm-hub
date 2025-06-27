
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Clock
} from "lucide-react";

interface ReportGeneratorProps {
  onBack: () => void;
}

export function ReportGenerator({ onBack }: ReportGeneratorProps) {
  const [reportConfig, setReportConfig] = useState({
    type: 'summary',
    period: 'monthly',
    startDate: '',
    endDate: '',
    includeCharts: true,
    includeDetails: true,
    format: 'pdf'
  });

  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportHistory, setReportHistory] = useState([
    {
      id: 'RPT001',
      name: 'Monthly Sales Summary - November 2024',
      type: 'Sales Summary',
      generated: '2024-11-25 14:30',
      size: '2.4 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: 'RPT002',
      name: 'Deal Pipeline Analysis - Q4 2024',
      type: 'Pipeline Analysis',
      generated: '2024-11-20 09:15',
      size: '1.8 MB',
      format: 'Excel',
      status: 'Ready'
    },
    {
      id: 'RPT003',
      name: 'Company Performance Report - October 2024',
      type: 'Performance',
      generated: '2024-11-15 16:45',
      size: '3.2 MB',
      format: 'PDF',
      status: 'Ready'
    }
  ]);

  const reportTypes = [
    {
      id: 'summary',
      name: 'Sales Summary Report',
      description: 'Overview of sales performance, revenue, and key metrics',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'pipeline',
      name: 'Deal Pipeline Analysis',
      description: 'Detailed analysis of deal stages, probabilities, and forecasts',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: 'company',
      name: 'Company Performance Report',
      description: 'Performance analysis by company, region, and industry',
      icon: Building2,
      color: 'purple'
    },
    {
      id: 'interaction',
      name: 'Interaction Analysis',
      description: 'Communication patterns, response rates, and engagement metrics',
      icon: Handshake,
      color: 'orange'
    },
    {
      id: 'regional',
      name: 'Regional Trade Report',
      description: 'Geographic analysis of trade patterns and opportunities',
      icon: Globe,
      color: 'cyan'
    },
    {
      id: 'target',
      name: 'Target vs Achievement',
      description: 'Performance against targets and goal tracking',
      icon: Target,
      color: 'red'
    }
  ];

  const handleConfigChange = (field: string, value: string | boolean) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = async () => {
    if (!reportConfig.startDate || !reportConfig.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    setGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      const selectedType = reportTypes.find(t => t.id === reportConfig.type);
      const newReport = {
        id: `RPT${String(Date.now()).slice(-3)}`,
        name: `${selectedType?.name} - ${reportConfig.period} (${reportConfig.startDate} to ${reportConfig.endDate})`,
        type: selectedType?.name || 'Report',
        generated: new Date().toLocaleString(),
        size: '2.1 MB',
        format: reportConfig.format.toUpperCase(),
        status: 'Ready'
      };
      
      setReportHistory(prev => [newReport, ...prev]);
      setGeneratingReport(false);
      alert('Report generated successfully!');
    }, 3000);
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading report ${reportId}. In a real application, this would download the actual file.`);
  };

  const handleViewReport = (reportId: string) => {
    alert(`Opening report ${reportId} for preview. In a real application, this would open the report viewer.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Report Generator</h1>
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Generate New Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Report Type
                </label>
                <div className="grid grid-cols-1 gap-3">
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
                        onClick={() => handleConfigChange('type', type.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 text-${type.color}-600`} />
                          <div>
                            <h4 className="font-medium text-gray-900">{type.name}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Period
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  value={reportConfig.period}
                  onChange={(e) => handleConfigChange('period', e.target.value)}
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
                      onChange={(e) => handleConfigChange('startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <Input 
                      type="date"
                      value={reportConfig.endDate}
                      onChange={(e) => handleConfigChange('endDate', e.target.value)}
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
                      onChange={(e) => handleConfigChange('includeCharts', e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">Include Charts and Graphs</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600"
                      checked={reportConfig.includeDetails}
                      onChange={(e) => handleConfigChange('includeDetails', e.target.checked)}
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
                  onChange={(e) => handleConfigChange('format', e.target.value)}
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
                disabled={generatingReport}
              >
                {generatingReport ? (
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
        </div>

        {/* Report History */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportHistory.map((report) => (
                  <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.type}</p>
                      </div>
                      <Badge variant="secondary">
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>Generated: {report.generated}</span>
                      <span>{report.size} • {report.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewReport(report.id)}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" onClick={() => handleDownloadReport(report.id)}>
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">$2.4M</p>
                  <p className="text-sm text-gray-600">Total Pipeline</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">127</p>
                  <p className="text-sm text-gray-600">Active Companies</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Handshake className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">342</p>
                  <p className="text-sm text-gray-600">Interactions</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">18.5%</p>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
