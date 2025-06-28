
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
  Hash,
  Globe,
  Truck
} from "lucide-react";

export function BillGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("proforma");
  const [billData, setBillData] = useState({
    billNumber: "BILL/2025/00023",
    date: new Date().toISOString().split('T')[0],
    clientName: "",
    clientAddress: "",
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    terms: "",
    notes: ""
  });

  const billTemplates = [
    {
      id: "proforma",
      name: "Proforma Invoice",
      description: "Preliminary bill for goods before shipment",
      icon: FileText,
      color: "blue",
      fields: ["client", "items", "shipping", "terms"]
    },
    {
      id: "commercial",
      name: "Commercial Invoice",
      description: "Official invoice for customs clearance",
      icon: Calculator,
      color: "green",
      fields: ["client", "items", "customs", "payment"]
    },
    {
      id: "packing",
      name: "Packing List",
      description: "Detailed list of packaged goods",
      icon: Building2,
      color: "purple",
      fields: ["client", "packaging", "dimensions", "weight"]
    },
    {
      id: "customs",
      name: "Customs Duty Bill",
      description: "Bill for customs duties and taxes",
      icon: Globe,
      color: "orange",
      fields: ["client", "duties", "taxes", "clearance"]
    },
    {
      id: "delivery",
      name: "Delivery Order",
      description: "Order for cargo delivery to consignee",
      icon: Truck,
      color: "red",
      fields: ["client", "cargo", "delivery", "instructions"]
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
    },
    {
      id: "BILL/2025/00020",
      type: "Customs Duty Bill",
      client: "Steel Components Inc",
      amount: "$3,200",
      date: "2024-11-23",
      status: "Paid"
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setBillData({
      ...billData,
      billNumber: `BILL/2025/${String(Date.now()).slice(-5)}`
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
      items: [...billData.items, { description: "", quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = billData.items.filter((_, i) => i !== index);
    setBillData({ ...billData, items: newItems });
    calculateTotals(newItems);
  };

  const calculateTotals = (items: any[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    
    setBillData(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }));
  };

  const handleSaveBill = () => {
    alert(`Bill ${billData.billNumber} saved successfully!`);
  };

  const handlePreviewBill = () => {
    alert(`Opening preview for ${billData.billNumber}`);
  };

  const handleDownloadBill = () => {
    alert(`Downloading ${billData.billNumber} as PDF`);
  };

  const selectedTemplateData = billTemplates.find(t => t.id === selectedTemplate);

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
          <Button>
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

            {/* Client Information */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Client Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <Input
                    value={billData.clientName}
                    onChange={(e) => setBillData({...billData, clientName: e.target.value})}
                    placeholder="Enter client company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Client Address</label>
                  <Textarea
                    value={billData.clientAddress}
                    onChange={(e) => setBillData({...billData, clientAddress: e.target.value})}
                    placeholder="Enter complete client address"
                    rows={3}
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
                  <div key={index} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Input
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Qty</label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Rate</label>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${billData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%):</span>
                  <span className="font-medium">${billData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${billData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Terms and Notes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payment Terms</label>
                <Textarea
                  value={billData.terms}
                  onChange={(e) => setBillData({...billData, terms: e.target.value})}
                  placeholder="Net 30 days, advance payment required..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <Textarea
                  value={billData.notes}
                  onChange={(e) => setBillData({...billData, notes: e.target.value})}
                  placeholder="Additional notes or instructions..."
                  rows={3}
                />
              </div>
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
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
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
