
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  Clock,
  DollarSign,
  MapPin,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Globe,
  Activity,
  Target,
  Zap
} from "lucide-react";

interface LogisticsAnalyticsProps {
  onBack: () => void;
}

export function LogisticsAnalytics({ onBack }: LogisticsAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for analytics
  const shipmentVolumeData = [
    { month: 'Jan', shipments: 120, revenue: 245000 },
    { month: 'Feb', shipments: 140, revenue: 280000 },
    { month: 'Mar', shipments: 180, revenue: 360000 },
    { month: 'Apr', shipments: 160, revenue: 320000 },
    { month: 'May', shipments: 200, revenue: 400000 },
    { month: 'Jun', shipments: 220, revenue: 440000 },
    { month: 'Jul', shipments: 190, revenue: 380000 },
    { month: 'Aug', shipments: 240, revenue: 480000 },
    { month: 'Sep', shipments: 260, revenue: 520000 },
    { month: 'Oct', shipments: 280, revenue: 560000 },
    { month: 'Nov', shipments: 300, revenue: 600000 },
    { month: 'Dec', shipments: 320, revenue: 640000 }
  ];

  const routePerformanceData = [
    { route: 'Mumbai-Dubai', shipments: 45, onTime: 42, delayed: 3, avgDays: 3.2 },
    { route: 'Delhi-Singapore', shipments: 38, onTime: 35, delayed: 3, avgDays: 4.1 },
    { route: 'Chennai-Hamburg', shipments: 52, onTime: 48, delayed: 4, avgDays: 18.5 },
    { route: 'Kolkata-Shanghai', shipments: 29, onTime: 26, delayed: 3, avgDays: 12.3 },
    { route: 'Bangalore-London', shipments: 34, onTime: 31, delayed: 3, avgDays: 15.2 }
  ];

  const deliveryStatusData = [
    { name: 'On Time', value: 75, color: '#10B981' },
    { name: 'Delayed', value: 15, color: '#F59E0B' },
    { name: 'In Transit', value: 8, color: '#3B82F6' },
    { name: 'Issues', value: 2, color: '#EF4444' }
  ];

  const costAnalysisData = [
    { category: 'Transportation', amount: 45000, percentage: 45 },
    { category: 'Warehousing', amount: 25000, percentage: 25 },
    { category: 'Customs & Duties', amount: 15000, percentage: 15 },
    { category: 'Insurance', amount: 8000, percentage: 8 },
    { category: 'Documentation', amount: 4000, percentage: 4 },
    { category: 'Others', amount: 3000, percentage: 3 }
  ];

  const carrierPerformanceData = [
    { carrier: 'DHL Express', shipments: 89, onTime: 94, rating: 4.8, cost: 450 },
    { carrier: 'FedEx', shipments: 76, onTime: 92, rating: 4.7, cost: 420 },
    { carrier: 'UPS', shipments: 63, onTime: 89, rating: 4.5, cost: 380 },
    { carrier: 'Maersk Line', shipments: 45, onTime: 87, rating: 4.3, cost: 350 },
    { carrier: 'MSC', shipments: 38, onTime: 85, rating: 4.2, cost: 340 }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            ← Back to Logistics
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Logistics Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive logistics performance insights</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-gray-500">Total Shipments</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-sm text-gray-500">On-Time Delivery</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">$5.2M</p>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+18.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">8.4</p>
                <p className="text-sm text-gray-500">Avg Transit Days</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">-0.8 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-gray-500">Active Issues</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">-15.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-sm text-gray-500">Customer Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="carriers">Carriers</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shipment Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Shipment Volume Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={shipmentVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="shipments" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Delivery Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Delivery Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deliveryStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deliveryStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Revenue Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={shipmentVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900">94.2%</h3>
                  <p className="text-green-700">On-Time Delivery Rate</p>
                  <p className="text-sm text-green-600 mt-2">Target: 95%</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-900">99.1%</h3>
                  <p className="text-blue-700">Shipment Accuracy</p>
                  <p className="text-sm text-blue-600 mt-2">Target: 99%</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-purple-900">4.7/5</h3>
                  <p className="text-purple-700">Customer Satisfaction</p>
                  <p className="text-sm text-purple-600 mt-2">Target: 4.5/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Route Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routePerformanceData.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{route.route}</h4>
                      <p className="text-sm text-gray-600">Total Shipments: {route.shipments}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">{route.onTime}</p>
                        <p className="text-xs text-gray-500">On Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-red-600">{route.delayed}</p>
                        <p className="text-xs text-gray-500">Delayed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-600">{route.avgDays}</p>
                        <p className="text-xs text-gray-500">Avg Days</p>
                      </div>
                      <div className="text-center">
                        <Badge variant="outline">
                          {((route.onTime / route.shipments) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costAnalysisData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="amount"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {costAnalysisData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costAnalysisData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.category}</span>
                      <div className="text-right">
                        <p className="font-bold">${item.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="carriers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Carrier Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carrierPerformanceData.map((carrier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{carrier.carrier}</h4>
                      <p className="text-sm text-gray-600">Shipments: {carrier.shipments}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">{carrier.onTime}%</p>
                        <p className="text-xs text-gray-500">On Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-yellow-600">{carrier.rating}</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-600">${carrier.cost}</p>
                        <p className="text-xs text-gray-500">Avg Cost</p>
                      </div>
                      <Badge 
                        variant={carrier.onTime >= 90 ? "default" : "destructive"}
                      >
                        {carrier.onTime >= 90 ? "Excellent" : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Shipment and Revenue Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shipmentVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="shipments" fill="#3B82F6" name="Shipments" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
