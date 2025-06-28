
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Building2,
  FileText,
  Truck,
  Ship,
  Globe,
  DollarSign,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Package,
  ShieldCheck,
  Handshake,
  CreditCard,
  MapPin,
  Plane,
  Activity
} from "lucide-react";

export function TaskManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPhase, setFilterPhase] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showCreateTask, setShowCreateTask] = useState(false);

  // Comprehensive EXIM Trade Lifecycle Phases
  const tradePhases = [
    { id: "market-research", name: "Market Research", icon: TrendingUp, color: "blue", description: "Research target markets and opportunities" },
    { id: "buyer-identification", name: "Buyer Identification", icon: User, color: "green", description: "Find and qualify potential buyers" },
    { id: "product-development", name: "Product Development", icon: Package, color: "purple", description: "Develop products for target markets" },
    { id: "pricing-costing", name: "Pricing & Costing", icon: DollarSign, color: "yellow", description: "Calculate competitive pricing" },
    { id: "compliance-certification", name: "Compliance & Certification", icon: ShieldCheck, color: "orange", description: "Obtain required certifications" },
    { id: "negotiation", name: "Contract Negotiation", icon: Handshake, color: "red", description: "Negotiate terms and conditions" },
    { id: "documentation", name: "Export Documentation", icon: FileText, color: "cyan", description: "Prepare export documents" },
    { id: "financing", name: "Trade Financing", icon: CreditCard, color: "indigo", description: "Arrange payment methods" },
    { id: "logistics", name: "Logistics Planning", icon: Truck, color: "pink", description: "Plan shipping and logistics" },
    { id: "customs-clearance", name: "Customs Clearance", icon: Globe, color: "teal", description: "Clear customs procedures" },
    { id: "shipment-tracking", name: "Shipment Tracking", icon: Ship, color: "lime", description: "Monitor cargo movement" },
    { id: "delivery-handover", name: "Delivery & Handover", icon: MapPin, color: "emerald", description: "Final delivery to buyer" },
    { id: "payment-collection", name: "Payment Collection", icon: DollarSign, color: "amber", description: "Collect payment from buyer" },
    { id: "after-sales", name: "After Sales Support", icon: Phone, color: "violet", description: "Provide ongoing support" },
    { id: "relationship-management", name: "Relationship Management", icon: Activity, color: "rose", description: "Maintain long-term relationships" }
  ];

  const [tasks, setTasks] = useState([
    {
      id: "TASK/2025/00001",
      title: "Identify potential buyers in European textile market",
      description: "Research and compile comprehensive list of textile importers in Germany, France, Netherlands, and Italy. Focus on companies importing cotton fabrics and garments with annual turnover above €5M.",
      phase: "buyer-identification",
      status: "In Progress",
      priority: "High",
      assignedTo: "Sarah Chen",
      assignedBy: "Rajesh Kumar",
      dueDate: "2024-12-15",
      createdDate: "2024-11-20",
      company: "ABC Textiles Ltd",
      deal: "D001",
      progress: 65,
      estimatedHours: 40,
      actualHours: 26,
      tags: ["Europe", "Textiles", "B2B"],
      comments: []
    },
    {
      id: "TASK/2025/00002",
      title: "Obtain ISO 9001:2015 certification for machinery export",
      description: "Complete full documentation, internal audit, and third-party certification process for quality management system to meet international machinery export standards.",
      phase: "compliance-certification",
      status: "To Do",
      priority: "Critical",
      assignedTo: "Hans Mueller",
      assignedBy: "Priya Singh",
      dueDate: "2025-01-30",
      createdDate: "2024-11-18",
      company: "Machinery World",
      deal: "D003",
      progress: 0,
      estimatedHours: 80,
      actualHours: 0,
      tags: ["ISO", "Certification", "Quality"],
      comments: []
    },
    {
      id: "TASK/2025/00003",
      title: "Arrange 40ft container booking Mumbai to Hamburg",
      description: "Book high-cube container from JNPT Mumbai to Hamburg port. Coordinate with freight forwarder, confirm sailing schedule, and arrange documentation.",
      phase: "logistics",
      status: "Done",
      priority: "Medium",
      assignedTo: "Logistics Team",
      assignedBy: "Sarah Chen",
      dueDate: "2024-11-25",
      createdDate: "2024-11-10",
      company: "Global Electronics Inc",
      deal: "D002",
      progress: 100,
      estimatedHours: 16,
      actualHours: 14,
      tags: ["Shipping", "Container", "Hamburg"],
      comments: []
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    phase: "market-research",
    priority: "Medium",
    assignedTo: "",
    dueDate: "",
    company: "",
    deal: "",
    estimatedHours: "",
    tags: ""
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = filterPhase === "all" || task.phase === filterPhase;
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesPhase && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'default';
      case 'In Progress': return 'secondary';
      case 'To Do': return 'outline';
      case 'Blocked': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getPhaseInfo = (phaseId: string) => {
    return tradePhases.find(phase => phase.id === phaseId) || tradePhases[0];
  };

  const handleCreateTask = () => {
    const task = {
      ...newTask,
      id: `TASK/2025/${String(Date.now()).slice(-5)}`,
      status: "To Do",
      assignedBy: "Current User",
      createdDate: new Date().toISOString().split('T')[0],
      progress: 0,
      estimatedHours: Number(newTask.estimatedHours) || 0,
      actualHours: 0,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      comments: []
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      phase: "market-research",
      priority: "Medium",
      assignedTo: "",
      dueDate: "",
      company: "",
      deal: "",
      estimatedHours: "",
      tags: ""
    });
    setShowCreateTask(false);
    alert(`Task ${task.id} created successfully!`);
  };

  const handleTaskAction = (taskId: string, action: string) => {
    switch (action) {
      case 'view':
        alert(`Opening task ${taskId} details`);
        break;
      case 'edit':
        alert(`Editing task ${taskId}`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this task?')) {
          setTasks(tasks.filter(t => t.id !== taskId));
          alert(`Task ${taskId} deleted`);
        }
        break;
      case 'complete':
        setTasks(tasks.map(t => 
          t.id === taskId ? {...t, status: 'Done', progress: 100} : t
        ));
        alert(`Task ${taskId} marked as complete`);
        break;
    }
  };

  // Task Statistics
  const taskStats = {
    total: tasks.length,
    toDo: tasks.filter(t => t.status === 'To Do').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done').length,
    critical: tasks.filter(t => t.priority === 'Critical').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Task Management
            </h1>
            <p className="text-lg text-gray-600">Manage comprehensive EXIM trade lifecycle tasks and activities</p>
          </div>
          <Button 
            onClick={() => setShowCreateTask(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </Button>
        </div>

        {/* Task Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {[
            { label: "Total Tasks", value: taskStats.total, color: "blue", icon: Activity },
            { label: "To Do", value: taskStats.toDo, color: "yellow", icon: Clock },
            { label: "In Progress", value: taskStats.inProgress, color: "purple", icon: Activity },
            { label: "Completed", value: taskStats.done, color: "green", icon: CheckCircle },
            { label: "Overdue", value: taskStats.overdue, color: "red", icon: AlertTriangle },
            { label: "Critical", value: taskStats.critical, color: "orange", icon: AlertTriangle }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search tasks, companies, employees, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <select 
                  value={filterPhase}
                  onChange={(e) => setFilterPhase(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium"
                >
                  <option value="all">All Phases</option>
                  {tradePhases.map(phase => (
                    <option key={phase.id} value={phase.id}>{phase.name}</option>
                  ))}
                </select>

                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="Blocked">Blocked</option>
                </select>

                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium"
                >
                  <option value="all">All Priority</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EXIM Phase Overview */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-600" />
              EXIM Trade Lifecycle Phases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {tradePhases.map((phase) => {
                const Icon = phase.icon;
                const phaseTaskCount = tasks.filter(t => t.phase === phase.id).length;
                return (
                  <div
                    key={phase.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      filterPhase === phase.id 
                        ? `border-${phase.color}-500 bg-${phase.color}-50 shadow-lg` 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setFilterPhase(filterPhase === phase.id ? 'all' : phase.id)}
                  >
                    <div className="text-center space-y-2">
                      <div className={`w-12 h-12 bg-${phase.color}-100 rounded-xl flex items-center justify-center mx-auto`}>
                        <Icon className={`w-6 h-6 text-${phase.color}-600`} />
                      </div>
                      <h4 className="font-semibold text-sm text-gray-800">{phase.name}</h4>
                      <p className="text-xs text-gray-600 leading-tight">{phase.description}</p>
                      {phaseTaskCount > 0 && (
                        <Badge variant="secondary" className="text-xs">{phaseTaskCount} tasks</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTasks.map((task) => {
            const phaseInfo = getPhaseInfo(task.phase);
            const PhaseIcon = phaseInfo.icon;
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';
            
            return (
              <Card key={task.id} className={`bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${isOverdue ? 'ring-2 ring-red-200' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-${phaseInfo.color}-100 rounded-xl flex items-center justify-center`}>
                        <PhaseIcon className={`w-7 h-7 text-${phaseInfo.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 leading-tight text-lg">{task.title}</h3>
                        <p className="text-sm text-gray-500 font-mono">{task.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={getStatusColor(task.status)} className="text-xs">
                        {task.status}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-700 line-clamp-3 leading-relaxed">{task.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Phase</p>
                      <p className="font-semibold text-gray-800">{phaseInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Company</p>
                      <p className="font-semibold text-gray-800">{task.company}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Assigned to</p>
                      <p className="font-semibold text-gray-800">{task.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Due Date</p>
                      <p className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
                        {task.dueDate}
                        {isOverdue && <AlertTriangle className="w-4 h-4 inline ml-1" />}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Progress</span>
                      <span className="font-semibold text-gray-800">{task.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Hours: </span>
                      <span className="font-medium">{task.actualHours}/{task.estimatedHours}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'view')}>
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'edit')}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {task.status !== 'Done' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleTaskAction(task.id, 'complete')}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'delete')}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Create Task Modal */}
        {showCreateTask && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl">Create New EXIM Task</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Task Title *</label>
                      <Input
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        placeholder="Enter comprehensive task title"
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">EXIM Trade Phase *</label>
                      <select
                        value={newTask.phase}
                        onChange={(e) => setNewTask({...newTask, phase: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500"
                      >
                        {tradePhases.map(phase => (
                          <option key={phase.id} value={phase.id}>{phase.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                        <select
                          value={newTask.priority}
                          onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Hours</label>
                        <Input
                          type="number"
                          value={newTask.estimatedHours}
                          onChange={(e) => setNewTask({...newTask, estimatedHours: e.target.value})}
                          placeholder="40"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Assign To *</label>
                      <Input
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                        placeholder="Employee name or team"
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Due Date *</label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                        <Input
                          value={newTask.company}
                          onChange={(e) => setNewTask({...newTask, company: e.target.value})}
                          placeholder="Related company"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Deal ID</label>
                        <Input
                          value={newTask.deal}
                          onChange={(e) => setNewTask({...newTask, deal: e.target.value})}
                          placeholder="D001"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description *</label>
                  <Textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Provide comprehensive task description including objectives, deliverables, and success criteria"
                    rows={4}
                    className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma-separated)</label>
                  <Input
                    value={newTask.tags}
                    onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
                    placeholder="e.g., Europe, Certification, Urgent, B2B"
                    className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateTask(false)}
                    className="px-8 py-3 text-lg"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateTask} 
                    disabled={!newTask.title || !newTask.assignedTo || !newTask.dueDate}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
                  >
                    Create Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
