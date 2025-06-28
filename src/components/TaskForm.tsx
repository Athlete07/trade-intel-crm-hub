
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
  Tag,
  FileText,
  CheckCircle,
  Target,
  DollarSign,
  Globe,
  Truck,
  Shield
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
    actualHours: '',
    tags: '',
    reminders: ['1 day before'],
    dependencies: '',
    notes: '',
    attachments: [],
    clientContact: '',
    budget: '',
    currency: 'USD',
    locationRequired: '',
    requiredSkills: '',
    approvalRequired: false,
    approver: '',
    completionCriteria: '',
    riskLevel: 'Low',
    contingencyPlan: '',
    resources: '',
    milestones: '',
    reviewDate: ''
  });

  const priorities = ['Low', 'Medium', 'High', 'Critical', 'Urgent'];
  const statuses = ['Pending', 'In Progress', 'Review', 'Completed', 'On Hold', 'Cancelled', 'Blocked'];
  const categories = [
    'General', 'Documentation', 'Quality Control', 'Finance', 'Logistics', 'Sales', 
    'Marketing', 'Legal', 'Technical', 'Compliance', 'Export Operations', 'Import Operations',
    'Market Research', 'Client Relations', 'Vendor Management', 'Risk Assessment'
  ];
  
  const riskLevels = ['Low', 'Medium', 'High', 'Critical'];
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'AUD'];

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
      requiredSkills: formData.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
      resources: formData.resources.split(',').map(resource => resource.trim()).filter(resource => resource),
      milestones: formData.milestones.split('\n').map(milestone => milestone.trim()).filter(milestone => milestone),
      id: taskId || `T${Date.now().toString().slice(-6)}`,
      createdDate: new Date().toISOString().split('T')[0],
      completedHours: formData.actualHours || 0
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
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {taskId ? 'Edit Task' : 'Create New Task'}
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive task management for EXIM operations</p>
          </div>
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Basic Task Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Task Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Enter comprehensive task title"
                    required
                    className="h-12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Detailed description of the task requirements and objectives..."
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => updateField('dueDate', e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
                    <Input
                      type="time"
                      value={formData.dueTime}
                      onChange={(e) => updateField('dueTime', e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select 
                      value={formData.priority}
                      onChange={(e) => updateField('priority', e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => updateField('status', e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Completion Criteria</label>
                  <Textarea
                    value={formData.completionCriteria}
                    onChange={(e) => updateField('completionCriteria', e.target.value)}
                    placeholder="Define clear criteria for task completion..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Assignment & Relations */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <User className="w-5 h-5 text-green-600" />
                  Assignment & Relations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <Input
                    value={formData.assignee}
                    onChange={(e) => updateField('assignee', e.target.value)}
                    placeholder="Assign to team member"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Related Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="Company name"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Related Deal ID</label>
                  <Input
                    value={formData.dealId}
                    onChange={(e) => updateField('dealId', e.target.value)}
                    placeholder="Deal ID (if applicable)"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Contact</label>
                  <Input
                    value={formData.clientContact}
                    onChange={(e) => updateField('clientContact', e.target.value)}
                    placeholder="Primary client contact person"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Required</label>
                  <Input
                    value={formData.locationRequired}
                    onChange={(e) => updateField('locationRequired', e.target.value)}
                    placeholder="Specific location if task requires physical presence"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills (comma-separated)</label>
                  <Input
                    value={formData.requiredSkills}
                    onChange={(e) => updateField('requiredSkills', e.target.value)}
                    placeholder="Export documentation, Quality analysis, Legal expertise"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dependencies (comma-separated)</label>
                  <Input
                    value={formData.dependencies}
                    onChange={(e) => updateField('dependencies', e.target.value)}
                    placeholder="Task IDs this task depends on"
                    className="h-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="approvalRequired"
                    checked={formData.approvalRequired}
                    onChange={(e) => updateField('approvalRequired', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="approvalRequired" className="text-sm font-medium text-gray-700">
                    Requires Approval
                  </label>
                </div>
                
                {formData.approvalRequired && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Approver</label>
                    <Input
                      value={formData.approver}
                      onChange={(e) => updateField('approver', e.target.value)}
                      placeholder="Name of the approving authority"
                      className="h-10"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
            {/* Time & Budget Management */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Time & Budget Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                    <Input
                      type="number"
                      value={formData.estimatedHours}
                      onChange={(e) => updateField('estimatedHours', e.target.value)}
                      placeholder="Estimated time to complete"
                      min="0"
                      step="0.5"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Actual Hours</label>
                    <Input
                      type="number"
                      value={formData.actualHours}
                      onChange={(e) => updateField('actualHours', e.target.value)}
                      placeholder="Time actually spent"
                      min="0"
                      step="0.5"
                      className="h-10"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Allocated</label>
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => updateField('budget', e.target.value)}
                      placeholder="Budget amount"
                      min="0"
                      step="0.01"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select 
                      value={formData.currency}
                      onChange={(e) => updateField('currency', e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review Date</label>
                  <Input
                    type="date"
                    value={formData.reviewDate}
                    onChange={(e) => updateField('reviewDate', e.target.value)}
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resources Required (comma-separated)</label>
                  <Input
                    value={formData.resources}
                    onChange={(e) => updateField('resources', e.target.value)}
                    placeholder="Equipment, software, materials needed"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Milestones (one per line)</label>
                  <Textarea
                    value={formData.milestones}
                    onChange={(e) => updateField('milestones', e.target.value)}
                    placeholder="Key milestones for this task..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Risk Management */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Shield className="w-5 h-5 text-orange-600" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                  <select 
                    value={formData.riskLevel}
                    onChange={(e) => updateField('riskLevel', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {riskLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contingency Plan</label>
                  <Textarea
                    value={formData.contingencyPlan}
                    onChange={(e) => updateField('contingencyPlan', e.target.value)}
                    placeholder="Backup plan if primary approach fails..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                    placeholder="Urgent, Export, Documentation, Compliance"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder="Additional notes, special instructions, or important information..."
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reminders Section */}
          <Card className="mt-8 bg-white shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Bell className="w-5 h-5 text-yellow-600" />
                Reminders & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.reminders.map((reminder, index) => (
                    <div key={index} className="flex items-center justify-between bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <span className="text-sm font-medium text-gray-800">{reminder}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeReminder(index)}
                        className="ml-2 h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={addReminder} className="mt-4">
                  <Bell className="w-4 h-4 mr-2" />
                  Add Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={onCancel} className="px-6 py-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0073e6] hover:bg-[#005bb5] px-6 py-2">
              <Save className="w-4 h-4 mr-2" />
              {taskId ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
