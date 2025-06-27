import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Star,
  Bell,
  Edit,
  Eye,
  Trash2,
  Play,
  Pause
} from "lucide-react";
import { TaskForm } from "./TaskForm";

export function TaskManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [viewingTaskId, setViewingTaskId] = useState<string | null>(null);

  const tasks = [
    {
      id: "T001",
      title: "Prepare Export Documentation",
      description: "Prepare complete export documentation for ABC Textiles shipment including certificates and licenses",
      dueDate: "2024-12-01",
      createdDate: "2024-11-20",
      priority: "High",
      status: "In Progress",
      assignee: "Rajesh Kumar",
      company: "ABC Textiles Ltd",
      dealId: "D001",
      category: "Documentation",
      estimatedHours: 4,
      completedHours: 2,
      reminders: ["2024-11-30"],
      tags: ["Export", "Documentation", "Urgent"]
    },
    {
      id: "T002",
      title: "Quality Inspection Coordination",
      description: "Coordinate with third-party inspection agency for steel components quality check",
      dueDate: "2024-12-05",
      createdDate: "2024-11-22",
      priority: "High",
      status: "Pending",
      assignee: "Hans Mueller",
      company: "Steel Components Inc",
      dealId: "D001",
      category: "Quality Control",
      estimatedHours: 6,
      completedHours: 0,
      reminders: ["2024-12-03"],
      tags: ["Quality", "Inspection", "Third-party"]
    },
    {
      id: "T003",
      title: "Payment Terms Negotiation",
      description: "Negotiate payment terms with Global Electronics for upcoming deal",
      dueDate: "2024-11-30",
      createdDate: "2024-11-18",
      priority: "Medium",
      status: "Completed",
      assignee: "Sarah Chen",
      company: "Global Electronics Inc",
      dealId: "D002",
      category: "Finance",
      estimatedHours: 3,
      completedHours: 3,
      reminders: [],
      tags: ["Payment", "Negotiation", "Finance"]
    },
    {
      id: "T004",
      title: "Shipping Schedule Coordination",
      description: "Coordinate shipping schedule with logistics partner for machinery transport",
      dueDate: "2024-12-10",
      createdDate: "2024-11-25",
      priority: "Medium",
      status: "Pending",
      assignee: "Klaus Weber",
      company: "Indo-German Motors",
      dealId: "D003",
      category: "Logistics",
      estimatedHours: 2,
      completedHours: 0,
      reminders: ["2024-12-08"],
      tags: ["Shipping", "Logistics", "Coordination"]
    },
    {
      id: "T005",
      title: "Follow-up Client Meeting",
      description: "Schedule and conduct follow-up meeting with potential client to discuss requirements",
      dueDate: "2024-11-28",
      createdDate: "2024-11-24",
      priority: "Low",
      status: "Overdue",
      assignee: "Priya Singh",
      company: "New Prospect Ltd",
      dealId: null,
      category: "Sales",
      estimatedHours: 1,
      completedHours: 0,
      reminders: ["2024-11-27"],
      tags: ["Follow-up", "Meeting", "Sales"]
    }
  ];

  const priorities = ["all", "High", "Medium", "Low"];
  const statuses = ["all", "Pending", "In Progress", "Completed", "Overdue"];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'Pending': return Calendar;
      case 'Overdue': return AlertTriangle;
      default: return Calendar;
    }
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
    setEditingTaskId(null);
  };

  const handleEditTask = (taskId: string) => {
    setEditingTaskId(taskId);
    setIsAddingTask(true);
  };

  const handleSaveTask = (taskData: any) => {
    console.log('Task saved:', taskData);
    alert(`Task "${taskData.title}" saved successfully!`);
    setIsAddingTask(false);
    setEditingTaskId(null);
  };

  const handleCancelTaskForm = () => {
    setIsAddingTask(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      alert(`Task ${taskId} deleted successfully!`);
    }
  };

  const handleTaskAction = (taskId: string, action: string) => {
    switch (action) {
      case 'start':
        alert(`Task ${taskId} started`);
        break;
      case 'pause':
        alert(`Task ${taskId} paused`);
        break;
      case 'complete':
        alert(`Task ${taskId} marked as completed`);
        break;
      case 'view':
        setViewingTaskId(taskId);
        break;
      case 'edit':
        handleEditTask(taskId);
        break;
      case 'delete':
        handleDeleteTask(taskId);
        break;
      case 'remind':
        alert(`Reminder set for task ${taskId}`);
        break;
    }
  };

  if (isAddingTask) {
    return (
      <TaskForm
        taskId={editingTaskId}
        onSave={handleSaveTask}
        onCancel={handleCancelTaskForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
        <Button onClick={() => setIsAddingTask(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-xl font-bold">{tasks.length}</p>
                <p className="text-xs text-gray-500">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-xl font-bold">{tasks.filter(t => t.status === 'In Progress').length}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-xl font-bold">{tasks.filter(t => t.status === 'Completed').length}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-xl font-bold">{tasks.filter(t => t.status === 'Overdue').length}</p>
                <p className="text-xs text-gray-500">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-xl font-bold">{tasks.filter(t => t.priority === 'High').length}</p>
                <p className="text-xs text-gray-500">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority}
                </option>
              ))}
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status);
          
          return (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <StatusIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Due Date</p>
                          <p className="text-sm font-medium">{task.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Assignee</p>
                          <p className="text-sm font-medium">{task.assignee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Company</p>
                          <p className="text-sm font-medium">{task.company}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="text-sm font-medium">{task.category}</p>
                        </div>
                      </div>

                      {task.estimatedHours > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{task.completedHours}/{task.estimatedHours} hours</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {task.status === 'Pending' && (
                      <Button size="sm" onClick={() => handleTaskAction(task.id, 'start')}>
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    )}
                    {task.status === 'In Progress' && (
                      <>
                        <Button size="sm" onClick={() => handleTaskAction(task.id, 'pause')}>
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </Button>
                        <Button size="sm" onClick={() => handleTaskAction(task.id, 'complete')} className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      </>
                    )}
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'view')}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'edit')}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'remind')}>
                        <Bell className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleTaskAction(task.id, 'delete')} className="text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
