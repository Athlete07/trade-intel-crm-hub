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
  Star,
  Shield,
  Calendar,
  Package,
  Receipt,
  CreditCard,
  DollarSign,
  FileCheck,
  MapPin,
  Scale,
  BookOpen,
  Anchor,
  PiggyBank
} from "lucide-react";
import { BillTemplate } from "./BillTemplate";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle, EnhancedCardDescription } from "@/components/ui/enhanced-card";

const internationalTemplates = [
  {
    id: "iso-modern-invoice",
    name: "ISO Modern Invoice",
    description: "ISO 20022 compliant modern design with live editing and real-time validation",
    category: "ISO Compliant",
    icon: Zap,
    gradient: "from-blue-500 to-purple-600",
    standards: ["ISO 20022", "UBL 2.1", "EN 16931"],
    features: ["Live Editing", "Real-time Updates", "Multi-Currency", "PDF Export", "Legal Footer"],
    regions: ["Global", "EU", "US", "Asia"]
  },
  {
    id: "ubl-minimalist-bill",
    name: "UBL Minimalist Bill",
    description: "Clean UBL 2.1 standard template with direct input and instant preview",
    category: "UBL Standard", 
    icon: FileText,
    gradient: "from-gray-600 to-gray-800",
    standards: ["UBL 2.1", "EN 16931", "ISO 20022"],
    features: ["Clean Design", "Direct Input", "Auto-layout", "Print Ready", "Compliance Check"],
    regions: ["EU", "Global"]
  },
  {
    id: "en-business-invoice",
    name: "EN 16931 Business Invoice",
    description: "European standard compliant template with comprehensive business details",
    category: "European Standard",
    icon: Building2,
    gradient: "from-indigo-500 to-blue-600",
    standards: ["EN 16931", "UBL 2.1", "ISO 20022"],
    features: ["EU Compliant", "VAT Handling", "Tax Calculations", "Legal Requirements", "Multi-language"],
    regions: ["EU", "Europe"]
  },
  {
    id: "trade-finance-invoice",
    name: "Trade Finance Invoice",
    description: "International trade compliant with letter of credit and payment terms",
    category: "Trade Finance",
    icon: Globe,
    gradient: "from-green-500 to-emerald-600",
    standards: ["ISO 20022", "UCP 600", "ISBP"],
    features: ["LC Compliant", "Trade Terms", "Incoterms", "Bank Details", "Export/Import"],
    regions: ["Global", "Asia", "Americas"]
  },
  {
    id: "logistics-shipping-bill",
    name: "Logistics Shipping Bill",
    description: "Comprehensive shipping and logistics billing with cargo details",
    category: "Logistics",
    icon: Truck,
    gradient: "from-orange-500 to-red-600",
    standards: ["CMR", "CIM", "Warsaw Convention"],
    features: ["Cargo Details", "Tracking Info", "Insurance", "Freight Terms", "Port Info"],
    regions: ["Global", "EU", "Americas"]
  },
  {
    id: "maritime-freight-bill",
    name: "Maritime Freight Bill",
    description: "Specialized maritime and port billing with international shipping standards",
    category: "Maritime",
    icon: Ship,
    gradient: "from-cyan-500 to-blue-600",
    standards: ["Hague Rules", "Hamburg Rules", "Rotterdam Rules"],
    features: ["Bill of Lading", "Port Charges", "Maritime Law", "Container Details", "Vessel Info"],
    regions: ["Global", "Americas", "Asia"]
  },
  {
    id: "aviation-cargo-bill",
    name: "Aviation Cargo Bill",
    description: "IATA compliant air cargo billing with dangerous goods handling",
    category: "Aviation",
    icon: Plane,
    gradient: "from-pink-500 to-rose-600",
    standards: ["IATA", "ICAO", "Warsaw Convention"],
    features: ["IATA Compliant", "Air Waybill", "Dangerous Goods", "Flight Details", "MAWB/HAWB"],
    regions: ["Global", "Americas", "Europe"]
  },
  {
    id: "premium-luxury-invoice",
    name: "Premium Luxury Invoice",
    description: "High-end template with brand integration and premium features",
    category: "Premium",
    icon: Star,
    gradient: "from-yellow-500 to-amber-600",
    standards: ["ISO 20022", "Custom Branding"],
    features: ["Luxury Design", "Brand Colors", "Watermarks", "Digital Signature", "Premium Support"],
    regions: ["Global", "Luxury Markets"]
  },
  // Enhanced EXIM Document Templates
  {
    id: "commercial-invoice",
    name: "Commercial Invoice",
    description: "Official EXIM commercial invoice for customs clearance and international trade",
    category: "EXIM Documents",
    icon: Receipt,
    gradient: "from-purple-600 to-pink-600",
    standards: ["EXIM", "Customs Declaration", "WTO Guidelines", "GATT"],
    features: ["Customs Ready", "HS Code Integration", "Country of Origin", "Trade Terms", "Valuation Details"],
    regions: ["Global", "All Trade Zones"]
  },
  {
    id: "proforma-invoice",
    name: "Proforma Invoice",
    description: "Preliminary invoice for quotations and advance payment arrangements",
    category: "EXIM Documents",
    icon: FileCheck,
    gradient: "from-teal-600 to-cyan-600",
    standards: ["EXIM", "Trade Documentation", "ICC Guidelines"],
    features: ["Quote Format", "Validity Period", "Payment Terms", "Shipping Estimates", "Product Specs"],
    regions: ["Global", "International Trade"]
  },
  {
    id: "export-invoice",
    name: "Export Invoice",
    description: "Specialized export documentation with regulatory compliance features",
    category: "EXIM Documents",
    icon: Package,
    gradient: "from-emerald-600 to-green-700",
    standards: ["EXIM", "Export Documentation", "FTA Compliance"],
    features: ["Export License", "Certificate of Origin", "Shipping Documents", "Insurance Details", "Payment Terms"],
    regions: ["Global", "Export Markets"]
  },
  {
    id: "import-invoice",
    name: "Import Invoice",
    description: "Import-specific invoice with duty calculations and customs requirements",
    category: "EXIM Documents",
    icon: MapPin,
    gradient: "from-amber-600 to-orange-600",
    standards: ["EXIM", "Import Documentation", "Customs Compliance"],
    features: ["Duty Calculations", "Customs Value", "Import License", "Tax Details", "Clearance Info"],
    regions: ["Global", "Import Markets"]
  },
  {
    id: "bill-of-lading",
    name: "Bill of Lading",
    description: "Official shipping document and receipt for maritime cargo transportation",
    category: "EXIM Documents",
    icon: Anchor,
    gradient: "from-blue-800 to-indigo-800",
    standards: ["Maritime Law", "ICC Rules", "Hague-Visby Rules", "Hamburg Rules"],
    features: ["Cargo Receipt", "Title Document", "Shipping Terms", "Port Details", "Carrier Liability", "Ocean B/L"],
    regions: ["Global", "Maritime Trade"]
  },
  {
    id: "airway-bill",
    name: "Air Waybill",
    description: "Aviation cargo document for air freight shipments and customs clearance",
    category: "EXIM Documents",
    icon: Plane,
    gradient: "from-sky-600 to-blue-700",
    standards: ["IATA", "ICAO", "Montreal Convention"],
    features: ["Flight Details", "Cargo Manifest", "Handling Instructions", "Customs Declaration", "Tracking"],
    regions: ["Global", "Air Cargo"]
  },
  {
    id: "freight-invoice",
    name: "Freight Invoice",
    description: "Comprehensive freight billing for logistics and transportation services",
    category: "EXIM Documents",
    icon: Truck,
    gradient: "from-orange-600 to-red-600",
    standards: ["Transportation Law", "Freight Terms"],
    features: ["Service Details", "Route Information", "Weight/Volume", "Fuel Surcharge", "Accessorial Charges"],
    regions: ["Global", "Logistics"]
  },
  {
    id: "customs-invoice",
    name: "Customs Invoice",
    description: "Specialized customs declaration invoice with valuation and classification",
    category: "EXIM Documents", 
    icon: Scale,
    gradient: "from-violet-600 to-purple-700",
    standards: ["WTO Valuation", "Customs Code", "ATA Carnet"],
    features: ["Customs Value", "HS Classification", "Origin Certificate", "Duty Assessment", "Clearance Status"],
    regions: ["Global", "Customs Territories"]
  },
  // NEW EXIM Templates Added
  {
    id: "debit-note",
    name: "Debit Note",
    description: "Commercial debit note for additional charges and adjustments in international trade",
    category: "EXIM Documents",
    icon: PiggyBank,
    gradient: "from-red-600 to-pink-600",
    standards: ["Commercial Law", "Accounting Standards", "GAAP", "IFRS"],
    features: ["Charge Details", "Reference Invoice", "Adjustment Reason", "Payment Terms", "Account Adjustment", "Tax Compliance"],
    regions: ["Global", "Commercial Trade"]
  },
  {
    id: "credit-note",
    name: "Credit Note",
    description: "Commercial credit note for refunds, returns, and trade adjustments with international compliance",
    category: "EXIM Documents",
    icon: DollarSign,
    gradient: "from-green-600 to-emerald-700",
    standards: ["Commercial Law", "Accounting Standards", "GAAP", "IFRS", "Tax Regulations"],
    features: ["Credit Details", "Return Reference", "Refund Terms", "Account Credit", "Adjustment Tracking", "VAT Handling"],
    regions: ["Global", "Commercial Trade"]
  },
  {
    id: "ocean-bill-of-lading",
    name: "Ocean Bill of Lading",
    description: "Enhanced maritime bill of lading for ocean freight with comprehensive shipping details",
    category: "EXIM Documents",
    icon: Ship,
    gradient: "from-blue-900 to-cyan-800",
    standards: ["Hague-Visby Rules", "Hamburg Rules", "Rotterdam Rules", "COGSA"],
    features: ["Ocean Freight", "Container Details", "Port Information", "Shipper Details", "Consignee Info", "Notify Party"],
    regions: ["Global", "Ocean Shipping"]
  },
  {
    id: "packing-list",
    name: "Packing List",
    description: "Detailed packing list for international shipments with customs compliance",
    category: "EXIM Documents",
    icon: Package,
    gradient: "from-brown-600 to-amber-700",
    standards: ["Customs Requirements", "Shipping Standards", "IATA DGR"],
    features: ["Item Details", "Packaging Info", "Weight/Dimensions", "Marks & Numbers", "Cargo Description"],
    regions: ["Global", "International Shipping"]
  },
  {
    id: "certificate-of-origin",
    name: "Certificate of Origin",
    description: "Official certificate of origin for trade preference and customs clearance",
    category: "EXIM Documents",
    icon: Award,
    gradient: "from-gold-600 to-yellow-700",
    standards: ["WTO Rules", "FTA Agreements", "GSP Rules"],
    features: ["Origin Declaration", "Preference Criteria", "Manufacturer Details", "Product Classification", "Trade Agreement"],
    regions: ["Global", "Preferential Trade"]
  },
  {
    id: "insurance-certificate",
    name: "Insurance Certificate",
    description: "Marine insurance certificate for cargo protection in international trade",
    category: "EXIM Documents",
    icon: Shield,
    gradient: "from-blue-700 to-indigo-700",
    standards: ["Marine Insurance", "ICC Clauses", "Lloyd's Terms"],
    features: ["Coverage Details", "Policy Terms", "Insured Value", "Risk Coverage", "Claims Process"],
    regions: ["Global", "Marine Insurance"]
  },
  {
    id: "letter-of-credit",
    name: "Letter of Credit",
    description: "Documentary letter of credit for secure international trade transactions",
    category: "EXIM Documents",
    icon: BookOpen,
    gradient: "from-purple-700 to-indigo-800",
    standards: ["UCP 600", "ISBP", "ICC Rules"],
    features: ["LC Terms", "Document Requirements", "Payment Terms", "Bank Details", "Beneficiary Info"],
    regions: ["Global", "Trade Finance"]
  }
];

export function BillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [standardFilter, setStandardFilter] = useState("all");

  const categories = ["all", "ISO Compliant", "UBL Standard", "European Standard", "Trade Finance", "Logistics", "Maritime", "Aviation", "Premium", "EXIM Documents"];
  const standards = ["all", "ISO 20022", "UBL 2.1", "EN 16931", "UCP 600", "IATA", "CMR", "EXIM", "Maritime Law", "WTO Guidelines", "Hague-Visby Rules", "GAAP", "IFRS"];

  const filteredTemplates = internationalTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.standards.some(std => std.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesStandard = standardFilter === "all" || template.standards.includes(standardFilter);
    return matchesSearch && matchesCategory && matchesStandard;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <FileText className="w-14 h-14 text-white" />
              </div>
              <div>
                <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  International Bill Generator
                </h1>
                <p className="text-2xl text-gray-700 mb-6 max-w-5xl">
                  Create internationally compliant invoices with live editing, real-time updates, and instant PDF export following global trade standards
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge className="bg-green-100 text-green-800 border-green-200 px-6 py-3 text-base font-semibold hover:bg-green-200 transition-colors">
                    <Shield className="w-5 h-5 mr-2" />
                    ISO 20022 Certified
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-6 py-3 text-base font-semibold hover:bg-blue-200 transition-colors">
                    <Award className="w-5 h-5 mr-2" />
                    UBL 2.1 Standard
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-6 py-3 text-base font-semibold hover:bg-purple-200 transition-colors">
                    <Globe className="w-5 h-5 mr-2" />
                    EN 16931 Compliant
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-6 py-3 text-base font-semibold hover:bg-orange-200 transition-colors">
                    <Package className="w-5 h-5 mr-2" />
                    EXIM Ready
                  </Badge>
                  <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 px-6 py-3 text-base font-semibold hover:bg-cyan-200 transition-colors">
                    <Anchor className="w-5 h-5 mr-2" />
                    Maritime Compliant
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <EnhancedCard className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 border-0">
          <EnhancedCardContent className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="relative">
                  <Search className="w-7 h-7 absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search templates, standards, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-16 h-18 text-xl border-3 border-gray-200 focus:border-blue-500 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow"
                  />
                </div>
              </div>
              <div>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-8 py-5 border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 text-xl font-medium bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select 
                  value={standardFilter}
                  onChange={(e) => setStandardFilter(e.target.value)}
                  className="w-full px-8 py-5 border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 text-xl font-medium bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  {standards.map(standard => (
                    <option key={standard} value={standard}>
                      {standard === "all" ? "All Standards" : standard}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>

        {/* Enhanced Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <EnhancedCard className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <EnhancedCardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Editing</h3>
              <p className="text-gray-600 leading-relaxed">Edit directly in final format with real-time updates</p>
            </EnhancedCardContent>
          </EnhancedCard>

          <EnhancedCard className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <EnhancedCardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">International Standards</h3>
              <p className="text-gray-600 leading-relaxed">Compliant with ISO 20022, UBL 2.1, EN 16931</p>
            </EnhancedCardContent>
          </EnhancedCard>

          <EnhancedCard className="bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <EnhancedCardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional PDF</h3>
              <p className="text-gray-600 leading-relaxed">High-quality PDF generation with perfect formatting</p>
            </EnhancedCardContent>
          </EnhancedCard>

          <EnhancedCard className="bg-gradient-to-br from-orange-50 to-amber-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <EnhancedCardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">EXIM Ready</h3>
              <p className="text-gray-600 leading-relaxed">Complete EXIM document templates for trade</p>
            </EnhancedCardContent>
          </EnhancedCard>

          <EnhancedCard className="bg-gradient-to-br from-cyan-50 to-blue-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <EnhancedCardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Anchor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maritime Docs</h3>
              <p className="text-gray-600 leading-relaxed">Specialized maritime and shipping documents</p>
            </EnhancedCardContent>
          </EnhancedCard>
        </div>

        {/* Enhanced Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => {
            const IconComponent = template.icon;
            
            return (
              <EnhancedCard 
                key={template.id} 
                className="cursor-pointer transform hover:scale-105 transition-all duration-300 group overflow-hidden bg-white shadow-xl hover:shadow-2xl border-0"
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className={`h-64 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-14 h-14 text-white" />
                  </div>
                  <div className="absolute top-6 right-6 z-10">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 font-semibold hover:bg-white/30 transition-colors">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="flex flex-wrap gap-2">
                      {template.regions.slice(0, 2).map((region, index) => (
                        <Badge key={index} className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm hover:bg-white/30 transition-colors">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <EnhancedCardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-3">COMPLIANCE STANDARDS</p>
                      <div className="flex flex-wrap gap-2">
                        {template.standards.map((standard, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-sm bg-green-50 text-green-700 border-green-200 font-medium hover:bg-green-100 transition-colors"
                          >
                            {standard}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-3">KEY FEATURES</p>
                      <div className="flex flex-wrap gap-2">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-sm bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-sm bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors">
                            +{template.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full bg-gradient-to-r ${template.gradient} hover:opacity-90 text-white font-semibold py-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template.id);
                      }}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Live Invoice
                    </Button>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-24">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg">
              <FileText className="w-24 h-24 text-gray-400" />
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-6">No Templates Found</h3>
            <p className="text-gray-600 text-2xl mb-8">Try adjusting your search criteria or browse all categories</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setStandardFilter("all");
              }}
              variant="outline"
              className="px-10 py-4 text-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Enhanced Bottom CTA */}
        <EnhancedCard className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0 shadow-2xl">
          <EnhancedCardContent className="p-12 text-center">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl font-bold mb-8">Ready to Create International Standard Invoices?</h2>
              <p className="text-2xl text-white/90 mb-10 leading-relaxed">
                Choose from our internationally compliant templates with live editing, real-time updates, 
                and professional PDF export. Start creating compliant bills in seconds.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-lg hover:bg-white/30 transition-colors">
                  ✓ Live Editing Experience
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-lg hover:bg-white/30 transition-colors">
                  ✓ International Standards
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-lg hover:bg-white/30 transition-colors">
                  ✓ Professional PDF Export
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-lg hover:bg-white/30 transition-colors">
                  ✓ EXIM Documentation
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-3 text-lg hover:bg-white/30 transition-colors">
                  ✓ Maritime Compliance
                </Badge>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-6 text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setSelectedTemplate("iso-modern-invoice")}
              >
                <Zap className="w-8 h-8 mr-4" />
                Start Creating Now
              </Button>
            </div>
          </EnhancedCardContent>
        </EnhancedCard>
      </div>
    </div>
  );
}
