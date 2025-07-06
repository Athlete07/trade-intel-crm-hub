
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { 
  Play, 
  CheckCircle, 
  ArrowRight,
  Globe,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";

interface WebsiteDemoProps {
  onNavigate: (page: string) => void;
  onStartTrial: () => void;
}

export function WebsiteDemo({ onNavigate, onStartTrial }: WebsiteDemoProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleWatchDemo = () => {
    // In a real implementation, this would open a video modal or redirect to a video
    console.log("Opening demo video...");
  };

  const handleStartTrial = () => {
    console.log("Starting trial with data:", formData);
    onStartTrial();
  };

  const demoFeatures = [
    {
      icon: Globe,
      title: "Global Trade Management",
      description: "See how we manage international deals across 190+ countries"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Experience our powerful dashboard with live trade insights"
    },
    {
      icon: Shield,
      title: "Compliance Automation",
      description: "Watch automated compliance checks in action"
    },
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Discover how AI accelerates your trade operations"
    }
  ];

  const benefits = [
    "No credit card required",
    "Full platform access for 14 days",
    "Dedicated onboarding support", 
    "Sample data included",
    "Cancel anytime"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            See EXIM CRM in Action
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Watch our interactive demo or start your free trial to experience 
            the future of international trade management.
          </p>
        </div>
      </section>

      {/* Demo Options */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Watch Demo */}
            <EnhancedCard className="hover:shadow-xl transition-all duration-300">
              <EnhancedCardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <EnhancedCardTitle className="text-2xl mb-4">Watch Interactive Demo</EnhancedCardTitle>
                <p className="text-gray-600">
                  See how EXIM CRM transforms international trade operations in just 8 minutes.
                </p>
              </EnhancedCardHeader>
              <EnhancedCardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  {demoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <feature.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  onClick={handleWatchDemo}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo Now
                </Button>
              </EnhancedCardContent>
            </EnhancedCard>

            {/* Start Free Trial */}
            <EnhancedCard className="hover:shadow-xl transition-all duration-300 ring-2 ring-blue-500">
              <EnhancedCardHeader className="text-center">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  Most Popular
                </div>
                <EnhancedCardTitle className="text-2xl mb-4">Start Your Free Trial</EnhancedCardTitle>
                <p className="text-gray-600">
                  Get full access to EXIM CRM for 14 days. No commitment required.
                </p>
              </EnhancedCardHeader>
              <EnhancedCardContent className="pt-0">
                <form className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input 
                      id="company" 
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </form>

                <div className="space-y-3 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  onClick={handleStartTrial}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By starting your trial, you agree to our Terms of Service and Privacy Policy.
                </p>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Join 500+ Companies Already Using EXIM CRM
            </h2>
            <p className="text-gray-600 mb-8">
              From small traders to Fortune 500 companies, businesses worldwide trust our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => onNavigate("contact")}
                className="border-2 border-gray-300 hover:border-blue-500"
              >
                Schedule a Call
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate("pricing")}
                className="border-2 border-gray-300 hover:border-blue-500"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
