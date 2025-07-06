
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  Users,
  Headphones,
  Globe,
  CheckCircle
} from "lucide-react";

interface WebsiteContactProps {
  onNavigate: (page: string) => void;
}

export function WebsiteContact({ onNavigate }: WebsiteContactProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "Sales Inquiry",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          subject: "Sales Inquiry",
          message: ""
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Sales Inquiries",
      description: "Ready to transform your trade operations?",
      contact: "sales@eximcrm.com",
      action: "Contact Sales"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Need help with your account?",
      contact: "support@eximcrm.com",
      action: "Get Support"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Interested in partnering with us?",
      contact: "partners@eximcrm.com",
      action: "Explore Partnership"
    },
    {
      icon: Globe,
      title: "General Inquiries",
      description: "Have a question about our platform?",
      contact: "hello@eximcrm.com",
      action: "Send Message"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Business District",
      address2: "Suite 100, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@eximcrm.com"
    },
    {
      city: "London",
      address: "456 Financial Center",
      address2: "London EC2V 8RF, UK",
      phone: "+44 20 7123 4567",
      email: "london@eximcrm.com"
    },
    {
      city: "Singapore",
      address: "789 Trade Hub",
      address2: "Singapore 018956",
      phone: "+65 6123 4567",
      email: "sg@eximcrm.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your international trade operations? 
            Our team is here to help you get started.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <EnhancedCard key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <EnhancedCardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{method.description}</p>
                  <p className="text-blue-600 font-medium mb-4">{method.contact}</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    {method.action}
                  </Button>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>

          {/* Contact Form & Office Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <EnhancedCard className="hover:shadow-xl transition-shadow">
              <EnhancedCardHeader>
                <EnhancedCardTitle className="text-2xl text-gray-900">
                  Send us a Message
                </EnhancedCardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-2"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      placeholder="Your Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <select 
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Sales Inquiry">Sales Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Partnership">Partnership</option>
                      <option value="General Question">General Question</option>
                      <option value="Demo Request">Demo Request</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message"
                      rows={4}
                      placeholder="Tell us about your international trade needs..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </EnhancedCardContent>
            </EnhancedCard>

            {/* Office Locations */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h2>
                <p className="text-gray-600 mb-8">
                  With offices around the world, we're here to support your international trade operations.
                </p>
              </div>
              
              {offices.map((office, index) => (
                <EnhancedCard key={index} className="hover:shadow-lg transition-shadow">
                  <EnhancedCardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{office.city}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{office.address}</p>
                          <p className="text-gray-700">{office.address2}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-700">{office.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-700">{office.email}</p>
                      </div>
                    </div>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
              
              {/* Business Hours */}
              <EnhancedCard className="bg-gradient-to-r from-blue-50 to-purple-50">
                <EnhancedCardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (Local Time)</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM (Local Time)</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p className="text-sm text-gray-600 mt-4">
                      * Emergency support available 24/7 for Enterprise customers
                    </p>
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            </div>
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
            Don't wait - start your free trial today and see how EXIM CRM can transform your business.
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
