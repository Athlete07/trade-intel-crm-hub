
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Plus,
  Search,
  Award,
  Building2,
  Globe,
  Truck,
  Ship,
  Plane,
  Palette,
  Zap,
  Star
} from "lucide-react";
import { BillTemplate } from "./BillTemplate";

const modernTemplates = [
  {
    id: "modern-invoice",
    name: "Modern Invoice",
    description: "Clean, contemporary design with live editing capabilities",
    category: "Professional",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    features: ["Live Editing", "ISO 20022 Compliant", "Multi-Currency", "PDF Export"]
  },
  {
    id: "minimalist-bill",
    name: "Minimalist Bill",
    description: "Simple, elegant layout focusing on clarity and readability",
    category: "Professional", 
    icon: FileText,
    gradient: "from-gray-600 to-gray-800",
    features: ["Clean Design", "UBL 2.1 Standard", "Responsive Layout", "Print Ready"]
  },
  {
    id: "business-invoice",
    name: "Business Invoice",
    description: "Professional corporate template with comprehensive details",
    category: "Corporate",
    icon: Building2,
    gradient: "from-indigo-500 to-blue-600",
    features: ["Corporate Style", "EN 16931 Compliant", "Tax Calculations", "Legal Footer"]
  },
  {
    id: "international-bill",
    name: "International Trade Bill",
    description: "Specialized template for international transactions",
    category: "Trade",
    icon: Globe,
    gradient: "from-green-500 to-emerald-600",
    features: ["Multi-Language", "Currency Exchange", "Trade Terms", "Customs Info"]
  },
  {
    id: "shipping-invoice",
    name: "Shipping Invoice",
    description: "Logistics-focused template with shipping details",
    category: "Logistics",
    icon: Truck,
    gradient: "from-orange-500 to-red-600",
    features: ["Shipping Details", "Tracking Info", "Incoterms", "Cargo Specs"]
  },
  {
    id: "freight-bill",
    name: "Freight Bill",
    description: "Maritime and air freight billing template",
    category: "Logistics",
    icon: Ship,
    gradient: "from-cyan-500 to-blue-600",
    features: ["Freight Terms", "Bill of Lading", "Port Details", "Insurance"]
  },
  {
    id: "airway-bill",
    name: "Airway Bill",
    description: "Aviation-specific billing for air cargo",
    category: "Aviation",
    icon: Plane,
    gradient: "from-pink-500 to-rose-600",
    features: ["IATA Compliant", "Flight Details", "Cargo Weight", "Dangerous Goods"]
  },
  {
    id: "premium-invoice",
    name: "Premium Invoice",
    description: "High-end template with luxury branding elements",
    category: "Premium",
    icon: Star,
    gradient: "from-yellow-500 to-amber-600",
    features: ["Luxury Design", "Brand Integration", "Watermarks", "Signature Fields"]
  }
];

export function BillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", "Professional", "Corporate", "Trade", "Logistics", "Aviation", "Premium"];

  const filteredTemplates = modernTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (selectedTemplate) {
    return (
      <BillTemplate 
        templateId={selectedTemplate}
        onBack={() => setSelectedTemplate(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional Bill Generator
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              Create international-standard invoices with live editing and instant PDF export
            </p>
            <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
              ✓ ISO 20022, UBL 2.1 & EN 16931 Compliant
            </Badge>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white shadow-xl border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search professional templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
              />
            </div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg font-medium min-w-48 shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Live Editing</h3>
            <p className="text-sm text-gray-600">Edit directly in final format with real-time updates</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">International Standards</h3>
            <p className="text-sm text-gray-600">Compliant with ISO 20022, UBL 2.1, EN 16931</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Download className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Instant PDF Export</h3>
            <p className="text-sm text-gray-600">High-quality PDF generation with perfect formatting</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Multiple Themes</h3>
            <p className="text-sm text-gray-600">Professional templates for every business need</p>
          </CardContent>
        </Card>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          
          return (
            <Card 
              key={template.id} 
              className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 cursor-pointer transform hover:scale-105 group overflow-hidden"
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-0">
                <div className={`h-48 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl relative z-10">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{template.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white font-semibold py-3 shadow-lg`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTemplate(template.id);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-16 h-16 text-gray-300" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">No Templates Found</h3>
          <p className="text-gray-600 text-lg">Try adjusting your search criteria or browse all categories</p>
        </div>
      )}

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Professional Invoices?</h2>
          <p className="text-xl text-white/90 mb-6">
            Choose from our internationally compliant templates and start creating professional bills in minutes
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-lg"
          >
            Get Started Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
