
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Upload, 
  Building2,
  Calendar,
  Save,
  X,
  AlertTriangle
} from "lucide-react";

interface DocumentFormProps {
  documentId?: string;
  onSave: (documentData: any) => void;
  onCancel: () => void;
}

export function DocumentForm({ documentId, onSave, onCancel }: DocumentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Commercial Invoice',
    category: 'Financial',
    description: '',
    company: '',
    dealId: '',
    expiryDate: '',
    tags: '',
    notes: '',
    confidentiality: 'Internal',
    version: '1.0',
    language: 'English'
  });

  const documentTypes = [
    'Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin',
    'Export License', 'Import License', 'Quality Certificate', 'Insurance Certificate',
    'Letter of Credit', 'Customs Declaration', 'Inspection Certificate', 'Other'
  ];

  const categories = [
    'Financial', 'Legal', 'Shipping', 'Quality', 'Insurance', 'Customs', 'Technical'
  ];

  const confidentialityLevels = ['Public', 'Internal', 'Confidential', 'Restricted'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type) {
      alert('Please fill in document name and type');
      return;
    }
    
    const documentData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      id: documentId || `DOC${Date.now().toString().slice(-3)}`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      size: '2.1 MB', // This would be calculated from actual file
      uploadedBy: 'Current User' // This would come from auth context
    };
    
    onSave(documentData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {documentId ? 'Edit Document' : 'Upload New Document'}
        </h1>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Document Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter document name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Document Type *</label>
                <select 
                  value={formData.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Brief description of the document..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Version</label>
                  <Input
                    value={formData.version}
                    onChange={(e) => updateField('version', e.target.value)}
                    placeholder="1.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select 
                    value={formData.language}
                    onChange={(e) => updateField('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Relations & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Relations & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => updateField('expiryDate', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if document doesn't expire</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confidentiality Level</label>
                <select 
                  value={formData.confidentiality}
                  onChange={(e) => updateField('confidentiality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {confidentialityLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="Legal, Export, Europe"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Upload */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              File Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
              <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)</p>
              <Button type="button" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
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
              placeholder="Additional notes about this document..."
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
            {documentId ? 'Update Document' : 'Upload Document'}
          </Button>
        </div>
      </form>
    </div>
  );
}
