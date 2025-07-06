
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { 
  Globe, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  BarChart3,
  FileText,
  Truck,
  Brain,
  Clock,
  CheckCircle,
  Target,
  ArrowRight
} from "lucide-react";

interface WebsiteFeaturesProps {
  onNavigate: (page: string) => void;
}

export function WebsiteFeatures({ onNavigate }: WebsiteFeaturesProps) {
  const coreFeatures = [
    {
      icon: Globe,
      title: "Global Trade Management",
      description: "Comprehensive EXIM solutions covering import/export operations across 190+ countries with real-time trade data.",
      features: ["Multi-country operations", "Currency management", "Trade regulations", "Documentation automation"]
    },
    {
      icon: Shield,
      title: "Compliance Automation",
      description: "Automated compliance checks ensuring adherence to international trade laws and regulations.",
      features: ["Real-time compliance monitoring", "Regulatory updates", "Document validation", "Audit trails"]
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Powerful analytics and reporting tools to optimize your trade performance and identify opportunities.",
      features: ["Performance dashboards", "Predictive analytics", "Custom reports", "ROI tracking"]
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for distributed teams working on international trade operations.",
      features: ["Role-based access", "Real-time notifications", "Task management", "Communication tools"]
    }
  ];

  const additionalFeatures = [
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document storage with automated generation of trade documents and certificates."
    },
    {
      icon: Truck,
      title: "Logistics Tracking",
      description: "Real-time shipment tracking and logistics management across multiple carriers and routes."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms provide intelligent recommendations and market insights."
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Live updates on market conditions, regulatory changes, and shipment status."
    },
    {
      icon: Target,
      title: "Deal Management",
      description: "Complete deal lifecycle management from lead generation to contract completion."
    },
    {
      icon: BarChart3,
      title: "Performance Metrics",
      description: "Comprehensive KPI tracking and performance measurement across all trade activities."
    }
  ];

  const integrations = [
    "SAP", "Oracle", "Salesforce", "QuickBooks", "Xero", "FedEx", "DHL", "UPS", 
    "Maersk", "MSC", "Banks APIs", "Government Portals", "Customs Systems", "ERP Systems"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Powerful Features for Global Trade
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to manage international trade operations efficiently, 
            compliantly, and profitably in one integrated platform.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => (
              <EnhancedCard key={index} className="hover:shadow-xl transition-all duration-300">
                <EnhancedCardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <EnhancedCardTitle className="text-2xl text-gray-900 mb-3">
                        {feature.title}
                      </EnhancedCardTitle>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                    </div>
                  </div>
                </EnhancedCardHeader>
                <EnhancedCardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Feature Set
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every tool you need for successful international trade operations, 
              all in one comprehensive platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with your existing tools and systems. Our platform integrates 
              with leading business applications and trade services.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-gray-700">{integration}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Need a custom integration?</p>
            <Button 
              onClick={() => onNavigate("contact")}
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Contact Our Team
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial and see how EXIM CRM can transform your international trade operations.
          </p>
          <Button 
            size="lg"
            onClick={() => onNavigate("demo")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
