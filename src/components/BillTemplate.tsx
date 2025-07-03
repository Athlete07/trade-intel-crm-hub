
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Plus, 
  Trash, 
  Save,
  Eye,
  Calendar,
  Building2,
  FileText,
  CreditCard,
  Globe,
  ArrowLeft,
  Settings,
  Shield,
  Printer,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface BillData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  companyRegNumber: string;
  companyWebsite: string;
  companyVAT: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientVAT: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  grandTotal: number;
  paymentTerms: string;
  notes: string;
  currency: string;
  paymentMethod: string;
  bankDetails: string;
  legalText: string;
}

interface BillTemplateProps {
  templateId: string;
  onBack: () => void;
}

const templateConfigs = {
  "iso-modern-invoice": {
    name: "ISO Modern Invoice",
    standards: ["ISO 20022", "UBL 2.1", "EN 16931"],
    colors: {
      primary: "from-blue-600 to-purple-600",
      secondary: "bg-blue-50",
      accent: "text-blue-600",
      border: "border-blue-200"
    }
  },
  "ubl-minimalist-bill": {
    name: "UBL Minimalist Bill",
    standards: ["UBL 2.1", "EN 16931"],
    colors: {
      primary: "from-gray-700 to-gray-900",
      secondary: "bg-gray-50",
      accent: "text-gray-700",
      border: "border-gray-300"
    }
  },
  "en-business-invoice": {
    name: "EN 16931 Business Invoice",
    standards: ["EN 16931", "UBL 2.1"],
    colors: {
      primary: "from-indigo-600 to-blue-600",
      secondary: "bg-indigo-50",
      accent: "text-indigo-600",
      border: "border-indigo-200"
    }
  },
  "trade-finance-invoice": {
    name: "Trade Finance Invoice",
    standards: ["ISO 20022", "UCP 600"],
    colors: {
      primary: "from-green-600 to-emerald-600",
      secondary: "bg-green-50",
      accent: "text-green-600",
      border: "border-green-200"
    }
  },
  "logistics-shipping-bill": {
    name: "Logistics Shipping Bill",
    standards: ["CMR", "CIM"],
    colors: {
      primary: "from-orange-600 to-red-600",
      secondary: "bg-orange-50",
      accent: "text-orange-600",
      border: "border-orange-200"
    }
  },
  "commercial-invoice": {
    name: "Commercial Invoice",
    standards: ["EXIM", "Customs Declaration"],
    colors: {
      primary: "from-purple-600 to-pink-600",
      secondary: "bg-purple-50",
      accent: "text-purple-600",
      border: "border-purple-200"
    }
  },
  "proforma-invoice": {
    name: "Proforma Invoice",
    standards: ["EXIM", "Trade Documentation"],
    colors: {
      primary: "from-teal-600 to-cyan-600",
      secondary: "bg-teal-50",
      accent: "text-teal-600",
      border: "border-teal-200"
    }
  },
  "bill-of-lading": {
    name: "Bill of Lading",
    standards: ["Maritime Law", "ICC Rules"],
    colors: {
      primary: "from-blue-800 to-indigo-800",
      secondary: "bg-blue-50",
      accent: "text-blue-800",
      border: "border-blue-300"
    }
  },
  "export-invoice": {
    name: "Export Invoice",
    standards: ["EXIM", "Export Documentation"],
    colors: {
      primary: "from-emerald-600 to-green-700",
      secondary: "bg-emerald-50",
      accent: "text-emerald-600",
      border: "border-emerald-200"
    }
  },
  "import-invoice": {
    name: "Import Invoice",
    standards: ["EXIM", "Import Documentation"],
    colors: {
      primary: "from-amber-600 to-orange-600",
      secondary: "bg-amber-50",
      accent: "text-amber-600",
      border: "border-amber-200"
    }
  }
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" }
];

export function BillTemplate({ templateId, onBack }: BillTemplateProps) {
  const [billData, setBillData] = useState<BillData>({
    invoiceNumber: `INV-${Date.now()}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    companyName: "Your Company Name",
    companyAddress: "123 Business Street\nCity, State 12345\nCountry",
    companyEmail: "billing@yourcompany.com",
    companyPhone: "+1 (555) 123-4567",
    companyRegNumber: "REG123456789",
    companyWebsite: "www.yourcompany.com",
    companyVAT: "VAT123456789",
    clientName: "Client Company Name",
    clientAddress: "456 Client Avenue\nCity, State 67890\nCountry",
    clientEmail: "accounts@client.com",
    clientVAT: "VAT987654321",
    lineItems: [
      {
        id: "1",
        description: "Professional Services - Consultation",
        quantity: 1,
        unitPrice: 500,
        total: 500
      },
      {
        id: "2",
        description: "Project Management Services",
        quantity: 40,
        unitPrice: 75,
        total: 3000
      }
    ],
    subtotal: 3500,
    taxRate: 21,
    taxAmount: 735,
    discountRate: 5,
    discountAmount: 175,
    grandTotal: 4060,
    paymentTerms: "Net 30 days from invoice date",
    notes: "Thank you for your business! Payment is due within 30 days.",
    currency: "USD",
    paymentMethod: "Bank Transfer",
    bankDetails: "Bank: International Bank\nAccount: 1234567890\nSwift: INTLBANK123",
    legalText: "This invoice complies with international billing standards including ISO 20022, UBL 2.1, and EN 16931."
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { toast } = useToast();

  const template = templateConfigs[templateId as keyof typeof templateConfigs] || templateConfigs["iso-modern-invoice"];

  useEffect(() => {
    calculateTotals();
  }, [billData.lineItems, billData.taxRate, billData.discountRate]);

  const calculateTotals = () => {
    const subtotal = billData.lineItems.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = (subtotal * billData.discountRate) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * billData.taxRate) / 100;
    const grandTotal = taxableAmount + taxAmount;

    setBillData(prev => ({
      ...prev,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal
    }));
  };

  const updateBillData = (field: keyof BillData, value: any) => {
    setBillData(prev => ({ ...prev, [field]: value }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setBillData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "New Item Description",
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setBillData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  const removeLineItem = (id: string) => {
    if (billData.lineItems.length > 1) {
      setBillData(prev => ({
        ...prev,
        lineItems: prev.lineItems.filter(item => item.id !== id)
      }));
    }
  };

  const printBill = () => {
    const printContent = document.getElementById('invoice-content');
    if (printContent) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice ${billData.invoiceNumber}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  color: #333;
                  line-height: 1.4;
                }
                .invoice-header {
                  background: linear-gradient(135deg, #1e40af, #7c3aed);
                  color: white;
                  padding: 30px;
                  margin-bottom: 30px;
                  border-radius: 8px;
                }
                .company-info { display: flex; justify-content: space-between; align-items: flex-start; }
                .invoice-details { text-align: right; }
                .bill-to { margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
                .line-items { margin: 20px 0; }
                .line-items table { width: 100%; border-collapse: collapse; }
                .line-items th, .line-items td { 
                  padding: 12px; 
                  text-align: left; 
                  border-bottom: 1px solid #ddd; 
                }
                .line-items th { background: #f8f9fa; font-weight: bold; }
                .totals { float: right; width: 400px; margin: 20px 0; }
                .totals table { width: 100%; }
                .totals td { padding: 8px 0; }
                .grand-total { 
                  background: linear-gradient(135deg, #1e40af, #7c3aed);
                  color: white;
                  font-weight: bold;
                  padding: 15px;
                  border-radius: 8px;
                }
                .footer { 
                  margin-top: 40px; 
                  padding: 20px; 
                  background: #f8f9fa; 
                  border-radius: 8px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                }
                @media print {
                  body { margin: 0; padding: 15px; font-size: 12px; }
                  .invoice-header { background: #1e40af !important; -webkit-print-color-adjust: exact; }
                  .grand-total { background: #1e40af !important; -webkit-print-color-adjust: exact; }
                }
              </style>
            </head>
            <body>
              <div class="invoice-header">
                <div class="company-info">
                  <div>
                    <h1 style="margin: 0; font-size: 24px;">${billData.companyName}</h1>
                    <div style="margin-top: 10px; white-space: pre-line;">${billData.companyAddress}</div>
                    <div style="margin-top: 10px;">
                      <div>Email: ${billData.companyEmail}</div>
                      <div>Phone: ${billData.companyPhone}</div>
                      <div>Website: ${billData.companyWebsite}</div>
                    </div>
                  </div>
                  <div class="invoice-details">
                    <h1 style="margin: 0; font-size: 36px;">INVOICE</h1>
                    <div style="margin-top: 15px;">
                      <div><strong>Invoice #:</strong> ${billData.invoiceNumber}</div>
                      <div><strong>Issue Date:</strong> ${billData.issueDate}</div>
                      <div><strong>Due Date:</strong> ${billData.dueDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bill-to">
                <h3 style="margin: 0 0 15px 0; color: #1e40af;">Bill To:</h3>
                <div style="font-weight: bold; font-size: 16px;">${billData.clientName}</div>
                <div style="margin-top: 5px; white-space: pre-line;">${billData.clientAddress}</div>
                <div style="margin-top: 5px;">Email: ${billData.clientEmail}</div>
                <div>VAT: ${billData.clientVAT}</div>
              </div>

              <div class="line-items">
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th style="text-align: center;">Quantity</th>
                      <th style="text-align: center;">Unit Price</th>
                      <th style="text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${billData.lineItems.map(item => `
                      <tr>
                        <td>${item.description}</td>
                        <td style="text-align: center;">${item.quantity}</td>
                        <td style="text-align: center;">${billData.currency} ${item.unitPrice.toFixed(2)}</td>
                        <td style="text-align: right;">${billData.currency} ${item.total.toFixed(2)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <div class="totals">
                <table>
                  <tr>
                    <td>Subtotal:</td>
                    <td style="text-align: right;">${billData.currency} ${billData.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Discount (${billData.discountRate}%):</td>
                    <td style="text-align: right; color: green;">-${billData.currency} ${billData.discountAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax (${billData.taxRate}%):</td>
                    <td style="text-align: right;">${billData.currency} ${billData.taxAmount.toFixed(2)}</td>
                  </tr>
                </table>
                <div class="grand-total" style="text-align: center; margin-top: 10px;">
                  <div style="font-size: 18px;">TOTAL: ${billData.currency} ${billData.grandTotal.toFixed(2)}</div>
                </div>
              </div>

              <div style="clear: both; margin-top: 30px;">
                <div style="margin-bottom: 20px;">
                  <h4 style="color: #1e40af;">Payment Terms:</h4>
                  <p>${billData.paymentTerms}</p>
                </div>
                <div style="margin-bottom: 20px;">
                  <h4 style="color: #1e40af;">Bank Details:</h4>
                  <pre style="white-space: pre-line; font-family: Arial, sans-serif;">${billData.bankDetails}</pre>
                </div>
                <div style="margin-bottom: 20px;">
                  <h4 style="color: #1e40af;">Notes:</h4>
                  <p>${billData.notes}</p>
                </div>
              </div>

              <div class="footer">
                <div style="margin-bottom: 10px;">
                  ${billData.companyName} | Reg: ${billData.companyRegNumber} | Email: ${billData.companyEmail} | ${billData.companyWebsite}
                </div>
                <div style="font-size: 10px;">
                  This invoice complies with international standards: ${template.standards.join(', ')}
                </div>
                <div style="font-size: 10px; margin-top: 5px;">
                  ${billData.legalText}
                </div>
              </div>
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
      }
    }

    toast({
      title: "Print Ready",
      description: `Invoice ${billData.invoiceNumber} is ready for printing.`,
    });
  };

  const generatePDF = () => {
    printBill();
    toast({
      title: "PDF Generated",
      description: `Invoice ${billData.invoiceNumber} has been prepared for download.`,
    });
  };

  const EditableField = ({ 
    value, 
    onChange, 
    placeholder, 
    multiline = false, 
    className = "",
    type = "text",
    disabled = false
  }: {
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    className?: string;
    type?: string;
    disabled?: boolean;
  }) => {
    if (isPreviewMode || disabled) {
      if (multiline) {
        return <div className={`whitespace-pre-wrap ${className}`}>{value}</div>;
      }
      return <span className={className}>{value}</span>;
    }

    const baseClasses = "border-none bg-transparent focus:bg-white/90 focus:shadow-md focus:border-2 focus:border-blue-400 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-blue-50/50 hover:shadow-sm";
    
    if (multiline) {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClasses} ${className} resize-none min-h-[80px]`}
          rows={3}
        />
      );
    }

    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${baseClasses} ${className}`}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header Controls */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-6">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 px-6 py-3 hover:bg-blue-50 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Templates
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                {template.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800 px-3 py-1 font-semibold">
                  <Shield className="w-3 h-3 mr-1" />
                  Live Editing
                </Badge>
                {template.standards.map((standard, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-medium">
                    {standard}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-6 py-3 transition-all duration-200 ${isPreviewMode ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-md' : 'hover:bg-blue-50'}`}
            >
              <Eye className="w-5 h-5 mr-2" />
              {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button variant="outline" onClick={printBill} className="px-6 py-3 hover:bg-green-50 hover:border-green-200 transition-colors">
              <Printer className="w-5 h-5 mr-2" />
              Print
            </Button>
            <Button 
              onClick={generatePDF}
              className={`bg-gradient-to-r ${template.colors.primary} hover:opacity-90 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Live Invoice Template */}
        <Card className="bg-white shadow-2xl border-0 overflow-hidden" id="invoice-content">
          {/* Enhanced Header */}
          <div className={`bg-gradient-to-r ${template.colors.primary} text-white p-10`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <EditableField
                      value={billData.companyName}
                      onChange={(value) => updateBillData('companyName', value)}
                      placeholder="Company Name"
                      className="text-3xl font-bold text-white placeholder-white/70 bg-white/10 border-white/20"
                    />
                    <EditableField
                      value={billData.companyWebsite}
                      onChange={(value) => updateBillData('companyWebsite', value)}
                      placeholder="www.company.com"
                      className="text-white/90 placeholder-white/60 bg-white/10 border-white/20"
                    />
                  </div>
                </div>
                <div className="text-white/90 space-y-3">
                  <EditableField
                    value={billData.companyAddress}
                    onChange={(value) => updateBillData('companyAddress', value)}
                    placeholder="Company Address"
                    multiline
                    className="text-white placeholder-white/70 bg-white/10 border-white/20"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableField
                      value={billData.companyEmail}
                      onChange={(value) => updateBillData('companyEmail', value)}
                      placeholder="billing@company.com"
                      className="text-white placeholder-white/70 bg-white/10 border-white/20"
                    />
                    <EditableField
                      value={billData.companyPhone}
                      onChange={(value) => updateBillData('companyPhone', value)}
                      placeholder="Phone Number"
                      className="text-white placeholder-white/70 bg-white/10 border-white/20"
                    />
                    <EditableField
                      value={billData.companyRegNumber}
                      onChange={(value) => updateBillData('companyRegNumber', value)}
                      placeholder="Registration Number"
                      className="text-white placeholder-white/70 bg-white/10 border-white/20"
                    />
                    <EditableField
                      value={billData.companyVAT}
                      onChange={(value) => updateBillData('companyVAT', value)}
                      placeholder="VAT Number"
                      className="text-white placeholder-white/70 bg-white/10 border-white/20"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right space-y-4">
                <h1 className="text-5xl font-bold mb-4">INVOICE</h1>
                <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-white/80 font-medium">Invoice #</span>
                    <EditableField
                      value={billData.invoiceNumber}
                      onChange={(value) => updateBillData('invoiceNumber', value)}
                      placeholder="Invoice Number"
                      className="text-white placeholder-white/70 bg-white/10 border-white/20 font-mono text-lg"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/80" />
                    <span className="text-white/80">Issue Date</span>
                    <EditableField
                      value={billData.issueDate}
                      onChange={(value) => updateBillData('issueDate', value)}
                      type="date"
                      className="text-white bg-white/10 border-white/20"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/80" />
                    <span className="text-white/80">Due Date</span>
                    <EditableField
                      value={billData.dueDate}
                      onChange={(value) => updateBillData('dueDate', value)}
                      type="date"
                      className="text-white bg-white/10 border-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-10 space-y-8">
            {/* Bill To & Payment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${template.colors.accent} mb-4 flex items-center gap-3 pb-2 border-b-2 ${template.colors.border}`}>
                  <Globe className="w-6 h-6" />
                  Bill To
                </h3>
                <div className="space-y-4 bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <EditableField
                    value={billData.clientName}
                    onChange={(value) => updateBillData('clientName', value)}
                    placeholder="Client Company Name"
                    className="text-xl font-semibold"
                  />
                  <EditableField
                    value={billData.clientAddress}
                    onChange={(value) => updateBillData('clientAddress', value)}
                    placeholder="Client Address"
                    multiline
                    className="text-gray-700"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableField
                      value={billData.clientEmail}
                      onChange={(value) => updateBillData('clientEmail', value)}
                      placeholder="client@email.com"
                      className="text-gray-700"
                    />
                    <EditableField
                      value={billData.clientVAT}
                      onChange={(value) => updateBillData('clientVAT', value)}
                      placeholder="Client VAT Number"
                      className="text-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className={`text-xl font-bold ${template.colors.accent} mb-4 flex items-center gap-3 pb-2 border-b-2 ${template.colors.border}`}>
                  <CreditCard className="w-6 h-6" />
                  Payment Details
                </h3>
                <div className="space-y-4 bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-1 block">Currency</label>
                      <select
                        value={billData.currency}
                        onChange={(e) => updateBillData('currency', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow"
                        disabled={isPreviewMode}
                      >
                        {currencies.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-1 block">Payment Method</label>
                      <EditableField
                        value={billData.paymentMethod}
                        onChange={(value) => updateBillData('paymentMethod', value)}
                        placeholder="Bank Transfer, Credit Card, etc."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Payment Terms</label>
                    <EditableField
                      value={billData.paymentTerms}
                      onChange={(value) => updateBillData('paymentTerms', value)}
                      placeholder="Payment Terms"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Bank Details</label>
                    <EditableField
                      value={billData.bankDetails}
                      onChange={(value) => updateBillData('bankDetails', value)}
                      placeholder="Bank details for payment"
                      multiline
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items with Enhanced UI */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${template.colors.accent} flex items-center gap-3`}>
                  <FileText className="w-6 h-6" />
                  Items & Services
                </h3>
                {!isPreviewMode && (
                  <Button 
                    onClick={addLineItem}
                    size="sm"
                    className={`bg-gradient-to-r ${template.colors.primary} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                )}
              </div>

              <div className={`border-2 ${template.colors.border} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
                <div className={`${template.colors.secondary} p-4 grid grid-cols-12 gap-4 font-bold text-gray-800 border-b ${template.colors.border}`}>
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Total</div>
                  {!isPreviewMode && <div className="col-span-1 text-center">Action</div>}
                </div>
                
                {billData.lineItems.map((item, index) => (
                  <div key={item.id} className={`p-4 grid grid-cols-12 gap-4 items-center border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50/30 transition-colors`}>
                    <div className="col-span-5">
                      <EditableField
                        value={item.description}
                        onChange={(value) => updateLineItem(item.id, 'description', value)}
                        placeholder="Item description"
                        className="font-medium"
                      />
                    </div>
                    <div className="col-span-2 text-center">
                      <EditableField
                        value={item.quantity}
                        onChange={(value) => updateLineItem(item.id, 'quantity', parseFloat(value) || 0)}
                        type="number"
                        className="text-center font-semibold"
                      />
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-gray-500 font-medium">{billData.currency}</span>
                        <EditableField
                          value={item.unitPrice}
                          onChange={(value) => updateLineItem(item.id, 'unitPrice', parseFloat(value) || 0)}
                          type="number"
                          className="text-center font-semibold"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-bold text-lg">
                        {billData.currency} {item.total.toFixed(2)}
                      </span>
                    </div>
                    {!isPreviewMode && (
                      <div className="col-span-1 text-center">
                        <Button
                          onClick={() => removeLineItem(item.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          disabled={billData.lineItems.length === 1}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Totals Section */}
            <div className="flex justify-end">
              <div className="w-full max-w-lg">
                <div className="bg-gray-50 rounded-xl p-6 space-y-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Subtotal:</span>
                    <span className="font-bold text-lg">{billData.currency} {billData.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 font-medium">Discount:</span>
                      {!isPreviewMode && (
                        <>
                          <EditableField
                            value={billData.discountRate}
                            onChange={(value) => updateBillData('discountRate', parseFloat(value) || 0)}
                            type="number"
                            className="w-20 text-center font-semibold"
                          />
                          <span className="text-gray-600">%</span>
                        </>
                      )}
                      {isPreviewMode && <span className="font-medium">({billData.discountRate}%)</span>}
                    </div>
                    <span className="font-bold text-green-600 text-lg">-{billData.currency} {billData.discountAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 font-medium">Tax:</span>
                      {!isPreviewMode && (
                        <>
                          <EditableField
                            value={billData.taxRate}
                            onChange={(value) => updateBillData('taxRate', parseFloat(value) || 0)}
                            type="number"
                            className="w-20 text-center font-semibold"
                          />
                          <span className="text-gray-600">%</span>
                        </>
                      )}
                      {isPreviewMode && <span className="font-medium">({billData.taxRate}%)</span>}
                    </div>
                    <span className="font-bold text-lg">{billData.currency} {billData.taxAmount.toFixed(2)}</span>
                  </div>

                  <div className={`flex justify-between items-center py-4 border-t-2 ${template.colors.border} bg-gradient-to-r ${template.colors.primary} text-white px-6 rounded-lg shadow-lg`}>
                    <span className="text-xl font-bold">GRAND TOTAL:</span>
                    <span className="text-2xl font-bold">{billData.currency} {billData.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Notes & Legal Text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-lg font-bold ${template.colors.accent} mb-4`}>Notes</h3>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <EditableField
                    value={billData.notes}
                    onChange={(value) => updateBillData('notes', value)}
                    placeholder="Additional notes, terms, or special instructions..."
                    multiline
                    className="w-full min-h-[100px]"
                  />
                </div>
              </div>
              <div>
                <h3 className={`text-lg font-bold ${template.colors.accent} mb-4`}>Legal & Compliance</h3>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <EditableField
                    value={billData.legalText}
                    onChange={(value) => updateBillData('legalText', value)}
                    placeholder="Legal disclaimers, terms and conditions..."
                    multiline
                    className="w-full min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </CardContent>

          {/* Enhanced Footer */}
          <div className={`${template.colors.secondary} p-8 border-t-2 ${template.colors.border}`}>
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Reg: {billData.companyRegNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{billData.companyEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{billData.companyWebsite}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">
                  This invoice complies with international standards: {template.standards.join(', ')}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Payment due within the specified terms. Late payments may incur additional charges as per applicable law.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
