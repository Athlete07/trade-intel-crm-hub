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
  "ocean-bill-of-lading": {
    name: "Ocean Bill of Lading",
    standards: ["Hague-Visby Rules", "Hamburg Rules"],
    colors: {
      primary: "from-blue-900 to-cyan-800",
      secondary: "bg-blue-50",
      accent: "text-blue-900",
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
  },
  "debit-note": {
    name: "Debit Note",
    standards: ["Commercial Law", "Accounting Standards", "GAAP"],
    colors: {
      primary: "from-red-600 to-pink-600",
      secondary: "bg-red-50",
      accent: "text-red-600",
      border: "border-red-200"
    }
  },
  "credit-note": {
    name: "Credit Note",
    standards: ["Commercial Law", "Accounting Standards", "GAAP"],
    colors: {
      primary: "from-green-600 to-emerald-700",
      secondary: "bg-green-50",
      accent: "text-green-600",
      border: "border-green-200"
    }
  },
  "packing-list": {
    name: "Packing List",
    standards: ["Customs Requirements", "Shipping Standards"],
    colors: {
      primary: "from-brown-600 to-amber-700",
      secondary: "bg-amber-50",
      accent: "text-amber-600",
      border: "border-amber-200"
    }
  },
  "certificate-of-origin": {
    name: "Certificate of Origin",
    standards: ["WTO Rules", "FTA Agreements"],
    colors: {
      primary: "from-gold-600 to-yellow-700",
      secondary: "bg-yellow-50",
      accent: "text-yellow-600",
      border: "border-yellow-200"
    }
  },
  "insurance-certificate": {
    name: "Insurance Certificate",
    standards: ["Marine Insurance", "ICC Clauses"],
    colors: {
      primary: "from-blue-700 to-indigo-700",
      secondary: "bg-blue-50",
      accent: "text-blue-700",
      border: "border-blue-200"
    }
  },
  "letter-of-credit": {
    name: "Letter of Credit",
    standards: ["UCP 600", "ISBP"],
    colors: {
      primary: "from-purple-700 to-indigo-800",
      secondary: "bg-purple-50",
      accent: "text-purple-700",
      border: "border-purple-200"
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
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "ISK", name: "Icelandic Krona", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
  { code: "LBP", name: "Lebanese Pound", symbol: "£" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "LAK", name: "Lao Kip", symbol: "₭" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "лв" },
  { code: "KGS", name: "Kyrgyzstani Som", symbol: "лв" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "ЅМ" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "MDL", name: "Moldovan Leu", symbol: "lei" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" }
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
              <title>${template.name} ${billData.invoiceNumber}</title>
              <style>
                body { 
                  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  color: #1f2937;
                  line-height: 1.6;
                  background: white;
                }
                .invoice-header {
                  background: linear-gradient(135deg, ${template.colors.primary.includes('blue') ? '#1e40af, #7c3aed' : '#059669, #0891b2'});
                  color: white;
                  padding: 40px;
                  margin-bottom: 40px;
                  border-radius: 12px;
                  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .company-info { 
                  display: flex; 
                  justify-content: space-between; 
                  align-items: flex-start; 
                  gap: 40px;
                }
                .company-details h1 {
                  margin: 0 0 20px 0;
                  font-size: 32px;
                  font-weight: 700;
                  letter-spacing: -0.025em;
                }
                .company-details .address {
                  font-size: 16px;
                  line-height: 1.6;
                  margin-bottom: 20px;
                  opacity: 0.95;
                }
                .company-details .contact-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 15px;
                  font-size: 14px;
                }
                .invoice-details {
                  text-align: right;
                  background: rgba(255,255,255,0.15);
                  padding: 30px;
                  border-radius: 10px;
                  backdrop-filter: blur(10px);
                  min-width: 300px;
                }
                .invoice-details h1 {
                  margin: 0 0 25px 0;
                  font-size: 48px;
                  font-weight: 800;
                  letter-spacing: -0.025em;
                }
                .invoice-meta {
                  display: grid;
                  gap: 12px;
                  font-size: 16px;
                }
                .invoice-meta .meta-row {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 8px 0;
                }
                .invoice-meta .meta-label {
                  font-weight: 600;
                  opacity: 0.9;
                }
                .invoice-meta .meta-value {
                  font-weight: 700;
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                }
                .bill-to { 
                  margin: 40px 0; 
                  padding: 30px; 
                  background: linear-gradient(135deg, #f8fafc, #f1f5f9); 
                  border-radius: 12px;
                  border-left: 6px solid ${template.colors.primary.includes('blue') ? '#3b82f6' : '#10b981'};
                }
                .bill-to h3 {
                  margin: 0 0 20px 0;
                  color: ${template.colors.primary.includes('blue') ? '#1e40af' : '#059669'};
                  font-size: 20px;
                  font-weight: 700;
                  display: flex;
                  align-items: center;
                  gap: 10px;
                }
                .bill-to .client-name {
                  font-size: 22px;
                  font-weight: 700;
                  color: #111827;
                  margin-bottom: 12px;
                }
                .bill-to .client-details {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
                  margin-top: 20px;
                }
                .line-items { 
                  margin: 40px 0; 
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                }
                .line-items table { 
                  width: 100%; 
                  border-collapse: collapse; 
                  background: white;
                }
                .line-items th { 
                  padding: 20px; 
                  text-align: left; 
                  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                  font-weight: 700;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  color: #374151;
                  border-bottom: 2px solid #e5e7eb;
                }
                .line-items td { 
                  padding: 18px 20px; 
                  border-bottom: 1px solid #f3f4f6;
                  font-size: 15px;
                }
                .line-items tr:nth-child(even) {
                  background: #fafafa;
                }
                .line-items tr:hover {
                  background: #f0f9ff;
                }
                .line-items .item-description {
                  font-weight: 600;
                  color: #111827;
                }
                .line-items .item-quantity,
                .line-items .item-price {
                  text-align: center;
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                  font-weight: 600;
                }
                .line-items .item-total {
                  text-align: right;
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                  font-weight: 700;
                  color: #111827;
                }
                .totals { 
                  float: right; 
                  width: 450px; 
                  margin: 40px 0;
                  background: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                }
                .totals-content {
                  padding: 30px;
                }
                .totals table { 
                  width: 100%; 
                  border-collapse: collapse;
                }
                .totals td { 
                  padding: 12px 0; 
                  font-size: 16px;
                  border-bottom: 1px solid #f3f4f6;
                }
                .totals .total-label {
                  font-weight: 600;
                  color: #374151;
                }
                .totals .total-value {
                  text-align: right;
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                  font-weight: 700;
                  color: #111827;
                }
                .totals .discount-value {
                  color: #059669;
                }
                .grand-total { 
                  background: linear-gradient(135deg, ${template.colors.primary.includes('blue') ? '#1e40af, #7c3aed' : '#059669, #0891b2'});
                  color: white;
                  font-weight: 800;
                  padding: 25px;
                  border-radius: 10px;
                  margin-top: 20px;
                  text-align: center;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .grand-total .total-label {
                  font-size: 14px;
                  opacity: 0.9;
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  margin-bottom: 8px;
                }
                .grand-total .total-amount {
                  font-size: 32px;
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                  font-weight: 800;
                }
                .payment-section {
                  clear: both;
                  margin-top: 60px;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 40px;
                }
                .payment-section .section {
                  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                  padding: 30px;
                  border-radius: 12px;
                  border-left: 6px solid ${template.colors.primary.includes('blue') ? '#3b82f6' : '#10b981'};
                }
                .payment-section h4 {
                  margin: 0 0 20px 0;
                  color: ${template.colors.primary.includes('blue') ? '#1e40af' : '#059669'};
                  font-size: 18px;
                  font-weight: 700;
                  display: flex;
                  align-items: center;
                  gap: 10px;
                }
                .payment-section p,
                .payment-section pre {
                  margin: 0;
                  font-size: 15px;
                  line-height: 1.6;
                  color: #374151;
                }
                .payment-section pre {
                  font-family: 'JetBrains Mono', 'Courier New', monospace;
                  background: white;
                  padding: 20px;
                  border-radius: 8px;
                  margin-top: 15px;
                  border: 1px solid #e5e7eb;
                }
                .footer { 
                  margin-top: 60px; 
                  padding: 40px; 
                  background: linear-gradient(135deg, #f8fafc, #e2e8f0); 
                  border-radius: 12px;
                  text-align: center;
                  border-top: 4px solid ${template.colors.primary.includes('blue') ? '#3b82f6' : '#10b981'};
                }
                .footer .company-info {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 30px;
                  margin-bottom: 20px;
                  font-size: 14px;
                  color: #6b7280;
                  flex-wrap: wrap;
                }
                .footer .compliance-info {
                  font-size: 12px;
                  color: #9ca3af;
                  margin-bottom: 15px;
                  font-weight: 600;
                }
                .footer .legal-text {
                  font-size: 11px;
                  color: #9ca3af;
                  line-height: 1.5;
                  max-width: 800px;
                  margin: 0 auto;
                }
                @media print {
                  body { 
                    margin: 0; 
                    padding: 15px; 
                    font-size: 12px; 
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                  .invoice-header { 
                    background: linear-gradient(135deg, ${template.colors.primary.includes('blue') ? '#1e40af, #7c3aed' : '#059669, #0891b2'}) !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                  .grand-total { 
                    background: linear-gradient(135deg, ${template.colors.primary.includes('blue') ? '#1e40af, #7c3aed' : '#059669, #0891b2'}) !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                  .page-break { page-break-before: always; }
                }
              </style>
            </head>
            <body>
              <div class="invoice-header">
                <div class="company-info">
                  <div class="company-details">
                    <h1>${billData.companyName}</h1>
                    <div class="address">${billData.companyAddress.replace(/\n/g, '<br>')}</div>
                    <div class="contact-grid">
                      <div><strong>Email:</strong> ${billData.companyEmail}</div>
                      <div><strong>Phone:</strong> ${billData.companyPhone}</div>
                      <div><strong>Website:</strong> ${billData.companyWebsite}</div>
                      <div><strong>Reg:</strong> ${billData.companyRegNumber}</div>
                      <div><strong>VAT:</strong> ${billData.companyVAT}</div>
                    </div>
                  </div>
                  <div class="invoice-details">
                    <h1>${template.name.toUpperCase()}</h1>
                    <div class="invoice-meta">
                      <div class="meta-row">
                        <span class="meta-label">Document #:</span>
                        <span class="meta-value">${billData.invoiceNumber}</span>
                      </div>
                      <div class="meta-row">
                        <span class="meta-label">Issue Date:</span>
                        <span class="meta-value">${new Date(billData.issueDate).toLocaleDateString()}</span>
                      </div>
                      <div class="meta-row">
                        <span class="meta-label">Due Date:</span>
                        <span class="meta-value">${new Date(billData.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bill-to">
                <h3>🏢 Bill To:</h3>
                <div class="client-name">${billData.clientName}</div>
                <div>${billData.clientAddress.replace(/\n/g, '<br>')}</div>
                <div class="client-details">
                  <div><strong>Email:</strong> ${billData.clientEmail}</div>
                  <div><strong>VAT:</strong> ${billData.clientVAT}</div>
                </div>
              </div>

              <div class="line-items">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 50%;">Description</th>
                      <th style="width: 12%; text-align: center;">Quantity</th>
                      <th style="width: 18%; text-align: center;">Unit Price</th>
                      <th style="width: 20%; text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${billData.lineItems.map(item => `
                      <tr>
                        <td class="item-description">${item.description}</td>
                        <td class="item-quantity">${item.quantity}</td>
                        <td class="item-price">${billData.currency} ${item.unitPrice.toFixed(2)}</td>
                        <td class="item-total">${billData.currency} ${item.total.toFixed(2)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <div class="totals">
                <div class="totals-content">
                  <table>
                    <tr>
                      <td class="total-label">Subtotal:</td>
                      <td class="total-value">${billData.currency} ${billData.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="total-label">Discount (${billData.discountRate}%):</td>
                      <td class="total-value discount-value">-${billData.currency} ${billData.discountAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="total-label">Tax (${billData.taxRate}%):</td>
                      <td class="total-value">${billData.currency} ${billData.taxAmount.toFixed(2)}</td>
                    </tr>
                  </table>
                  <div class="grand-total">
                    <div class="total-label">Grand Total</div>
                    <div class="total-amount">${billData.currency} ${billData.grandTotal.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div class="payment-section">
                <div class="section">
                  <h4>💳 Payment Terms</h4>
                  <p>${billData.paymentTerms}</p>
                  <p style="margin-top: 15px;"><strong>Method:</strong> ${billData.paymentMethod}</p>
                </div>
                <div class="section">
                  <h4>🏦 Banking Details</h4>
                  <pre>${billData.bankDetails}</pre>
                </div>
              </div>

              <div class="payment-section" style="margin-top: 40px;">
                <div class="section">
                  <h4>📝 Notes</h4>
                  <p>${billData.notes}</p>
                </div>
                <div class="section">
                  <h4>⚖️ Legal & Compliance</h4>
                  <p>${billData.legalText}</p>
                </div>
              </div>

              <div class="footer">
                <div class="company-info">
                  <span>🏢 ${billData.companyRegNumber}</span>
                  <span>📧 ${billData.companyEmail}</span>
                  <span>🌐 ${billData.companyWebsite}</span>
                </div>
                <div class="compliance-info">
                  🛡️ This document complies with international standards: ${template.standards.join(', ')}
                </div>
                <div class="legal-text">
                  ${billData.legalText} | Payment due within the specified terms. Late payments may incur additional charges as per applicable law.
                </div>
              </div>
            </body>
          </html>
        `);
        newWindow.document.close();
        setTimeout(() => {
          newWindow.print();
        }, 1000);
      }
    }

    toast({
      title: "Print Ready",
      description: `${template.name} ${billData.invoiceNumber} is ready for printing.`,
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
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl shadow-2xl p-8 border-0">
          <div className="flex items-center gap-8">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-3 px-8 py-4 hover:bg-blue-50 transition-colors text-lg font-semibold">
              <ArrowLeft className="w-6 h-6" />
              Back to Templates
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4 mb-2">
                <FileText className="w-10 h-10 text-blue-600" />
                {template.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <Badge className="bg-green-100 text-green-800 px-4 py-2 font-semibold text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Live Editing
                </Badge>
                {template.standards.map((standard, index) => (
                  <Badge key={index} variant="outline" className="text-sm font-medium px-3 py-1">
                    {standard}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-8 py-4 transition-all duration-200 text-lg font-semibold ${isPreviewMode ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-md' : 'hover:bg-blue-50'}`}
            >
              <Eye className="w-6 h-6 mr-3" />
              {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button variant="outline" onClick={printBill} className="px-8 py-4 hover:bg-green-50 hover:border-green-200 transition-colors text-lg font-semibold">
              <Printer className="w-6 h-6 mr-3" />
              Print
            </Button>
            <Button 
              onClick={generatePDF}
              className={`bg-gradient-to-r ${template.colors.primary} hover:opacity-90 px-8 py-4 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 text-lg`}
            >
              <Download className="w-6 h-6 mr-3" />
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
