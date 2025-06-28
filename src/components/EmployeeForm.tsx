
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Calendar,
  Save,
  X,
  User,
  Briefcase,
  DollarSign,
  Clock,
  Shield
} from "lucide-react";

interface EmployeeFormProps {
  employeeId?: string;
  onSave: (employeeData: any) => void;
  onCancel: () => void;
}

export function EmployeeForm({ employeeId, onSave, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      personalPhone: '',
      dateOfBirth: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    jobInfo: {
      employeeId: '',
      role: '',
      department: '',
      manager: '',
      location: '',
      workLocation: 'Office',
      employmentType: 'Full-time',
      joinDate: '',
      probationEndDate: '',
      status: 'Active'
    },
    compensation: {
      salary: '',
      currency: 'INR',
      payFrequency: 'Monthly',
      bonus: '',
      benefits: ''
    },
    access: {
      systemAccess: ['CRM'],
      permissions: ['Read'],
      securityClearance: 'Standard'
    },
    documents: {
      resume: '',
      offerLetter: '',
      contract: '',
      idProof: '',
      addressProof: ''
    },
    notes: ''
  });

  const departments = [
    'International Trade', 'Compliance', 'Quality Assurance', 'Finance', 
    'Sales & Marketing', 'Operations', 'Legal', 'IT', 'HR', 'Admin'
  ];

  const roles = [
    'Export Manager', 'Import Manager', 'Documentation Specialist', 'Quality Analyst',
    'Compliance Officer', 'Sales Executive', 'Account Manager', 'Operations Manager',
    'Legal Advisor', 'IT Specialist', 'HR Manager', 'Admin Assistant'
  ];

  const locations = [
    'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Remote'
  ];

  const systemAccess = [
    'CRM', 'ERP', 'Document Management', 'Email', 'VPN', 'Trading Platform', 'Quality System'
  ];

  const permissions = [
    'Read', 'Write', 'Delete', 'Admin', 'Export', 'Import', 'Financial'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.personalInfo.firstName || !formData.personalInfo.lastName || !formData.personalInfo.email || !formData.jobInfo.role) {
      alert('Please fill in all required fields');
      return;
    }
    
    const employeeData = {
      ...formData,
      id: employeeId || `EMP${Date.now().toString().slice(-3)}`,
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    onSave(employeeData);
  };

  const updateField = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const toggleArrayField = (section: string, field: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[section as keyof typeof prev][field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: newArray
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {employeeId ? 'Edit Employee' : 'Add New Employee'}
            </h1>
            <p className="text-gray-600 mt-2">Manage employee information and access</p>
          </div>
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <Input
                      value={formData.personalInfo.firstName}
                      onChange={(e) => updateField('personalInfo', 'firstName', e.target.value)}
                      placeholder="Enter first name"
                      required
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <Input
                      value={formData.personalInfo.lastName}
                      onChange={(e) => updateField('personalInfo', 'lastName', e.target.value)}
                      placeholder="Enter last name"
                      required
                      className="h-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
                    placeholder="employee@company.com"
                    required
                    className="h-10"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Phone</label>
                    <Input
                      value={formData.personalInfo.phone}
                      onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
                      placeholder="+91-XXXX-XXXXXX"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Personal Phone</label>
                    <Input
                      value={formData.personalInfo.personalPhone}
                      onChange={(e) => updateField('personalInfo', 'personalPhone', e.target.value)}
                      placeholder="+91-XXXX-XXXXXX"
                      className="h-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <Input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => updateField('personalInfo', 'dateOfBirth', e.target.value)}
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <Textarea
                    value={formData.personalInfo.address}
                    onChange={(e) => updateField('personalInfo', 'address', e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <Input
                      value={formData.personalInfo.emergencyContact}
                      onChange={(e) => updateField('personalInfo', 'emergencyContact', e.target.value)}
                      placeholder="Contact person name"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
                    <Input
                      value={formData.personalInfo.emergencyPhone}
                      onChange={(e) => updateField('personalInfo', 'emergencyPhone', e.target.value)}
                      placeholder="+91-XXXX-XXXXXX"
                      className="h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <Input
                    value={formData.jobInfo.employeeId}
                    onChange={(e) => updateField('jobInfo', 'employeeId', e.target.value)}
                    placeholder="EMP001"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Role *</label>
                  <select 
                    value={formData.jobInfo.role}
                    onChange={(e) => updateField('jobInfo', 'role', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select 
                    value={formData.jobInfo.department}
                    onChange={(e) => updateField('jobInfo', 'department', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Manager</label>
                  <Input
                    value={formData.jobInfo.manager}
                    onChange={(e) => updateField('jobInfo', 'manager', e.target.value)}
                    placeholder="Manager name"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Location</label>
                  <select 
                    value={formData.jobInfo.location}
                    onChange={(e) => updateField('jobInfo', 'location', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
                    <select 
                      value={formData.jobInfo.workLocation}
                      onChange={(e) => updateField('jobInfo', 'workLocation', e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Office">Office</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                    <select 
                      value={formData.jobInfo.employmentType}
                      onChange={(e) => updateField('jobInfo', 'employmentType', e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                    <Input
                      type="date"
                      value={formData.jobInfo.joinDate}
                      onChange={(e) => updateField('jobInfo', 'joinDate', e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Probation End Date</label>
                    <Input
                      type="date"
                      value={formData.jobInfo.probationEndDate}
                      onChange={(e) => updateField('jobInfo', 'probationEndDate', e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                  <select 
                    value={formData.jobInfo.status}
                    onChange={(e) => updateField('jobInfo', 'status', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
            {/* Compensation & Benefits */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  Compensation & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Salary</label>
                    <Input
                      type="number"
                      value={formData.compensation.salary}
                      onChange={(e) => updateField('compensation', 'salary', e.target.value)}
                      placeholder="Annual salary"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select 
                      value={formData.compensation.currency}
                      onChange={(e) => updateField('compensation', 'currency', e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pay Frequency</label>
                  <select 
                    value={formData.compensation.payFrequency}
                    onChange={(e) => updateField('compensation', 'payFrequency', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Bonus</label>
                  <Input
                    type="number"
                    value={formData.compensation.bonus}
                    onChange={(e) => updateField('compensation', 'bonus', e.target.value)}
                    placeholder="Bonus amount"
                    className="h-10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                  <Textarea
                    value={formData.compensation.benefits}
                    onChange={(e) => updateField('compensation', 'benefits', e.target.value)}
                    placeholder="Health insurance, PF, gratuity, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Access & Permissions */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Shield className="w-5 h-5 text-orange-600" />
                  System Access & Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">System Access</label>
                  <div className="space-y-2">
                    {systemAccess.map(system => (
                      <label key={system} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.access.systemAccess.includes(system)}
                          onChange={() => toggleArrayField('access', 'systemAccess', system)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{system}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="space-y-2">
                    {permissions.map(permission => (
                      <label key={permission} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.access.permissions.includes(permission)}
                          onChange={() => toggleArrayField('access', 'permissions', permission)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Security Clearance</label>
                  <select 
                    value={formData.access.securityClearance}
                    onChange={(e) => updateField('access', 'securityClearance', e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Elevated">Elevated</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Notes */}
          <Card className="mt-8 bg-white shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Clock className="w-5 h-5 text-gray-600" />
                Additional Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes, special instructions, or comments about the employee..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={onCancel} className="px-6 py-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0073e6] hover:bg-[#005bb5] px-6 py-2">
              <Save className="w-4 h-4 mr-2" />
              {employeeId ? 'Update Employee' : 'Add Employee'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
