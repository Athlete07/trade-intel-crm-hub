import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
  Edit,
  Trash2
} from "lucide-react";
import { LogisticsAnalytics } from "./LogisticsAnalytics";

export function LogisticsManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [filterMode, setFilterMode] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();

  const [newShipment, setNewShipment] = useState({
    origin: '',
    destination: '',
    mode: 'sea',
    carrier: '',
    vessel: '',
    cargo: '',
    weight: '',
    value: '',
    incoterm: 'FOB',
    departureDate: '',
    estimatedArrival: '',
    priority: 'medium'
  });

  const [shipments, setShipments] = useState([
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
  ]);

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

  const handleAddShipment = () => {
    if (!newShipment.origin || !newShipment.destination || !newShipment.carrier || !newShipment.cargo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newShipmentData = {
      id: `SH${String(shipments.length + 1).padStart(3, '0')}`,
      trackingNumber: `TRK-2024-${String(shipments.length + 1).padStart(3, '0')}`,
      ...newShipment,
      status: 'pending',
      actualArrival: null
    };

    setShipments([...shipments, newShipmentData]);
    setNewShipment({
      origin: '',
      destination: '',
      mode: 'sea',
      carrier: '',
      vessel: '',
      cargo: '',
      weight: '',
      value: '',
      incoterm: 'FOB',
      departureDate: '',
      estimatedArrival: '',
      priority: 'medium'
    });
    setShowAddDialog(false);
    
    toast({
      title: "Shipment Created",
      description: "New shipment has been successfully created.",
    });
  };

  const handleEditShipment = (shipment: any) => {
    setSelectedShipment(shipment);
    setShowEditDialog(true);
  };

  const handleUpdateShipment = () => {
    if (!selectedShipment) return;

    setShipments(shipments.map(shipment => 
      shipment.id === selectedShipment.id ? selectedShipment : shipment
    ));
    setShowEditDialog(false);
    setSelectedShipment(null);
    
    toast({
      title: "Shipment Updated",
      description: "Shipment has been successfully updated.",
    });
  };

  const handleDeleteShipment = (shipmentId: string) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      setShipments(shipments.filter(shipment => shipment.id !== shipmentId));
      toast({
        title: "Shipment Deleted",
        description: "Shipment has been successfully deleted.",
      });
    }
  };

  const handleViewShipment = (shipment: any) => {
    toast({
      title: "View Shipment",
      description: `Viewing details for ${shipment.trackingNumber}`,
    });
  };

  const handleTrackShipment = (shipment: any) => {
    toast({
      title: "Live Tracking",
      description: `Opening live tracking for ${shipment.trackingNumber}`,
    });
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === 'all' || shipment.mode === filterMode;
    return matchesSearch && matchesFilter;
  });

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

  const handleViewAnalytics = () => {
    setShowAnalytics(true);
  };

  if (showAnalytics) {
    return <LogisticsAnalytics onBack={() => setShowAnalytics(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logistics & Shipping</h1>
          <p className="text-gray-600">Manage shipments, track deliveries, and monitor logistics operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleViewAnalytics}>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics Dashboard
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Shipment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="origin">Origin *</Label>
                    <Input
                      id="origin"
                      value={newShipment.origin}
                      onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                      placeholder="Enter origin location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      value={newShipment.destination}
                      onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                      placeholder="Enter destination location"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mode">Transport Mode</Label>
                    <select
                      id="mode"
                      value={newShipment.mode}
                      onChange={(e) => setNewShipment({...newShipment, mode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value="sea">Sea</option>
                      <option value="air">Air</option>
                      <option value="road">Road</option>
                      <option value="rail">Rail</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="carrier">Carrier *</Label>
                    <Input
                      id="carrier"
                      value={newShipment.carrier}
                      onChange={(e) => setNewShipment({...newShipment, carrier: e.target.value})}
                      placeholder="Enter carrier name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vessel">Vessel/Flight</Label>
                    <Input
                      id="vessel"
                      value={newShipment.vessel}
                      onChange={(e) => setNewShipment({...newShipment, vessel: e.target.value})}
                      placeholder="Enter vessel/flight number"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cargo">Cargo Description *</Label>
                    <Input
                      id="cargo"
                      value={newShipment.cargo}
                      onChange={(e) => setNewShipment({...newShipment, cargo: e.target.value})}
                      placeholder="Enter cargo description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={newShipment.weight}
                      onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                      placeholder="e.g., 1000 kg"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="value">Cargo Value</Label>
                    <Input
                      id="value"
                      value={newShipment.value}
                      onChange={(e) => setNewShipment({...newShipment, value: e.target.value})}
                      placeholder="e.g., $50,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="incoterm">Incoterm</Label>
                    <select
                      id="incoterm"
                      value={newShipment.incoterm}
                      onChange={(e) => setNewShipment({...newShipment, incoterm: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value="FOB">FOB</option>
                      <option value="CIF">CIF</option>
                      <option value="EXW">EXW</option>
                      <option value="DDP">DDP</option>
                      <option value="CFR">CFR</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={newShipment.priority}
                      onChange={(e) => setNewShipment({...newShipment, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={newShipment.departureDate}
                      onChange={(e) => setNewShipment({...newShipment, departureDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedArrival">Estimated Arrival</Label>
                    <Input
                      id="estimatedArrival"
                      type="date"
                      value={newShipment.estimatedArrival}
                      onChange={(e) => setNewShipment({...newShipment, estimatedArrival: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddShipment}>
                    Create Shipment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{shipments.filter(s => s.status !== 'delivered').length}</p>
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
                <p className="text-2xl font-bold">{shipments.filter(s => s.status === 'delayed').length}</p>
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
                <p className="text-2xl font-bold">{shipments.filter(s => s.status === 'delivered').length}</p>
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
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Modes</option>
              <option value="sea">Sea</option>
              <option value="air">Air</option>
              <option value="road">Road</option>
              <option value="rail">Rail</option>
            </select>
          </div>

          {/* Shipments List */}
          <div className="space-y-4">
            {filteredShipments.map((shipment) => {
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
                        <Button variant="outline" size="sm" onClick={() => handleViewShipment(shipment)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditShipment(shipment)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleTrackShipment(shipment)}>
                          <Navigation className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteShipment(shipment.id)}>
                          <Trash2 className="w-4 h-4" />
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
              <Button onClick={() => toast({ title: "Live Map", description: "Opening live tracking map..." })}>
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
              <Button onClick={() => toast({ title: "Analytics Dashboard", description: "Opening analytics dashboard..." })}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Shipment</DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editOrigin">Origin</Label>
                  <Input
                    id="editOrigin"
                    value={selectedShipment.origin}
                    onChange={(e) => setSelectedShipment({...selectedShipment, origin: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editDestination">Destination</Label>
                  <Input
                    id="editDestination"
                    value={selectedShipment.destination}
                    onChange={(e) => setSelectedShipment({...selectedShipment, destination: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="editMode">Transport Mode</Label>
                  <select
                    id="editMode"
                    value={selectedShipment.mode}
                    onChange={(e) => setSelectedShipment({...selectedShipment, mode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="sea">Sea</option>
                    <option value="air">Air</option>
                    <option value="road">Road</option>
                    <option value="rail">Rail</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="editCarrier">Carrier</Label>
                  <Input
                    id="editCarrier"
                    value={selectedShipment.carrier}
                    onChange={(e) => setSelectedShipment({...selectedShipment, carrier: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editStatus">Status</Label>
                  <select
                    id="editStatus"
                    value={selectedShipment.status}
                    onChange={(e) => setSelectedShipment({...selectedShipment, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="customs">At Customs</option>
                    <option value="delivered">Delivered</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editCargo">Cargo</Label>
                  <Input
                    id="editCargo"
                    value={selectedShipment.cargo}
                    onChange={(e) => setSelectedShipment({...selectedShipment, cargo: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editWeight">Weight</Label>
                  <Input
                    id="editWeight"
                    value={selectedShipment.weight}
                    onChange={(e) => setSelectedShipment({...selectedShipment, weight: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateShipment}>
                  Update Shipment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
