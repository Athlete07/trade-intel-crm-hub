
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
  Globe
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
  clientName: string;
  clientAddress: string;
  clientEmail: string;
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
}

interface BillTemplateProps {
  templateId: string;
  onBack: () => void;
}

const templateThemes = {
  modern: {
    name: "Modern",
    colors: {
      primary: "from-blue-600 to-purple-600",
      secondary: "bg-blue-50",
      accent: "text-blue-600",
      border: "border-blue-200"
    }
  },
  minimalist: {
    name: "Minimalist",
    colors: {
      primary: "from-gray-700 to-gray-900",
      secondary: "bg-gray-50",
      accent: "text-gray-700",
      border: "border-gray-300"
    }
  },
  classic: {
    name: "Classic",
    colors: {
      primary: "from-green-600 to-emerald-600",
      secondary: "bg-green-50",
      accent: "text-green-600",
      border: "border-green-200"
    }
  },
  business: {
    name: "Business",
    colors: {
      primary: "from-indigo-600 to-blue-600",
      secondary: "bg-indigo-50",
      accent: "text-indigo-600",
      border: "border-indigo-200"
    }
  },
  invoice: {
    name: "Invoice Pro",
    colors: {
      primary: "from-orange-600 to-red-600",
      secondary: "bg-orange-50",
      accent: "text-orange-600",
      border: "border-orange-200"
    }
  }
};

export function BillTemplate({ templateId, onBack }: BillTemplateProps) {
  const [billData, setBillData] = useState<BillData>({
    invoiceNumber: `INV-${Date.now()}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    companyName: "Your Company Name",
    companyAddress: "123 Business Street\nCity, State 12345\nCountry",
    companyEmail: "info@yourcompany.com",
    companyPhone: "+1 (555) 123-4567",
    companyRegNumber: "REG123456789",
    clientName: "Client Company Name",
    clientAddress: "456 Client Avenue\nCity, State 67890\nCountry",
    clientEmail: "contact@client.com",
    lineItems: [
      {
        id: "1",
        description: "Product/Service Description",
        quantity: 1,
        unitPrice: 100,
        total: 100
      }
    ],
    subtotal: 100,
    taxRate: 10,
    taxAmount: 10,
    discountRate: 0,
    discountAmount: 0,
    grandTotal: 110,
    paymentTerms: "Net 30 days",
    notes: "Thank you for your business!",
    currency: "USD"
  });

  const [selectedTheme, setSelectedTheme] = useState<keyof typeof templateThemes>('modern');
  const { toast } = useToast();

  const theme = templateThemes[selectedTheme];

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
      description: "New Item",
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
    setBillData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  const generatePDF = () => {
    // Create PDF content
    const pdfContent = `
      INVOICE
      
      Invoice Number: ${billData.invoiceNumber}
      Issue Date: ${billData.issueDate}
      Due Date: ${billData.dueDate}
      
      FROM:
      ${billData.companyName}
      ${billData.companyAddress}
      ${billData.companyEmail}
      ${billData.companyPhone}
      Registration: ${billData.companyRegNumber}
      
      TO:
      ${billData.clientName}
      ${billData.clientAddress}
      ${billData.clientEmail}
      
      LINE ITEMS:
      ${billData.lineItems.map(item => 
        `${item.description} - Qty: ${item.quantity} - Unit Price: ${billData.currency} ${item.unitPrice} - Total: ${billData.currency} ${item.total}`
      ).join('\n')}
      
      TOTALS:
      Subtotal: ${billData.currency} ${billData.subtotal.toFixed(2)}
      Discount (${billData.discountRate}%): -${billData.currency} ${billData.discountAmount.toFixed(2)}
      Tax (${billData.taxRate}%): ${billData.currency} ${billData.taxAmount.toFixed(2)}
      GRAND TOTAL: ${billData.currency} ${billData.grandTotal.toFixed(2)}
      
      Payment Terms: ${billData.paymentTerms}
      Notes: ${billData.notes}
      
      Generated on: ${new Date().toLocaleString()}
    `;

    // Create and download PDF
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${billData.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "PDF Generated",
      description: "Your invoice has been generated and downloaded successfully.",
    });
  };

  const EditableField = ({ 
    value, 
    onChange, 
    placeholder, 
    multiline = false, 
    className = "",
    type = "text"
  }: {
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    className?: string;
    type?: string;
  }) => {
    const baseClasses = "border-none bg-transparent focus:bg-white focus:shadow-sm focus:border focus:border-blue-300 rounded px-2 py-1 transition-all duration-200 hover:bg-gray-50";
    
    if (multiline) {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClasses} ${className} resize-none`}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              Back to Templates
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Invoice Editor</h1>
              <p className="text-gray-600 mt-1">Edit directly in the final format</p>
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value as keyof typeof templateThemes)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {Object.entries(templateThemes).map(([key, theme]) => (
                <option key={key} value={key}>{theme.name}</option>
              ))}
            </select>
            <Button variant="outline" onClick={() => window.print()}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={generatePDF}
              className={`bg-gradient-to-r ${theme.colors.primary} hover:opacity-90`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Live Invoice Template */}
        <Card className="bg-white shadow-2xl border-0 overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${theme.colors.primary} text-white p-8`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <EditableField
                      value={billData.companyName}
                      onChange={(value) => updateBillData('companyName', value)}
                      placeholder="Company Name"
                      className="text-2xl font-bold text-white placeholder-white/70 bg-white/10"
                    />
                  </div>
                </div>
                <div className="text-white/90 space-y-1">
                  <EditableField
                    value={billData.companyAddress}
                    onChange={(value) => updateBillData('companyAddress', value)}
                    placeholder="Company Address"
                    multiline
                    className="text-white placeholder-white/70 bg-white/10"
                  />
                  <div className="flex gap-4 mt-2">
                    <EditableField
                      value={billData.companyEmail}
                      onChange={(value) => updateBillData('companyEmail', value)}
                      placeholder="email@company.com"
                      className="text-white placeholder-white/70 bg-white/10"
                    />
                    <EditableField
                      value={billData.companyPhone}
                      onChange={(value) => updateBillData('companyPhone', value)}
                      placeholder="Phone Number"
                      className="text-white placeholder-white/70 bg-white/10"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/80">#</span>
                    <EditableField
                      value={billData.invoiceNumber}
                      onChange={(value) => updateBillData('invoiceNumber', value)}
                      placeholder="Invoice Number"
                      className="text-white placeholder-white/70 bg-white/10 font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/80" />
                    <EditableField
                      value={billData.issueDate}
                      onChange={(value) => updateBillData('issueDate', value)}
                      type="date"
                      className="text-white bg-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Bill To Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className={`text-lg font-bold ${theme.colors.accent} mb-4 flex items-center gap-2`}>
                  <Globe className="w-5 h-5" />
                  Bill To
                </h3>
                <div className="space-y-3">
                  <EditableField
                    value={billData.clientName}
                    onChange={(value) => updateBillData('clientName', value)}
                    placeholder="Client Name"
                    className="text-lg font-semibold"
                  />
                  <EditableField
                    value={billData.clientAddress}
                    onChange={(value) => updateBillData('clientAddress', value)}
                    placeholder="Client Address"
                    multiline
                  />
                  <EditableField
                    value={billData.clientEmail}
                    onChange={(value) => updateBillData('clientEmail', value)}
                    placeholder="client@email.com"
                  />
                </div>
              </div>
              <div>
                <h3 className={`text-lg font-bold ${theme.colors.accent} mb-4 flex items-center gap-2`}>
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Due Date:</span>
                    <EditableField
                      value={billData.dueDate}
                      onChange={(value) => updateBillData('dueDate', value)}
                      type="date"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Currency:</span>
                    <select
                      value={billData.currency}
                      onChange={(e) => updateBillData('currency', e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                  <EditableField
                    value={billData.paymentTerms}
                    onChange={(value) => updateBillData('paymentTerms', value)}
                    placeholder="Payment Terms"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${theme.colors.accent} flex items-center gap-2`}>
                  <FileText className="w-5 h-5" />
                  Items & Services
                </h3>
                <Button 
                  onClick={addLineItem}
                  size="sm"
                  variant="outline"
                  className={`${theme.colors.border} ${theme.colors.accent} hover:bg-opacity-10`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className={`border ${theme.colors.border} rounded-lg overflow-hidden`}>
                <div className={`${theme.colors.secondary} p-4 grid grid-cols-12 gap-4 font-semibold text-gray-700`}>
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Total</div>
                  <div className="col-span-1"></div>
                </div>
                
                {billData.lineItems.map((item, index) => (
                  <div key={item.id} className={`p-4 grid grid-cols-12 gap-4 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="col-span-5">
                      <EditableField
                        value={item.description}
                        onChange={(value) => updateLineItem(item.id, 'description', value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <EditableField
                        value={item.quantity}
                        onChange={(value) => updateLineItem(item.id, 'quantity', parseFloat(value) || 0)}
                        type="number"
                        className="text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">{billData.currency}</span>
                        <EditableField
                          value={item.unitPrice}
                          onChange={(value) => updateLineItem(item.id, 'unitPrice', parseFloat(value) || 0)}
                          type="number"
                          className="text-center"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 text-center font-semibold">
                      {billData.currency} {item.total.toFixed(2)}
                    </div>
                    <div className="col-span-1 text-center">
                      <Button
                        onClick={() => removeLineItem(item.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-full max-w-md">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{billData.currency} {billData.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Discount:</span>
                      <EditableField
                        value={billData.discountRate}
                        onChange={(value) => updateBillData('discountRate', parseFloat(value) || 0)}
                        type="number"
                        className="w-16 text-center"
                      />
                      <span className="text-gray-600">%</span>
                    </div>
                    <span className="font-semibold text-green-600">-{billData.currency} {billData.discountAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Tax:</span>
                      <EditableField
                        value={billData.taxRate}
                        onChange={(value) => updateBillData('taxRate', parseFloat(value) || 0)}
                        type="number"
                        className="w-16 text-center"
                      />
                      <span className="text-gray-600">%</span>
                    </div>
                    <span className="font-semibold">{billData.currency} {billData.taxAmount.toFixed(2)}</span>
                  </div>

                  <div className={`flex justify-between items-center py-3 border-t-2 ${theme.colors.border} bg-gradient-to-r ${theme.colors.primary} text-white px-4 rounded-lg`}>
                    <span className="text-lg font-bold">TOTAL:</span>
                    <span className="text-xl font-bold">{billData.currency} {billData.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <h3 className={`text-lg font-bold ${theme.colors.accent} mb-4`}>Notes</h3>
              <EditableField
                value={billData.notes}
                onChange={(value) => updateBillData('notes', value)}
                placeholder="Additional notes or terms..."
                multiline
                className="w-full"
              />
            </div>
          </CardContent>

          {/* Footer */}
          <div className={`${theme.colors.secondary} p-6 border-t ${theme.colors.border}`}>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Registration Number: {billData.companyRegNumber} | 
                Email: {billData.companyEmail} | 
                Phone: {billData.companyPhone}
              </p>
              <p className="text-xs text-gray-500">
                This invoice complies with international standards (ISO 20022, UBL 2.1, EN 16931)
              </p>
              <p className="text-xs text-gray-500">
                Payment due within {billData.paymentTerms}. Late payments may incur additional charges.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
