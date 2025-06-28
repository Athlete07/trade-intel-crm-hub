import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Plus,
  Search,
  Filter,
  Calendar,
  Building2,
  Globe,
  Truck,
  Ship,
  Plane,
  Award,
  ArrowLeft,
  Save,
  X,
  Upload,
  Printer
} from "lucide-react";
import { billTemplates } from "./BillTemplates";

interface FieldType {
  label: string;
  required: boolean;
  type?: string;
  placeholder?: string;
  section: string;
  options?: string[];
  default?: string;
}

export function BillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formData, setFormData] = useState<{[key: string]: any}>({});
  const [currentSection, setCurrentSection] = useState("header");

  const templateCategories = ["all", "Pre-shipment", "Official", "Shipping", "Compliance", "Transport", "Logistics"];
  
  const getTemplateIcon = (templateId: string) => {
    const iconMap: {[key: string]: any} = {
      proforma: FileText,
      commercial: Building2,
      packing: Truck,
      customs: Globe,
      delivery: Truck,
      freight: Ship,
      airway: Plane,
      certificate: Award
    };
    return iconMap[templateId] || FileText;
  };

  const getTemplateGradient = (templateId: string) => {
    const gradientMap: {[key: string]: string} = {
      proforma: "from-blue-50 to-indigo-100",
      commercial: "from-green-50 to-emerald-100", 
      packing: "from-purple-50 to-violet-100",
      customs: "from-orange-50 to-amber-100",
      delivery: "from-red-50 to-rose-100",
      freight: "from-cyan-50 to-blue-100",
      airway: "from-pink-50 to-rose-100",
      certificate: "from-yellow-50 to-amber-100"
    };
    return gradientMap[templateId] || "from-gray-50 to-slate-100";
  };

  const filteredTemplates = Object.values(billTemplates).filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({});
    setCurrentSection("header");
  };

  const handleInputChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const handleGenerateDocument = () => {
    console.log('Generating document with data:', formData);
    alert('Document generated successfully! (In real implementation, this would generate a PDF)');
  };

  const getSectionsForTemplate = (templateId: string) => {
    const template = billTemplates[templateId as keyof typeof billTemplates];
    if (!template) return [];
    
    const sections = new Set<string>();
    Object.values(template.fields).forEach((field: FieldType) => {
      if (field.section) {
        sections.add(field.section);
      }
    });
    return Array.from(sections);
  };

  const getSectionTitle = (section: string) => {
    const titleMap: {[key: string]: string} = {
      header: "Document Header",
      seller: "Seller/Exporter Information", 
      buyer: "Buyer/Importer Information",
      exporter: "Exporter Information",
      importer: "Importer Information",
      shipper: "Shipper Information",
      consignee: "Consignee Information",
      notify: "Notify Party",
      shipment: "Shipment Details",
      transport: "Transport Information",
      commercial: "Commercial Terms",
      additional: "Additional Information",
      banking: "Banking Details",
      pricing: "Pricing & Tax",
      terms: "Terms & Conditions",
      authority: "Issuing Authority",
      reference: "Reference Information",
      preferential: "Preferential Trade",
      certification: "Certification",
      signature: "Signature & Authorization",
      agent: "Agent Information",
      delivery: "Delivery Instructions", 
      charges: "Charges & Fees",
      documents: "Required Documents",
      forwarder: "Freight Forwarder",
      customer: "Customer Information",
      route: "Shipment Route",
      schedule: "Schedule Information",
      cargo: "Cargo Information",
      financial: "Financial Terms",
      services: "Additional Services",
      special: "Special Requirements",
      airline: "Airline Information",
      flight: "Flight Information",
      commodity: "Commodity Information",
      insurance: "Insurance Information",
      origin: "Origin Information",
      manufacturer: "Manufacturer Information",
      goods: "Goods Information",
      customs: "Customs Information",
      valuation: "Valuation Details",
      trade: "Trade Agreement",
      declaration: "Declarations",
      measurement: "Weight & Measurement",
      shipping: "Shipping Details",
      package: "Package Information",
      weight: "Weight Information",
      destination: "Destination Details"
    };
    return titleMap[section] || section.charAt(0).toUpperCase() + section.slice(1);
  };

  if (selectedTemplate) {
    const template = billTemplates[selectedTemplate as keyof typeof billTemplates];
    const sections = getSectionsForTemplate(selectedTemplate);
    const currentSectionFields = Object.entries(template.fields).filter(
      ([_, field]) => (field as FieldType).section === currentSection
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTemplate(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{template.name}</h1>
                <p className="text-gray-600 mt-1">{template.description}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={handleGenerateDocument}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Section Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-xl border-0 sticky top-6">
                <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-slate-50">
                  <CardTitle className="text-lg font-bold text-gray-800">Form Sections</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section}
                        onClick={() => setCurrentSection(section)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          currentSection === section
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium">{getSectionTitle(section)}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {Object.values(template.fields).filter((f: FieldType) => f.section === section).length} fields
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-xl border-0">
                <CardHeader className={`border-b bg-gradient-to-r ${getTemplateGradient(selectedTemplate)}`}>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {getSectionTitle(currentSection)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionFields.map(([fieldKey, field]) => {
                      const fieldData = field as FieldType;
                      return (
                        <div key={fieldKey} className={fieldData.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {fieldData.label}
                            {fieldData.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          
                          {fieldData.type === 'textarea' ? (
                            <Textarea
                              value={formData[fieldKey] || ''}
                              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                              placeholder={fieldData.placeholder || `Enter ${fieldData.label.toLowerCase()}`}
                              rows={4}
                              className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                            />
                          ) : fieldData.type === 'select' ? (
                            <select
                              value={formData[fieldKey] || ''}
                              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                              className="w-full h-12 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg focus:outline-none"
                            >
                              <option value="">Select {fieldData.label}</option>
                              {fieldData.options?.map((option: string) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <Input
                              type={fieldData.type || 'text'}
                              value={formData[fieldKey] || ''}
                              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                              placeholder={fieldData.placeholder || `Enter ${fieldData.label.toLowerCase()}`}
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                            />
                          )}
                          
                          {fieldData.default && !formData[fieldKey] && (
                            <p className="text-xs text-gray-500 mt-1">Default: {fieldData.default}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Section Navigation */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const currentIndex = sections.indexOf(currentSection);
                        if (currentIndex > 0) {
                          setCurrentSection(sections[currentIndex - 1]);
                        }
                      }}
                      disabled={sections.indexOf(currentSection) === 0}
                    >
                      Previous Section
                    </Button>
                    
                    <div className="text-sm text-gray-600">
                      Section {sections.indexOf(currentSection) + 1} of {sections.length}
                    </div>
                    
                    <Button
                      onClick={() => {
                        const currentIndex = sections.indexOf(currentSection);
                        if (currentIndex < sections.length - 1) {
                          setCurrentSection(sections[currentIndex + 1]);
                        }
                      }}
                      disabled={sections.indexOf(currentSection) === sections.length - 1}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next Section
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              International Trade Document Generator
            </h1>
            <p className="text-lg text-gray-600 mt-2">Create professional EXIM documents with international standards</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white shadow-xl border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search document templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium min-w-48"
            >
              {templateCategories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => {
          const IconComponent = getTemplateIcon(template.id);
          
          return (
            <Card 
              key={template.id} 
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 cursor-pointer transform hover:scale-105"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-6">
                <div className={`w-full h-32 bg-gradient-to-br ${getTemplateGradient(template.id)} rounded-xl flex items-center justify-center mb-4`}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <IconComponent className="w-8 h-8 text-gray-700" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                    {template.category}
                  </Badge>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                    <FileText className="w-3 h-3" />
                    <span>{Object.keys(template.fields).length} fields</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Templates Found</h3>
          <p className="text-gray-600 text-lg">Try adjusting your search criteria or browse all categories</p>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">International Standards</h3>
            <p className="text-gray-600">All templates comply with international trade standards and regulations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Professional PDF Output</h3>
            <p className="text-gray-600">Generate high-quality, print-ready PDF documents instantly</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Company Integration</h3>
            <p className="text-gray-600">Auto-populate with your company information and customer data</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
