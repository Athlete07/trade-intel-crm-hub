
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { billTemplates } from "./BillTemplates";
import { 
  FileText, 
  Download, 
  Eye, 
  Save,
  Plus,
  Copy,
  Edit,
  Trash2,
  Calculator,
  Building2,
  Calendar,
  DollarSign,
  Globe,
  Truck,
  Ship,
  Plane,
  CheckCircle,
  AlertCircle,
  Star,
  Clock
} from "lucide-react";

export function BillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("proforma");
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  
  const [billData, setBillData] = useState({
    billNumber: "PI/2025/00023",
    date: new Date().toISOString().split('T')[0],
    validUntil: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientPhone: "",
    clientCountry: "",
    sellerName: "Global Trade Solutions Ltd",
    sellerAddress: "Tower A, Business Park, New Delhi - 110001, India",
    sellerGST: "07AABCG1234R1Z5",
    sellerPAN: "AABCG1234R",
    sellerIEC: "AABCG1234R000",
    items: [{ 
      description: "", 
      hsCode: "", 
      quantity: 1, 
      unit: "PCS", 
      rate: 0, 
      amount: 0,
      netWeight: 0,
      grossWeight: 0,
      dimensions: ""
    }],
    subtotal: 0,
    tax: 0,
    taxType: "GST",
    taxAmount: 0,
    discount: 0,
    total: 0,
    currency: "USD",
    incoterm: "FOB",
    paymentTerms: "Net 30 days",
    deliveryTime: "30-45 days from confirmation",
    bankDetails: "State Bank of India\nAccount: 1234567890\nSWIFT: SBININBB123",
    notes: "",
    portOfLoading: "",
    portOfDischarge: "",
    countryOfOrigin: "India",
    destinationCountry: "",
    packingType: "Standard Export Packing",
    totalNetWeight: 0,
    totalGrossWeight: 0,
    totalCBM: 0,
    warranties: "",
    vesselName: "",
    voyageNumber: "",
    containerNumbers: "",
    specialInstructions: ""
  });

  const templates = [
    {
      id: "proforma",
      name: "Proforma Invoice",
      description: "Preliminary invoice before shipment",
      icon: FileText,
      color: "blue",
      features: ["Price Quotation", "Terms Preview", "Validity Period", "Tax Calculation"]
    },
    {
      id: "commercial",
      name: "Commercial Invoice",
      description: "Official customs clearance invoice",
      icon: Calculator,
      color: "green", 
      features: ["Customs Declaration", "Official Valuation", "Export Documentation", "Banking Compliance"]
    },
    {
      id: "packing",
      name: "Packing List",
      description: "Detailed packaging information",
      icon: Building2,
      color: "purple",
      features: ["Package Details", "Weight Distribution", "Shipping Marks", "Container Loading"]
    },
    {
      id: "customs",
      name: "Customs Invoice",
      description: "Specialized customs valuation",
      icon: Globe,
      color: "orange",
      features: ["Duty Assessment", "Valuation Method", "Origin Declaration", "Customs Codes"]
    },
    {
      id: "delivery",
      name: "Delivery Order",
      description: "Cargo release authorization",
      icon: Truck,
      color: "red",
      features: ["Release Instructions", "Contact Details", "Delivery Terms", "Port Charges"]
    },
    {
      id: "freight",
      name: "Freight Invoice",
      description: "Shipping and logistics charges",
      icon: Ship,
      color: "cyan",
      features: ["Freight Calculation", "Service Breakdown", "Container Details", "Route Information"]
    },
    {
      id: "airway",
      name: "Air Waybill",
      description: "Air cargo transport document",
      icon: Plane,
      color: "indigo",
      features: ["Flight Details", "Cargo Specification", "Handling Instructions", "Insurance Coverage"]
    },
    {
      id: "certificate",
      name: "Certificate of Origin",
      description: "Origin certification document",
      icon: CheckCircle,
      color: "yellow",
      features: ["Origin Verification", "Authority Seal", "Trade Compliance", "Preferential Treatment"]
    }
  ];

  const recentBills = [
    {
      id: "PI/2025/00022",
      type: "Proforma Invoice",
      client: "ABC Textiles Ltd",
      amount: "$45,000",
      date: "2024-11-25",
      status: "Sent",
      validUntil: "2024-12-25"
    },
    {
      id: "CI/2025/00021",
      type: "Commercial Invoice", 
      client: "Global Electronics Inc",
      amount: "$28,500",
      date: "2024-11-24",
      status: "Paid",
      validUntil: ""
    },
    {
      id: "PL/2025/00020",
      type: "Packing List",
      client: "European Imports Ltd",
      amount: "",
      date: "2024-11-23",
      status: "Completed",
      validUntil: ""
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const prefix = templateId === 'proforma' ? 'PI' : templateId === 'commercial' ? 'CI' : templateId === 'packing' ? 'PL' : templateId.substring(0, 2).toUpperCase();
      setBillData({
        ...billData,
        billNumber: `${prefix}/2025/${String(Date.now()).slice(-5)}`
      });
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...billData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setBillData({ ...billData, items: newItems });
    calculateTotals(newItems);
  };

  const addItem = () => {
    setBillData({
      ...billData,
      items: [...billData.items, { 
        description: "", 
        hsCode: "", 
        quantity: 1, 
        unit: "PCS", 
        rate: 0, 
        amount: 0,
        netWeight: 0,
        grossWeight: 0,
        dimensions: ""
      }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = billData.items.filter((_, i) => i !== index);
    setBillData({ ...billData, items: newItems });
    calculateTotals(newItems);
  };

  const calculateTotals = (items: any[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const discountAmount = (subtotal * billData.discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * billData.tax) / 100;
    const total = taxableAmount + taxAmount;
    
    // Calculate total weights
    const totalNetWeight = items.reduce((sum, item) => sum + (item.netWeight || 0), 0);
    const totalGrossWeight = items.reduce((sum, item) => sum + (item.grossWeight || 0), 0);
    
    setBillData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      totalNetWeight,
      totalGrossWeight
    }));
  };

  const handlePreviewBill = () => {
    setShowPreview(true);
  };

  const handleSaveBill = () => {
    const savedBill = {
      ...billData,
      id: billData.billNumber,
      savedDate: new Date().toISOString(),
      template: selectedTemplate
    };
    
    const savedBills = JSON.parse(localStorage.getItem('savedBills') || '[]');
    savedBills.unshift(savedBill);
    localStorage.setItem('savedBills', JSON.stringify(savedBills.slice(0, 50))); // Keep only recent 50
    
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 3000);
  };

  const handleDownloadBill = () => {
    const htmlContent = generateBillHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${billData.billNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateBillHTML = () => {
    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${selectedTemplateData?.name} - ${billData.billNumber}</title>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            margin: 0; 
            padding: 40px; 
            line-height: 1.6; 
            color: #333;
            background: #fff;
        }
        .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 30px; 
        }
        .header h1 { 
            color: #2563eb; 
            font-size: 2.5em; 
            margin: 0 0 10px 0; 
            font-weight: bold;
        }
        .header h2 { 
            color: #64748b; 
            font-size: 1.5em; 
            margin: 0; 
            font-weight: normal;
        }
        .company-info { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 40px; 
            margin-bottom: 40px; 
        }
        .company-section {
            padding: 20px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            background: #f8fafc;
        }
        .company-section h3 {
            color: #2563eb;
            font-size: 1.2em;
            margin: 0 0 15px 0;
            font-weight: bold;
        }
        .bill-details { 
            background: #f1f5f9; 
            padding: 25px; 
            border-radius: 10px; 
            margin-bottom: 40px; 
            border-left: 5px solid #2563eb;
        }
        .bill-details h3 {
            color: #2563eb;
            margin: 0 0 15px 0;
            font-size: 1.3em;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #cbd5e1;
        }
        .detail-label {
            font-weight: bold;
            color: #475569;
        }
        .items-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 40px; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        .items-table th { 
            background: linear-gradient(135deg, #2563eb, #3b82f6); 
            color: white; 
            padding: 15px 10px; 
            text-align: left; 
            font-weight: bold;
            font-size: 0.9em;
        }
        .items-table td { 
            padding: 12px 10px; 
            border-bottom: 1px solid #e2e8f0; 
            vertical-align: top;
        }
        .items-table tr:nth-child(even) {
            background: #f8fafc;
        }
        .items-table tr:hover {
            background: #f1f5f9;
        }
        .totals { 
            float: right; 
            width: 400px; 
            background: #f8fafc; 
            padding: 25px; 
            border-radius: 10px;
            border: 2px solid #e2e8f0;
        }
        .totals h3 {
            color: #2563eb;
            margin: 0 0 20px 0;
            font-size: 1.3em;
        }
        .total-line {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #cbd5e1;
        }
        .total-line.final {
            border-top: 3px solid #2563eb;
            border-bottom: 3px solid #2563eb;
            font-size: 1.3em;
            font-weight: bold;
            color: #2563eb;
            margin-top: 15px;
            padding-top: 15px;
        }
        .terms { 
            margin-top: 60px; 
            clear: both; 
            background: #f8fafc;
            padding: 25px;
            border-radius: 10px;
        }
        .terms h3 {
            color: #2563eb;
            margin: 0 0 15px 0;
        }
        .signature { 
            margin-top: 60px; 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 40px; 
        }
        .signature-box {
            text-align: center;
            padding: 30px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            background: #f8fafc;
        }
        .signature-line {
            border-top: 2px solid #2563eb;
            margin-top: 60px;
            padding-top: 10px;
            font-weight: bold;
        }
        .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 6em;
            color: rgba(37, 99, 235, 0.1);
            z-index: -1;
            font-weight: bold;
        }
        @media print {
            body { margin: 0; padding: 20px; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="watermark">${selectedTemplate.toUpperCase()}</div>
    
    <div class="header">
        <h1>${selectedTemplateData?.name.toUpperCase()}</h1>
        <h2>${billData.billNumber}</h2>
    </div>
    
    <div class="company-info">
        <div class="company-section">
            <h3>From (Exporter/Seller):</h3>
            <p><strong>${billData.sellerName}</strong></p>
            <p>${billData.sellerAddress.replace(/\n/g, '<br>')}</p>
            ${billData.sellerGST ? `<p><strong>GST:</strong> ${billData.sellerGST}</p>` : ''}
            ${billData.sellerPAN ? `<p><strong>PAN:</strong> ${billData.sellerPAN}</p>` : ''}
            ${billData.sellerIEC ? `<p><strong>IEC:</strong> ${billData.sellerIEC}</p>` : ''}
        </div>
        <div class="company-section">
            <h3>To (Importer/Buyer):</h3>
            <p><strong>${billData.clientName}</strong></p>
            <p>${billData.clientAddress.replace(/\n/g, '<br>')}</p>
            ${billData.clientCountry ? `<p><strong>Country:</strong> ${billData.clientCountry}</p>` : ''}
            ${billData.clientEmail ? `<p><strong>Email:</strong> ${billData.clientEmail}</p>` : ''}
            ${billData.clientPhone ? `<p><strong>Phone:</strong> ${billData.clientPhone}</p>` : ''}
        </div>
    </div>
    
    <div class="bill-details">
        <h3>Document Details</h3>
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Date:</span>
                <span>${new Date(billData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            ${billData.validUntil ? `
                <div class="detail-item">
                    <span class="detail-label">Valid Until:</span>
                    <span>${new Date(billData.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            ` : ''}
            <div class="detail-item">
                <span class="detail-label">Currency:</span>
                <span>${billData.currency}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Incoterm:</span>
                <span>${billData.incoterm}</span>
            </div>
            ${billData.portOfLoading ? `
                <div class="detail-item">
                    <span class="detail-label">Port of Loading:</span>
                    <span>${billData.portOfLoading}</span>
                </div>
            ` : ''}
            ${billData.portOfDischarge ? `
                <div class="detail-item">
                    <span class="detail-label">Port of Discharge:</span>
                    <span>${billData.portOfDischarge}</span>
                </div>
            ` : ''}
            ${billData.countryOfOrigin ? `
                <div class="detail-item">
                    <span class="detail-label">Country of Origin:</span>
                    <span>${billData.countryOfOrigin}</span>
                </div>
            ` : ''}
            ${billData.deliveryTime ? `
                <div class="detail-item">
                    <span class="detail-label">Delivery Time:</span>
                    <span>${billData.deliveryTime}</span>
                </div>
            ` : ''}
        </div>
    </div>
    
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 5%;">S.No.</th>
                <th style="width: 35%;">Description of Goods</th>
                <th style="width: 12%;">HS Code</th>
                <th style="width: 8%;">Qty</th>
                <th style="width: 8%;">Unit</th>
                <th style="width: 12%;">Rate (${billData.currency})</th>
                <th style="width: 12%;">Amount (${billData.currency})</th>
                ${selectedTemplate === 'packing' ? '<th style="width: 8%;">Weight (KG)</th>' : ''}
            </tr>
        </thead>
        <tbody>
            ${billData.items.map((item, index) => `
                <tr>
                    <td style="text-align: center; font-weight: bold;">${index + 1}</td>
                    <td>
                        <strong>${item.description}</strong>
                        ${item.dimensions ? `<br><small style="color: #64748b;">Dimensions: ${item.dimensions}</small>` : ''}
                    </td>
                    <td style="font-family: monospace;">${item.hsCode}</td>
                    <td style="text-align: right; font-weight: bold;">${item.quantity}</td>
                    <td style="text-align: center;">${item.unit}</td>
                    <td style="text-align: right;">${item.rate.toFixed(2)}</td>
                    <td style="text-align: right; font-weight: bold;">${item.amount.toFixed(2)}</td>
                    ${selectedTemplate === 'packing' ? `<td style="text-align: right;">${(item.netWeight || 0).toFixed(2)}</td>` : ''}
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="totals">
        <h3>Amount Summary</h3>
        <div class="total-line">
            <span>Subtotal:</span>
            <span><strong>${billData.currency} ${billData.subtotal.toFixed(2)}</strong></span>
        </div>
        ${billData.discount > 0 ? `
            <div class="total-line" style="color: #dc2626;">
                <span>Discount (${billData.discount}%):</span>
                <span><strong>-${billData.currency} ${((billData.subtotal * billData.discount) / 100).toFixed(2)}</strong></span>
            </div>
        ` : ''}
        ${billData.tax > 0 ? `
            <div class="total-line">
                <span>${billData.taxType || 'Tax'} (${billData.tax}%):</span>
                <span><strong>${billData.currency} ${billData.taxAmount.toFixed(2)}</strong></span>
            </div>
        ` : ''}
        <div class="total-line final">
            <span>TOTAL AMOUNT:</span>
            <span>${billData.currency} ${billData.total.toFixed(2)}</span>
        </div>
        ${billData.totalNetWeight > 0 ? `
            <div class="total-line" style="margin-top: 15px; border-top: 1px solid #cbd5e1; padding-top: 10px;">
                <span>Total Net Weight:</span>
                <span><strong>${billData.totalNetWeight.toFixed(2)} KG</strong></span>
            </div>
        ` : ''}
        ${billData.totalGrossWeight > 0 ? `
            <div class="total-line">
                <span>Total Gross Weight:</span>
                <span><strong>${billData.totalGrossWeight.toFixed(2)} KG</strong></span>
            </div>
        ` : ''}
    </div>
    
    <div class="terms">
        <h3>Terms & Conditions:</h3>
        <p><strong>Payment Terms:</strong> ${billData.paymentTerms}</p>
        ${billData.deliveryTime ? `<p><strong>Delivery:</strong> ${billData.deliveryTime}</p>` : ''}
        ${billData.packingType ? `<p><strong>Packing:</strong> ${billData.packingType}</p>` : ''}
        ${billData.warranties ? `<p><strong>Warranty:</strong> ${billData.warranties}</p>` : ''}
        ${billData.bankDetails ? `
            <h3>Banking Details:</h3>
            <p style="font-family: monospace; background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
                ${billData.bankDetails.replace(/\n/g, '<br>')}
            </p>
        ` : ''}
        ${billData.notes ? `
            <h3>Additional Notes:</h3>
            <p>${billData.notes}</p>
        ` : ''}
        ${selectedTemplate === 'proforma' ? `
            <p style="font-style: italic; color: #64748b; margin-top: 20px;">
                <strong>Note:</strong> This is a Proforma Invoice and not a tax invoice. 
                Final commercial invoice will be issued upon confirmation of order.
            </p>
        ` : ''}
    </div>
    
    <div class="signature">
        <div class="signature-box">
            <p><strong>For ${billData.sellerName}</strong></p>
            <div class="signature-line">Authorized Signatory</div>
        </div>
        <div class="signature-box">
            <p><strong>Company Seal & Stamp</strong></p>
            <div style="height: 60px; border: 2px dashed #cbd5e1; margin: 20px 0; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                [SEAL]
            </div>
        </div>
    </div>
    
    <div style="margin-top: 40px; text-align: center; color: #64748b; font-size: 0.9em; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <p>Generated on ${new Date().toLocaleString()} | ${selectedTemplateData?.name} | ${billData.billNumber}</p>
        <p style="font-style: italic;">This document is electronically generated and does not require physical signature for validity.</p>
    </div>
</body>
</html>`;
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  // Preview Modal
  if (showPreview) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl">
          <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Preview: {selectedTemplateData?.name}</h2>
              <p className="text-blue-100">{billData.billNumber}</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleDownloadBill}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(false)}
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Close Preview
              </Button>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[calc(95vh-100px)] p-4 bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: generateBillHTML() }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EXIM Bill Generator
            </h1>
            <p className="text-lg text-gray-600">Create professional invoices and documents for international trade</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300"
            >
              <Copy className="w-4 h-4 mr-2" />
              My Templates
            </Button>
            <Button 
              onClick={() => {
                const prefix = selectedTemplate === 'proforma' ? 'PI' : selectedTemplate === 'commercial' ? 'CI' : selectedTemplate.substring(0, 2).toUpperCase();
                setBillData({...billData, billNumber: `${prefix}/2025/${String(Date.now()).slice(-5)}`});
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Template Selection */}
          <Card className="xl:col-span-1 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Document Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? `border-${template.color}-500 bg-${template.color}-50 shadow-lg`
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-${template.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${template.color}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm mb-1">{template.name}</h4>
                          <p className="text-xs text-gray-600 mb-2 leading-tight">{template.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {template.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bill Form */}
          <Card className="xl:col-span-3 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3">
                {selectedTemplateData && <selectedTemplateData.icon className="w-6 h-6" />}
                {selectedTemplateData?.name || "Select Template"}
              </CardTitle>
              <p className="text-blue-100">{selectedTemplateData?.description}</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Bill Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Document Number</label>
                  <Input
                    value={billData.billNumber}
                    onChange={(e) => setBillData({...billData, billNumber: e.target.value})}
                    className="font-mono h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <Input
                    type="date"
                    value={billData.date}
                    onChange={(e) => setBillData({...billData, date: e.target.value})}
                    className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                {selectedTemplate === 'proforma' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Valid Until</label>
                    <Input
                      type="date"
                      value={billData.validUntil}
                      onChange={(e) => setBillData({...billData, validUntil: e.target.value})}
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Seller Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-3 pb-2 border-b-2 border-blue-200">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Seller/Exporter Information
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <Input
                      value={billData.sellerName}
                      onChange={(e) => setBillData({...billData, sellerName: e.target.value})}
                      placeholder="Your company name"
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Address</label>
                    <Textarea
                      value={billData.sellerAddress}
                      onChange={(e) => setBillData({...billData, sellerAddress: e.target.value})}
                      placeholder="Complete company address"
                      rows={3}
                      className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">GST Number</label>
                      <Input
                        value={billData.sellerGST}
                        onChange={(e) => setBillData({...billData, sellerGST: e.target.value})}
                        placeholder="GST registration number"
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">IEC Code</label>
                      <Input
                        value={billData.sellerIEC}
                        onChange={(e) => setBillData({...billData, sellerIEC: e.target.value})}
                        placeholder="Import Export Code"
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Client Information */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-3 pb-2 border-b-2 border-green-200">
                    <Building2 className="w-5 h-5 text-green-600" />
                    Client/Buyer Information
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Client Name</label>
                    <Input
                      value={billData.clientName}
                      onChange={(e) => setBillData({...billData, clientName: e.target.value})}
                      placeholder="Client company name"
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Client Address</label>
                    <Textarea
                      value={billData.clientAddress}
                      onChange={(e) => setBillData({...billData, clientAddress: e.target.value})}
                      placeholder="Complete client address"
                      rows={3}
                      className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={billData.clientEmail}
                        onChange={(e) => setBillData({...billData, clientEmail: e.target.value})}
                        placeholder="client@company.com"
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                      <Input
                        value={billData.clientCountry}
                        onChange={(e) => setBillData({...billData, clientCountry: e.target.value})}
                        placeholder="Client country"
                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-3 pb-2 border-b-2 border-purple-200">
                  <Globe className="w-5 h-5 text-purple-600" />
                  International Trade Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
                    <select
                      value={billData.currency}
                      onChange={(e) => setBillData({...billData, currency: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Incoterm</label>
                    <select
                      value={billData.incoterm}
                      onChange={(e) => setBillData({...billData, incoterm: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500"
                    >
                      <option value="FOB">FOB - Free On Board</option>
                      <option value="CIF">CIF - Cost, Insurance & Freight</option>
                      <option value="CFR">CFR - Cost & Freight</option>
                      <option value="EXW">EXW - Ex Works</option>
                      <option value="DDP">DDP - Delivered Duty Paid</option>
                      <option value="FCA">FCA - Free Carrier</option>
                      <option value="CPT">CPT - Carriage Paid To</option>
                      <option value="CIP">CIP - Carriage Insurance Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Port of Loading</label>
                    <Input
                      value={billData.portOfLoading}
                      onChange={(e) => setBillData({...billData, portOfLoading: e.target.value})}
                      placeholder="e.g., Mumbai Port, India"
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Port of Discharge</label>
                    <Input
                      value={billData.portOfDischarge}
                      onChange={(e) => setBillData({...billData, portOfDischarge: e.target.value})}
                      placeholder="e.g., Hamburg Port, Germany"
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-3 pb-2 border-b-2 border-amber-200">
                    <Calculator className="w-5 h-5 text-amber-600" />
                    Items & Services
                  </h3>
                  <Button 
                    size="sm" 
                    onClick={addItem}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {billData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-end p-6 border-2 border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-colors">
                      <div className="col-span-12 lg:col-span-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Description</label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          placeholder="Detailed product description"
                          rows={2}
                          className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div className="col-span-6 lg:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">HS Code</label>
                        <Input
                          value={item.hsCode}
                          onChange={(e) => handleItemChange(index, 'hsCode', e.target.value)}
                          placeholder="HS Classification"
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl font-mono"
                        />
                      </div>
                      <div className="col-span-3 lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Qty</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div className="col-span-3 lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                        <select
                          value={item.unit}
                          onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500"
                        >
                          <option value="PCS">PCS</option>
                          <option value="KG">KG</option>
                          <option value="MT">MT</option>
                          <option value="LTR">LTR</option>
                          <option value="M">M</option>
                          <option value="SET">SET</option>
                          <option value="PAIR">PAIR</option>
                          <option value="DOZEN">DOZEN</option>
                        </select>
                      </div>
                      <div className="col-span-6 lg:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Unit Rate ({billData.currency})</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div className="col-span-5 lg:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Amount</label>
                        <Input
                          value={`${billData.currency} ${item.amount.toFixed(2)}`}
                          readOnly
                          className="h-12 text-lg bg-blue-50 border-2 border-blue-200 rounded-xl font-bold text-blue-800"
                        />
                      </div>
                      <div className="col-span-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => removeItem(index)}
                          className="h-12 w-12 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Amount Calculation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tax Rate (%)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={billData.tax}
                      onChange={(e) => {
                        const newTax = Number(e.target.value);
                        setBillData({...billData, tax: newTax});
                        calculateTotals(billData.items);
                      }}
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tax Type</label>
                    <select
                      value={billData.taxType}
                      onChange={(e) => setBillData({...billData, taxType: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500"
                    >
                      <option value="GST">GST</option>
                      <option value="VAT">VAT</option>
                      <option value="Sales Tax">Sales Tax</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Discount (%)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={billData.discount}
                      onChange={(e) => {
                        const newDiscount = Number(e.target.value);
                        setBillData({...billData, discount: newDiscount});
                        calculateTotals(billData.items);
                      }}
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-medium text-gray-700">Subtotal:</span>
                      <span className="font-bold text-gray-900">{billData.currency} {billData.subtotal.toFixed(2)}</span>
                    </div>
                    {billData.discount > 0 && (
                      <div className="flex justify-between text-lg text-red-600">
                        <span className="font-medium">Discount ({billData.discount}%):</span>
                        <span className="font-bold">-{billData.currency} {((billData.subtotal * billData.discount) / 100).toFixed(2)}</span>
                      </div>
                    )}
                    {billData.tax > 0 && (
                      <div className="flex justify-between text-lg">
                        <span className="font-medium text-gray-700">{billData.taxType} ({billData.tax}%):</span>
                        <span className="font-bold text-gray-900">{billData.currency} {billData.taxAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-2xl font-bold border-t-2 border-blue-200 pt-3 text-blue-800">
                      <span>TOTAL AMOUNT:</span>
                      <span>{billData.currency} {billData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Additional Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-3 pb-2 border-b-2 border-green-200">
                    <FileText className="w-5 h-5 text-green-600" />
                    Terms & Conditions
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Payment Terms</label>
                    <Textarea
                      value={billData.paymentTerms}
                      onChange={(e) => setBillData({...billData, paymentTerms: e.target.value})}
                      placeholder="e.g., Net 30 days, LC at sight, 50% advance"
                      rows={3}
                      className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Time</label>
                    <Input
                      value={billData.deliveryTime}
                      onChange={(e) => setBillData({...billData, deliveryTime: e.target.value})}
                      placeholder="e.g., 30-45 days from confirmation"
                      className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  {selectedTemplate === 'proforma' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Warranties/Guarantees</label>
                      <Textarea
                        value={billData.warranties}
                        onChange={(e) => setBillData({...billData, warranties: e.target.value})}
                        placeholder="Product warranties and guarantees"
                        rows={2}
                        className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-3 pb-2 border-b-2 border-blue-200">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Banking & Notes
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bank Details</label>
                    <Textarea
                      value={billData.bankDetails}
                      onChange={(e) => setBillData({...billData, bankDetails: e.target.value})}
                      placeholder="Bank name, account number, SWIFT code"
                      rows={3}
                      className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                    <Textarea
                      value={billData.notes}
                      onChange={(e) => setBillData({...billData, notes: e.target.value})}
                      placeholder="Special instructions, terms and conditions"
                      rows={3}
                      className="text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={handlePreviewBill}
                  className="bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-700 px-8 py-3 text-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview Document
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSaveBill}
                  className="bg-white hover:bg-green-50 border-2 border-green-200 text-green-700 px-8 py-3 text-lg"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Draft
                </Button>
                <Button 
                  onClick={handleDownloadBill}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </div>

              {/* Save Confirmation */}
              {showSaveConfirm && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
                  <CheckCircle className="w-5 h-5" />
                  <span>Document saved successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Bills */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                Recent Documents
              </div>
              <Button variant="outline" size="sm" className="border-2 border-gray-200 hover:border-blue-300">
                <FileText className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recentBills.map((bill) => (
                <Card key={bill.id} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{bill.id}</h4>
                        <p className="text-sm text-gray-600">{bill.type}</p>
                        <p className="text-sm text-gray-500">{bill.client}</p>
                      </div>
                      <Badge 
                        variant={bill.status === 'Paid' ? 'default' : bill.status === 'Sent' ? 'secondary' : 'outline'}
                        className="px-3 py-1"
                      >
                        {bill.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {bill.amount && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Amount:</span>
                          <span className="font-bold text-lg text-green-600">{bill.amount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="font-medium">{bill.date}</span>
                      </div>
                      {bill.validUntil && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Valid Until:</span>
                          <span className="font-medium">{bill.validUntil}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
