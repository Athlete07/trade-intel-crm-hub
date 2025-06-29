
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TaskForm } from "@/components/TaskForm";
import { TaskBoard } from "@/components/TaskBoard";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Building2,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Eye,
  Edit,
  MoreVertical,
  Target,
  TrendingUp,
  Activity,
  Users,
  LayoutGrid,
  List,
  Lightbulb
} from "lucide-react";

export function TaskManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskBoard, setShowTaskBoard] = useState(false);

  const tasks = [
    {
      id: "T001",
      title: "Export Documentation Review - ABC Textiles",
      description: "Review and validate all export documentation for the ABC Textiles shipment to Germany including commercial invoices, packing lists, and certificates of origin.",
      status: "In Progress",
      priority: "High",
      category: "Documentation",
      assignee: "Sarah Chen",
      company: "ABC Textiles Ltd",
      dealId: "D001",
      dueDate: "2024-12-15",
      dueTime: "17:00",
      estimatedHours: 8,
      actualHours: 4,
      progress: 50,
      tags: ["Export", "Documentation", "Germany"],
      clientContact: "Hans Mueller",
      riskLevel: "Medium"
    },
    {
      id: "T002", 
      title: "Quality Control Inspection - Electronics Shipment",
      description: "Conduct pre-shipment quality control inspection for electronics shipment to USA. Verify product specifications, packaging standards, and compliance requirements.",
      status: "Pending",
      priority: "Critical",
      category: "Quality Control",
      assignee: "Rajesh Kumar",
      company: "TechCorp Industries",
      dealId: "D002",
      dueDate: "2024-12-12",
      dueTime: "14:00",
      estimatedHours: 12,
      actualHours: 0,
      progress: 0,
      tags: ["Quality", "Electronics", "USA"],
      clientContact: "John Smith",
      riskLevel: "High"
    },
    {
      id: "T003",
      title: "Market Research - European Textile Markets",
      description: "Comprehensive market research on European textile import trends, pricing analysis, and competitor landscape for Q1 2025 expansion strategy.",
      status: "Review",
      priority: "Medium", 
      category: "Market Research",
      assignee: "Maria Garcia",
      company: "Global Textiles Co",
      dealId: "D003",
      dueDate: "2024-12-20",
      dueTime: "12:00",
      estimatedHours: 16,
      actualHours: 14,
      progress: 85,
      tags: ["Research", "Europe", "Textiles"],
      clientContact: "Pierre Dubois",
      riskLevel: "Low"
    },
    {
      id: "T004",
      title: "Compliance Audit - Pharmaceutical Exports",
      description: "Complete compliance audit for pharmaceutical exports to ensure adherence to FDA regulations, GMP standards, and international shipping requirements.",
      status: "Completed",
      priority: "Critical",
      category: "Compliance",
      assignee: "Dr. James Wilson",
      company: "PharmaCorp Ltd",
      dealId: "D004",
      dueDate: "2024-12-10",
      dueTime: "16:00",
      estimatedHours: 20,
      actualHours: 18,
      progress: 100,
      tags: ["Compliance", "Pharmaceutical", "FDA"],
      clientContact: "Dr. Amanda Lee",
      riskLevel: "Critical"
    },
    {
      id: "T005",
      title: "Logistics Coordination - Multi-modal Shipment",
      description: "Coordinate complex multi-modal shipment involving sea, rail, and road transport from India to Eastern Europe. Manage customs clearance at multiple checkpoints.",
      status: "On Hold",
      priority: "High",
      category: "Logistics",
      assignee: "Ahmed Hassan",
      company: "Logistics Solutions Inc",
      dealId: "D005",
      dueDate: "2024-12-18",
      dueTime: "10:00",
      estimatedHours: 24,
      actualHours: 6,
      progress: 25,
      tags: ["Logistics", "Multi-modal", "Europe"],
      clientContact: "Viktor Petrov", 
      riskLevel: "High"
    },
    {
      id: "T006",
      title: "Financial Analysis - Currency Hedging Strategy",
      description: "Develop comprehensive currency hedging strategy for USD/EUR transactions for Q1 2025. Analyze market volatility and recommend optimal hedging instruments.",
      status: "In Progress",
      priority: "Medium",
      category: "Finance",
      assignee: "Lisa Chen",
      company: "FinTrade Corp",
      dealId: "D006",
      dueDate: "2024-12-22",
      dueTime: "15:30",
      estimatedHours: 10,
      actualHours: 3,
      progress: 30,
      tags: ["Finance", "Hedging", "Currency"],
      clientContact: "Robert Johnson",
      riskLevel: "Medium"
    }
  ];

  const statuses = ["all", "Pending", "In Progress", "Review", "Completed", "On Hold", "Cancelled", "Blocked"];
  const priorities = ["all", "Low", "Medium", "High", "Critical", "Urgent"];
  const categories = [
    "all", "General", "Documentation", "Quality Control", "Finance", "Logistics", 
    "Sales", "Marketing", "Legal", "Technical", "Compliance", "Export Operations", 
    "Import Operations", "Market Research", "Client Relations", "Vendor Management"
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleViewTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (taskData: any) => {
    console.log("Saving task:", taskData);
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const getAIInsight = (task: any) => {
    const insights = [
      "Consider breaking this task into smaller milestones for better tracking",
      "Risk level suggests additional approval may be needed",
      "Similar tasks typically take 20% longer than estimated",
      "High priority task - consider allocating additional resources",
      "Client contact hasn't been reached recently - schedule follow-up"
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "On Hold": return "bg-gray-100 text-gray-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      case "Blocked": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500 text-white";
      case "Urgent": return "bg-red-400 text-white";
      case "High": return "bg-orange-500 text-white";
      case "Medium": return "bg-yellow-500 text-white";
      case "Low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "text-red-600";
      case "High": return "text-orange-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "In Progress": return <Play className="w-4 h-4 text-blue-600" />;
      case "On Hold": return <Pause className="w-4 h-4 text-gray-600" />;
      case "Review": return <Eye className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "Completed").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Completed").length
  };

  if (showTaskForm) {
    return (
      <TaskForm 
        taskId={selectedTask?.id}
        onSave={handleSaveTask}
        onCancel={() => {
          setShowTaskForm(false);
          setSelectedTask(null);
        }}
      />
    );
  }

  if (showTaskBoard) {
    return (
      <TaskBoard 
        tasks={filteredTasks}
        onBack={() => setShowTaskBoard(false)}
        onViewTask={handleViewTask}
        onEditTask={handleEditTask}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-900">{taskStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-900">{taskStats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-yellow-900">{taskStats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 mb-1">Overdue</p>
                <p className="text-3xl font-bold text-red-900">{taskStats.overdue}</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white shadow-xl border-0">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-slate-50">
          <CardTitle className="text-xl font-bold text-gray-800">Task Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tasks, assignees, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium min-w-32"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </option>
                ))}
              </select>
              
              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium min-w-32"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === "all" ? "All Priority" : priority}
                  </option>
                ))}
              </select>
              
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium min-w-40"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              
              <Button 
                variant="outline"
                onClick={() => setShowTaskBoard(true)}
                className="px-6"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Board View
              </Button>
              
              <Button 
                className="bg-[#0073e6] hover:bg-[#005bb5] px-6"
                onClick={handleNewTask}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* AI Insight */}
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-700">{getAIInsight(task)}</p>
                    </div>
                  </div>

                  {/* Task Title & Description */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {task.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-gray-900">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Task Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{task.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{task.dueDate} at {task.dueTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{task.actualHours}h / {task.estimatedHours}h</span>
                    </div>
                  </div>

                  {/* Status and Tags */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${getRiskColor(task.riskLevel)}`} />
                      <span className={`text-sm font-medium ${getRiskColor(task.riskLevel)}`}>
                        {task.riskLevel} Risk
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewTask(task.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleEditTask(task.id)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No tasks found</p>
              <p className="text-gray-400">Try adjusting your search and filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
