
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
  Plane
} from "lucide-react";

export function BillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("proforma");
  const [showPreview, setShowPreview] = useState(false);
  const [billData, setBillData] = useState({
    billNumber: "BILL/2025/00023",
    date: new Date().toISOString().split('T')[0],
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientPhone: "",
    sellerName: "Your Company Name",
    sellerAddress: "Your Company Address",
    sellerGST: "GST123456789",
    sellerPAN: "PAN123456",
    items: [{ description: "", hsCode: "", quantity: 1, unit: "PCS", rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 18,
    taxAmount: 0,
    discount: 0,
    total: 0,
    currency: "USD",
    incoterm: "FOB",
    paymentTerms: "Net 30 days",
    bankDetails: "",
    notes: "",
    portOfLoading: "",
    portOfDischarge: "",
    countryOfOrigin: "",
    destinationCountry: ""
  });

  const billTemplates = [
    {
      id: "proforma",
      name: "Proforma Invoice",
      description: "Preliminary invoice before shipment",
      icon: FileText,
      color: "blue",
      fields: ["client", "items", "shipping", "terms", "banking"]
    },
    {
      id: "commercial",
      name: "Commercial Invoice",
      description: "Official invoice for customs clearance",
      icon: Calculator,
      color: "green",
      fields: ["client", "items", "customs", "payment", "certificates"]
    },
    {
      id: "packing",
      name: "Packing List",
      description: "Detailed list of packaged goods",
      icon: Building2,
      color: "purple",
      fields: ["client", "packaging", "dimensions", "weight", "marks"]
    },
    {
      id: "customs",
      name: "Customs Invoice",
      description: "Invoice for customs valuation",
      icon: Globe,
      color: "orange",
      fields: ["client", "duties", "taxes", "clearance", "origin"]
    },
    {
      id: "delivery",
      name: "Delivery Order",
      description: "Authorization for cargo release",
      icon: Truck,
      color: "red",
      fields: ["client", "cargo", "delivery", "instructions", "contact"]
    },
    {
      id: "freight",
      name: "Freight Invoice",
      description: "Shipping and logistics charges",
      icon: Ship,
      color: "cyan",
      fields: ["client", "freight", "charges", "route", "vessel"]
    },
    {
      id: "airway",
      name: "Air Waybill",
      description: "Air cargo transport document",
      icon: Plane,
      color: "indigo",
      fields: ["client", "flight", "cargo", "handling", "insurance"]
    },
    {
      id: "certificate",
      name: "Certificate of Origin",
      description: "Document certifying goods origin",
      icon: FileText,
      color: "yellow",
      fields: ["client", "goods", "origin", "chamber", "attestation"]
    }
  ];

  const recentBills = [
    {
      id: "BILL/2025/00022",
      type: "Commercial Invoice",
      client: "ABC Textiles Ltd",
      amount: "$45,000",
      date: "2024-11-25",
      status: "Paid"
    },
    {
      id: "BILL/2025/00021",
      type: "Proforma Invoice", 
      client: "Global Electronics Inc",
      amount: "$28,500",
      date: "2024-11-24",
      status: "Pending"
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setBillData({
      ...billData,
      billNumber: `${templateId.toUpperCase()}/2025/${String(Date.now()).slice(-5)}`
    });
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
      items: [...billData.items, { description: "", hsCode: "", quantity: 1, unit: "PCS", rate: 0, amount: 0 }]
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
    
    setBillData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
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
    
    // Save to localStorage for demo
    const savedBills = JSON.parse(localStorage.getItem('savedBills') || '[]');
    savedBills.push(savedBill);
    localStorage.setItem('savedBills', JSON.stringify(savedBills));
    
    alert(`Bill ${billData.billNumber} saved successfully!`);
  };

  const handleDownloadBill = () => {
    // Create a simple HTML content for PDF generation
    const htmlContent = generateBillHTML();
    
    // For demo, we'll create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${billData.billNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`${billData.billNumber} downloaded successfully!`);
  };

  const generateBillHTML = () => {
    const selectedTemplateData = billTemplates.find(t => t.id === selectedTemplate);
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${selectedTemplateData?.name} - ${billData.billNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .company-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .bill-details { margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .items-table th { background-color: #f2f2f2; }
        .totals { float: right; width: 300px; }
        .terms { margin-top: 30px; clear: both; }
        .signature { margin-top: 50px; display: flex; justify-content: space-between; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${selectedTemplateData?.name.toUpperCase()}</h1>
        <h2>${billData.billNumber}</h2>
    </div>
    
    <div class="company-info">
        <div>
            <h3>From:</h3>
            <p><strong>${billData.sellerName}</strong></p>
            <p>${billData.sellerAddress}</p>
            <p>GST: ${billData.sellerGST}</p>
            <p>PAN: ${billData.sellerPAN}</p>
        </div>
        <div>
            <h3>To:</h3>
            <p><strong>${billData.clientName}</strong></p>
            <p>${billData.clientAddress}</p>
            ${billData.clientEmail ? `<p>Email: ${billData.clientEmail}</p>` : ''}
            ${billData.clientPhone ? `<p>Phone: ${billData.clientPhone}</p>` : ''}
        </div>
    </div>
    
    <div class="bill-details">
        <p><strong>Date:</strong> ${billData.date}</p>
        <p><strong>Currency:</strong> ${billData.currency}</p>
        <p><strong>Incoterm:</strong> ${billData.incoterm}</p>
        ${billData.portOfLoading ? `<p><strong>Port of Loading:</strong> ${billData.portOfLoading}</p>` : ''}
        ${billData.portOfDischarge ? `<p><strong>Port of Discharge:</strong> ${billData.portOfDischarge}</p>` : ''}
        ${billData.countryOfOrigin ? `<p><strong>Country of Origin:</strong> ${billData.countryOfOrigin}</p>` : ''}
    </div>
    
    <table class="items-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>HS Code</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Rate (${billData.currency})</th>
                <th>Amount (${billData.currency})</th>
            </tr>
        </thead>
        <tbody>
            ${billData.items.map(item => `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.hsCode}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>${item.rate.toFixed(2)}</td>
                    <td>${item.amount.toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="totals">
        <p><strong>Subtotal: ${billData.currency} ${billData.subtotal.toFixed(2)}</strong></p>
        ${billData.discount > 0 ? `<p>Discount (${billData.discount}%): ${billData.currency} ${((billData.subtotal * billData.discount) / 100).toFixed(2)}</p>` : ''}
        <p>Tax (${billData.tax}%): ${billData.currency} ${billData.taxAmount.toFixed(2)}</p>
        <p style="font-size: 18px;"><strong>Total: ${billData.currency} ${billData.total.toFixed(2)}</strong></p>
    </div>
    
    <div class="terms">
        <h3>Payment Terms:</h3>
        <p>${billData.paymentTerms}</p>
        ${billData.bankDetails ? `
            <h3>Bank Details:</h3>
            <p>${billData.bankDetails}</p>
        ` : ''}
        ${billData.notes ? `
            <h3>Notes:</h3>
            <p>${billData.notes}</p>
        ` : ''}
    </div>
    
    <div class="signature">
        <div>
            <p>Authorized Signature</p>
            <br><br>
            <p>_____________________</p>
        </div>
        <div style="text-align: center;">
            <p>Company Seal</p>
        </div>
    </div>
</body>
</html>`;
  };

  const selectedTemplateData = billTemplates.find(t => t.id === selectedTemplate);

  // Preview Modal
  if (showPreview) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Preview: {selectedTemplateData?.name}</h2>
            <div className="flex gap-2">
              <Button onClick={handleDownloadBill}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div dangerouslySetInnerHTML={{ __html: generateBillHTML() }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">EXIM Bill Generator</h1>
          <p className="text-gray-600">Create professional invoices and bills for export-import business</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button onClick={() => setBillData({...billData, billNumber: `BILL/2025/${String(Date.now()).slice(-5)}`})}>
            <Plus className="w-4 h-4 mr-2" />
            New Bill
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 text-${template.color}-600`} />
                      <div>
                        <h4 className="font-semibold">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Bill Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedTemplateData && <selectedTemplateData.icon className="w-5 h-5" />}
              {selectedTemplateData?.name || "Select Template"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bill Header */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bill Number</label>
                <Input
                  value={billData.billNumber}
                  onChange={(e) => setBillData({...billData, billNumber: e.target.value})}
                  className="font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  type="date"
                  value={billData.date}
                  onChange={(e) => setBillData({...billData, date: e.target.value})}
                />
              </div>
            </div>

            {/* Seller Information */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Seller Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <Input
                    value={billData.sellerName}
                    onChange={(e) => setBillData({...billData, sellerName: e.target.value})}
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GST Number</label>
                  <Input
                    value={billData.sellerGST}
                    onChange={(e) => setBillData({...billData, sellerGST: e.target.value})}
                    placeholder="GST registration number"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Company Address</label>
                <Textarea
                  value={billData.sellerAddress}
                  onChange={(e) => setBillData({...billData, sellerAddress: e.target.value})}
                  placeholder="Complete company address"
                  rows={3}
                />
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Client Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <Input
                    value={billData.clientName}
                    onChange={(e) => setBillData({...billData, clientName: e.target.value})}
                    placeholder="Client company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={billData.clientEmail}
                    onChange={(e) => setBillData({...billData, clientEmail: e.target.value})}
                    placeholder="client@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Client Address</label>
                <Textarea
                  value={billData.clientAddress}
                  onChange={(e) => setBillData({...billData, clientAddress: e.target.value})}
                  placeholder="Complete client address"
                  rows={3}
                />
              </div>
            </div>

            {/* Trade Details */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Trade Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <select
                    value={billData.currency}
                    onChange={(e) => setBillData({...billData, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Incoterm</label>
                  <select
                    value={billData.incoterm}
                    onChange={(e) => setBillData({...billData, incoterm: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="FOB">FOB - Free On Board</option>
                    <option value="CIF">CIF - Cost, Insurance & Freight</option>
                    <option value="CFR">CFR - Cost & Freight</option>
                    <option value="EXW">EXW - Ex Works</option>
                    <option value="DDP">DDP - Delivered Duty Paid</option>
                    <option value="FCA">FCA - Free Carrier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Port of Loading</label>
                  <Input
                    value={billData.portOfLoading}
                    onChange={(e) => setBillData({...billData, portOfLoading: e.target.value})}
                    placeholder="e.g., Mumbai Port, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Port of Discharge</label>
                  <Input
                    value={billData.portOfDischarge}
                    onChange={(e) => setBillData({...billData, portOfDischarge: e.target.value})}
                    placeholder="e.g., Hamburg Port, Germany"
                  />
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Items
                </h3>
                <Button size="sm" onClick={addItem}>
                  <Plus className="w-3 h-3 mr-1" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-4">
                {billData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg">
                    <div className="col-span-4">
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Input
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Product description"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">HS Code</label>
                      <Input
                        value={item.hsCode}
                        onChange={(e) => handleItemChange(index, 'hsCode', e.target.value)}
                        placeholder="HS Code"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">Qty</label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">Unit</label>
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="PCS">PCS</option>
                        <option value="KG">KG</option>
                        <option value="MT">MT</option>
                        <option value="LTR">LTR</option>
                        <option value="M">M</option>
                        <option value="SET">SET</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Rate</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium mb-1">Amount</label>
                      <Input
                        value={item.amount.toFixed(2)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button size="sm" variant="outline" onClick={() => removeItem(index)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={billData.tax}
                    onChange={(e) => {
                      const newTax = Number(e.target.value);
                      setBillData({...billData, tax: newTax});
                      calculateTotals(billData.items);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discount (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={billData.discount}
                    onChange={(e) => {
                      const newDiscount = Number(e.target.value);
                      setBillData({...billData, discount: newDiscount});
                      calculateTotals(billData.items);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">{billData.currency} {billData.subtotal.toFixed(2)}</span>
                </div>
                {billData.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount ({billData.discount}%):</span>
                    <span className="font-medium">-{billData.currency} {((billData.subtotal * billData.discount) / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax ({billData.tax}%):</span>
                  <span className="font-medium">{billData.currency} {billData.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{billData.currency} {billData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Terms and Notes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payment Terms</label>
                <Textarea
                  value={billData.paymentTerms}
                  onChange={(e) => setBillData({...billData, paymentTerms: e.target.value})}
                  placeholder="e.g., Net 30 days, LC at sight, 50% advance"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bank Details</label>
                <Textarea
                  value={billData.bankDetails}
                  onChange={(e) => setBillData({...billData, bankDetails: e.target.value})}
                  placeholder="Bank name, account number, SWIFT code"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
                value={billData.notes}
                onChange={(e) => setBillData({...billData, notes: e.target.value})}
                placeholder="Special instructions, terms and conditions"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handlePreviewBill}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSaveBill}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleDownloadBill}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Bills
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div>
                  <h4 className="font-semibold">{bill.id}</h4>
                  <p className="text-sm text-gray-600">{bill.type} • {bill.client}</p>
                  <p className="text-xs text-gray-500">{bill.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{bill.amount}</p>
                  <Badge variant={bill.status === 'Paid' ? 'default' : 'secondary'}>
                    {bill.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => alert(`Viewing ${bill.id}`)}>
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => alert(`Downloading ${bill.id}`)}>
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => alert(`Editing ${bill.id}`)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
