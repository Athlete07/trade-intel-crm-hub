
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  FileText, 
  Calendar, 
  Phone, 
  Mail, 
  Building2,
  DollarSign,
  Package,
  Truck,
  Clock,
  User,
  MessageSquare,
  Plus
} from "lucide-react";

interface DealDetailsProps {
  dealId: string;
  onBack: () => void;
  onEdit: (dealId: string) => void;
}

export function DealDetails({ dealId, onBack, onEdit }: DealDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [newTask, setNewTask] = useState('');

  // Mock deal data - in real app, this would come from API
  const deal = {
    id: dealId,
    company: "MegaCorp Industries",
    buyer: "ABC Textiles Ltd",
    seller: "Steel Components Inc",
    product: "Steel Components",
    quantity: "500 MT",
    value: 450000,
    currency: "USD",
    stage: "Confirmed",
    probability: 95,
    incoterm: "CIF",
    paymentTerm: "LC 30 days",
    assignedTo: "Rajesh Kumar",
    expectedClosure: "2024-12-15",
    createdDate: "2024-11-01",
    origin: "India",
    destination: "Germany",
    specifications: "Grade A steel components, ISO certified, thickness 5-10mm",
    notes: "Client is very satisfied with quality. Repeat order expected in Q1 2025.",
    contacts: [
      {
        name: "John Smith",
        role: "Procurement Manager",
        email: "john@abctextiles.com",
        phone: "+49 30 12345678"
      }
    ],
    timeline: [
      { date: "2024-11-01", event: "Deal created", user: "Rajesh Kumar" },
      { date: "2024-11-05", event: "Initial quotation sent", user: "Rajesh Kumar" },
      { date: "2024-11-10", event: "Price negotiation completed", user: "Rajesh Kumar" },
      { date: "2024-11-20", event: "Contract signed", user: "Rajesh Kumar" }
    ],
    documents: [
      { name: "Quotation.pdf", type: "Quotation", date: "2024-11-05" },
      { name: "Contract.pdf", type: "Contract", date: "2024-11-20" },
      { name: "LC_Copy.pdf", type: "Letter of Credit", date: "2024-11-25" }
    ],
    tasks: [
      { id: 1, task: "Prepare shipping documents", dueDate: "2024-12-01", status: "Completed" },
      { id: 2, task: "Arrange quality inspection", dueDate: "2024-12-10", status: "In Progress" },
      { id: 3, task: "Coordinate with logistics", dueDate: "2024-12-15", status: "Pending" }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'tasks', label: 'Tasks', icon: Calendar },
    { id: 'contacts', label: 'Contacts', icon: User }
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      alert(`Note added: ${newNote}`);
      setNewNote('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      alert(`Task added: ${newTask}`);
      setNewTask('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deals
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{deal.company}</h1>
            <p className="text-gray-600">Deal ID: {deal.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(deal.id)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Deal
          </Button>
          <Badge variant="default" className="px-4 py-2">
            {deal.stage}
          </Badge>
        </div>
      </div>

      {/* Deal Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{deal.currency} {deal.value.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Deal Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{deal.quantity}</p>
                <p className="text-sm text-gray-500">{deal.product}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-lg font-bold">{deal.incoterm}</p>
                <p className="text-sm text-gray-500">{deal.origin} → {deal.destination}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-lg font-bold">{deal.expectedClosure}</p>
                <p className="text-sm text-gray-500">Expected Closure</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Buyer</p>
                    <p className="font-medium">{deal.buyer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seller</p>
                    <p className="font-medium">{deal.seller}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Terms</p>
                    <p className="font-medium">{deal.paymentTerm}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="font-medium">{deal.assignedTo}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Specifications</p>
                  <p className="text-gray-700">{deal.specifications}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Notes</p>
                  <p className="text-gray-700">{deal.notes}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Deal Progress</span>
                    <span className="text-sm text-gray-500">{deal.probability}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Inquiry Received</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Quotation Sent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Negotiation Complete</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Contract Signed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-500">Shipment Ready</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'timeline' && (
          <Card>
            <CardHeader>
              <CardTitle>Deal Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deal.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-gray-500">by {event.user} on {event.date}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Add Note</h4>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a note to timeline..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <Button onClick={handleAddNote}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trade Documents</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deal.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'tasks' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tasks & Follow-ups</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deal.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" checked={task.status === 'Completed'} />
                      <div>
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <Badge variant={task.status === 'Completed' ? 'default' : task.status === 'In Progress' ? 'secondary' : 'outline'}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Add New Task</h4>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter task description..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button onClick={handleAddTask}>Add</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'contacts' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Deal Contacts</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deal.contacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p>{contact.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p>{contact.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
