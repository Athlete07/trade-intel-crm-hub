
import { Button } from "@/components/ui/button";
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Download,
  ArrowRight,
  Calendar,
  ExternalLink
} from "lucide-react";

interface WebsiteResourcesProps {
  onNavigate: (page: string) => void;
}

export function WebsiteResources({ onNavigate }: WebsiteResourcesProps) {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      items: [
        { title: "Getting Started Guide", type: "PDF", duration: "15 min read" },
        { title: "API Reference", type: "Online", duration: "Reference" },
        { title: "Best Practices", type: "PDF", duration: "25 min read" },
        { title: "Integration Guide", type: "PDF", duration: "30 min read" }
      ]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      items: [
        { title: "Platform Overview", type: "Video", duration: "12 min" },
        { title: "Setting Up Your First Deal", type: "Video", duration: "8 min" },
        { title: "Document Management", type: "Video", duration: "15 min" },
        { title: "Advanced Reporting", type: "Video", duration: "20 min" }
      ]
    },
    {
      icon: FileText,
      title: "Templates & Forms",
      description: "Ready-to-use templates for international trade",
      items: [
        { title: "Commercial Invoice Template", type: "Download", duration: "Free" },
        { title: "Packing List Template", type: "Download", duration: "Free" },
        { title: "Letter of Credit Forms", type: "Download", duration: "Free" },
        { title: "Customs Declaration", type: "Download", duration: "Free" }
      ]
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other EXIM professionals",
      items: [
        { title: "User Forum", type: "Online", duration: "Active" },
        { title: "LinkedIn Group", type: "Social", duration: "2.5k members" },
        { title: "Monthly Webinars", type: "Live", duration: "1 hour" },
        { title: "User Conference", type: "Event", duration: "Annual" }
      ]
    }
  ];

  const blogs = [
    {
      title: "Understanding Incoterms 2020: A Complete Guide",
      excerpt: "Master the latest international commercial terms and their practical applications in global trade.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Trade Regulations"
    },
    {
      title: "Digital Transformation in International Trade",
      excerpt: "How technology is revolutionizing the way we conduct international business operations.",
      date: "Dec 10, 2024",
      readTime: "12 min read",
      category: "Technology"
    },
    {
      title: "Managing Currency Risk in Global Trade",
      excerpt: "Strategies and tools to protect your business from foreign exchange fluctuations.",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      category: "Risk Management"
    }
  ];

  const webinars = [
    {
      title: "Advanced Compliance Management",
      date: "January 15, 2025",
      time: "2:00 PM EST",
      speaker: "Sarah Johnson, Compliance Expert",
      status: "upcoming"
    },
    {
      title: "Optimizing Your Supply Chain",
      date: "January 8, 2025",
      time: "11:00 AM EST",
      speaker: "Michael Chen, Supply Chain Director",
      status: "upcoming"
    },
    {
      title: "Trade Finance Fundamentals",
      date: "December 18, 2024",
      time: "3:00 PM EST",
      speaker: "Elena Rodriguez, Trade Finance Specialist",
      status: "recorded"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Resources & Learning Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to master international trade and get the most out of EXIM CRM.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {resourceCategories.map((category, index) => (
              <EnhancedCard key={index} className="hover:shadow-xl transition-all duration-300">
                <EnhancedCardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <EnhancedCardTitle className="text-xl">{category.title}</EnhancedCardTitle>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>
                </EnhancedCardHeader>
                <EnhancedCardContent>
                  <div className="space-y-3">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{item.type}</span>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>

          {/* Blog Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <EnhancedCard key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <EnhancedCardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded font-medium">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </EnhancedCardContent>
                </EnhancedCard>
              ))}
            </div>
          </div>

          {/* Webinars Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Webinars</h2>
              <Button variant="outline" onClick={() => onNavigate("contact")}>
                View All Webinars
              </Button>
            </div>
            <div className="space-y-6">
              {webinars.map((webinar, index) => (
                <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{webinar.title}</h3>
                      <p className="text-gray-600 text-sm">{webinar.speaker}</p>
                      <p className="text-gray-500 text-sm">{webinar.date} at {webinar.time}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant={webinar.status === 'upcoming' ? 'default' : 'outline'}
                    className={webinar.status === 'upcoming' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    {webinar.status === 'upcoming' ? 'Register' : 'Watch Recording'}
                  </Button>
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
            Need More Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is here to help you succeed with your international trade operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate("contact")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Contact Support
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate("demo")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
