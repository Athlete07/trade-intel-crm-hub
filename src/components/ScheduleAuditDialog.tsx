
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  CheckCircle,
  AlertTriangle,
  Shield,
  Plus,
  X,
  Save,
  Users
} from "lucide-react";

interface ScheduleAuditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduled: (audit: any) => void;
}

export function ScheduleAuditDialog({ open, onOpenChange, onScheduled }: ScheduleAuditDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    type: 'Internal Compliance Audit',
    scope: '',
    auditor: '',
    auditeeCompany: '',
    auditeeContact: '',
    scheduledDate: '',
    scheduledTime: '',
    estimatedDuration: '4',
    location: '',
    objectives: '',
    standards: [],
    checklist: [],
    riskLevel: 'medium',
    preparationTime: '7',
    followUpRequired: true,
    reportingDeadline: '',
    notes: ''
  });

  const [newStandard, setNewStandard] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const auditTypes = [
    'Internal Compliance Audit',
    'External Regulatory Audit',
    'ISO Certification Audit',
    'Financial Compliance Audit',
    'Data Protection Audit',
    'Environmental Compliance Audit',
    'Health & Safety Audit',
    'Quality Management Audit',
    'Export Control Audit',
    'Anti-Corruption Audit'
  ];

  const complianceStandards = [
    'ISO 9001:2015 - Quality Management',
    'ISO 14001:2015 - Environmental Management',
    'ISO 45001:2018 - Occupational Health & Safety',
    'ISO 27001:2013 - Information Security',
    'SOX - Sarbanes-Oxley Act',
    'GDPR - General Data Protection Regulation',
    'ITAR - International Traffic in Arms Regulations',
    'EAR - Export Administration Regulations',
    'AML - Anti-Money Laundering',
    'FCPA - Foreign Corrupt Practices Act'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.auditor || !formData.scheduledDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const auditData = {
      id: `AUD-${Date.now()}`,
      ...formData,
      status: 'Scheduled',
      createdDate: new Date().toISOString().split('T')[0],
      progress: 0
    };

    onScheduled(auditData);
    
    toast({
      title: "Audit Scheduled Successfully",
      description: `${formData.type} has been scheduled for ${formData.scheduledDate}`,
    });

    // Reset form
    setFormData({
      title: '',
      type: 'Internal Compliance Audit',
      scope: '',
      auditor: '',
      auditeeCompany: '',
      auditeeContact: '',
      scheduledDate: '',
      scheduledTime: '',
      estimatedDuration: '4',
      location: '',
      objectives: '',
      standards: [],
      checklist: [],
      riskLevel: 'medium',
      preparationTime: '7',
      followUpRequired: true,
      reportingDeadline: '',
      notes: ''
    });
    
    onOpenChange(false);
  };

  const addStandard = () => {
    if (newStandard && !formData.standards.includes(newStandard)) {
      setFormData(prev => ({
        ...prev,
        standards: [...prev.standards, newStandard]
      }));
      setNewStandard('');
    }
  };

  const removeStandard = (standard: string) => {
    setFormData(prev => ({
      ...prev,
      standards: prev.standards.filter(s => s !== standard)
    }));
  };

  const addChecklistItem = () => {
    if (newChecklistItem && !formData.checklist.includes(newChecklistItem)) {
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, newChecklistItem]
      }));
      setNewChecklistItem('');
    }
  };

  const removeChecklistItem = (item: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(c => c !== item)
    }));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Compliance Audit
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Audit Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter audit title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Audit Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    {auditTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="scope">Audit Scope</Label>
                <Textarea
                  id="scope"
                  value={formData.scope}
                  onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
                  placeholder="Define the scope and boundaries of the audit"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="objectives">Audit Objectives</Label>
                <Textarea
                  id="objectives"
                  value={formData.objectives}
                  onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                  placeholder="Define the specific objectives and goals of the audit"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Scheduling Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="scheduledDate">Scheduled Date *</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledTime">Scheduled Time</Label>
                  <Input
                    id="scheduledTime"
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedDuration">Duration (hours)</Label>
                  <Input
                    id="estimatedDuration"
                    type="number"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    min="1"
                    max="24"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Audit location or 'Virtual'"
                  />
                </div>
                <div>
                  <Label htmlFor="preparationTime">Preparation Time (days)</Label>
                  <Input
                    id="preparationTime"
                    type="number"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, preparationTime: e.target.value }))}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="auditor">Lead Auditor *</Label>
                  <Input
                    id="auditor"
                    value={formData.auditor}
                    onChange={(e) => setFormData(prev => ({ ...prev, auditor: e.target.value }))}
                    placeholder="Enter lead auditor name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="auditeeCompany">Auditee Company</Label>
                  <Input
                    id="auditeeCompany"
                    value={formData.auditeeCompany}
                    onChange={(e) => setFormData(prev => ({ ...prev, auditeeCompany: e.target.value }))}
                    placeholder="Company being audited"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="auditeeContact">Auditee Contact Person</Label>
                <Input
                  id="auditeeContact"
                  value={formData.auditeeContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, auditeeContact: e.target.value }))}
                  placeholder="Primary contact for the audit"
                />
              </div>
            </CardContent>
          </Card>

          {/* Standards and Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Standards & Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Standards */}
              <div>
                <Label>Compliance Standards</Label>
                <div className="flex gap-2 mt-2">
                  <select
                    value={newStandard}
                    onChange={(e) => setNewStandard(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a standard</option>
                    {complianceStandards.map(standard => (
                      <option key={standard} value={standard}>{standard}</option>
                    ))}
                  </select>
                  <Button type="button" onClick={addStandard}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.standards.map(standard => (
                    <Badge key={standard} variant="outline" className="flex items-center gap-1">
                      {standard}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeStandard(standard)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div>
                <Label>Audit Checklist Items</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add checklist item"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
                  />
                  <Button type="button" onClick={addChecklistItem}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {formData.checklist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{item}</span>
                      <X 
                        className="w-4 h-4 cursor-pointer text-red-500" 
                        onClick={() => removeChecklistItem(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Risk Assessment & Follow-up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskLevel">Risk Level</Label>
                  <select
                    id="riskLevel"
                    value={formData.riskLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reportingDeadline">Reporting Deadline</Label>
                  <Input
                    id="reportingDeadline"
                    type="date"
                    value={formData.reportingDeadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, reportingDeadline: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={(e) => setFormData(prev => ({ ...prev, followUpRequired: e.target.checked }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="followUpRequired">Follow-up audit required</Label>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes, special requirements, or instructions for the audit"
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Audit Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Audit Type:</span> {formData.type}
                </div>
                <div>
                  <span className="font-medium">Scheduled Date:</span> {formData.scheduledDate || 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {formData.estimatedDuration} hours
                </div>
                <div>
                  <span className="font-medium">Risk Level:</span> 
                  <Badge variant={getRiskColor(formData.riskLevel)} className="ml-2">
                    {formData.riskLevel}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Standards:</span> {formData.standards.length} selected
                </div>
                <div>
                  <span className="font-medium">Checklist Items:</span> {formData.checklist.length} items
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Schedule Audit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
