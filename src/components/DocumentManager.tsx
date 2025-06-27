
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  Building2,
  User,
  Plus,
  Star,
  Check,
  AlertTriangle
} from "lucide-react";

export function DocumentManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const documents = [
    {
      id: "DOC001",
      name: "Export_License_ABC_Textiles.pdf",
      type: "Export License",
      category: "Legal",
      size: "2.3 MB",
      uploadDate: "2024-11-20",
      expiryDate: "2025-11-20",
      status: "Active",
      company: "ABC Textiles Ltd",
      deal: "D001",
      uploadedBy: "Rajesh Kumar",
      description: "Export license for textile products to Europe",
      tags: ["Legal", "Export", "Europe"],
      version: "1.0",
      approvalStatus: "Approved"
    },
    {
      id: "DOC002", 
      name: "Bill_of_Lading_GE001.pdf",
      type: "Bill of Lading",
      category: "Shipping",
      size: "1.8 MB",
      uploadDate: "2024-11-18",
      expiryDate: null,
      status: "Active",
      company: "Global Electronics Inc",
      deal: "D002",
      uploadedBy: "Sarah Chen",
      description: "Bill of lading for electronic components shipment",
      tags: ["Shipping", "Electronics", "USA"],
      version: "1.0",
      approvalStatus: "Approved"
    },
    {
      id: "DOC003",
      name: "Quality_Certificate_Steel.pdf", 
      type: "Quality Certificate",
      category: "Quality",
      size: "945 KB",
      uploadDate: "2024-11-15",
      expiryDate: "2025-05-15",
      status: "Expiring Soon",
      company: "Steel Components Inc",
      deal: "D001",
      uploadedBy: "Hans Mueller",
      description: "ISO quality certificate for steel components",
      tags: ["Quality", "ISO", "Steel"],
      version: "2.1",
      approvalStatus: "Approved"
    },
    {
      id: "DOC004",
      name: "Insurance_Certificate_Draft.pdf",
      type: "Insurance Certificate", 
      category: "Insurance",
      size: "1.2 MB",
      uploadDate: "2024-11-25",
      expiryDate: "2025-06-25",
      status: "Draft",
      company: "Indo-German Motors",
      deal: "D003",
      uploadedBy: "Klaus Weber",
      description: "Marine insurance certificate for machinery shipment",
      tags: ["Insurance", "Marine", "Machinery"],
      version: "0.1",
      approvalStatus: "Pending"
    }
  ];

  const documentTypes = [
    "all", "Export License", "Import License", "Bill of Lading", "Commercial Invoice",
    "Packing List", "Certificate of Origin", "Quality Certificate", "Insurance Certificate",
    "Letter of Credit", "Customs Declaration", "Inspection Certificate"
  ];

  const documentStatuses = ["all", "Active", "Draft", "Expiring Soon", "Expired", "Archived"];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Expiring Soon': return 'bg-orange-100 text-orange-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <Check className="w-4 h-4 text-green-600" />;
      case 'Pending': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Rejected': return <Trash2 className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Legal': return '⚖️';
      case 'Shipping': return '🚢';
      case 'Quality': return '✅';
      case 'Insurance': return '🛡️';
      case 'Financial': return '💰';
      default: return '📄';
    }
  };

  const handleDocumentAction = (docId: string, action: string) => {
    switch (action) {
      case 'view':
        alert(`Opening document ${docId} for viewing`);
        break;
      case 'download':
        alert(`Downloading document ${docId}`);
        break;
      case 'edit':
        alert(`Opening document ${docId} for editing`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this document?')) {
          alert(`Document ${docId} deleted`);
        }
        break;
      case 'approve':
        alert(`Document ${docId} approved`);
        break;
      case 'reject':
        alert(`Document ${docId} rejected`);
        break;
    }
  };

  const handleUploadDocument = () => {
    alert('Document upload form would open here with fields for document type, category, expiry date, etc.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <Button onClick={handleUploadDocument}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-xl font-bold">{documents.length}</p>
                <p className="text-xs text-gray-500">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-xl font-bold">{documents.filter(d => d.status === 'Active').length}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-xl font-bold">{documents.filter(d => d.status === 'Expiring Soon').length}</p>
                <p className="text-xs text-gray-500">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-xl font-bold">{documents.filter(d => d.approvalStatus === 'Pending').length}</p>
                <p className="text-xs text-gray-500">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-xl font-bold">{new Set(documents.map(d => d.company)).size}</p>
                <p className="text-xs text-gray-500">Companies</p>
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
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {documentStatuses.map(status => (
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

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{getCategoryIcon(doc.category)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </div>
                      <div className="flex items-center gap-1">
                        {getApprovalStatusIcon(doc.approvalStatus)}
                        <span className="text-xs text-gray-500">{doc.approvalStatus}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium">{doc.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="text-sm font-medium">{doc.company}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Size</p>
                        <p className="text-sm font-medium">{doc.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Version</p>
                        <p className="text-sm font-medium">v{doc.version}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Uploaded: {doc.uploadDate}</span>
                      </div>
                      {doc.expiryDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-orange-400" />
                          <span>Expires: {doc.expiryDate}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{doc.uploadedBy}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{doc.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'view')}>
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'download')}>
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  {doc.approvalStatus === 'Pending' && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'approve')} className="text-green-600">
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'reject')} className="text-red-600">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
