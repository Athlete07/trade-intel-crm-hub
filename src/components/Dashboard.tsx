
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Handshake,
  Globe,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total Companies",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Deals",
      value: "$2.4M",
      change: "+23%",
      trend: "up", 
      icon: DollarSign,
      color: "green"
    },
    {
      title: "This Month Interactions",
      value: "342",
      change: "+8%",
      trend: "up",
      icon: Handshake,
      color: "purple"
    },
    {
      title: "Conversion Rate",
      value: "18.5%",
      change: "-2%",
      trend: "down",
      icon: Target,
      color: "orange"
    }
  ];

  const recentInteractions = [
    {
      company: "ABC Textiles Ltd",
      contact: "Rajesh Kumar",
      type: "Call",
      time: "2 hours ago",
      status: "Hot Lead",
      value: "$45K"
    },
    {
      company: "Global Electronics Inc",
      contact: "Sarah Chen",
      type: "Meeting",
      time: "5 hours ago", 
      status: "Negotiation",
      value: "$120K"
    },
    {
      company: "Indo-German Motors",
      contact: "Hans Mueller",
      type: "Email",
      time: "1 day ago",
      status: "Follow-up",
      value: "$78K"
    }
  ];

  const topDeals = [
    {
      company: "MegaCorp Industries",
      product: "Steel Components",
      value: "$450K",
      stage: "Confirmed",
      probability: 95,
      closure: "Dec 15, 2024"
    },
    {
      company: "Pacific Traders",  
      product: "Electronic Parts",
      value: "$280K",
      stage: "Negotiation",
      probability: 70,
      closure: "Jan 20, 2025"
    },
    {
      company: "Sunrise Exports",
      product: "Textile Machinery", 
      value: "$190K",
      stage: "Inquiry",
      probability: 40,
      closure: "Feb 10, 2025"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ml-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Interactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Interactions
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInteractions.map((interaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{interaction.company}</h4>
                    <p className="text-sm text-gray-600">{interaction.contact}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {interaction.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{interaction.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={interaction.status === 'Hot Lead' ? 'default' : 'secondary'}
                      className="mb-1"
                    >
                      {interaction.status}
                    </Badge>
                    <p className="text-sm font-semibold text-gray-900">{interaction.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Deals Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Deal Pipeline
              <Button variant="outline" size="sm">Manage</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDeals.map((deal, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{deal.company}</h4>
                    <span className="text-lg font-bold text-green-600">{deal.value}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{deal.product}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={deal.stage === 'Confirmed' ? 'default' : 'secondary'}
                    >
                      {deal.stage}
                    </Badge>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Probability: {deal.probability}%</p>
                      <p className="text-xs text-gray-500">{deal.closure}</p>
                    </div>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2">
              <Users className="w-5 h-5" />
              Add Company
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <Handshake className="w-5 h-5" />
              Log Interaction
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Create Deal
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <Globe className="w-5 h-5" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
