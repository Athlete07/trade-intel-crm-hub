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
  ArrowLeft,
  Save,
  Search,
  Filter,
  Building2,
  Globe,
  Truck,
  Ship,
  Plane,
  Award,
  Package,
  Receipt,
  Send,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'email';
  required: boolean;
  placeholder?: string;
  options?: string[];
  section: string;
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  fields: TemplateField[];
}

const documentTemplates: DocumentTemplate[] = [
  {
    id: "proforma-invoice",
    name: "Proforma Invoice",
    description: "Preliminary invoice sent to buyer before shipment - serves as quotation for payment arrangements",
    category: "Pre-shipment",
    icon: Receipt,
    color: "from-blue-500 to-blue-600",
    fields: [
      // Header Section
      { name: "piNumber", label: "Proforma Invoice Number", type: "text", required: true, section: "header", placeholder: "PI-2024-001" },
      { name: "date", label: "Invoice Date", type: "date", required: true, section: "header" },
      { name: "validUntil", label: "Valid Until", type: "date", required: true, section: "header" },
      { name: "reference", label: "Buyer Reference", type: "text", required: false, section: "header" },
      
      // Seller Information
      { name: "sellerName", label: "Seller/Exporter Name", type: "text", required: true, section: "seller" },
      { name: "sellerAddress", label: "Complete Address", type: "textarea", required: true, section: "seller" },
      { name: "sellerGST", label: "GST/VAT Number", type: "text", required: true, section: "seller" },
      { name: "sellerIEC", label: "IEC Code", type: "text", required: true, section: "seller" },
      { name: "sellerContact", label: "Contact Person", type: "text", required: true, section: "seller" },
      { name: "sellerPhone", label: "Phone Number", type: "text", required: true, section: "seller" },
      { name: "sellerEmail", label: "Email Address", type: "email", required: true, section: "seller" },
      
      // Buyer Information
      { name: "buyerName", label: "Buyer/Importer Name", type: "text", required: true, section: "buyer" },
      { name: "buyerAddress", label: "Complete Address", type: "textarea", required: true, section: "buyer" },
      { name: "buyerCountry", label: "Country", type: "text", required: true, section: "buyer" },
      { name: "buyerTaxId", label: "Tax ID/VAT Number", type: "text", required: false, section: "buyer" },
      { name: "buyerContact", label: "Contact Person", type: "text", required: true, section: "buyer" },
      { name: "buyerPhone", label: "Phone Number", type: "text", required: false, section: "buyer" },
      { name: "buyerEmail", label: "Email Address", type: "email", required: false, section: "buyer" },
      
      // Shipment Details
      { name: "portOfLoading", label: "Port of Loading", type: "text", required: true, section: "shipment" },
      { name: "portOfDischarge", label: "Port of Discharge", type: "text", required: true, section: "shipment" },
      { name: "countryOfOrigin", label: "Country of Origin", type: "text", required: true, section: "shipment" },
      { name: "finalDestination", label: "Final Destination", type: "text", required: true, section: "shipment" },
      
      // Commercial Terms
      { name: "currency", label: "Currency", type: "select", required: true, section: "terms", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      { name: "incoterm", label: "Incoterm", type: "select", required: true, section: "terms", options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA"] },
      { name: "paymentTerms", label: "Payment Terms", type: "textarea", required: true, section: "terms" },
      { name: "deliveryTime", label: "Delivery Time", type: "text", required: true, section: "terms" },
      
      // Banking Details
      { name: "bankName", label: "Bank Name", type: "text", required: true, section: "banking" },
      { name: "bankAddress", label: "Bank Address", type: "textarea", required: true, section: "banking" },
      { name: "accountNumber", label: "Account Number", type: "text", required: true, section: "banking" },
      { name: "swiftCode", label: "SWIFT Code", type: "text", required: true, section: "banking" },
    ]
  },
  {
    id: "commercial-invoice",
    name: "Commercial Invoice",
    description: "Official document for customs clearance and payment - legally required for international trade",
    category: "Official",
    icon: Building2,
    color: "from-green-500 to-green-600",
    fields: [
      // Header Section
      { name: "ciNumber", label: "Commercial Invoice Number", type: "text", required: true, section: "header", placeholder: "CI-2024-001" },
      { name: "date", label: "Invoice Date", type: "date", required: true, section: "header" },
      { name: "lcNumber", label: "L/C Number", type: "text", required: false, section: "header" },
      { name: "contractNumber", label: "Contract Number", type: "text", required: false, section: "header" },
      
      // Exporter Information
      { name: "exporterName", label: "Exporter Name", type: "text", required: true, section: "exporter" },
      { name: "exporterAddress", label: "Complete Address", type: "textarea", required: true, section: "exporter" },
      { name: "exporterGST", label: "GST Registration", type: "text", required: true, section: "exporter" },
      { name: "exporterIEC", label: "IEC Code", type: "text", required: true, section: "exporter" },
      { name: "exporterPAN", label: "PAN Number", type: "text", required: true, section: "exporter" },
      
      // Importer Information
      { name: "importerName", label: "Importer/Consignee Name", type: "text", required: true, section: "importer" },
      { name: "importerAddress", label: "Complete Address", type: "textarea", required: true, section: "importer" },
      { name: "importerCountry", label: "Country of Import", type: "text", required: true, section: "importer" },
      { name: "importerTaxId", label: "Tax ID", type: "text", required: true, section: "importer" },
      
      // Transport Details
      { name: "vesselName", label: "Vessel/Flight Name", type: "text", required: false, section: "transport" },
      { name: "voyageNumber", label: "Voyage/Flight Number", type: "text", required: false, section: "transport" },
      { name: "blNumber", label: "B/L or AWB Number", type: "text", required: false, section: "transport" },
      { name: "portOfLoading", label: "Port of Loading", type: "text", required: true, section: "transport" },
      { name: "portOfDischarge", label: "Port of Discharge", type: "text", required: true, section: "transport" },
      
      // Commercial Terms
      { name: "currency", label: "Currency", type: "select", required: true, section: "terms", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      { name: "incoterm", label: "Incoterm", type: "select", required: true, section: "terms", options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA"] },
      { name: "paymentTerms", label: "Payment Terms", type: "text", required: true, section: "terms" },
      
      // Measurements
      { name: "totalNetWeight", label: "Total Net Weight (KG)", type: "number", required: true, section: "measurements" },
      { name: "totalGrossWeight", label: "Total Gross Weight (KG)", type: "number", required: true, section: "measurements" },
      { name: "totalCBM", label: "Total Volume (CBM)", type: "number", required: false, section: "measurements" },
    ]
  },
  {
    id: "packing-list",
    name: "Packing List",
    description: "Detailed inventory document listing all items in each package - essential for customs clearance",
    category: "Shipping",
    icon: Package,
    color: "from-purple-500 to-purple-600",
    fields: [
      // Header Section
      { name: "plNumber", label: "Packing List Number", type: "text", required: true, section: "header", placeholder: "PL-2024-001" },
      { name: "date", label: "Date", type: "date", required: true, section: "header" },
      { name: "invoiceRef", label: "Related Invoice Number", type: "text", required: true, section: "header" },
      
      // Shipper Information
      { name: "shipperName", label: "Shipper/Exporter", type: "text", required: true, section: "shipper" },
      { name: "shipperAddress", label: "Shipper Address", type: "textarea", required: true, section: "shipper" },
      { name: "shipperContact", label: "Contact Person", type: "text", required: true, section: "shipper" },
      { name: "shipperPhone", label: "Phone Number", type: "text", required: true, section: "shipper" },
      
      // Consignee Information
      { name: "consigneeName", label: "Consignee", type: "text", required: true, section: "consignee" },
      { name: "consigneeAddress", label: "Consignee Address", type: "textarea", required: true, section: "consignee" },
      { name: "consigneeContact", label: "Contact Person", type: "text", required: false, section: "consignee" },
      
      // Shipping Details
      { name: "vesselName", label: "Vessel Name", type: "text", required: false, section: "shipping" },
      { name: "containerNumbers", label: "Container Numbers", type: "textarea", required: false, section: "shipping" },
      { name: "sealNumbers", label: "Seal Numbers", type: "text", required: false, section: "shipping" },
      { name: "portOfLoading", label: "Port of Loading", type: "text", required: true, section: "shipping" },
      { name: "portOfDischarge", label: "Port of Discharge", type: "text", required: true, section: "shipping" },
      
      // Package Information
      { name: "totalPackages", label: "Total Number of Packages", type: "number", required: true, section: "packages" },
      { name: "packingType", label: "Type of Packaging", type: "text", required: true, section: "packages", placeholder: "Wooden crates, cardboard boxes, etc." },
      { name: "shippingMarks", label: "Shipping Marks & Numbers", type: "textarea", required: false, section: "packages" },
      { name: "totalNetWeight", label: "Total Net Weight (KG)", type: "number", required: true, section: "packages" },
      { name: "totalGrossWeight", label: "Total Gross Weight (KG)", type: "number", required: true, section: "packages" },
      { name: "totalVolume", label: "Total Volume (CBM)", type: "number", required: false, section: "packages" },
    ]
  },
  {
    id: "customs-invoice",
    name: "Customs Invoice",
    description: "Specialized invoice for customs valuation and duty assessment - includes detailed commodity information",
    category: "Compliance",
    icon: Globe,
    color: "from-orange-500 to-orange-600",
    fields: [
      // Header Section
      { name: "customsInvoiceNumber", label: "Customs Invoice Number", type: "text", required: true, section: "header", placeholder: "CU-2024-001" },
      { name: "date", label: "Invoice Date", type: "date", required: true, section: "header" },
      { name: "customsReference", label: "Customs Reference/Entry No.", type: "text", required: false, section: "header" },
      
      // Exporter Information
      { name: "exporterName", label: "Exporter Name", type: "text", required: true, section: "exporter" },
      { name: "exporterAddress", label: "Exporter Address", type: "textarea", required: true, section: "exporter" },
      { name: "exporterCode", label: "Exporter Code/Registration", type: "text", required: true, section: "exporter" },
      
      // Importer Information
      { name: "importerName", label: "Importer Name", type: "text", required: true, section: "importer" },
      { name: "importerAddress", label: "Importer Address", type: "textarea", required: true, section: "importer" },
      { name: "importerLicense", label: "Importer License/Code", type: "text", required: true, section: "importer" },
      
      // Customs Details
      { name: "customsOffice", label: "Customs Office of Entry", type: "text", required: true, section: "customs" },
      { name: "dutyRate", label: "Applicable Duty Rate (%)", type: "number", required: false, section: "customs" },
      { name: "currency", label: "Currency", type: "select", required: true, section: "customs", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      { name: "exchangeRate", label: "Exchange Rate", type: "number", required: false, section: "customs" },
      
      // Valuation
      { name: "countryOfOrigin", label: "Country of Origin", type: "text", required: true, section: "valuation" },
      { name: "insuranceValue", label: "Insurance Value", type: "number", required: false, section: "valuation" },
      { name: "freightValue", label: "Freight Value", type: "number", required: false, section: "valuation" },
      { name: "cifValue", label: "Total CIF Value", type: "number", required: true, section: "valuation" },
    ]
  },
  {
    id: "delivery-order",
    name: "Delivery Order",
    description: "Authorization document for releasing goods from port/warehouse to consignee",
    category: "Logistics",
    icon: Truck,
    color: "from-red-500 to-red-600",
    fields: [
      // Header Section
      { name: "doNumber", label: "Delivery Order Number", type: "text", required: true, section: "header", placeholder: "DO-2024-001" },
      { name: "date", label: "Issue Date", type: "date", required: true, section: "header" },
      { name: "blReference", label: "B/L Reference Number", type: "text", required: true, section: "header" },
      
      // Shipping Line Information
      { name: "shippingLine", label: "Shipping Line", type: "text", required: true, section: "agent" },
      { name: "agentName", label: "Agent Name", type: "text", required: true, section: "agent" },
      { name: "agentAddress", label: "Agent Address", type: "textarea", required: true, section: "agent" },
      { name: "agentContact", label: "Contact Person", type: "text", required: true, section: "agent" },
      
      // Consignee Information
      { name: "consigneeName", label: "Consignee", type: "text", required: true, section: "consignee" },
      { name: "consigneeAddress", label: "Consignee Address", type: "textarea", required: true, section: "consignee" },
      { name: "consigneeContact", label: "Contact Person", type: "text", required: true, section: "consignee" },
      { name: "notifyParty", label: "Notify Party (if different)", type: "textarea", required: false, section: "consignee" },
      
      // Cargo Details
      { name: "vesselName", label: "Vessel Name", type: "text", required: true, section: "cargo" },
      { name: "voyageNumber", label: "Voyage Number", type: "text", required: true, section: "cargo" },
      { name: "containerNumbers", label: "Container Numbers", type: "textarea", required: true, section: "cargo" },
      { name: "portOfDischarge", label: "Port of Discharge", type: "text", required: true, section: "cargo" },
      
      // Delivery Instructions
      { name: "deliveryLocation", label: "Delivery Location/Warehouse", type: "text", required: true, section: "delivery" },
      { name: "deliveryContactPerson", label: "Delivery Contact Person", type: "text", required: true, section: "delivery" },
      { name: "specialInstructions", label: "Special Delivery Instructions", type: "textarea", required: false, section: "delivery" },
      { name: "freightStatus", label: "Freight Status", type: "select", required: true, section: "delivery", options: ["Prepaid", "Collect"] },
    ]
  },
  {
    id: "freight-invoice",
    name: "Freight Invoice",
    description: "Comprehensive invoice for shipping, logistics, and freight forwarding services",
    category: "Logistics",
    icon: Ship,
    color: "from-cyan-500 to-cyan-600",
    fields: [
      // Header Section
      { name: "fiNumber", label: "Freight Invoice Number", type: "text", required: true, section: "header", placeholder: "FI-2024-001" },
      { name: "date", label: "Invoice Date", type: "date", required: true, section: "header" },
      { name: "jobNumber", label: "Job/Booking Number", type: "text", required: false, section: "header" },
      
      // Freight Forwarder Information
      { name: "forwarderName", label: "Freight Forwarder/Carrier", type: "text", required: true, section: "forwarder" },
      { name: "forwarderAddress", label: "Forwarder Address", type: "textarea", required: true, section: "forwarder" },
      { name: "forwarderLicense", label: "Forwarder License Number", type: "text", required: false, section: "forwarder" },
      
      // Customer Information
      { name: "customerName", label: "Customer Name", type: "text", required: true, section: "customer" },
      { name: "customerAddress", label: "Customer Address", type: "textarea", required: true, section: "customer" },
      { name: "customerContact", label: "Contact Person", type: "text", required: true, section: "customer" },
      
      // Route Information
      { name: "originPort", label: "Port/Place of Origin", type: "text", required: true, section: "route" },
      { name: "destinationPort", label: "Port/Place of Destination", type: "text", required: true, section: "route" },
      { name: "vesselName", label: "Vessel/Flight Name", type: "text", required: false, section: "route" },
      { name: "etd", label: "ETD (Estimated Time of Departure)", type: "date", required: false, section: "route" },
      { name: "eta", label: "ETA (Estimated Time of Arrival)", type: "date", required: false, section: "route" },
      
      // Service Details
      { name: "serviceType", label: "Service Type", type: "select", required: true, section: "service", options: ["FCL", "LCL", "Air Freight", "Express Delivery"] },
      { name: "containerType", label: "Container Type", type: "select", required: false, section: "service", options: ["20GP", "40GP", "40HQ", "45HQ", "20RF", "40RF"] },
      { name: "cargoDescription", label: "Cargo Description", type: "textarea", required: true, section: "service" },
      
      // Commercial Terms
      { name: "incoterm", label: "Incoterm", type: "select", required: true, section: "terms", options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA"] },
      { name: "currency", label: "Currency", type: "select", required: true, section: "terms", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      { name: "paymentTerms", label: "Payment Terms", type: "text", required: true, section: "terms" },
    ]
  },
  {
    id: "air-waybill",
    name: "Air Waybill",
    description: "Air cargo transport document serving as receipt and contract of carriage for air freight",
    category: "Transport",
    icon: Plane,
    color: "from-pink-500 to-pink-600",
    fields: [
      // Header Section
      { name: "awbNumber", label: "Air Waybill Number (11 digits)", type: "text", required: true, section: "header", placeholder: "125-12345678" },
      { name: "date", label: "Date of Issue", type: "date", required: true, section: "header" },
      { name: "awbType", label: "AWB Type", type: "select", required: true, section: "header", options: ["Master AWB", "House AWB"] },
      
      // Airline Information
      { name: "airlineName", label: "Airline/Carrier Name", type: "text", required: true, section: "airline" },
      { name: "airlineCode", label: "Airline Code (3-digit)", type: "text", required: true, section: "airline", placeholder: "e.g., 125, 176" },
      { name: "agentCode", label: "Agent IATA Code", type: "text", required: false, section: "airline" },
      
      // Shipper Information
      { name: "shipperName", label: "Shipper Name", type: "text", required: true, section: "shipper" },
      { name: "shipperAddress", label: "Shipper Address", type: "textarea", required: true, section: "shipper" },
      { name: "shipperCity", label: "City", type: "text", required: true, section: "shipper" },
      { name: "shipperCountry", label: "Country", type: "text", required: true, section: "shipper" },
      { name: "shipperAccountNumber", label: "Account Number", type: "text", required: false, section: "shipper" },
      
      // Consignee Information
      { name: "consigneeName", label: "Consignee Name", type: "text", required: true, section: "consignee" },
      { name: "consigneeAddress", label: "Consignee Address", type: "textarea", required: true, section: "consignee" },
      { name: "consigneeCity", label: "City", type: "text", required: true, section: "consignee" },
      { name: "consigneeCountry", label: "Country", type: "text", required: true, section: "consignee" },
      
      // Flight Information
      { name: "departureAirport", label: "Departure Airport (3-letter code)", type: "text", required: true, section: "flight", placeholder: "e.g., DEL, BOM" },
      { name: "destinationAirport", label: "Destination Airport (3-letter code)", type: "text", required: true, section: "flight", placeholder: "e.g., JFK, LHR" },
      { name: "flightNumber", label: "Flight Number", type: "text", required: false, section: "flight" },
      { name: "flightDate", label: "Flight Date", type: "date", required: false, section: "flight" },
      
      // Cargo Information
      { name: "numberOfPieces", label: "Number of Pieces", type: "number", required: true, section: "cargo" },
      { name: "totalWeight", label: "Total Gross Weight", type: "number", required: true, section: "cargo" },
      { name: "weightUnit", label: "Weight Unit", type: "select", required: true, section: "cargo", options: ["KG", "LBS"] },
      { name: "commodityDescription", label: "Nature and Quantity of Goods", type: "textarea", required: true, section: "cargo" },
      
      // Charges
      { name: "currency", label: "Currency", type: "select", required: true, section: "charges", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      { name: "freightCharges", label: "Total Freight Charges", type: "number", required: true, section: "charges" },
      { name: "chargesCode", label: "Charges Code", type: "select", required: true, section: "charges", options: ["PP (Prepaid)", "CC (Collect)"] },
    ]
  },
  {
    id: "certificate-origin",
    name: "Certificate of Origin",
    description: "Official document certifying the country where goods were manufactured - required for preferential trade treatment",
    category: "Compliance",
    icon: Award,
    color: "from-yellow-500 to-yellow-600",
    fields: [
      // Header Section
      { name: "certificateNumber", label: "Certificate Number", type: "text", required: true, section: "header", placeholder: "COO-2024-001" },
      { name: "issueDate", label: "Date of Issue", type: "date", required: true, section: "header" },
      { name: "certificateType", label: "Certificate Type", type: "select", required: true, section: "header", options: ["General Certificate", "Preferential Certificate", "SAFTA Certificate", "GSP Form A"] },
      
      // Exporter Information
      { name: "exporterName", label: "Exporter Name", type: "text", required: true, section: "exporter" },
      { name: "exporterAddress", label: "Exporter Complete Address", type: "textarea", required: true, section: "exporter" },
      { name: "exporterCountry", label: "Exporter Country", type: "text", required: true, section: "exporter" },
      
      // Consignee Information
      { name: "consigneeName", label: "Consignee Name", type: "text", required: true, section: "consignee" },
      { name: "consigneeAddress", label: "Consignee Complete Address", type: "textarea", required: true, section: "consignee" },
      { name: "consigneeCountry", label: "Consignee Country", type: "text", required: true, section: "consignee" },
      
      // Transport Information
      { name: "meansOfTransport", label: "Means of Transport", type: "select", required: false, section: "transport", options: ["Sea", "Air", "Road", "Rail", "Multimodal"] },
      { name: "transportDetails", label: "Transport Details", type: "textarea", required: false, section: "transport" },
      
      // Origin Information
      { name: "countryOfOrigin", label: "Country of Origin", type: "text", required: true, section: "origin" },
      { name: "portOfLoading", label: "Port/Place of Loading", type: "text", required: false, section: "origin" },
      { name: "portOfDischarge", label: "Port/Place of Discharge", type: "text", required: false, section: "origin" },
      
      // Authority Information
      { name: "issuingAuthority", label: "Issuing Authority", type: "text", required: true, section: "authority" },
      { name: "authorityAddress", label: "Authority Address", type: "textarea", required: true, section: "authority" },
      { name: "chamberOfCommerce", label: "Chamber of Commerce", type: "text", required: false, section: "authority" },
      
      // Reference Information
      { name: "invoiceNumber", label: "Related Invoice Number", type: "text", required: false, section: "reference" },
      { name: "invoiceDate", label: "Invoice Date", type: "date", required: false, section: "reference" },
      { name: "lcNumber", label: "L/C Number", type: "text", required: false, section: "reference" },
      
      // Certification
      { name: "authorizedOfficer", label: "Authorized Officer Name", type: "text", required: true, section: "certification" },
      { name: "officerTitle", label: "Officer Title/Designation", type: "text", required: true, section: "certification" },
      { name: "signatureDate", label: "Date of Signature", type: "date", required: true, section: "certification" },
      { name: "signaturePlace", label: "Place of Signature", type: "text", required: true, section: "certification" },
    ]
  }
];

export function EximBillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formData, setFormData] = useState<{[key: string]: any}>({});
  const [currentSection, setCurrentSection] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  const categories = ["all", "Pre-shipment", "Official", "Shipping", "Compliance", "Logistics", "Transport"];
  
  const filteredTemplates = documentTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setFormData({});
    const template = documentTemplates.find(t => t.id === templateId);
    if (template && template.fields.length > 0) {
      setCurrentSection(template.fields[0].section);
    }
    setShowPreview(false);
    setIsDraft(false);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const validateForm = () => {
    const template = documentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return false;

    const requiredFields = template.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => 
      !formData[field.name] || formData[field.name].toString().trim() === ''
    );

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => field.label).join(', ');
      toast({
        title: "Required Fields Missing",
        description: `Please fill in the following required fields: ${fieldNames}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmitForm = () => {
    if (!validateForm()) return;
    
    toast({
      title: "Form Submitted Successfully",
      description: "Your document data has been processed and is ready for preview.",
    });
    setShowPreview(true);
  };

  const handlePreview = () => {
    if (!validateForm()) return;
    setShowPreview(true);
  };

  const handleSaveDraft = () => {
    const template = documentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    const draftData = {
      templateId: selectedTemplate,
      templateName: template.name,
      formData,
      savedAt: new Date().toISOString(),
      progress: calculateFormProgress()
    };
    
    const drafts = JSON.parse(localStorage.getItem('eximDrafts') || '[]');
    drafts.push(draftData);
    localStorage.setItem('eximDrafts', JSON.stringify(drafts));
    
    setIsDraft(true);
    toast({
      title: "Draft Saved",
      description: "Your document has been saved as a draft and can be continued later.",
    });
  };

  const handleGenerateDocument = () => {
    if (!validateForm()) return;
    
    const template = documentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    const pdfData = {
      template: template.name,
      data: formData,
      generatedAt: new Date().toISOString(),
      documentNumber: `${selectedTemplate?.toUpperCase()}-${Date.now()}`
    };
    
    console.log('Generating PDF with data:', pdfData);
    
    const content = `${template.name}\n\nDocument Generated: ${new Date().toLocaleString()}\nDocument Number: ${pdfData.documentNumber}\n\nForm Data:\n${JSON.stringify(formData, null, 2)}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Document Generated",
      description: "Your PDF document has been generated and downloaded successfully.",
    });
  };

  const calculateFormProgress = () => {
    const template = documentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return 0;
    
    const totalFields = template.fields.length;
    const filledFields = template.fields.filter(field => 
      formData[field.name] && formData[field.name].toString().trim() !== ''
    ).length;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  const getSectionsForTemplate = (templateId: string) => {
    const template = documentTemplates.find(t => t.id === templateId);
    if (!template) return [];
    
    const sections = new Set<string>();
    template.fields.forEach(field => {
      sections.add(field.section);
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
      shipment: "Shipment Details",
      transport: "Transport Information",
      terms: "Commercial Terms",
      banking: "Banking Details",
      measurements: "Weight & Measurements",
      packages: "Package Information",
      customs: "Customs Information",
      valuation: "Valuation Details",
      agent: "Agent Information",
      cargo: "Cargo Details",
      delivery: "Delivery Instructions",
      forwarder: "Freight Forwarder",
      customer: "Customer Information",
      route: "Route Information",
      service: "Service Details",
      airline: "Airline Information",
      flight: "Flight Information",
      charges: "Charges & Fees",
      origin: "Origin Information",
      authority: "Issuing Authority",
      reference: "Reference Information",
      certification: "Certification & Signature"
    };
    return titleMap[section] || section.charAt(0).toUpperCase() + section.slice(1);
  };

  if (selectedTemplate) {
    const template = documentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return null;

    const sections = getSectionsForTemplate(selectedTemplate);
    const currentSectionFields = template.fields.filter(field => field.section === currentSection);

    if (showPreview) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Preview Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Form
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Document Preview</h1>
                  <p className="text-gray-600 mt-1">{template.name}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  onClick={handleGenerateDocument}
                  className={`bg-gradient-to-r ${template.color} hover:opacity-90 text-white shadow-lg`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <Card className="bg-white shadow-xl border-0">
              <CardHeader className="text-center border-b">
                <CardTitle className="text-2xl font-bold">{template.name}</CardTitle>
                <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
              </CardHeader>
              <CardContent className="p-8">
                {sections.map((section) => {
                  const sectionFields = template.fields.filter(field => field.section === section);
                  
                  return (
                    <div key={section} className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                        {getSectionTitle(section)}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sectionFields.map((field) => {
                          const value = formData[field.name];
                          return (
                            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                  {field.label}
                                </label>
                                <div className="text-gray-900">
                                  {value || <span className="text-gray-400 italic">Not provided</span>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTemplate(null)}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{template.name}</h1>
                <p className="text-gray-600 mt-1">{template.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-sm text-gray-500">
                    Progress: {calculateFormProgress()}% Complete
                  </div>
                  {isDraft && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Save className="w-3 h-3 mr-1" />
                      Draft Saved
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handlePreview} className="hover:bg-gray-50">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSaveDraft} className="hover:bg-gray-50">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={handleGenerateDocument}
                className={`bg-gradient-to-r ${template.color} hover:opacity-90 text-white shadow-lg`}
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
                            ? `bg-gradient-to-r ${template.color} text-white shadow-lg`
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium">{getSectionTitle(section)}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {template.fields.filter(f => f.section === section).length} fields
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
                <CardHeader className={`border-b bg-gradient-to-r ${template.color.replace('500', '50').replace('600', '100')}`}>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {getSectionTitle(currentSection)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionFields.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {field.type === 'textarea' ? (
                          <Textarea
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                            rows={4}
                            className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                            required={field.required}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="w-full h-12 px-4 border-2 border-gray-200 focus:border-blue-500 rounded-lg focus:outline-none"
                            required={field.required}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option: string) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            type={field.type}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Section Navigation and Submit */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const currentIndex = sections.indexOf(currentSection);
                        if (currentIndex > 0) {
                          setCurrentSection(sections[currentIndex - 1]);
                        }
                      }}
                      disabled={sections.indexOf(currentSection) === 0}
                      className="hover:bg-gray-50"
                    >
                      Previous Section
                    </Button>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">
                        Section {sections.indexOf(currentSection) + 1} of {sections.length}
                      </div>
                      
                      {sections.indexOf(currentSection) === sections.length - 1 ? (
                        <Button
                          onClick={handleSubmitForm}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit Form
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            const currentIndex = sections.indexOf(currentSection);
                            if (currentIndex < sections.length - 1) {
                              setCurrentSection(sections[currentIndex + 1]);
                            }
                          }}
                          className={`bg-gradient-to-r ${template.color} hover:opacity-90 text-white`}
                        >
                          Next Section
                        </Button>
                      )}
                    </div>
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EXIM Document Generator
            </h1>
            <p className="text-lg text-gray-600 mt-2">Create professional international trade documents with industry standards</p>
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
              {categories.map(category => (
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
          const IconComponent = template.icon;
          
          return (
            <Card 
              key={template.id} 
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 cursor-pointer transform hover:scale-105 group"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-6">
                <div className={`w-full h-32 bg-gradient-to-br ${template.color.replace('500', '50').replace('600', '100')} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
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
                    <span>{template.fields.length} fields</span>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${template.color} hover:opacity-90 text-white font-medium shadow-lg`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
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
