
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { CheckCircle, Star, Zap, Crown, Building2 } from "lucide-react";

interface WebsitePricingProps {
  onNavigate: (page: string) => void;
}

export function WebsitePricing({ onNavigate }: WebsitePricingProps) {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$49",
      period: "per user/month",
      description: "Perfect for small trading companies getting started with international commerce.",
      features: [
        "Up to 5 team members",
        "100 deals per month",
        "Basic compliance checks",
        "Standard document templates",
        "Email support",
        "Mobile app access",
        "Basic reporting",
        "API access"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Professional",
      icon: Star,
      price: "$99",
      period: "per user/month",
      description: "Ideal for growing businesses with advanced trading requirements.",
      features: [
        "Up to 25 team members",
        "Unlimited deals",
        "Advanced compliance automation",
        "Custom document templates",
        "Priority support",
        "Advanced analytics",
        "Multi-currency support",
        "Custom integrations",
        "AI-powered insights",
        "Advanced reporting",
        "Audit trail",
        "Role-based permissions"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      period: "contact sales",
      description: "Comprehensive solution for large corporations with complex requirements.",
      features: [
        "Unlimited team members",
        "Unlimited everything",
        "Custom compliance rules",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "SSO & SAML",
        "Custom workflows",
        "Advanced analytics",
        "24/7 phone support",
        "Training & onboarding",
        "SLA guarantee",
        "Custom development"
      ],
      popular: false,
      color: "from-gray-800 to-gray-900"
    }
  ];

  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required to get started."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, save 20% when you pay annually. Contact our sales team for volume discounts."
    },
    {
      question: "What's included in support?",
      answer: "All plans include email support. Professional and Enterprise plans get priority support with faster response times."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your account remains active until the end of your billing period."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your international trade business. 
            All plans include core features with no hidden fees.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-600">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer"></div>
            </div>
            <span className="text-gray-600">Annual <span className="text-green-600 font-semibold">(Save 20%)</span></span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <EnhancedCard 
                key={index} 
                className={`relative overflow-hidden ${
                  plan.popular ? 'ring-2 ring-purple-500 shadow-2xl scale-105' : 'hover:shadow-xl'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <EnhancedCardHeader className={plan.popular ? "pt-12" : ""}>
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mb-4`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <EnhancedCardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </EnhancedCardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600 ml-2">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </EnhancedCardHeader>
                <EnhancedCardContent>
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    } text-white`}
                    onClick={() => onNavigate("demo")}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Need something more? Our Enterprise plan offers unlimited customization 
              and dedicated support for large organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">24/7 priority support with dedicated account manager</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Integration</h3>
              <p className="text-gray-600">Seamless integration with your existing systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">White Label</h3>
              <p className="text-gray-600">Complete customization with your branding</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Button 
            size="lg"
            onClick={() => onNavigate("demo")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}
