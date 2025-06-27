
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  Video, 
  MessageSquare,
  Plus,
  Search,
  Calendar,
  User,
  Building2,
  Star,
  Filter,
  Save,
  X
} from "lucide-react";

export function InteractionLogger() {
  const [isAddingInteraction, setIsAddingInteraction] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    date: '',
    contactName: '',
    contactDesignation: '',
    contactEmail: '',
    contactPhone: '',
    salesperson: '',
    department: '',
    channel: '',
    product: '',
    notes: '',
    hasOpportunity: false
  });

  const interactions = [
    {
      id: "INT001",
      company: "ABC Textiles Ltd",
      contactName: "Rajesh Kumar",
      contactDesignation: "Procurement Manager",
      contactEmail: "rajesh@abctextiles.com",
      contactPhone: "+91 98765 43210",
      salesperson: "Priya Singh",
      department: "Export Sales",
      region: "North India",
      channel: "Call",
      date: "2024-11-25",
      time: "14:30",
      notes: "Discussed requirements for organic cotton. Client interested in 500MT monthly supply. Needs quality certificates and pricing by Dec 1st.",
      hasOpportunity: true,
      productService: "Organic Cotton",
      leadScore: 85,
      followUpDate: "2024-12-01",
      sentiment: "Positive"
    },
    {
      id: "INT002",
      company: "Global Electronics Inc",
      contactName: "Sarah Chen",
      contactDesignation: "Supply Chain Manager",
      contactEmail: "sarah@globalelectronics.com",
      contactPhone: "+1 555 123 4567",
      salesperson: "Hans Mueller",
      department: "Import Division",
      region: "International",
      channel: "Meeting",
      date: "2024-11-24",
      time: "10:00",
      notes: "Quarterly review meeting. Discussed expanding product range to include semiconductor components. Budget approved for Q1 2025.",
      hasOpportunity: true,
      productService: "Semiconductor Components",
      leadScore: 92,
      followUpDate: "2024-12-05",
      sentiment: "Very Positive"
    },
    {
      id: "INT003",
      company: "Indo-German Motors",
      contactName: "Klaus Weber",
      contactDesignation: "Technical Director",
      contactEmail: "klaus@indogermanmotors.de",
      contactPhone: "+49 30 12345678",
      salesperson: "Amit Sharma",
      department: "Technical Sales",
      region: "Europe",
      channel: "Email",
      date: "2024-11-23",
      time: "16:45",
      notes: "Follow-up on precision parts quotation. Client has concerns about delivery timeline. Requested revised proposal with expedited shipping options.",
      hasOpportunity: false,
      productService: "Precision Auto Parts",
      leadScore: 65,
      followUpDate: "2024-11-30",
      sentiment: "Neutral"
    }
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Call': return Phone;
      case 'Email': return Mail;
      case 'Meeting': return Video;
      case 'WhatsApp': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Very Positive': return 'default';
      case 'Positive': return 'secondary';
      case 'Neutral': return 'outline';
      case 'Negative': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredInteractions = interactions.filter(interaction =>
    interaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.productService.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveInteraction = () => {
    // Validate required fields
    if (!formData.company || !formData.contactName || !formData.channel || !formData.notes) {
      alert('Please fill in all required fields (Company, Contact Name, Channel, and Notes)');
      return;
    }
    
    alert('Interaction saved successfully! In a real app, this would save to the database.');
    
    // Reset form
    setFormData({
      company: '',
      date: '',
      contactName: '',
      contactDesignation: '',
      contactEmail: '',
      contactPhone: '',
      salesperson: '',
      department: '',
      channel: '',
      product: '',
      notes: '',
      hasOpportunity: false
    });
    
    setIsAddingInteraction(false);
  };

  const handleSaveAndAddAnother = () => {
    handleSaveInteraction();
    setIsAddingInteraction(true);
  };

  const handleCancel = () => {
    setIsAddingInteraction(false);
    setFormData({
      company: '',
      date: '',
      contactName: '',
      contactDesignation: '',
      contactEmail: '',
      contactPhone: '',
      salesperson: '',
      department: '',
      channel: '',
      product: '',
      notes: '',
      hasOpportunity: false
    });
  };

  if (isAddingInteraction) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Log New Interaction</h1>
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <Input 
                  placeholder="Select or type company name" 
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time *
                </label>
                <Input 
                  type="datetime-local" 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name *
                </label>
                <Input 
                  placeholder="Full name of contact person" 
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Designation
                </label>
                <Input 
                  placeholder="e.g., Procurement Manager" 
                  value={formData.contactDesignation}
                  onChange={(e) => handleInputChange('contactDesignation', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <Input 
                  type="email" 
                  placeholder="contact@company.com" 
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <Input 
                  placeholder="+1 234 567 8900" 
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salesperson Name *
                </label>
                <Input 
                  placeholder="Your name" 
                  value={formData.salesperson}
                  onChange={(e) => handleInputChange('salesperson', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department & Region
                </label>
                <Input 
                  placeholder="Sales Department, North Region" 
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communication Channel *
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.channel}
                  onChange={(e) => handleInputChange('channel', e.target.value)}
                >
                  <option value="">Select channel</option>
                  <option value="Call">Phone Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">In-person Meeting</option>
                  <option value="Video">Video Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Potential Product/Service
                </label>
                <Input 
                  placeholder="What product or service was discussed?" 
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Notes *
              </label>
              <Textarea 
                placeholder="Describe what was discussed, key points, client requirements, next steps..."
                rows={6}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600"
                  checked={formData.hasOpportunity}
                  onChange={(e) => handleInputChange('hasOpportunity', e.target.checked)}
                />
                <span className="text-sm font-medium text-gray-700">
                  Business Opportunity Identified
                </span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveInteraction}>
                <Save className="w-4 h-4 mr-2" />
                Save Interaction
              </Button>
              <Button variant="outline" onClick={handleSaveAndAddAnother}>
                Save & Add Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Interactions</h1>
        <Button onClick={() => setIsAddingInteraction(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Log Interaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{interactions.length}</p>
                <p className="text-sm text-gray-500">Total Interactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {interactions.filter(i => i.hasOpportunity).length}
                </p>
                <p className="text-sm text-gray-500">Opportunities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Phone className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {interactions.filter(i => i.channel === 'Call').length}
                </p>
                <p className="text-sm text-gray-500">Phone Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search interactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Advanced filters would be implemented here (channel, date range, sentiment, etc.)</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactions List */}
      <div className="space-y-4">
        {filteredInteractions.map((interaction) => {
          const ChannelIcon = getChannelIcon(interaction.channel);
          
          return (
            <Card key={interaction.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {interaction.company}
                      </h3>
                      <p className="text-gray-600">{interaction.contactName}</p>
                      <p className="text-sm text-gray-500">{interaction.contactDesignation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSentimentColor(interaction.sentiment)}>
                      {interaction.sentiment}
                    </Badge>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLeadScoreColor(interaction.leadScore)}`}>
                      {interaction.leadScore}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ChannelIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{interaction.channel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{interaction.date} at {interaction.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{interaction.salesperson}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Discussion Notes</h4>
                  <p className="text-gray-700 text-sm">{interaction.notes}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {interaction.hasOpportunity && (
                      <Badge variant="default" className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Opportunity
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">
                      Product: <span className="font-medium">{interaction.productService}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Follow-up:</p>
                    <p className="text-sm font-medium">{interaction.followUpDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
