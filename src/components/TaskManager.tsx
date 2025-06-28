
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
  Trash2
} from "lucide-react";

export function TaskManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPhase, setFilterPhase] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showCreateTask, setShowCreateTask] = useState(false);

  // EXIM Trade Lifecycle Phases
  const tradePhases = [
    { id: "market-research", name: "Market Research", icon: Search, color: "blue" },
    { id: "buyer-identification", name: "Buyer Identification", icon: User, color: "green" },
    { id: "product-development", name: "Product Development", icon: Building2, color: "purple" },
    { id: "pricing-costing", name: "Pricing & Costing", icon: DollarSign, color: "yellow" },
    { id: "compliance-certification", name: "Compliance & Certification", icon: FileText, color: "orange" },
    { id: "negotiation", name: "Contract Negotiation", icon: Phone, color: "red" },
    { id: "documentation", name: "Export Documentation", icon: FileText, color: "cyan" },
    { id: "financing", name: "Trade Financing", icon: DollarSign, color: "indigo" },
    { id: "logistics", name: "Logistics & Shipping", icon: Truck, color: "pink" },
    { id: "customs-clearance", name: "Customs Clearance", icon: Globe, color: "teal" },
    { id: "shipment-tracking", name: "Shipment Tracking", icon: Ship, color: "lime" },
    { id: "delivery-handover", name: "Delivery & Handover", icon: CheckCircle, color: "emerald" },
    { id: "payment-collection", name: "Payment Collection", icon: DollarSign, color: "amber" },
    { id: "after-sales", name: "After Sales Support", icon: Phone, color: "violet" }
  ];

  const [tasks, setTasks] = useState([
    {
      id: "TASK/2025/00001",
      title: "Identify potential buyers in European textile market",
      description: "Research and compile list of textile importers in Germany, France, and Netherlands",
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
      comments: [],
      attachments: []
    },
    {
      id: "TASK/2025/00002",
      title: "Obtain ISO 9001 certification for machinery export",
      description: "Complete documentation and audit process for quality certification",
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
      comments: [],
      attachments: []
    },
    {
      id: "TASK/2025/00003",
      title: "Arrange container booking for electronics shipment",
      description: "Book 20ft container from Mumbai to Hamburg port",
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
      comments: [],
      attachments: []
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
    deal: ""
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.company.toLowerCase().includes(searchTerm.toLowerCase());
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
      comments: [],
      attachments: []
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
      deal: ""
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Manage EXIM trade lifecycle tasks and activities</p>
        </div>
        <Button onClick={() => setShowCreateTask(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{taskStats.toDo}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{taskStats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{taskStats.done}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{taskStats.critical}</div>
            <div className="text-sm text-gray-600">Critical</div>
          </CardContent>
        </Card>
      </div>

      {/* EXIM Phase Filter */}
      <Card>
        <CardHeader>
          <CardTitle>EXIM Trade Lifecycle Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <Button
              variant={filterPhase === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPhase("all")}
              className="justify-start"
            >
              All Phases
            </Button>
            {tradePhases.map((phase) => {
              const Icon = phase.icon;
              const phaseTaskCount = tasks.filter(t => t.phase === phase.id).length;
              return (
                <Button
                  key={phase.id}
                  variant={filterPhase === phase.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterPhase(phase.id)}
                  className="justify-start text-xs p-2 h-auto flex-col"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs leading-tight">{phase.name}</span>
                  {phaseTaskCount > 0 && (
                    <Badge variant="secondary" className="text-xs mt-1">{phaseTaskCount}</Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tasks, companies, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const phaseInfo = getPhaseInfo(task.phase);
          const PhaseIcon = phaseInfo.icon;
          const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Done';
          
          return (
            <Card key={task.id} className={`hover:shadow-lg transition-shadow ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${phaseInfo.color}-100 rounded-lg flex items-center justify-center`}>
                      <PhaseIcon className={`w-5 h-5 text-${phaseInfo.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 leading-tight">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
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
                <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Phase:</span>
                    <span className="font-medium">{phaseInfo.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Company:</span>
                    <span className="font-medium">{task.company}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assigned to:</span>
                    <span className="font-medium">{task.assignedTo}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Due Date:</span>
                    <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                      {task.dueDate}
                      {isOverdue && <AlertTriangle className="w-4 h-4 inline ml-1" />}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
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
                      <Button size="sm" onClick={() => handleTaskAction(task.id, 'complete')}>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Task Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Detailed task description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">EXIM Phase</label>
                  <select
                    value={newTask.phase}
                    onChange={(e) => setNewTask({...newTask, phase: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {tradePhases.map(phase => (
                      <option key={phase.id} value={phase.id}>{phase.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Assign To</label>
                  <Input
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                    placeholder="Employee name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    value={newTask.company}
                    onChange={(e) => setNewTask({...newTask, company: e.target.value})}
                    placeholder="Related company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Deal ID (Optional)</label>
                  <Input
                    value={newTask.deal}
                    onChange={(e) => setNewTask({...newTask, deal: e.target.value})}
                    placeholder="e.g., D001"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateTask(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} disabled={!newTask.title || !newTask.assignedTo}>
                  Create Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
