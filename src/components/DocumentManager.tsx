import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DocumentUploader } from "./DocumentUploader";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  Building2,
  Plus,
  Star,
  Grid,
  List,
  Edit,
  Share2,
  Folder,
  CheckSquare
} from "lucide-react";

export function DocumentManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: "DOC001",
      name: "Export_License_ABC_Textiles.pdf",
      type: "Export License",
      category: "legal",
      size: "2.3 MB",
      uploadDate: "2024-11-20",
      status: "Active",
      company: "ABC Textiles Ltd",
      uploadedBy: "Rajesh Kumar",
      description: "Export license for textile products to Europe",
      tags: ["Legal", "Export", "Europe"]
    },
    {
      id: "DOC002", 
      name: "Commercial_Invoice_GE001.pdf",
      type: "Commercial Invoice",
      category: "financial",
      size: "1.8 MB",
      uploadDate: "2024-11-18",
      status: "Active",
      company: "Global Electronics Inc",
      uploadedBy: "Sarah Chen",
      description: "Commercial invoice for electronic components shipment",
      tags: ["Invoice", "Electronics", "USA"]
    }
  ]);

  const documentCategories = [
    { id: "legal", name: "Legal", icon: "⚖️", count: documents.filter(d => d.category === "legal").length, color: "blue" },
    { id: "financial", name: "Financial", icon: "💰", count: documents.filter(d => d.category === "financial").length, color: "green" },
    { id: "shipping", name: "Shipping & Logistics", icon: "🚢", count: documents.filter(d => d.category === "shipping").length, color: "purple" },
    { id: "quality", name: "Quality & Compliance", icon: "✅", count: documents.filter(d => d.category === "quality").length, color: "orange" },
    { id: "insurance", name: "Insurance", icon: "🛡️", count: documents.filter(d => d.category === "insurance").length, color: "red" },
    { id: "customs", name: "Customs & Trade", icon: "🌍", count: documents.filter(d => d.category === "customs").length, color: "cyan" }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDocumentUpload = (newDocuments: any[]) => {
    setDocuments([...documents, ...newDocuments]);
    alert(`${newDocuments.length} document(s) uploaded successfully!`);
  };

  const handleBulkAction = (action: string) => {
    if (selectedDocuments.length === 0) {
      alert('Please select documents first');
      return;
    }

    switch (action) {
      case 'download':
        alert(`Downloading ${selectedDocuments.length} selected documents...`);
        // Implement actual download logic here
        break;
      case 'move':
        const category = prompt('Move to category (legal/financial/shipping/quality/insurance/customs):');
        if (category) {
          setDocuments(documents.map(doc => 
            selectedDocuments.includes(doc.id) ? {...doc, category} : doc
          ));
          alert(`${selectedDocuments.length} documents moved to ${category}`);
        }
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedDocuments.length} documents?`)) {
          setDocuments(documents.filter(doc => !selectedDocuments.includes(doc.id)));
          setSelectedDocuments([]);
          alert(`${selectedDocuments.length} documents deleted`);
        }
        break;
      case 'export':
        alert(`Exporting ${selectedDocuments.length} documents metadata to CSV...`);
        break;
    }
  };

  const handleDocumentAction = (docId: string, action: string) => {
    const doc = documents.find(d => d.id === docId);
    switch (action) {
      case 'view':
        alert(`Opening document ${doc?.name} for viewing`);
        break;
      case 'download':
        alert(`Downloading document ${doc?.name}`);
        break;
      case 'edit':
        alert(`Opening document ${doc?.name} for editing`);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this document?')) {
          setDocuments(documents.filter(d => d.id !== docId));
          alert(`Document ${doc?.name} deleted`);
        }
        break;
    }
  };

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Organize and manage all your EXIM documents</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => handleBulkAction('export')}
            disabled={selectedDocuments.length === 0}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Export Selected ({selectedDocuments.length})
          </Button>
          <Button onClick={() => setShowUploader(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {documentCategories.map((category) => (
          <Card 
            key={category.id} 
            className={`hover:shadow-lg transition-all cursor-pointer ${
              filterCategory === category.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setFilterCategory(filterCategory === category.id ? 'all' : category.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-sm">{category.name}</h3>
              <p className="text-lg font-bold text-blue-600">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search documents, companies, or types..."
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
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Expired">Expired</option>
            </select>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {filteredDocuments.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.length === filteredDocuments.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">
                    {selectedDocuments.length > 0 
                      ? `${selectedDocuments.length} selected` 
                      : 'Select all'
                    }
                  </span>
                </label>
              </div>
              {selectedDocuments.length > 0 && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleBulkAction('download')}>
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('move')}>
                    <Folder className="w-3 h-3 mr-1" />
                    Move
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => toggleDocumentSelection(doc.id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Badge variant={doc.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                    {doc.status}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 truncate" title={doc.name}>
                    {doc.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{doc.type}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Size:</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Company:</span>
                    <span className="truncate ml-2">{doc.company}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Uploaded:</span>
                    <span>{doc.uploadDate}</span>
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'view')}>
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'download')}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'edit')}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'delete')}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleDocumentSelection(doc.id)}
                      className="w-4 h-4 text-blue-600 mt-1"
                    />
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                        <Badge variant={doc.status === 'Active' ? 'default' : 'secondary'}>
                          {doc.status}
                        </Badge>
                        <Badge variant="outline">{doc.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Company</p>
                          <p className="text-sm font-medium">{doc.company}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Size</p>
                          <p className="text-sm font-medium">{doc.size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Uploaded</p>
                          <p className="text-sm font-medium">{doc.uploadDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="text-sm font-medium capitalize">{doc.category}</p>
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

                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'view')}>
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'download')}>
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'edit')}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDocumentAction(doc.id, 'delete')}>
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <DocumentUploader 
        isOpen={showUploader}
        onClose={() => setShowUploader(false)}
        onUpload={handleDocumentUpload}
      />
    </div>
  );
}
