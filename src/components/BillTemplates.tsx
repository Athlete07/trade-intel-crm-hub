
export const billTemplates = {
  proforma: {
    id: "proforma",
    name: "Proforma Invoice",
    description: "Preliminary invoice sent to buyer before shipment",
    fields: {
      // Basic Information
      invoiceNumber: { label: "Proforma Invoice No.", required: true, placeholder: "PI/2025/00001" },
      date: { label: "Invoice Date", required: true, type: "date" },
      validUntil: { label: "Valid Until", required: true, type: "date" },
      
      // Seller Information
      sellerName: { label: "Seller/Exporter Name", required: true },
      sellerAddress: { label: "Seller Address", required: true, type: "textarea" },
      sellerGST: { label: "GST/Tax Registration", required: true },
      sellerPAN: { label: "PAN Number", required: false },
      sellerIEC: { label: "IEC Number", required: true },
      
      // Buyer Information
      buyerName: { label: "Buyer/Importer Name", required: true },
      buyerAddress: { label: "Buyer Address", required: true, type: "textarea" },
      buyerCountry: { label: "Buyer Country", required: true },
      buyerTaxId: { label: "Buyer Tax ID", required: false },
      
      // Shipment Details
      portOfLoading: { label: "Port of Loading", required: true },
      portOfDischarge: { label: "Port of Discharge", required: true },
      countryOfOrigin: { label: "Country of Origin", required: true },
      finalDestination: { label: "Final Destination", required: true },
      
      // Commercial Terms
      currency: { label: "Currency", required: true, type: "select", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      incoterm: { label: "Incoterm", required: true, type: "select", options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA", "CPT", "CIP"] },
      paymentTerms: { label: "Payment Terms", required: true, type: "textarea" },
      deliveryTime: { label: "Delivery Time", required: true },
      
      // Additional Fields
      packingType: { label: "Packing Type", required: false },
      totalNetWeight: { label: "Total Net Weight (KG)", required: false, type: "number" },
      totalGrossWeight: { label: "Total Gross Weight (KG)", required: false, type: "number" },
      totalCBM: { label: "Total CBM", required: false, type: "number" },
      
      // Banking Details
      bankName: { label: "Bank Name", required: false },
      accountNumber: { label: "Account Number", required: false },
      swiftCode: { label: "SWIFT/BIC Code", required: false },
      
      // Tax Settings
      taxRate: { label: "Tax Rate (%)", required: true, type: "number", default: 0 },
      taxType: { label: "Tax Type", required: false, type: "select", options: ["GST", "VAT", "Sales Tax", "None"] },
      discountRate: { label: "Discount Rate (%)", required: false, type: "number", default: 0 },
      
      // Terms and Conditions
      notes: { label: "Special Terms & Conditions", required: false, type: "textarea" },
      warranties: { label: "Warranties/Guarantees", required: false, type: "textarea" }
    }
  },

  commercial: {
    id: "commercial",
    name: "Commercial Invoice",
    description: "Official invoice for customs clearance and payment",
    fields: {
      // Basic Information
      invoiceNumber: { label: "Commercial Invoice No.", required: true, placeholder: "CI/2025/00001" },
      date: { label: "Invoice Date", required: true, type: "date" },
      lcNumber: { label: "L/C Number", required: false },
      contractNumber: { label: "Contract Number", required: false },
      
      // Seller Information (Exporter)
      sellerName: { label: "Exporter Name", required: true },
      sellerAddress: { label: "Exporter Address", required: true, type: "textarea" },
      sellerGST: { label: "GST/VAT Registration", required: true },
      sellerIEC: { label: "IEC Code", required: true },
      sellerPAN: { label: "PAN Number", required: true },
      
      // Buyer Information (Importer)
      buyerName: { label: "Importer/Consignee Name", required: true },
      buyerAddress: { label: "Importer Address", required: true, type: "textarea" },
      buyerCountry: { label: "Country of Import", required: true },
      buyerTaxId: { label: "Importer Tax ID", required: true },
      
      // Notify Party (if different)
      notifyParty: { label: "Notify Party", required: false, type: "textarea" },
      
      // Shipment Details
      vesselName: { label: "Vessel/Flight Name", required: false },
      voyageNumber: { label: "Voyage/Flight Number", required: false },
      blNumber: { label: "B/L or AWB Number", required: false },
      portOfLoading: { label: "Port of Loading", required: true },
      portOfDischarge: { label: "Port of Discharge", required: true },
      countryOfOrigin: { label: "Country of Origin", required: true },
      finalDestination: { label: "Final Destination", required: true },
      
      // Commercial Terms
      currency: { label: "Currency", required: true, type: "select", options: ["USD", "EUR", "GBP", "INR", "JPY", "CNY"] },
      incoterm: { label: "Incoterm", required: true, type: "select", options: ["FOB", "CIF", "CFR", "EXW", "DDP", "FCA"] },
      paymentTerms: { label: "Payment Terms", required: true },
      
      // Shipping Details
      shippingMode: { label: "Mode of Transport", required: true, type: "select", options: ["Sea", "Air", "Land", "Multimodal"] },
      containerNumbers: { label: "Container Numbers", required: false, type: "textarea" },
      sealNumbers: { label: "Seal Numbers", required: false },
      
      // Weight and Measurement
      totalNetWeight: { label: "Total Net Weight (KG)", required: true, type: "number" },
      totalGrossWeight: { label: "Total Gross Weight (KG)", required: true, type: "number" },
      totalCBM: { label: "Total Volume (CBM)", required: false, type: "number" },
      numberOfPackages: { label: "Number of Packages", required: true, type: "number" },
      
      // Certification
      originCertificate: { label: "Certificate of Origin No.", required: false },
      inspectionCertificate: { label: "Inspection Certificate No.", required: false },
      
      // Declaration
      exportDeclaration: { label: "Export Declaration", required: false, type: "textarea", 
        default: "We hereby certify that this invoice shows the actual price of the goods described and that all particulars are true and correct." }
    }
  },

  packing: {
    id: "packing",
    name: "Packing List",
    description: "Detailed list of goods and packaging information",
    fields: {
      // Basic Information
      packingListNumber: { label: "Packing List No.", required: true, placeholder: "PL/2025/00001" },
      date: { label: "Date", required: true, type: "date" },
      invoiceReference: { label: "Invoice Reference", required: true },
      
      // Shipper Information
      shipperName: { label: "Shipper/Exporter", required: true },
      shipperAddress: { label: "Shipper Address", required: true, type: "textarea" },
      
      // Consignee Information
      consigneeName: { label: "Consignee", required: true },
      consigneeAddress: { label: "Consignee Address", required: true, type: "textarea" },
      
      // Shipping Details
      vesselName: { label: "Vessel Name", required: false },
      voyageNumber: { label: "Voyage No.", required: false },
      containerNumbers: { label: "Container Numbers", required: false, type: "textarea" },
      sealNumbers: { label: "Seal Numbers", required: false },
      
      // Destination
      portOfLoading: { label: "Port of Loading", required: true },
      portOfDischarge: { label: "Port of Discharge", required: true },
      finalDestination: { label: "Final Destination", required: true },
      
      // Package Information
      totalPackages: { label: "Total Number of Packages", required: true, type: "number" },
      packingType: { label: "Type of Packaging", required: true },
      shippingMarks: { label: "Shipping Marks", required: false, type: "textarea" },
      
      // Weight and Dimensions
      totalNetWeight: { label: "Total Net Weight (KG)", required: true, type: "number" },
      totalGrossWeight: { label: "Total Gross Weight (KG)", required: true, type: "number" },
      totalVolume: { label: "Total Volume (CBM)", required: false, type: "number" },
      
      // Additional Information
      specialInstructions: { label: "Special Handling Instructions", required: false, type: "textarea" },
      hazardousGoods: { label: "Hazardous Goods Declaration", required: false, type: "select", options: ["Yes", "No"] }
    }
  },

  customs: {
    id: "customs",
    name: "Customs Invoice",
    description: "Invoice specifically for customs valuation purposes",
    fields: {
      // Basic Information
      customsInvoiceNumber: { label: "Customs Invoice No.", required: true, placeholder: "CU/2025/00001" },
      date: { label: "Invoice Date", required: true, type: "date" },
      customsReference: { label: "Customs Reference", required: false },
      
      // Exporter Information
      exporterName: { label: "Exporter Name", required: true },
      exporterAddress: { label: "Exporter Address", required: true, type: "textarea" },
      exporterCode: { label: "Exporter Code", required: true },
      
      // Importer Information
      importerName: { label: "Importer Name", required: true },
      importerAddress: { label: "Importer Address", required: true, type: "textarea" },
      importerCode: { label: "Importer Code", required: true },
      
      // Customs Details
      customsOffice: { label: "Customs Office", required: true },
      procedureCode: { label: "Procedure Code", required: false },
      dutyRate: { label: "Applicable Duty Rate (%)", required: false, type: "number" },
      
      // Valuation
      currency: { label: "Currency", required: true, type: "select", options: ["USD", "EUR", "GBP", "INR"] },
      exchangeRate: { label: "Exchange Rate", required: false, type: "number" },
      insuranceValue: { label: "Insurance Value", required: false, type: "number" },
      freightValue: { label: "Freight Value", required: false, type: "number" },
      
      // Origin and Classification
      countryOfOrigin: { label: "Country of Origin", required: true },
      preferentialOrigin: { label: "Preferential Origin", required: false },
      
      // Declarations
      valuationMethod: { label: "Valuation Method", required: true, type: "select", 
        options: ["Transaction Value", "Transaction Value of Identical Goods", "Transaction Value of Similar Goods", "Deductive Value", "Computed Value", "Fallback Method"] },
      customsDeclaration: { label: "Customs Declaration", required: false, type: "textarea",
        default: "I hereby declare that the information given in this invoice is true, complete and accurate." }
    }
  },

  delivery: {
    id: "delivery",
    name: "Delivery Order",
    description: "Authorization document for cargo release",
    fields: {
      // Basic Information
      deliveryOrderNumber: { label: "Delivery Order No.", required: true, placeholder: "DO/2025/00001" },
      date: { label: "Issue Date", required: true, type: "date" },
      blReference: { label: "B/L Reference", required: true },
      
      // Shipping Line/Agent
      shippingLine: { label: "Shipping Line", required: true },
      agentName: { label: "Agent Name", required: true },
      agentAddress: { label: "Agent Address", required: true, type: "textarea" },
      
      // Consignee Information
      consigneeName: { label: "Consignee", required: true },
      consigneeAddress: { label: "Consignee Address", required: true, type: "textarea" },
      notifyParty: { label: "Notify Party", required: false, type: "textarea" },
      
      // Cargo Details
      vesselName: { label: "Vessel Name", required: true },
      voyageNumber: { label: "Voyage Number", required: true },
      containerNumbers: { label: "Container Numbers", required: true, type: "textarea" },
      portOfDischarge: { label: "Port of Discharge", required: true },
      
      // Delivery Instructions
      deliveryLocation: { label: "Delivery Location", required: true },
      deliveryContactPerson: { label: "Contact Person", required: true },
      deliveryContactPhone: { label: "Contact Phone", required: true },
      specialInstructions: { label: "Special Delivery Instructions", required: false, type: "textarea" },
      
      // Charges and Conditions
      deliveryCharges: { label: "Delivery Charges", required: false, type: "number" },
      freightStatus: { label: "Freight Status", required: true, type: "select", options: ["Prepaid", "Collect"] },
      
      // Terms and Conditions
      terms: { label: "Terms & Conditions", required: false, type: "textarea",
        default: "Goods to be delivered only against surrender of original Delivery Order. All port charges, demurrage, and other expenses to be borne by consignee." }
    }
  },

  freight: {
    id: "freight",
    name: "Freight Invoice",
    description: "Invoice for shipping and logistics charges",
    fields: {
      // Basic Information
      freightInvoiceNumber: { label: "Freight Invoice No.", required: true, placeholder: "FI/2025/00001" },
      date: { label: "Invoice Date", required: true, type: "date" },
      jobNumber: { label: "Job Number", required: false },
      
      // Freight Forwarder Information
      forwarderName: { label: "Freight Forwarder", required: true },
      forwarderAddress: { label: "Forwarder Address", required: true, type: "textarea" },
      forwarderLicense: { label: "Forwarder License No.", required: false },
      
      // Customer Information
      customerName: { label: "Customer Name", required: true },
      customerAddress: { label: "Customer Address", required: true, type: "textarea" },
      
      // Shipment Details
      originPort: { label: "Port of Origin", required: true },
      destinationPort: { label: "Port of Destination", required: true },
      vesselName: { label: "Vessel Name", required: false },
      etd: { label: "ETD (Estimated Time of Departure)", required: false, type: "date" },
      eta: { label: "ETA (Estimated Time of Arrival)", required: false, type: "date" },
      
      // Container/Cargo Information
      containerType: { label: "Container Type", required: false, type: "select", options: ["20GP", "40GP", "40HQ", "45HQ", "LCL"] },
      numberOfContainers: { label: "Number of Containers", required: false, type: "number" },
      cargoDescription: { label: "Cargo Description", required: true, type: "textarea" },
      totalWeight: { label: "Total Weight (KG)", required: false, type: "number" },
      totalVolume: { label: "Total Volume (CBM)", required: false, type: "number" },
      
      // Service Details
      serviceType: { label: "Service Type", required: true, type: "select", options: ["FCL", "LCL", "Air Freight", "Express"] },
      incoterm: { label: "Incoterm", required: true, type: "select", options: ["FOB", "CIF", "CFR", "EXW", "DDP"] },
      
      // Payment Terms
      currency: { label: "Currency", required: true, type: "select", options: ["USD", "EUR", "GBP", "INR"] },
      paymentTerms: { label: "Payment Terms", required: true },
      
      // Additional Services
      insurance: { label: "Marine Insurance", required: false, type: "select", options: ["Yes", "No"] },
      customsClearance: { label: "Customs Clearance", required: false, type: "select", options: ["Import", "Export", "Both", "None"] }
    }
  },

  airway: {
    id: "airway",
    name: "Air Waybill",
    description: "Air cargo transport document and receipt",
    fields: {
      // Basic Information
      awbNumber: { label: "Air Waybill No.", required: true, placeholder: "125-12345678" },
      date: { label: "Date of Issue", required: true, type: "date" },
      
      // Airline Information
      airlineName: { label: "Airline/Carrier", required: true },
      airlineCode: { label: "Airline Code", required: true },
      agentCode: { label: "Agent IATA Code", required: false },
      
      // Shipper Information
      shipperName: { label: "Shipper Name", required: true },
      shipperAddress: { label: "Shipper Address", required: true, type: "textarea" },
      shipperAccountNumber: { label: "Shipper Account No.", required: false },
      
      // Consignee Information
      consigneeName: { label: "Consignee Name", required: true },
      consigneeAddress: { label: "Consignee Address", required: true, type: "textarea" },
      consigneeAccountNumber: { label: "Consignee Account No.", required: false },
      
      // Flight Information
      departureAirport: { label: "Departure Airport", required: true },
      destinationAirport: { label: "Destination Airport", required: true },
      flightNumber: { label: "Flight Number", required: false },
      flightDate: { label: "Flight Date", required: false, type: "date" },
      
      // Cargo Information
      numberOfPieces: { label: "Number of Pieces", required: true, type: "number" },
      totalWeight: { label: "Total Weight (KG)", required: true, type: "number" },
      weightUnit: { label: "Weight Unit", required: true, type: "select", options: ["KG", "LB"] },
      rateClass: { label: "Rate Class", required: false, type: "select", options: ["M", "N", "Q", "S"] },
      
      // Commodity Information
      commodityDescription: { label: "Nature and Quantity of Goods", required: true, type: "textarea" },
      hsCode: { label: "HS Code", required: false },
      
      // Charges
      currency: { label: "Currency", required: true, type: "select", options: ["USD", "EUR", "GBP", "INR"] },
      freightCharges: { label: "Freight Charges", required: true, type: "number" },
      chargesCode: { label: "Charges Code", required: true, type: "select", options: ["PP (Prepaid)", "CC (Collect)"] },
      
      // Special Handling
      specialHandling: { label: "Special Handling", required: false, type: "textarea" },
      dangerousGoods: { label: "Dangerous Goods", required: false, type: "select", options: ["Yes", "No"] },
      
      // Insurance
      insuranceAmount: { label: "Insurance Amount", required: false, type: "number" },
      
      // Delivery Information
      deliveryInstructions: { label: "Delivery Instructions", required: false, type: "textarea" }
    }
  },

  certificate: {
    id: "certificate",
    name: "Certificate of Origin",
    description: "Document certifying the country of origin of goods",
    fields: {
      // Basic Information
      certificateNumber: { label: "Certificate No.", required: true, placeholder: "COO/2025/00001" },
      issueDate: { label: "Date of Issue", required: true, type: "date" },
      
      // Exporter Information
      exporterName: { label: "Exporter Name", required: true },
      exporterAddress: { label: "Exporter Address", required: true, type: "textarea" },
      exporterCountry: { label: "Exporter Country", required: true },
      
      // Consignee Information
      consigneeName: { label: "Consignee Name", required: true },
      consigneeAddress: { label: "Consignee Address", required: true, type: "textarea" },
      consigneeCountry: { label: "Consignee Country", required: true },
      
      // Transport Information
      meansOfTransport: { label: "Means of Transport", required: false },
      transportDetails: { label: "Transport Details", required: false, type: "textarea" },
      
      // Origin Information
      countryOfOrigin: { label: "Country of Origin", required: true },
      portOfLoading: { label: "Port of Loading", required: false },
      portOfDischarge: { label: "Port of Discharge", required: false },
      
      // Authority Information
      issuingAuthority: { label: "Issuing Authority", required: true },
      authorityAddress: { label: "Authority Address", required: true, type: "textarea" },
      chamberOfCommerce: { label: "Chamber of Commerce", required: false },
      
      // Reference Information
      invoiceNumber: { label: "Related Invoice No.", required: false },
      invoiceDate: { label: "Invoice Date", required: false, type: "date" },
      lcNumber: { label: "L/C Number", required: false },
      
      // Preferential Trade
      preferentialTreatment: { label: "Preferential Treatment Claimed", required: false, type: "select", options: ["Yes", "No"] },
      tradeAgreement: { label: "Trade Agreement", required: false },
      
      // Certification
      certificationStatement: { label: "Certification Statement", required: false, type: "textarea",
        default: "I hereby certify that the goods described above originate in the country shown and comply with the origin requirements specified." },
      
      // Signature Information
      authorizedOfficer: { label: "Authorized Officer", required: true },
      officerTitle: { label: "Officer Title", required: true },
      signatureDate: { label: "Signature Date", required: true, type: "date" }
    }
  }
};
