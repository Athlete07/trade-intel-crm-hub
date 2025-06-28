
export const billTemplates = {
  proforma: {
    id: "proforma",
    name: "Proforma Invoice",
    description: "Preliminary invoice sent to buyer before shipment - serves as a quotation and helps buyer arrange for payment and import permits",
    icon: "📋",
    category: "Pre-shipment",
    fields: {
      // Header Information
      invoiceNumber: { 
        label: "Proforma Invoice No.", 
        required: true, 
        placeholder: "PI/2025/00001",
        section: "header"
      },
      date: { 
        label: "Invoice Date", 
        required: true, 
        type: "date",
        section: "header"
      },
      validUntil: { 
        label: "Valid Until", 
        required: true, 
        type: "date",
        section: "header"
      },
      
      // Seller/Exporter Information
      sellerName: { 
        label: "Seller/Exporter Name", 
        required: true,
        section: "seller"
      },
      sellerAddress: { 
        label: "Seller Complete Address", 
        required: true, 
        type: "textarea",
        section: "seller"
      },
      sellerGST: { 
        label: "GST/VAT Registration No.", 
        required: true,
        section: "seller"
      },
      sellerPAN: { 
        label: "PAN Number", 
        required: false,
        section: "seller"
      },
      sellerIEC: { 
        label: "IEC (Import Export Code)", 
        required: true,
        section: "seller"
      },
      sellerContact: {
        label: "Contact Person",
        required: true,
        section: "seller"
      },
      sellerPhone: {
        label: "Phone Number",
        required: true,
        section: "seller"
      },
      sellerEmail: {
        label: "Email Address",
        required: true,
        type: "email",
        section: "seller"
      },
      
      // Buyer/Importer Information
      buyerName: { 
        label: "Buyer/Importer Name", 
        required: true,
        section: "buyer"
      },
      buyerAddress: { 
        label: "Buyer Complete Address", 
        required: true, 
        type: "textarea",
        section: "buyer"
      },
      buyerCountry: { 
        label: "Country of Import", 
        required: true,
        section: "buyer"
      },
      buyerTaxId: { 
        label: "Buyer Tax ID/VAT No.", 
        required: false,
        section: "buyer"
      },
      buyerContact: {
        label: "Contact Person",
        required: true,
        section: "buyer"
      },
      buyerPhone: {
        label: "Phone Number",
        required: false,
        section: "buyer"
      },
      buyerEmail: {
        label: "Email Address",
        required: false,
        type: "email",
        section: "buyer"
      },
      
      // Shipment Details
      portOfLoading: { 
        label: "Port of Loading/Departure", 
        required: true,
        section: "shipment"
      },
      portOfDischarge: { 
        label: "Port of Discharge/Destination", 
        required: true,
        section: "shipment"
      },
      countryOfOrigin: { 
        label: "Country of Origin", 
        required: true,
        section: "shipment"
      },
      finalDestination: { 
        label: "Final Destination", 
        required: true,
        section: "shipment"
      },
      modeOfTransport: {
        label: "Mode of Transport",
        required: true,
        type: "select",
        options: ["Sea Freight", "Air Freight", "Road Transport", "Rail Transport", "Multimodal"],
        section: "shipment"  
      },
      
      // Commercial Terms
      currency: { 
        label: "Invoice Currency", 
        required: true, 
        type: "select", 
        options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"],
        section: "commercial"
      },
      incoterm: { 
        label: "Incoterm", 
        required: true, 
        type: "select", 
        options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA", "CPT", "CIP", "DAP", "DPU"],
        section: "commercial"
      },
      paymentTerms: { 
        label: "Payment Terms", 
        required: true, 
        type: "textarea",
        placeholder: "e.g., 100% advance payment by T/T, L/C at sight, etc.",
        section: "commercial"
      },
      deliveryTime: { 
        label: "Delivery/Shipment Time", 
        required: true,
        placeholder: "e.g., Within 15 days of receipt of confirmed order",
        section: "commercial"
      },
      
      // Additional Shipment Information
      packingType: { 
        label: "Packing Details", 
        required: true,
        placeholder: "e.g., Wooden boxes, cartons, pallets",
        section: "additional"
      },
      totalNetWeight: { 
        label: "Total Net Weight (KG)", 
        required: false, 
        type: "number",
        section: "additional"
      },
      totalGrossWeight: { 
        label: "Total Gross Weight (KG)", 
        required: false, 
        type: "number",
        section: "additional"
      },
      totalCBM: { 
        label: "Total Volume (CBM)", 
        required: false, 
        type: "number",
        section: "additional"
      },
      
      // Banking Details
      bankName: { 
        label: "Beneficiary Bank Name", 
        required: true,
        section: "banking"
      },
      bankAddress: {
        label: "Bank Address",
        required: true,
        type: "textarea",
        section: "banking"
      },
      accountNumber: { 
        label: "Account Number", 
        required: true,
        section: "banking"
      },
      swiftCode: { 
        label: "SWIFT/BIC Code", 
        required: true,
        section: "banking"
      },
      routingNumber: {
        label: "Routing/Sort Code",
        required: false,
        section: "banking"
      },
      
      // Tax and Pricing
      taxRate: { 
        label: "Tax Rate (%)", 
        required: false, 
        type: "number", 
        default: 0,
        section: "pricing"
      },
      taxType: { 
        label: "Tax Type", 
        required: false, 
        type: "select", 
        options: ["GST", "VAT", "Sales Tax", "Export Tax", "None"],
        section: "pricing"
      },
      discountRate: { 
        label: "Discount Rate (%)", 
        required: false, 
        type: "number", 
        default: 0,
        section: "pricing"
      },
      
      // Terms and Conditions
      validity: {
        label: "Offer Validity",
        required: true,
        placeholder: "e.g., This offer is valid for 30 days from the date of invoice",
        section: "terms"
      },
      notes: { 
        label: "Special Terms & Conditions", 
        required: false, 
        type: "textarea",
        section: "terms"
      },
      warranties: { 
        label: "Warranties/Guarantees", 
        required: false, 
        type: "textarea",
        section: "terms"
      }
    }
  },

  commercial: {
    id: "commercial",
    name: "Commercial Invoice",
    description: "Official document for customs clearance and payment - legally required for international trade transactions",
    icon: "💼",
    category: "Official",
    fields: {
      // Basic Information
      invoiceNumber: { 
        label: "Commercial Invoice No.", 
        required: true, 
        placeholder: "CI/2025/00001",
        section: "header"
      },
      date: { 
        label: "Invoice Date", 
        required: true, 
        type: "date",
        section: "header"
      },
      lcNumber: { 
        label: "L/C Number", 
        required: false,
        section: "header"
      },
      contractNumber: { 
        label: "Sales Contract Number", 
        required: false,
        section: "header"
      },
      orderNumber: {
        label: "Purchase Order Number",
        required: false,
        section: "header"
      },
      
      // Seller Information (Exporter)
      exporterName: { 
        label: "Exporter Name", 
        required: true,
        section: "exporter"
      },
      exporterAddress: { 
        label: "Exporter Address", 
        required: true, 
        type: "textarea",
        section: "exporter"
      },
      exporterGST: { 
        label: "GST/VAT Registration", 
        required: true,
        section: "exporter"
      },
      exporterIEC: { 
        label: "IEC Code", 
        required: true,
        section: "exporter"
      },
      exporterPAN: { 
        label: "PAN Number", 
        required: true,
        section: "exporter"
      },
      exporterPhone: {
        label: "Phone Number",
        required: true,
        section: "exporter"
      },
      exporterEmail: {
        label: "Email Address",
        required: true,
        type: "email",
        section: "exporter"
      },
      
      // Buyer Information (Importer)
      importerName: { 
        label: "Importer/Consignee Name", 
        required: true,
        section: "importer"
      },
      importerAddress: { 
        label: "Importer Address", 
        required: true, 
        type: "textarea",
        section: "importer"
      },
      importerCountry: { 
        label: "Country of Import", 
        required: true,
        section: "importer"
      },
      importerTaxId: { 
        label: "Importer Tax ID", 
        required: true,
        section: "importer"
      },
      importerPhone: {
        label: "Phone Number",
        required: false,
        section: "importer"
      },
      importerEmail: {
        label: "Email Address",
        required: false,
        type: "email",
        section: "importer"
      },
      
      // Notify Party (if different)
      notifyParty: { 
        label: "Notify Party (if different from consignee)", 
        required: false, 
        type: "textarea",
        section: "notify"
      },
      
      // Shipment Details
      vesselName: { 
        label: "Vessel/Flight Name", 
        required: false,
        section: "transport"
      },
      voyageNumber: { 
        label: "Voyage/Flight Number", 
        required: false,
        section: "transport"
      },
      blNumber: { 
        label: "B/L or AWB Number", 
        required: false,
        section: "transport"
      },
      portOfLoading: { 
        label: "Port of Loading", 
        required: true,
        section: "transport"
      },
      portOfDischarge: { 
        label: "Port of Discharge", 
        required: true,
        section: "transport"
      },
      countryOfOrigin: { 
        label: "Country of Origin", 
        required: true,
        section: "transport"
      },
      finalDestination: { 
        label: "Final Destination", 
        required: true,
        section: "transport"
      },
      
      // Commercial Terms
      currency: { 
        label: "Invoice Currency", 
        required: true, 
        type: "select", 
        options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"],
        section: "commercial"
      },
      incoterm: { 
        label: "Incoterm", 
        required: true, 
        type: "select", 
        options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA", "CPT", "CIP", "DAP", "DPU"],
        section: "commercial"
      },
      paymentTerms: { 
        label: "Payment Terms", 
        required: true,
        section: "commercial"
      },
      
      // Shipping Details
      shippingMode: { 
        label: "Mode of Transport", 
        required: true, 
        type: "select", 
        options: ["Sea", "Air", "Land", "Rail", "Multimodal"],
        section: "shipping"
      },
      containerNumbers: { 
        label: "Container Numbers", 
        required: false, 
        type: "textarea",
        section: "shipping"
      },
      sealNumbers: { 
        label: "Seal Numbers", 
        required: false,
        section: "shipping"
      },
      
      // Weight and Measurement
      totalNetWeight: { 
        label: "Total Net Weight (KG)", 
        required: true, 
        type: "number",
        section: "measurement"
      },
      totalGrossWeight: { 
        label: "Total Gross Weight (KG)", 
        required: true, 
        type: "number",
        section: "measurement"
      },
      totalCBM: { 
        label: "Total Volume (CBM)", 
        required: false, 
        type: "number",
        section: "measurement"
      },
      numberOfPackages: { 
        label: "Number of Packages", 
        required: true, 
        type: "number",
        section: "measurement"
      },
      
      // Certification
      originCertificate: { 
        label: "Certificate of Origin No.", 
        required: false,
        section: "certification"
      },
      inspectionCertificate: { 
        label: "Inspection Certificate No.", 
        required: false,
        section: "certification"
      },
      
      // Declaration
      exportDeclaration: { 
        label: "Export Declaration", 
        required: false, 
        type: "textarea",
        default: "We hereby certify that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
        section: "declaration"
      }
    }
  },

  packing: {
    id: "packing",
    name: "Packing List",
    description: "Detailed inventory document listing all items in each package - essential for customs clearance",
    icon: "📦",
    category: "Shipping",
    fields: {
      // Header Information
      packingListNumber: { 
        label: "Packing List No.", 
        required: true, 
        placeholder: "PL/2025/00001",
        section: "header"
      },
      date: { 
        label: "Date", 
        required: true, 
        type: "date",
        section: "header"
      },
      invoiceReference: { 
        label: "Related Invoice No.", 
        required: true,
        section: "header"
      },
      orderReference: {
        label: "Purchase Order No.",
        required: false,
        section: "header"
      },
      
      // Shipper Information
      shipperName: { 
        label: "Shipper/Exporter", 
        required: true,
        section: "shipper"
      },
      shipperAddress: { 
        label: "Shipper Address", 
        required: true, 
        type: "textarea",
        section: "shipper"
      },
      shipperContact: {
        label: "Contact Person",
        required: true,
        section: "shipper"
      },
      shipperPhone: {
        label: "Phone Number",
        required: true,
        section: "shipper"
      },
      shipperEmail: {
        label: "Email Address",
        required: false,
        type: "email",
        section: "shipper"
      },
      
      // Consignee Information
      consigneeName: { 
        label: "Consignee", 
        required: true,
        section: "consignee"
      },
      consigneeAddress: { 
        label: "Consignee Address", 
        required: true, 
        type: "textarea",
        section: "consignee"
      },
      consigneeContact: {
        label: "Contact Person",
        required: false,
        section: "consignee"
      },
      consigneePhone: {
        label: "Phone Number",
        required: false,
        section: "consignee"
      },
      
      // Shipping Details
      vesselName: { 
        label: "Vessel Name", 
        required: false,
        section: "shipping"
      },
      voyageNumber: { 
        label: "Voyage No.", 
        required: false,
        section: "shipping"
      },
      containerNumbers: { 
        label: "Container Numbers", 
        required: false, 
        type: "textarea",
        section: "shipping"
      },
      sealNumbers: { 
        label: "Seal Numbers", 
        required: false,
        section: "shipping"
      },
      blNumber: {
        label: "Bill of Lading No.",
        required: false,
        section: "shipping"
      },
      
      // Destination Details
      portOfLoading: { 
        label: "Port of Loading", 
        required: true,
        section: "destination"
      },
      portOfDischarge: { 
        label: "Port of Discharge", 
        required: true,
        section: "destination"
      },
      finalDestination: { 
        label: "Final Destination", 
        required: true,
        section: "destination"
      },
      
      // Package Information
      totalPackages: { 
        label: "Total Number of Packages", 
        required: true, 
        type: "number",
        section: "package"
      },
      packingType: { 
        label: "Type of Packaging", 
        required: true,
        placeholder: "e.g., Wooden crates, cardboard boxes, pallets",
        section: "package"
      },
      shippingMarks: { 
        label: "Shipping Marks & Numbers", 
        required: false, 
        type: "textarea",
        section: "package"
      },
      packageDimensions: {
        label: "Package Dimensions (LxWxH)",
        required: false,
        placeholder: "e.g., 120x80x100 cm",
        section: "package"
      },
      
      // Weight and Dimensions
      totalNetWeight: { 
        label: "Total Net Weight (KG)", 
        required: true, 
        type: "number",
        section: "weight"
      },
      totalGrossWeight: { 
        label: "Total Gross Weight (KG)", 
        required: true, 
        type: "number",
        section: "weight"
      },
      totalVolume: { 
        label: "Total Volume (CBM)", 
        required: false, 
        type: "number",
        section: "weight"
      },
      
      // Additional Information
      specialInstructions: { 
        label: "Special Handling Instructions", 
        required: false, 
        type: "textarea",
        section: "additional"
      },
      hazardousGoods: { 
        label: "Hazardous Goods Declaration", 
        required: false, 
        type: "select", 
        options: ["No", "Yes - Details Attached"],
        section: "additional"
      },
      temperatureRequirement: {
        label: "Temperature Requirements",
        required: false,
        placeholder: "e.g., Store at 2-8°C",
        section: "additional"
      },
      
      // Certification & Compliance
      packingCertificate: {
        label: "Packing Certificate No.",
        required: false,
        section: "certification"
      },
      fumigationCertificate: {
        label: "Fumigation Certificate No.",
        required: false,
        section: "certification"
      }
    }
  },

  customs: {
    id: "customs",
    name: "Customs Invoice",
    description: "Specialized invoice for customs valuation and duty assessment - includes detailed commodity information",
    icon: "🏛️",
    category: "Compliance",
    fields: {
      // Basic Information
      customsInvoiceNumber: { 
        label: "Customs Invoice No.", 
        required: true, 
        placeholder: "CU/2025/00001",
        section: "header"
      },
      date: { 
        label: "Invoice Date", 
        required: true, 
        type: "date",
        section: "header"
      },
      customsReference: { 
        label: "Customs Reference/Entry No.", 
        required: false,
        section: "header"
      },
      commercialInvoiceRef: {
        label: "Commercial Invoice Reference",
        required: true,
        section: "header"
      },
      
      // Exporter Information
      exporterName: { 
        label: "Exporter Name", 
        required: true,
        section: "exporter"
      },
      exporterAddress: { 
        label: "Exporter Address", 
        required: true, 
        type: "textarea",
        section: "exporter"
      },
      exporterCode: { 
        label: "Exporter Code/Registration", 
        required: true,
        section: "exporter"
      },
      exporterTaxId: {
        label: "Exporter Tax ID",
        required: true,
        section: "exporter"
      },
      
      // Importer Information
      importerName: { 
        label: "Importer Name", 
        required: true,
        section: "importer"
      },
      importerAddress: { 
        label: "Importer Address", 
        required: true, 
        type: "textarea",
        section: "importer"
      },
      importerCode: { 
        label: "Importer License/Code", 
        required: true,
        section: "importer"
      },
      importerTaxId: {
        label: "Importer Tax ID",
        required: true,
        section: "importer"
      },
      
      // Customs Details
      customsOffice: { 
        label: "Customs Office of Entry", 
        required: true,
        section: "customs"
      },
      procedureCode: { 
        label: "Customs Procedure Code", 
        required: false,
        section: "customs"
      },
      dutyRate: { 
        label: "Applicable Duty Rate (%)", 
        required: false, 
        type: "number",
        section: "customs"
      },
      tariffClassification: {
        label: "Tariff Classification",
        required: false,
        section: "customs"
      },
      
      // Valuation Details
      currency: { 
        label: "Currency", 
        required: true, 
        type: "select", 
        options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"],
        section: "valuation"
      },
      exchangeRate: { 
        label: "Exchange Rate (if applicable)", 
        required: false, 
        type: "number",
        section: "valuation"
      },
      insuranceValue: { 
        label: "Insurance Value", 
        required: false, 
        type: "number",
        section: "valuation"
      },
      freightValue: { 
        label: "Freight Value", 
        required: false, 
        type: "number",
        section: "valuation"
      },
      cifValue: {
        label: "Total CIF Value",
        required: true,
        type: "number",
        section: "valuation"
      },
      
      // Origin and Classification
      countryOfOrigin: { 
        label: "Country of Origin", 
        required: true,
        section: "origin"
      },
      preferentialOrigin: { 
        label: "Preferential Origin (if applicable)", 
        required: false,
        section: "origin"
      },
      manufacturerName: {
        label: "Manufacturer Name",
        required: false,
        section: "origin"
      },
      manufacturerAddress: {
        label: "Manufacturer Address",
        required: false,
        type: "textarea",
        section: "origin"
      },
      
      // Trade Agreements
      tradeAgreement: {
        label: "Applicable Trade Agreement",
        required: false,
        type: "select",
        options: ["None", "SAFTA", "ASEAN", "EU-GSP", "US-GSP", "Other"],
        section: "trade"
      },
      certificateOfOrigin: {
        label: "Certificate of Origin No.",
        required: false,
        section: "trade"
      },
      
      // Declarations
      valuationMethod: { 
        label: "Valuation Method", 
        required: true, 
        type: "select", 
        options: ["Transaction Value", "Transaction Value of Identical Goods", "Transaction Value of Similar Goods", "Deductive Value", "Computed Value", "Fallback Method"],
        section: "declaration"
      },
      customsDeclaration: { 
        label: "Customs Declaration", 
        required: false, 
        type: "textarea",
        default: "I hereby declare that the information given in this invoice is true, complete and accurate and that the goods are of the origin shown.",
        section: "declaration"
      },
      
      // Additional Charges
      additionalCharges: {
        label: "Additional Charges Description",
        required: false,
        type: "textarea",
        section: "charges"
      },
      royalties: {
        label: "Royalties and License Fees",
        required: false,
        type: "number",
        section: "charges"
      }
    }
  },

  delivery: {
    id: "delivery",
    name: "Delivery Order",
    description: "Authorization document for releasing goods from port/warehouse to consignee",
    icon: "🚚",
    category: "Logistics",
    fields: {
      // Basic Information
      deliveryOrderNumber: { 
        label: "Delivery Order No.", 
        required: true, 
        placeholder: "DO/2025/00001",
        section: "header"
      },
      date: { 
        label: "Issue Date", 
        required: true, 
        type: "date",
        section: "header"
      },
      blReference: { 
        label: "B/L Reference No.", 
        required: true,
        section: "header"
      },
      invoiceReference: {
        label: "Invoice Reference No.",
        required: false,
        section: "header"
      },
      
      // Shipping Line/Agent Information
      shippingLine: { 
        label: "Shipping Line", 
        required: true,
        section: "agent"
      },
      agentName: { 
        label: "Agent Name", 
        required: true,
        section: "agent"
      },
      agentAddress: { 
        label: "Agent Address", 
        required: true, 
        type: "textarea",
        section: "agent"
      },
      agentContact: {
        label: "Agent Contact Person",
        required: true,
        section: "agent"
      },
      agentPhone: {
        label: "Agent Phone",
        required: true,
        section: "agent"
      },
      agentEmail: {
        label: "Agent Email",
        required: false,
        type: "email",
        section: "agent"
      },
      
      // Consignee Information
      consigneeName: { 
        label: "Consignee", 
        required: true,
        section: "consignee"
      },
      consigneeAddress: { 
        label: "Consignee Address", 
        required: true, 
        type: "textarea",
        section: "consignee"
      },
      consigneeContact: {
        label: "Consignee Contact Person",
        required: true,
        section: "consignee"
      },
      consigneePhone: {
        label: "Consignee Phone",
        required: true,
        section: "consignee"
      },
      consigneeEmail: {
        label: "Consignee Email",
        required: false,
        type: "email",
        section: "consignee"
      },
      notifyParty: { 
        label: "Notify Party (if different)", 
        required: false, 
        type: "textarea",
        section: "consignee"
      },
      
      // Cargo Details
      vesselName: { 
        label: "Vessel Name", 
        required: true,
        section: "cargo"
      },
      voyageNumber: { 
        label: "Voyage Number", 
        required: true,
        section: "cargo"
      },
      containerNumbers: { 
        label: "Container Numbers", 
        required: true, 
        type: "textarea",
        section: "cargo"
      },
      sealNumbers: {
        label: "Seal Numbers", 
        required: false,
        section: "cargo"
      },
      portOfDischarge: { 
        label: "Port of Discharge", 
        required: true,
        section: "cargo"
      },
      arrivalDate: {
        label: "Vessel Arrival Date",
        required: false,
        type: "date",
        section: "cargo"
      },
      
      // Delivery Instructions
      deliveryLocation: { 
        label: "Delivery Location/Warehouse", 
        required: true,
        section: "delivery"
      },
      deliveryAddress: {
        label: "Delivery Address",
        required: true,
        type: "textarea",
        section: "delivery"
      },
      deliveryContactPerson: { 
        label: "Delivery Contact Person", 
        required: true,
        section: "delivery"
      },
      deliveryContactPhone: { 
        label: "Delivery Contact Phone", 
        required: true,
        section: "delivery"
      },
      preferredDeliveryDate: {
        label: "Preferred Delivery Date",
        required: false,
        type: "date",
        section: "delivery"
      },
      preferredDeliveryTime: {
        label: "Preferred Delivery Time",
        required: false,
        type: "time",
        section: "delivery"
      },
      specialInstructions: { 
        label: "Special Delivery Instructions", 
        required: false, 
        type: "textarea",
        section: "delivery"
      },
      
      // Charges and Documentation
      deliveryCharges: { 
        label: "Delivery Charges", 
        required: false, 
        type: "number",
        section: "charges"
      },
      currency: {
        label: "Currency",
        required: false,
        type: "select",
        options: ["USD", "EUR", "GBP", "INR", "Local Currency"],
        section: "charges"
      },
      freightStatus: { 
        label: "Freight Status", 
        required: true, 
        type: "select", 
        options: ["Prepaid", "Collect"],
        section: "charges"
      },
      demurrageCharges: {
        label: "Demurrage Charges (if any)",
        required: false,
        type: "number",
        section: "charges"
      },
      
      // Required Documents
      documentsRequired: {
        label: "Documents Required for Release",
        required: false,
        type: "textarea",
        default: "Original Bill of Lading, Delivery Order, Import License, Customs Clearance",
        section: "documents"
      },
      
      // Terms and Conditions
      validityPeriod: {
        label: "Validity Period",
        required: true,
        placeholder: "e.g., 7 days from issue date",
        section: "terms"
      },
      terms: { 
        label: "Terms & Conditions", 
        required: false, 
        type: "textarea",
        default: "Goods to be delivered only against surrender of original Delivery Order. All port charges, demurrage, and other expenses to be borne by consignee. This Delivery Order is valid for 7 days from the date of issue.",
        section: "terms"
      }
    }
  },

  freight: {
    id: "freight",
    name: "Freight Invoice",
    description: "Comprehensive invoice for shipping, logistics, and freight forwarding services",
    icon: "🚢",
    category: "Logistics",
    fields: {
      // Basic Information
      freightInvoiceNumber: { 
        label: "Freight Invoice No.", 
        required: true, 
        placeholder: "FI/2025/00001",
        section: "header"
      },
      date: { 
        label: "Invoice Date", 
        required: true, 
        type: "date",
        section: "header"
      },
      jobNumber: { 
        label: "Job/Booking Number", 
        required: false,
        section: "header"
      },
      quotationReference: {
        label: "Quotation Reference",
        required: false,
        section: "header"
      },
      
      // Freight Forwarder Information
      forwarderName: { 
        label: "Freight Forwarder/Carrier", 
        required: true,
        section: "forwarder"
      },
      forwarderAddress: { 
        label: "Forwarder Address", 
        required: true, 
        type: "textarea",
        section: "forwarder"
      },
      forwarderLicense: { 
        label: "Forwarder License No.", 
        required: false,
        section: "forwarder"
      },
      forwarderContact: {
        label: "Contact Person",
        required: true,
        section: "forwarder"
      },
      forwarderPhone: {
        label: "Phone Number",
        required: true,
        section: "forwarder"
      },
      forwarderEmail: {
        label: "Email Address",
        required: true,
        type: "email",
        section: "forwarder"
      },
      
      // Customer Information
      customerName: { 
        label: "Customer Name", 
        required: true,
        section: "customer"
      },
      customerAddress: { 
        label: "Customer Address", 
        required: true, 
        type: "textarea",
        section: "customer"
      },
      customerContact: {
        label: "Customer Contact Person",
        required: true,
        section: "customer"
      },
      customerPhone: {
        label: "Customer Phone",
        required: true,
        section: "customer"
      },
      customerEmail: {
        label: "Customer Email",
        required: false,
        type: "email",
        section: "customer"
      },
      
      // Shipment Route
      originPort: { 
        label: "Port/Place of Origin", 
        required: true,
        section: "route"
      },
      destinationPort: { 
        label: "Port/Place of Destination", 
        required: true,
        section: "route"
      },
      transitPorts: {
        label: "Transit Ports (if any)",
        required: false,
        section: "route"
      },
      
      // Schedule Information
      vesselName: { 
        label: "Vessel/Flight Name", 
        required: false,
        section: "schedule"
      },
      voyageNumber: {
        label: "Voyage/Flight Number",
        required: false,
        section: "schedule"
      },
      etd: { 
        label: "ETD (Estimated Time of Departure)", 
        required: false, 
        type: "date",
        section: "schedule"
      },
      eta: { 
        label: "ETA (Estimated Time of Arrival)", 
        required: false, 
        type: "date",
        section: "schedule"
      },
      actualDepartureDate: {
        label: "Actual Departure Date",
        required: false,
        type: "date",
        section: "schedule"
      },
      actualArrivalDate: {
        label: "Actual Arrival Date",
        required: false,
        type: "date",
        section: "schedule"
      },
      
      // Container/Cargo Information
      serviceType: { 
        label: "Service Type", 
        required: true, 
        type: "select", 
        options: ["FCL (Full Container Load)", "LCL (Less than Container Load)", "Air Freight", "Express Delivery", "Break Bulk", "Project Cargo"],
        section: "cargo"
      },
      containerType: { 
        label: "Container Type", 
        required: false, 
        type: "select", 
        options: ["20GP", "40GP", "40HQ", "45HQ", "20RF", "40RF", "20OT", "40OT", "LCL", "Air ULD"],
        section: "cargo"
      },
      numberOfContainers: { 
        label: "Number of Containers/Packages", 
        required: false, 
        type: "number",
        section: "cargo"
      },
      containerNumbers: {
        label: "Container Numbers",
        required: false,
        type: "textarea",
        section: "cargo"
      },
      cargoDescription: { 
        label: "Cargo Description", 
        required: true, 
        type: "textarea",
        section: "cargo"
      },
      totalWeight: { 
        label: "Total Weight (KG)", 
        required: false, 
        type: "number",
        section: "cargo"
      },
      totalVolume: { 
        label: "Total Volume (CBM)", 
        required: false, 
        type: "number",
        section: "cargo"
      },
      
      // Service Terms
      incoterm: { 
        label: "Incoterm", 
        required: true, 
        type: "select", 
        options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA", "CPT", "CIP", "DAP", "DPU"],
        section: "terms"
      },
      freightTerms: {
        label: "Freight Terms",
        required: true,
        type: "select",
        options: ["Prepaid", "Collect", "Third Party"],
        section: "terms"
      },
      
      // Financial Terms
      currency: { 
        label: "Invoice Currency", 
        required: true, 
        type: "select", 
        options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"],
        section: "financial"
      },
      paymentTerms: { 
        label: "Payment Terms", 
        required: true,
        placeholder: "e.g., Net 30 days, Cash on Delivery",
        section: "financial"
      },
      creditLimit: {
        label: "Credit Limit (if applicable)",
        required: false,
        type: "number",
        section: "financial"
      },
      
      // Additional Services
      insurance: { 
        label: "Marine/Cargo Insurance", 
        required: false, 
        type: "select", 
        options: ["Not Required", "Arranged by Shipper", "Arranged by Forwarder"],
        section: "services"
      },
      insuranceValue: {
        label: "Insurance Value",
        required: false,
        type: "number",
        section: "services"
      },
      customsClearance: { 
        label: "Customs Clearance", 
        required: false, 
        type: "select", 
        options: ["Import Only", "Export Only", "Both Import & Export", "Not Required"],
        section: "services"
      },
      warehousing: {
        label: "Warehousing Services",
        required: false,
        type: "select",
        options: ["Not Required", "Origin Warehouse", "Destination Warehouse", "Both"],
        section: "services"
      },
      
      // Special Requirements
      hazardousGoods: {
        label: "Hazardous Goods",
        required: false,
        type: "select",
        options: ["No", "Yes - IMDG Class", "Yes - DG Declaration Attached"],
        section: "special"
      },
      temperatureControlled: {
        label: "Temperature Controlled",
        required: false,
        type: "select",
        options: ["No", "Refrigerated", "Frozen", "Heated"],
        section: "special"
      },
      specialHandling: {
        label: "Special Handling Instructions",
        required: false,
        type: "textarea",
        section: "special"
      }
    }
  },

  airway: {
    id: "airway",
    name: "Air Waybill",
    description: "Air cargo transport document serving as receipt and contract of carriage for air freight",
    icon: "✈️",
    category: "Transport",
    fields: {
      // Basic Information
      awbNumber: { 
        label: "Air Waybill No. (11 digits)", 
        required: true, 
        placeholder: "125-12345678",
        section: "header"
      },
      date: { 
        label: "Date of Issue", 
        required: true, 
        type: "date",
        section: "header"
      },
      awbType: {
        label: "AWB Type",
        required: true,
        type: "select",
        options: ["Master AWB", "House AWB"],
        section: "header"
      },
      masterAwbNumber: {
        label: "Master AWB Number (if House AWB)",
        required: false,
        section: "header"
      },
      
      // Airline Information
      airlineName: { 
        label: "Airline/Carrier Name", 
        required: true,
        section: "airline"
      },
      airlineCode: { 
        label: "Airline Code (3-digit)", 
        required: true,
        placeholder: "e.g., 125, 176, 020",
        section: "airline"
      },
      agentCode: { 
        label: "Agent IATA Code", 
        required: false,
        section: "airline"
      },
      agentName: {
        label: "Agent Name",
        required: false,
        section: "airline"
      },
      
      // Shipper Information
      shipperName: { 
        label: "Shipper Name", 
        required: true,
        section: "shipper"
      },
      shipperAddress: { 
        label: "Shipper Address", 
        required: true, 
        type: "textarea",
        section: "shipper"
      },
      shipperCity: {
        label: "Shipper City",
        required: true,
        section: "shipper"
      },
      shipperCountry: {
        label: "Shipper Country",
        required: true,
        section: "shipper"
      },
      shipperPostalCode: {
        label: "Postal Code",
        required: false,
        section: "shipper"
      },
      shipperAccountNumber: { 
        label: "Shipper Account No.", 
        required: false,
        section: "shipper"
      },
      shipperPhone: {
        label: "Shipper Phone",
        required: true,
        section: "shipper"
      },
      shipperEmail: {
        label: "Shipper Email",
        required: false,
        type: "email",
        section: "shipper"
      },
      
      // Consignee Information
      consigneeName: { 
        label: "Consignee Name", 
        required: true,
        section: "consignee"
      },
      consigneeAddress: { 
        label: "Consignee Address", 
        required: true, 
        type: "textarea",
        section: "consignee"
      },
      consigneeCity: {
        label: "Consignee City",
        required: true,
        section: "consignee"
      },
      consigneeCountry: {
        label: "Consignee Country",
        required: true,
        section: "consignee"
      },
      consigneePostalCode: {
        label: "Postal Code",
        required: false,
        section: "consignee"
      },
      consigneeAccountNumber: { 
        label: "Consignee Account No.", 
        required: false,
        section: "consignee"
      },
      consigneePhone: {
        label: "Consignee Phone",
        required: true,
        section: "consignee"
      },
      consigneeEmail: {
        label: "Consignee Email",
        required: false,
        type: "email",
        section: "consignee"
      },
      
      // Flight Information
      departureAirport: { 
        label: "Departure Airport (3-letter code)", 
        required: true,
        placeholder: "e.g., DEL, BOM, MAA",
        section: "flight"
      },
      destinationAirport: { 
        label: "Destination Airport (3-letter code)", 
        required: true,
        placeholder: "e.g., JFK, LHR, FRA",
        section: "flight"
      },
      routingDetails: {
        label: "Routing Details (via airports)",
        required: false,
        section: "flight"
      },
      flightNumber: { 
        label: "Flight Number", 
        required: false,
        section: "flight"
      },
      flightDate: { 
        label: "Flight Date", 
        required: false, 
        type: "date",
        section: "flight"
      },
      
      // Cargo Information
      numberOfPieces: { 
        label: "Number of Pieces", 
        required: true, 
        type: "number",
        section: "cargo"
      },
      totalWeight: { 
        label: "Total Gross Weight", 
        required: true, 
        type: "number",
        section: "cargo"
      },
      weightUnit: { 
        label: "Weight Unit", 
        required: true, 
        type: "select", 
        options: ["KG", "LBS"],
        section: "cargo"
      },
      dimensions: {
        label: "Dimensions (LxWxH cm)",
        required: false,
        placeholder: "e.g., 100x80x60",
        section: "cargo"
      },
      volumetricWeight: {
        label: "Volumetric Weight",
        required: false,
        type: "number",
        section: "cargo"
      },
      chargeableWeight: {
        label: "Chargeable Weight",
        required: false,
        type: "number",
        section: "cargo"
      },
      rateClass: { 
        label: "Rate Class", 
        required: false, 
        type: "select", 
        options: ["M (Minimum)", "N (Normal)", "Q (Quantity)", "S (Specific Commodity)"],
        section: "cargo"
      },
      
      // Commodity Information
      commodityDescription: { 
        label: "Nature and Quantity of Goods", 
        required: true, 
        type: "textarea",
        section: "commodity"
      },
      hsCode: { 
        label: "HS Code", 
        required: false,
        section: "commodity"
      },
      commodityValue: {
        label: "Declared Value for Carriage",
        required: false,
        type: "number",
        section: "commodity"
      },
      customsValue: {
        label: "Declared Value for Customs",
        required: false,
        type: "number",
        section: "commodity"
      },
      
      // Charges and Payment
      currency: { 
        label: "Currency", 
        required: true, 
        type: "select", 
        options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"],
        section: "charges"
      },
      freightRate: {
        label: "Freight Rate per KG",
        required: false,
        type: "number",
        section: "charges"
      },
      freightCharges: { 
        label: "Total Freight Charges", 
        required: true, 
        type: "number",
        section: "charges"
      },
      fuelSurcharge: {
        label: "Fuel Surcharge",
        required: false,
        type: "number",
        section: "charges"
      },
      securityCharge: {
        label: "Security Charge",
        required: false,
        type: "number",
        section: "charges"
      },
      handlingCharges: {
        label: "Handling Charges",
        required: false,
        type: "number",
        section: "charges"
      },
      chargesCode: { 
        label: "Charges Code", 
        required: true, 
        type: "select", 
        options: ["PP (Prepaid)", "CC (Collect)"],
        section: "charges"
      },
      
      // Special Services
      specialHandling: { 
        label: "Special Handling Requirements", 
        required: false, 
        type: "textarea",
        placeholder: "e.g., Fragile, Keep Upright, Temperature Sensitive",
        section: "special"
      },
      dangerousGoods: { 
        label: "Dangerous Goods", 
        required: false, 
        type: "select", 
        options: ["No", "Yes - DGR Applicable"],
        section: "special"
      },
      liveAnimals: {
        label: "Live Animals",
        required: false,
        type: "select",
        options: ["No", "Yes - LAR Applicable"],
        section: "special"
      },
      perishableGoods: {
        label: "Perishable Goods",
        required: false,
        type: "select",
        options: ["No", "Yes - Time/Temperature Sensitive"],
        section: "special"
      },
      
      // Insurance
      insuranceAmount: { 
        label: "Insurance Amount", 
        required: false, 
        type: "number",
        section: "insurance"
      },
      insuranceCurrency: {
        label: "Insurance Currency",
        required: false,
        type: "select",
        options: ["USD", "EUR", "GBP", "INR"],
        section: "insurance"
      },
      
      // Additional Information
      deliveryInstructions: { 
        label: "Delivery Instructions", 
        required: false, 
        type: "textarea",
        section: "additional"
      },
      referenceNumber: {
        label: "Customer Reference Number",
        required: false,
        section: "additional"
      },
      
      // Certification
      shipperCertification: {
        label: "Shipper's Certification",
        required: false,
        type: "textarea",
        default: "These commodities, technology or software were exported from the United States in accordance with the Export Administration Regulations. Diversion contrary to U.S. law is prohibited.",
        section: "certification"
      }
    }
  },

  certificate: {
    id: "certificate",
    name: "Certificate of Origin",
    description: "Official document certifying the country where goods were manufactured - required for preferential trade treatment",
    icon: "🌍",
    category: "Compliance",
    fields: {
      // Header Information
      certificateNumber: { 
        label: "Certificate No.", 
        required: true, 
        placeholder: "COO/2025/00001",
        section: "header"
      },
      issueDate: { 
        label: "Date of Issue", 
        required: true, 
        type: "date",
        section: "header"
      },
      expiryDate: {
        label: "Expiry Date (if applicable)",
        required: false,
        type: "date",
        section: "header"
      },
      certificateType: {
        label: "Certificate Type",
        required: true,
        type: "select",
        options: ["General Certificate of Origin", "Preferential Certificate of Origin", "SAFTA Certificate", "ASEAN Form D", "GSP Form A"],
        section: "header"
      },
      
      // Exporter Information
      exporterName: { 
        label: "Exporter Name", 
        required: true,
        section: "exporter"
      },
      exporterAddress: { 
        label: "Exporter Complete Address", 
        required: true, 
        type: "textarea",
        section: "exporter"
      },
      exporterCountry: { 
        label: "Exporter Country", 
        required: true,
        section: "exporter"
      },
      exporterTaxId: {
        label: "Exporter Tax ID/Registration",
        required: false,
        section: "exporter"
      },
      exporterPhone: {
        label: "Exporter Phone",
        required: false,
        section: "exporter"
      },
      exporterEmail: {
        label: "Exporter Email",
        required: false,
        type: "email",
        section: "exporter"
      },
      
      // Consignee Information
      consigneeName: { 
        label: "Consignee Name", 
        required: true,
        section: "consignee"
      },
      consigneeAddress: { 
        label: "Consignee Complete Address", 
        required: true, 
        type: "textarea",
        section: "consignee"
      },
      consigneeCountry: { 
        label: "Consignee Country", 
        required: true,
        section: "consignee"
      },
      consigneePhone: {
        label: "Consignee Phone",
        required: false,
        section: "consignee"
      },
      consigneeEmail: {
        label: "Consignee Email",
        required: false,
        type: "email",
        section: "consignee"
      },
      
      // Transport Information
      meansOfTransport: { 
        label: "Means of Transport", 
        required: false,
        type: "select",
        options: ["Sea", "Air", "Road", "Rail", "Multimodal", "Post"],
        section: "transport"
      },
      vesselFlightName: {
        label: "Vessel/Flight Name",
        required: false,
        section: "transport"
      },
      transportDetails: { 
        label: "Transport Details", 
        required: false, 
        type: "textarea",
        placeholder: "Vessel name, voyage number, flight details, etc.",
        section: "transport"
      },
      departureDate: {
        label: "Date of Departure",
        required: false,
        type: "date",
        section: "transport"
      },
      
      // Origin Information
      countryOfOrigin: { 
        label: "Country of Origin", 
        required: true,
        section: "origin"
      },
      portOfLoading: { 
        label: "Port/Place of Loading", 
        required: false,
        section: "origin"
      },
      portOfDischarge: { 
        label: "Port/Place of Discharge", 
        required: false,
        section: "origin"
      },
      regionOfOrigin: {
        label: "Region/State of Origin",
        required: false,
        section: "origin"
      },
      
      // Manufacturing Information
      manufacturerName: {
        label: "Manufacturer Name (if different from exporter)",
        required: false,
        section: "manufacturer"
      },
      manufacturerAddress: {
        label: "Manufacturer Address",
        required: false,
        type: "textarea",
        section: "manufacturer"
      },
      placeOfManufacture: {
        label: "Place of Manufacture",
        required: false,
        section: "manufacturer"
      },
      
      // Authority Information
      issuingAuthority: { 
        label: "Issuing Authority", 
        required: true,
        section: "authority"
      },
      authorityAddress: { 
        label: "Authority Address", 
        required: true, 
        type: "textarea",
        section: "authority"
      },
      chamberOfCommerce: { 
        label: "Chamber of Commerce", 
        required: false,
        section: "authority"
      },
      authorityLicense: {
        label: "Authority License/Registration No.",
        required: false,
        section: "authority"
      },
      
      // Reference Information
      invoiceNumber: { 
        label: "Related Commercial Invoice No.", 
        required: false,
        section: "reference"
      },
      invoiceDate: { 
        label: "Invoice Date", 
        required: false, 
        type: "date",
        section: "reference"
      },
      lcNumber: { 
        label: "L/C Number", 
        required: false,
        section: "reference"
      },
      blAwbNumber: {
        label: "B/L or AWB Number",
        required: false,
        section: "reference"
      },
      orderNumber: {
        label: "Purchase Order Number",
        required: false,
        section: "reference"
      },
      
      // Preferential Trade Information
      preferentialTreatment: { 
        label: "Preferential Treatment Claimed", 
        required: false, 
        type: "select", 
        options: ["No", "Yes - GSP", "Yes - FTA", "Yes - Other"],
        section: "preferential"
      },
      tradeAgreement: { 
        label: "Trade Agreement", 
        required: false,
        type: "select",
        options: ["None", "SAFTA", "ASEAN", "EU-India FTA", "MERCOSUR", "Other"],
        section: "preferential"
      },
      originCriteria: {
        label: "Origin Criteria",
        required: false,
        type: "textarea",
        placeholder: "Specify the origin criteria under which preferential treatment is claimed",
        section: "preferential"
      },
      
      // Goods Information
      packageMarks: {
        label: "Marks and Numbers on Packages",
        required: false,
        type: "textarea",
        section: "goods"
      },
      numberOfPackages: {
        label: "Number and Kind of Packages",
        required: false,
        section: "goods"
      },
      grossWeight: {
        label: "Gross Weight (KG)",
        required: false,
        type: "number",
        section: "goods"
      },
      invoiceValue: {
        label: "Invoice Value",
        required: false,
        type: "number",
        section: "goods"
      },
      currency: {
        label: "Currency",
        required: false,
        type: "select",
        options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"],
        section: "goods"
      },
      
      // Certification and Declaration
      certificationStatement: { 
        label: "Certification Statement", 
        required: false, 
        type: "textarea",
        default: "I hereby certify that the goods described above originate in the country shown and comply with the origin requirements specified for these goods in the relevant trade agreement.",
        section: "certification"
      },
      originDeclaration: {
        label: "Declaration of Origin",
        required: false,
        type: "textarea",
        default: "The undersigned hereby declares that the above details and statements are correct; that all the goods were produced in the country shown and that they comply with the origin requirements specified.",
        section: "certification"
      },
      
      // Signature Information
      authorizedOfficer: { 
        label: "Authorized Officer Name", 
        required: true,
        section: "signature"
      },
      officerTitle: { 
        label: "Officer Title/Designation", 
        required: true,
        section: "signature"
      },
      officerPhone: {
        label: "Officer Phone",
        required: false,
        section: "signature"
      },
      officerEmail: {
        label: "Officer Email",
        required: false,
        type: "email",
        section: "signature"
      },
      signatureDate: { 
        label: "Date of Signature", 
        required: true, 
        type: "date",
        section: "signature"
      },
      signaturePlace: {
        label: "Place of Signature",
        required: true,
        section: "signature"
      },
      
      // Additional Information
      remarks: {
        label: "Remarks/Additional Information",
        required: false,
        type: "textarea",
        section: "additional"
      },
      attachments: {
        label: "Supporting Documents Attached",
        required: false,
        type: "textarea",
        placeholder: "List any supporting documents attached",
        section: "additional"
      }
    }
  }
};
