
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  AlertTriangle,
  Save,
  X,
  Bell,
  Tag
} from "lucide-react";

interface TaskFormProps {
  taskId?: string;
  onSave: (taskData: any) => void;
  onCancel: () => void;
}

export function TaskForm({ taskId, onSave, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'Medium',
    status: 'Pending',
    assignee: '',
    company: '',
    dealId: '',
    category: 'General',
    estimatedHours: '',
    tags: '',
    reminders: ['1 day before'],
    dependencies: '',
    notes: '',
    attachments: []
  });

  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'];
  const categories = [
    'General', 'Documentation', 'Quality Control', 'Finance', 
    'Logistics', 'Sales', 'Marketing', 'Legal', 'Technical'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) {
      alert('Please fill in title and due date');
      return;
    }
    
    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      dependencies: formData.dependencies.split(',').map(dep => dep.trim()).filter(dep => dep),
      id: taskId || `T${Date.now().toString().slice(-3)}`,
      createdDate: new Date().toISOString().split('T')[0],
      completedHours: 0
    };
    
    onSave(taskData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addReminder = () => {
    const reminder = prompt('Enter reminder (e.g., "2 hours before", "1 day before"):');
    if (reminder) {
      setFormData(prev => ({
        ...prev,
        reminders: [...prev.reminders, reminder]
      }));
    }
  };

  const removeReminder = (index: number) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {taskId ? 'Edit Task' : 'Create New Task'}
        </h1>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Task Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Task Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe the task in detail..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date *</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => updateField('dueDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Time</label>
                  <Input
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => updateField('dueTime', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => updateField('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Relations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Assignment & Relations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Assignee</label>
                <Input
                  value={formData.assignee}
                  onChange={(e) => updateField('assignee', e.target.value)}
                  placeholder="Assign to team member"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Related Company</label>
                <Input
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Related Deal ID</label>
                <Input
                  value={formData.dealId}
                  onChange={(e) => updateField('dealId', e.target.value)}
                  placeholder="Deal ID (if applicable)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Estimated Hours</label>
                <Input
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => updateField('estimatedHours', e.target.value)}
                  placeholder="Estimated time to complete"
                  min="0"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Dependencies (comma-separated)</label>
                <Input
                  value={formData.dependencies}
                  onChange={(e) => updateField('dependencies', e.target.value)}
                  placeholder="Task IDs this task depends on"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="Urgent, Export, Documentation"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reminders */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {formData.reminders.map((reminder, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{reminder}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeReminder(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addReminder}>
                <Bell className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Additional notes, instructions, or comments..."
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {taskId ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </div>
  );
}
