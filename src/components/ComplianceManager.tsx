
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Globe, 
  Scale, 
  Building,
  Calendar,
  Eye,
  Download,
  Plus,
  Search,
  Filter
} from "lucide-react";

export function ComplianceManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const complianceItems = [
    {
      id: 'C001',
      category: 'Export License',
      title: 'Dual-Use Technology Export License',
      status: 'active',
      expiryDate: '2025-03-15',
      country: 'USA',
      authority: 'Bureau of Industry and Security',
      priority: 'high',
      description: 'Required for exporting controlled technology items'
    },
    {
      id: 'C002',
      category: 'Import Permit',
      title: 'Pharmaceutical Import Permit',
      status: 'pending',
      expiryDate: '2025-01-20',
      country: 'Canada',
      authority: 'Health Canada',
      priority: 'high',
      description: 'Import permit for pharmaceutical products'
    },
    {
      id: 'C003',
      category: 'Certification',
      title: 'ISO 9001:2015 Quality Management',
      status: 'active',
      expiryDate: '2025-06-30',
      country: 'International',
      authority: 'ISO Certification Body',
      priority: 'medium',
      description: 'Quality management system certification'
    },
    {
      id: 'C004',
      category: 'Trade Agreement',
      title: 'USMCA Certificate of Origin',
      status: 'expiring',
      expiryDate: '2024-12-31',
      country: 'Mexico',
      authority: 'Mexican Customs',
      priority: 'high',
      description: 'Certificate of origin for USMCA benefits'
    }
  ];

  const regulations = [
    {
      id: 'R001',
      title: 'Export Administration Regulations (EAR)',
      country: 'USA',
      type: 'Export Control',
      lastUpdated: '2024-11-15',
      status: 'active',
      impact: 'high'
    },
    {
      id: 'R002',
      title: 'EU Dual-Use Regulation',
      country: 'European Union',
      type: 'Export Control',
      lastUpdated: '2024-10-20',
      status: 'active',
      impact: 'high'
    },
    {
      id: 'R003',
      title: 'Foreign Trade Regulations',
      country: 'India',
      type: 'Import/Export',
      lastUpdated: '2024-11-01',
      status: 'active',
      impact: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expiring': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
          <p className="text-gray-600">Track regulations, licenses, and compliance requirements</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Compliance Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">Active Licenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">Pending Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-gray-500">Compliance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'licenses', 'regulations', 'audits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Compliance Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Compliance Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.category} • {item.country}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regulation Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Latest Regulation Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.slice(0, 3).map((regulation) => (
                  <div key={regulation.id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{regulation.title}</h4>
                    <p className="text-sm text-gray-600">{regulation.country} • {regulation.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Updated: {regulation.lastUpdated}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'licenses' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search licenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Licenses List */}
          <div className="space-y-4">
            {complianceItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge variant={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <p className="font-medium">{item.category}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Country:</span>
                          <p className="font-medium">{item.country}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Authority:</span>
                          <p className="font-medium">{item.authority}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <p className="font-medium">{item.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'regulations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regulations.map((regulation) => (
              <Card key={regulation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Scale className="w-6 h-6 text-blue-600" />
                    <Badge variant={regulation.impact === 'high' ? 'destructive' : 'default'}>
                      {regulation.impact} impact
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{regulation.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{regulation.country} • {regulation.type}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="font-medium">{regulation.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audits' && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Management</h3>
              <p className="text-gray-600 mb-4">Track and manage compliance audits and assessments</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Audit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
