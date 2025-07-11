
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Globe,
  FileCheck,
  Scale,
  Building2,
  Star,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award
} from "lucide-react";

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  category: string;
  jurisdiction: string;
  complianceLevel: number;
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-applicable';
  requirements: string[];
  certificationBody: string;
  validUntil: string;
  renewalRequired: boolean;
}

export function InternationalStandardsCompliance() {
  const [frameworks] = useState<ComplianceFramework[]>([
    {
      id: 'iso-9001',
      name: 'ISO 9001:2015',
      description: 'Quality Management Systems',
      category: 'Quality Management',
      jurisdiction: 'International',
      complianceLevel: 95,
      status: 'compliant',
      requirements: [
        'Quality Policy Implementation',
        'Process Documentation',
        'Management Review',
        'Internal Audits',
        'Continuous Improvement'
      ],
      certificationBody: 'SGS International',
      validUntil: '2024-12-31',
      renewalRequired: false
    },
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      description: 'Environmental Management Systems',
      category: 'Environmental',
      jurisdiction: 'International',
      complianceLevel: 88,
      status: 'compliant',
      requirements: [
        'Environmental Policy',
        'Environmental Aspects Assessment',
        'Legal Compliance Register',
        'Environmental Objectives',
        'Emergency Preparedness'
      ],
      certificationBody: 'Bureau Veritas',
      validUntil: '2024-08-15',
      renewalRequired: true
    },
    {
      id: 'ohsas-45001',
      name: 'ISO 45001:2018',
      description: 'Occupational Health & Safety Management',
      category: 'Health & Safety',
      jurisdiction: 'International',
      complianceLevel: 92,
      status: 'compliant',
      requirements: [
        'OH&S Policy',
        'Hazard Identification',
        'Risk Assessment',
        'Incident Management',
        'Worker Consultation'
      ],
      certificationBody: 'Lloyd\'s Register',
      validUntil: '2024-06-30',
      renewalRequired: true
    },
    {
      id: 'aeo-certificate',
      name: 'Authorized Economic Operator',
      description: 'EU Customs Security Program',
      category: 'Customs & Trade',
      jurisdiction: 'European Union',
      complianceLevel: 78,
      status: 'partial',
      requirements: [
        'Financial Solvency',
        'Compliance Record',
        'Appropriate Security Standards',
        'Practical Standards of Competence',
        'Safety and Security Standards'
      ],
      certificationBody: 'EU Customs Authority',
      validUntil: '2025-03-31',
      renewalRequired: false
    },
    {
      id: 'ctpat',
      name: 'C-TPAT Certification',
      description: 'Customs-Trade Partnership Against Terrorism',
      category: 'Security',
      jurisdiction: 'United States',
      complianceLevel: 45,
      status: 'non-compliant',
      requirements: [
        'Supply Chain Security',
        'Physical Security',
        'Personnel Security',
        'Information Technology Security',
        'Procedural Security'
      ],
      certificationBody: 'US Customs and Border Protection',
      validUntil: 'N/A',
      renewalRequired: true
    },
    {
      id: 'wcoocc',
      name: 'WCO Safe Framework',
      description: 'World Customs Organization SAFE Framework',
      category: 'Customs Security',
      jurisdiction: 'International',
      complianceLevel: 85,
      status: 'compliant',
      requirements: [
        'Supply Chain Security Standards',
        'Customs Control Systems',
        'Risk Management',
        'Partnership Agreements',
        'Technology Integration'
      ],
      certificationBody: 'World Customs Organization',
      validUntil: '2024-11-30',
      renewalRequired: false
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliance',
      description: 'General Data Protection Regulation',
      category: 'Data Protection',
      jurisdiction: 'European Union',
      complianceLevel: 96,
      status: 'compliant',
      requirements: [
        'Data Protection Impact Assessment',
        'Privacy by Design',
        'Consent Management',
        'Data Subject Rights',
        'Breach Notification'
      ],
      certificationBody: 'Data Protection Authority',
      validUntil: 'Ongoing',
      renewalRequired: false
    },
    {
      id: 'usmca',
      name: 'USMCA Trade Agreement',
      description: 'United States-Mexico-Canada Agreement',
      category: 'Trade Agreement',
      jurisdiction: 'North America',
      complianceLevel: 72,
      status: 'partial',
      requirements: [
        'Rules of Origin Compliance',
        'Labor Standards',
        'Environmental Standards',
        'Digital Trade Provisions',
        'Cross-Border Data Flows'
      ],
      certificationBody: 'Trade Authority',
      validUntil: 'Ongoing',
      renewalRequired: false
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'compliant': 'bg-green-100 text-green-800',
      'partial': 'bg-yellow-100 text-yellow-800',
      'non-compliant': 'bg-red-100 text-red-800',
      'not-applicable': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'partial':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'non-compliant':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Quality Management':
        return <Award className="w-5 h-5 text-blue-600" />;
      case 'Environmental':
        return <Globe className="w-5 h-5 text-green-600" />;
      case 'Health & Safety':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'Customs & Trade':
        return <Building2 className="w-5 h-5 text-purple-600" />;
      case 'Security':
        return <Shield className="w-5 h-5 text-orange-600" />;
      case 'Data Protection':
        return <FileCheck className="w-5 h-5 text-indigo-600" />;
      default:
        return <Star className="w-5 h-5 text-gray-600" />;
    }
  };

  const overallCompliance = Math.round(
    frameworks.reduce((sum, framework) => sum + framework.complianceLevel, 0) / frameworks.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">International Standards Compliance</h2>
          <p className="text-gray-600">Global regulatory framework adherence and certification status</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {overallCompliance}% Overall Compliance
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            Generate Compliance Report
          </Button>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{frameworks.filter(f => f.status === 'compliant').length}</p>
                <p className="text-sm text-gray-500">Fully Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{frameworks.filter(f => f.status === 'partial').length}</p>
                <p className="text-sm text-gray-500">Partial Compliance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{frameworks.filter(f => f.status === 'non-compliant').length}</p>
                <p className="text-sm text-gray-500">Non-Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{frameworks.filter(f => f.renewalRequired).length}</p>
                <p className="text-sm text-gray-500">Renewal Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Frameworks */}
      <div className="grid grid-cols-1 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(framework.category)}
                  <div>
                    <h3 className="font-semibold text-lg">{framework.name}</h3>
                    <p className="text-sm text-gray-600">{framework.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{framework.category}</Badge>
                      <Badge variant="outline" className="text-xs">{framework.jurisdiction}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(framework.status)}
                      <Badge className={getStatusColor(framework.status)}>{framework.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Valid until: {framework.validUntil}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Compliance Level</span>
                  <span>{framework.complianceLevel}%</span>
                </div>
                <Progress value={framework.complianceLevel} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Requirements:</h4>
                  <div className="space-y-1">
                    {framework.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Certification Details:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Certification Body:</span>
                      <span className="font-medium">{framework.certificationBody}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Renewal Required:</span>
                      <span className={framework.renewalRequired ? 'text-red-600' : 'text-green-600'}>
                        {framework.renewalRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
