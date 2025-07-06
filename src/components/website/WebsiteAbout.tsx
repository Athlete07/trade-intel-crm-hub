
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card";
import { 
  Globe, 
  Users, 
  Award, 
  Target,
  ArrowRight,
  Linkedin,
  Mail
} from "lucide-react";

interface WebsiteAboutProps {
  onNavigate: (page: string) => void;
}

export function WebsiteAbout({ onNavigate }: WebsiteAboutProps) {
  const stats = [
    { value: "500+", label: "Global Clients" },
    { value: "190+", label: "Countries Served" },
    { value: "$2.5B+", label: "Trade Volume" },
    { value: "99.9%", label: "Uptime" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      background: "Former VP of International Trade at Goldman Sachs with 15+ years in global commerce.",
      image: "photo-1494790108755-2616b612b47c"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      background: "Ex-Google engineer specializing in enterprise software and international payment systems.",
      image: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Dr. Emma Thompson",
      role: "Head of Compliance",
      background: "Former Director of Trade Compliance at the World Trade Organization with expertise in international law.",
      image: "photo-1438761681033-6461ffad8d80"
    },
    {
      name: "James Liu",
      role: "VP of Engineering",
      background: "Former Lead Architect at Salesforce with deep expertise in CRM and enterprise software.",
      image: "photo-1507003211169-0a1dd7228f2d"
    }
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Vision",
      description: "We believe in a world where international trade is accessible, efficient, and transparent for businesses of all sizes."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Our customers' success is our success. We're committed to delivering exceptional value and support at every step."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product development to customer service and beyond."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously innovate to stay ahead of industry trends and provide cutting-edge solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About EXIM CRM
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to democratize international trade by providing 
            world-class CRM solutions that make global commerce accessible to everyone.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p>
                  Founded in 2020 by a team of international trade experts and technology veterans, 
                  EXIM CRM was born from a simple observation: global trade was becoming increasingly 
                  complex, but the tools to manage it were stuck in the past.
                </p>
                <p>
                  Our founders, having worked with Fortune 500 companies and government agencies, 
                  witnessed firsthand the challenges businesses face when expanding internationally. 
                  Compliance headaches, documentation nightmares, and fragmented systems were 
                  preventing companies from reaching their full potential.
                </p>
                <p>
                  Today, we serve over 500 companies across 190 countries, managing billions of 
                  dollars in trade volume. But we're just getting started. Our vision is to make 
                  international trade as simple as domestic commerce.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={`https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">By the Numbers</h2>
            <p className="text-xl text-blue-100">Our impact on global trade</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry experts and technology leaders working together to revolutionize global trade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <EnhancedCard key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <EnhancedCardContent className="p-8">
                  <img 
                    src={`https://images.unsplash.com/${member.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6">{member.background}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Want to Join Our Mission?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for talented individuals who share our passion for transforming global trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate("contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate("demo")}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
            >
              Try Our Platform
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
