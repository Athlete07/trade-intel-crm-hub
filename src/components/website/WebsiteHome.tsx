
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { 
  Globe, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Target,
  Award,
  Clock
} from "lucide-react";

interface WebsiteHomeProps {
  onNavigate: (page: string) => void;
}

export function WebsiteHome({ onNavigate }: WebsiteHomeProps) {
  const features = [
    {
      icon: Globe,
      title: "Global Trade Management",
      description: "Comprehensive EXIM solutions for international business operations across 190+ countries."
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time insights and predictive analytics to optimize your trade performance and profitability."
    },
    {
      icon: Shield,
      title: "Compliance Automation",
      description: "Automated compliance checks and documentation for international trade regulations."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process trade documents and manage deals 10x faster with AI-powered automation."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Export Manager",
      company: "Global Trade Corp",
      rating: 5,
      text: "EXIM CRM transformed our international operations. We've increased efficiency by 300% and reduced compliance errors to zero."
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Pacific Imports Ltd",
      rating: 5,
      text: "The best investment we've made. The platform pays for itself within the first month through improved deal management."
    },
    {
      name: "Elena Rodriguez",
      role: "Trade Director",
      company: "European Exporters",
      rating: 5,
      text: "Outstanding support and features. Our team loves the intuitive interface and powerful automation capabilities."
    }
  ];

  const stats = [
    { value: "500+", label: "Companies Trust Us" },
    { value: "$2.5B+", label: "Trade Volume Managed" },
    { value: "190+", label: "Countries Supported" },
    { value: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Transform Your
              <br />
              <span className="text-gray-900">International Trade</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The world's most advanced EXIM CRM platform. Streamline global trade operations, 
              ensure compliance, and accelerate growth with AI-powered automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => onNavigate("demo")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate("demo")}
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EXIM CRM?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for international traders with cutting-edge technology 
              and deep industry expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <EnhancedCard key={index} className="text-center hover:scale-105 transition-transform">
                <EnhancedCardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of companies that have transformed their international trade operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <EnhancedCard key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <EnhancedCardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-blue-100 text-sm">{testimonial.role}</div>
                    <div className="text-blue-200 text-sm">{testimonial.company}</div>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trade Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the world's leading international traders. Start your free trial today 
            and experience the future of EXIM management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate("demo")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate("contact")}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
