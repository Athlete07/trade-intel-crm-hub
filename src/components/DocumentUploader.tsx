
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, X, File, FileText, Image } from "lucide-react";

interface DocumentUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (documents: any[]) => void;
}

export function DocumentUploader({ isOpen, onClose, onUpload }: DocumentUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadData, setUploadData] = useState({
    category: "legal",
    description: "",
    tags: ""
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    const documents = files.map((file, index) => ({
      id: `DOC${Date.now()}_${index}`,
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      category: uploadData.category,
      description: uploadData.description,
      tags: uploadData.tags.split(',').map(tag => tag.trim()),
      uploadDate: new Date().toISOString().split('T')[0],
      status: "Active",
      uploadedBy: "Current User"
    }));

    onUpload(documents);
    setFiles([]);
    setUploadData({ category: "legal", description: "", tags: "" });
    onClose();
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return Image;
    if (['pdf'].includes(ext || '')) return FileText;
    return File;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upload Documents</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="file-upload">Select Files</Label>
            <Input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileSelect}
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
            </p>
          </div>

          {files.length > 0 && (
            <div>
              <Label>Selected Files</Label>
              <div className="space-y-2 mt-2">
                {files.map((file, index) => {
                  const FileIcon = getFileIcon(file.name);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileIcon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={uploadData.category}
              onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
            >
              <option value="legal">Legal</option>
              <option value="financial">Financial</option>
              <option value="shipping">Shipping & Logistics</option>
              <option value="quality">Quality & Compliance</option>
              <option value="insurance">Insurance</option>
              <option value="customs">Customs & Trade</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={uploadData.description}
              onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
              placeholder="Brief description of the document(s)"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={uploadData.tags}
              onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
              placeholder="e.g., Contract, Export, Europe"
              className="mt-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpload} disabled={files.length === 0}>
              <Upload className="w-4 h-4 mr-2" />
              Upload {files.length} Document(s)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
