
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Truck, 
  Ship, 
  Plane, 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Navigation,
  Globe,
  BarChart3,
  Plus,
  Search,
  Filter,
  Eye,
  Edit
} from "lucide-react";

export function LogisticsManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const shipments = [
    {
      id: 'SH001',
      trackingNumber: 'TRK-2024-001',
      origin: 'Mumbai, India',
      destination: 'Los Angeles, USA',
      mode: 'sea',
      status: 'in_transit',
      carrier: 'Maersk Line',
      vessel: 'MSC Lucinda',
      departureDate: '2024-11-20',
      estimatedArrival: '2024-12-15',
      actualArrival: null,
      cargo: 'Electronic Components',
      weight: '15,000 kg',
      value: '$125,000',
      incoterm: 'FOB',
      priority: 'high'
    },
    {
      id: 'SH002',
      trackingNumber: 'TRK-2024-002',
      origin: 'Shanghai, China',
      destination: 'Hamburg, Germany',
      mode: 'sea',
      status: 'delivered',
      carrier: 'COSCO Shipping',
      vessel: 'COSCO Fortune',
      departureDate: '2024-11-10',
      estimatedArrival: '2024-12-05',
      actualArrival: '2024-12-03',
      cargo: 'Textile Machinery',
      weight: '25,000 kg',
      value: '$180,000',
      incoterm: 'CIF',
      priority: 'medium'
    },
    {
      id: 'SH003',
      trackingNumber: 'TRK-2024-003',
      origin: 'New York, USA',
      destination: 'London, UK',
      mode: 'air',
      status: 'pending',
      carrier: 'British Airways Cargo',
      vessel: 'BA Cargo Flight 101',
      departureDate: '2024-12-01',
      estimatedArrival: '2024-12-02',
      actualArrival: null,
      cargo: 'Pharmaceuticals',
      weight: '500 kg',
      value: '$50,000',
      incoterm: 'EXW',
      priority: 'high'
    }
  ];

  const ports = [
    {
      id: 'PORT001',
      name: 'Port of Mumbai',
      country: 'India',
      type: 'Seaport',
      capacity: 'High',
      congestion: 'Medium',
      avgWaitTime: '3-5 days',
      facilities: ['Container Terminal', 'Bulk Cargo', 'RORO'],
      coordinates: '19.0760, 72.8777'
    },
    {
      id: 'PORT002',
      name: 'Los Angeles International Airport',
      country: 'USA',
      type: 'Airport',
      capacity: 'Very High',
      congestion: 'Low',
      avgWaitTime: '1-2 days',
      facilities: ['Cargo Terminal', 'Cold Storage', 'Customs'],
      coordinates: '33.9425, -118.4081'
    },
    {
      id: 'PORT003',
      name: 'Port of Hamburg',
      country: 'Germany',
      type: 'Seaport',
      capacity: 'High',
      congestion: 'High',
      avgWaitTime: '5-7 days',
      facilities: ['Container Terminal', 'Rail Connection', 'Warehousing'],
      coordinates: '53.5511, 9.9937'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'customs': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'sea': return Ship;
      case 'air': return Plane;
      case 'road': return Truck;
      default: return Package;
    }
  };

  const getCongestionColor = (congestion: string) => {
    switch (congestion) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logistics & Shipping</h1>
          <p className="text-gray-600">Track shipments, manage routes, and optimize logistics</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-gray-500">Active Shipments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500">Delayed Shipments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-500">Delivered This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">$2.3M</p>
                <p className="text-sm text-gray-500">Cargo Value in Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'shipments', 'tracking', 'ports', 'analytics'].map((tab) => (
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
          {/* Recent Shipments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.slice(0, 3).map((shipment) => {
                  const ModeIcon = getModeIcon(shipment.mode);
                  return (
                    <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ModeIcon className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{shipment.trackingNumber}</h4>
                          <p className="text-sm text-gray-600">{shipment.origin} → {shipment.destination}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Port Status */}
          <Card>
            <CardHeader>
              <CardTitle>Port Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ports.slice(0, 3).map((port) => (
                  <div key={port.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{port.name}</h4>
                      <span className={`text-sm font-medium ${getCongestionColor(port.congestion)}`}>
                        {port.congestion} Congestion
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{port.country} • {port.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Avg Wait: {port.avgWaitTime}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'shipments' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search shipments..."
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

          {/* Shipments List */}
          <div className="space-y-4">
            {shipments.map((shipment) => {
              const ModeIcon = getModeIcon(shipment.mode);
              return (
                <Card key={shipment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ModeIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{shipment.trackingNumber}</h3>
                            <Badge className={getStatusColor(shipment.status)}>
                              {shipment.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant={shipment.priority === 'high' ? 'destructive' : 'default'}>
                              {shipment.priority}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">Origin:</span>
                              <p className="font-medium">{shipment.origin}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Destination:</span>
                              <p className="font-medium">{shipment.destination}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Carrier:</span>
                              <p className="font-medium">{shipment.carrier}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">ETA:</span>
                              <p className="font-medium">{shipment.estimatedArrival}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Cargo:</span>
                              <p className="font-medium">{shipment.cargo}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Weight:</span>
                              <p className="font-medium">{shipment.weight}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Value:</span>
                              <p className="font-medium">{shipment.value}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Incoterm:</span>
                              <p className="font-medium">{shipment.incoterm}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <Card>
          <CardHeader>
            <CardTitle>Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600 mb-4">Track your shipments in real-time with GPS and IoT integration</p>
              <Button>
                <MapPin className="w-4 h-4 mr-2" />
                View Live Map
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'ports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ports.map((port) => (
            <Card key={port.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {port.type === 'Airport' ? (
                      <Plane className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Ship className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${getCongestionColor(port.congestion)}`}>
                    {port.congestion}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{port.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{port.country} • {port.type}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-medium">{port.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Avg Wait:</span>
                    <span className="font-medium">{port.avgWaitTime}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Facilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {port.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'analytics' && (
        <Card>
          <CardHeader>
            <CardTitle>Logistics Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 mb-4">Analyze shipping performance, costs, and optimize routes</p>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
