
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Eye, 
  Edit, 
  Clock, 
  User, 
  Building2,
  AlertTriangle,
  Lightbulb,
  Calendar
} from "lucide-react";

interface TaskBoardProps {
  tasks: any[];
  onBack: () => void;
  onViewTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
}

export function TaskBoard({ tasks, onBack, onViewTask, onEditTask }: TaskBoardProps) {
  const [draggedTask, setDraggedTask] = useState<any>(null);

  const priorityColumns = [
    { id: "Critical", title: "Critical Priority", color: "bg-red-100 border-red-300" },
    { id: "High", title: "High Priority", color: "bg-orange-100 border-orange-300" },
    { id: "Medium", title: "Medium Priority", color: "bg-yellow-100 border-yellow-300" },
    { id: "Low", title: "Low Priority", color: "bg-green-100 border-green-300" }
  ];

  const getTasksByPriority = (priority: string) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500 text-white";
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

  const getAIInsight = (task: any) => {
    const insights = [
      "Task complexity suggests adding buffer time",
      "Similar tasks had delays - monitor closely",
      "Resource availability may impact timeline",
      "Client follow-up recommended before deadline",
      "Consider parallel processing for efficiency"
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  };

  const handleDragStart = (e: React.DragEvent, task: any) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetPriority: string) => {
    e.preventDefault();
    if (draggedTask) {
      console.log(`Moving task ${draggedTask.id} to ${targetPriority} priority`);
      // Here you would update the task priority in your state management
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Priority Board</h1>
              <p className="text-gray-600 mt-2">Visual task management by priority levels</p>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">AI Insights & Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Workload Analysis:</strong> Critical tasks are 40% above normal capacity
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Timeline Alert:</strong> 3 tasks approaching deadline this week
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Resource Suggestion:</strong> Consider redistributing medium priority tasks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {priorityColumns.map((column) => (
            <div
              key={column.id}
              className={`${column.color} rounded-xl p-4 min-h-[600px]`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-gray-800">{column.title}</h2>
                <Badge variant="outline" className="bg-white">
                  {getTasksByPriority(column.id).length}
                </Badge>
              </div>

              <div className="space-y-4">
                {getTasksByPriority(column.id).map((task) => (
                  <Card
                    key={task.id}
                    className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <CardContent className="p-4">
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.status}
                        </Badge>
                      </div>

                      {/* AI Insight for Task */}
                      <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-3 h-3 text-blue-600 mt-0.5" />
                          <p className="text-xs text-blue-700">{getAIInsight(task)}</p>
                        </div>
                      </div>

                      {/* Task Title */}
                      <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
                        {task.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">Progress</span>
                          <span className="text-xs font-bold text-gray-800">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Task Details */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600 truncate">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Building2 className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600 truncate">{task.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{task.actualHours}h / {task.estimatedHours}h</span>
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-3 h-3 ${getRiskColor(task.riskLevel)}`} />
                          <span className={`text-xs font-medium ${getRiskColor(task.riskLevel)}`}>
                            {task.riskLevel} Risk
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs"
                          onClick={() => onViewTask(task.id)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs"
                          onClick={() => onEditTask(task.id)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                <Button 
                  variant="outline" 
                  className="w-full bg-white/70 hover:bg-white border-dashed border-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add {column.title} Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
