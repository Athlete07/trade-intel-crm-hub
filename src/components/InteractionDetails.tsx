
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  Phone, 
  Mail, 
  Video, 
  MessageSquare,
  Calendar,
  Building2,
  User,
  FileText,
  Plus,
  Clock,
  Star
} from "lucide-react";

interface InteractionDetailsProps {
  interactionId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export function InteractionDetails({ interactionId, onBack, onEdit }: InteractionDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [followUpNote, setFollowUpNote] = useState('');

  // Mock interaction data
  const interaction = {
    id: interactionId,
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
    duration: "45 minutes",
    notes: "Discussed requirements for organic cotton. Client interested in 500MT monthly supply. Needs quality certificates and pricing by Dec 1st. Very interested in establishing long-term partnership. Mentioned they're also looking for textile machinery suppliers.",
    hasOpportunity: true,
    productService: "Organic Cotton",
    leadScore: 85,
    followUpDate: "2024-12-01",
    sentiment: "Positive",
    outcomes: [
      "Client confirmed interest in 500MT monthly supply",
      "Requested quality certificates and pricing",
      "Potential for textile machinery business",
      "Follow-up scheduled for Dec 1st"
    ],
    nextSteps: [
      "Prepare quality certificates",
      "Send detailed pricing proposal",
      "Schedule facility visit",
      "Connect with textile machinery team"
    ],
    attachments: [
      { name: "Meeting_Notes.pdf", type: "PDF", size: "245 KB" },
      { name: "Product_Catalog.pdf", type: "PDF", size: "1.2 MB" }
    ],
    relatedDeals: [
      { id: "D001", name: "Organic Cotton Supply", value: "$450,000", stage: "Negotiation" }
    ],
    followUps: [
      { date: "2024-11-26", note: "Sent initial product catalog", user: "Priya Singh" },
      { date: "2024-11-28", note: "Client requested technical specifications", user: "Priya Singh" }
    ]
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Call': return Phone;
      case 'Email': return Mail;
      case 'Meeting': return Video;
      case 'WhatsApp': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Very Positive': return 'bg-green-100 text-green-800';
      case 'Positive': return 'bg-blue-100 text-blue-800';
      case 'Neutral': return 'bg-gray-100 text-gray-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddFollowUp = () => {
    if (followUpNote.trim()) {
      alert(`Follow-up note added: ${followUpNote}`);
      setFollowUpNote('');
    }
  };

  const ChannelIcon = getChannelIcon(interaction.channel);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interactions
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{interaction.company}</h1>
            <p className="text-gray-600">Interaction ID: {interaction.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(interaction.id)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(interaction.sentiment)}`}>
            {interaction.sentiment}
          </div>
        </div>
      </div>

      {/* Interaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ChannelIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-lg font-bold">{interaction.channel}</p>
                <p className="text-sm text-gray-500">{interaction.duration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-lg font-bold">{interaction.leadScore}</p>
                <p className="text-sm text-gray-500">Lead Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-lg font-bold">{interaction.followUpDate}</p>
                <p className="text-sm text-gray-500">Follow-up Date</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-lg font-bold">{interaction.hasOpportunity ? 'Yes' : 'No'}</p>
                <p className="text-sm text-gray-500">Opportunity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contact Name</p>
                <p className="font-medium">{interaction.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Designation</p>
                <p className="font-medium">{interaction.contactDesignation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{interaction.contactEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{interaction.contactPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Salesperson</p>
                <p className="font-medium">{interaction.salesperson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{interaction.department}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interaction Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Interaction Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{interaction.date} at {interaction.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{interaction.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Product/Service</p>
                <p className="font-medium">{interaction.productService}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{interaction.region}</p>
              </div>
            </div>
            {interaction.hasOpportunity && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Business Opportunity Identified</span>
                </div>
                <p className="text-sm text-green-700">High potential for deal conversion based on client interest and requirements.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interaction Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 leading-relaxed">{interaction.notes}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Outcomes</h4>
              <ul className="space-y-2">
                {interaction.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
              <ul className="space-y-2">
                {interaction.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attachments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Attachments
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add File
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {interaction.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1">View</Button>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1">Download</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Related Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {interaction.relatedDeals.map((deal, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{deal.name}</h4>
                    <Badge variant="secondary">{deal.stage}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Value: {deal.value}</p>
                  <Button size="sm" variant="outline" className="mt-2">View Deal</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Follow-up History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Follow-up History</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Follow-up
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interaction.followUps.map((followUp, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{followUp.note}</p>
                  <p className="text-sm text-gray-500">by {followUp.user} on {followUp.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Add Follow-up Note</h4>
            <div className="space-y-3">
              <Textarea 
                placeholder="Enter follow-up details..."
                value={followUpNote}
                onChange={(e) => setFollowUpNote(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddFollowUp}>Add Note</Button>
                <Button variant="outline">Schedule Call</Button>
                <Button variant="outline">Send Email</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
