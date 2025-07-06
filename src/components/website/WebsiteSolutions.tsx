
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { 
  Building2, 
  Truck, 
  FileText, 
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface WebsiteSolutionsProps {
  onNavigate: (page: string) => void;
}

export function WebsiteSolutions({ onNavigate }: WebsiteSolutionsProps) {
  const solutions = [
    {
      icon: Building2,
      title: "Enterprise EXIM",
      description: "Complete trade management solution for large enterprises with global operations.",
      features: ["Multi-entity management", "Advanced compliance", "Custom workflows", "Dedicated support"],
      recommended: true
    },
    {
      icon: Truck,
      title: "Logistics Integration",
      description: "Seamlessly connect with freight forwarders, customs brokers, and shipping lines.",
      features: ["Real-time tracking", "Document automation", "Rate comparison", "Vendor management"]
    },
    {
      icon: FileText,
      title: "Document Automation",
      description: "Automate creation and processing of international trade documents.",
      features: ["Template library", "Auto-generation", "Digital signatures", "Compliance checks"]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Advanced analytics and reporting for trade performance optimization.",
      features: ["Custom dashboards", "Predictive analytics", "Performance metrics", "Export reports"]
    }
  ];

  const industries = [
    {
      name: "Manufacturing",
      description: "Streamline export operations for manufacturers dealing with complex supply chains.",
      use_cases: ["Raw material imports", "Finished goods exports", "Supply chain optimization"]
    },
    {
      name: "Trading Companies",
      description: "Comprehensive platform for import-export trading businesses of all sizes.",
      use_cases: ["Multi-product trading", "Supplier management", "Customer relationships"]
    },
    {
      name: "Agriculture",
      description: "Specialized tools for agricultural commodity trading and compliance.",
      use_cases: ["Commodity trading", "Quality certificates", "Phytosanitary compliance"]
    },
    {
      name: "Technology",
      description: "Support for technology companies expanding into global markets.",
      use_cases: ["Software exports", "Hardware distribution", "IP compliance"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Solutions for Every Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how EXIM CRM can transform your international trade operations 
            across different industries and business models.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <EnhancedCard key={index} className={`hover:shadow-xl transition-all duration-300 ${solution.recommended ? 'ring-2 ring-blue-500' : ''}`}>
                <EnhancedCardContent className="p-8">
                  {solution.recommended && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Most Popular
                    </div>
                  )}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => onNavigate("contact")}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>

          {/* Industries Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industry Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((industry, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{industry.name}</h3>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Common Use Cases:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {industry.use_cases.map((use_case, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {use_case}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trade Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies that trust EXIM CRM for their international trade needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate("demo")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate("contact")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
