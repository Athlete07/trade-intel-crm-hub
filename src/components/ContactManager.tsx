import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Mail, 
  Building2, 
  MapPin, 
  Calendar,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Edit,
  Star,
  Globe,
  Eye,
  Trash2
} from "lucide-react";
import { ContactForm } from "./ContactForm";

export function ContactManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [viewingContactId, setViewingContactId] = useState<string | null>(null);

  const contacts = [
    {
      id: "C001",
      name: "Rajesh Kumar",
      designation: "Procurement Manager",
      company: "ABC Textiles Ltd",
      email: "rajesh@abctextiles.com",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      linkedin: "linkedin.com/in/rajeshkumar",
      location: "Mumbai, India",
      category: "Buyer",
      lastContact: "2024-11-25",
      totalDeals: 3,
      dealValue: "$1,250,000",
      rating: 5,
      notes: "Key decision maker for textile procurement. Prefers quality over price. Regular buyer with good payment history.",
      tags: ["VIP", "Textile", "Regular"],
      interactions: 12,
      opportunities: 2
    },
    {
      id: "C002",
      name: "Sarah Chen",
      designation: "Supply Chain Manager",
      company: "Global Electronics Inc",
      email: "sarah@globalelectronics.com",
      phone: "+1 555 123 4567",
      whatsapp: "+1 555 123 4567",
      linkedin: "linkedin.com/in/sarahchen",
      location: "San Francisco, USA",
      category: "Buyer",
      lastContact: "2024-11-24",
      totalDeals: 5,
      dealValue: "$2,100,000",
      rating: 4,
      notes: "Strategic buyer for electronics components. Budget approved for Q1 2025. Interested in long-term partnerships.",
      tags: ["Strategic", "Electronics", "High-Value"],
      interactions: 18,
      opportunities: 3
    },
    {
      id: "C003",
      name: "Klaus Weber",
      designation: "Technical Director",
      company: "Indo-German Motors",
      email: "klaus@indogermanmotors.de",
      phone: "+49 30 12345678",
      whatsapp: "+49 30 12345678",
      linkedin: "linkedin.com/in/klausweber",
      location: "Berlin, Germany",
      category: "Technical",
      lastContact: "2024-11-23",
      totalDeals: 2,
      dealValue: "$850,000",
      rating: 3,
      notes: "Technical expert for automotive parts. Strict quality requirements. Decision maker for technical specifications.",
      tags: ["Technical", "Automotive", "Quality-Focused"],
      interactions: 8,
      opportunities: 1
    }
  ];

  const handleAddContact = () => {
    setIsAddingContact(true);
    setEditingContactId(null);
  };

  const handleEditContact = (contactId: string) => {
    setEditingContactId(contactId);
    setIsAddingContact(true);
  };

  const handleViewContact = (contactId: string) => {
    setViewingContactId(contactId);
  };

  const handleSaveContact = (contactData: any) => {
    console.log('Contact saved:', contactData);
    alert(`Contact ${contactData.name} saved successfully!`);
    setIsAddingContact(false);
    setEditingContactId(null);
  };

  const handleCancelContactForm = () => {
    setIsAddingContact(false);
    setEditingContactId(null);
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      alert(`Contact ${contactId} deleted successfully!`);
    }
  };

  if (isAddingContact) {
    return (
      <ContactForm
        contactId={editingContactId}
        onSave={handleSaveContact}
        onCancel={handleCancelContactForm}
      />
    );
  }

  const categories = ["all", "Buyer", "Seller", "Technical", "Finance", "Logistics"];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || contact.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Buyer': return 'bg-green-100 text-green-800';
      case 'Seller': return 'bg-blue-100 text-blue-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Finance': return 'bg-orange-100 text-orange-800';
      case 'Logistics': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleContactAction = (contactId: string, action: string) => {
    switch (action) {
      case 'call':
        alert(`Initiating call to contact ${contactId}`);
        break;
      case 'email':
        alert(`Opening email composer for contact ${contactId}`);
        break;
      case 'whatsapp':
        alert(`Opening WhatsApp chat with contact ${contactId}`);
        break;
      case 'edit':
        alert(`Opening edit form for contact ${contactId}`);
        break;
      case 'view-deals':
        alert(`Showing all deals for contact ${contactId}`);
        break;
      case 'view-interactions':
        alert(`Showing interaction history for contact ${contactId}`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
        <Button onClick={handleAddContact}>
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.length}</p>
                <p className="text-sm text-gray-500">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{new Set(contacts.map(c => c.company)).size}</p>
                <p className="text-sm text-gray-500">Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.filter(c => c.rating >= 4).length}</p>
                <p className="text-sm text-gray-500">High-Rated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.reduce((sum, c) => sum + c.interactions, 0)}</p>
                <p className="text-sm text-gray-500">Total Interactions</p>
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
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{contact.name}</h3>
                    <p className="text-gray-600">{contact.designation}</p>
                    <p className="text-sm text-gray-500">{contact.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(contact.category)}`}>
                    {contact.category}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleContactAction(contact.id, 'edit')}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{contact.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Last contact: {contact.lastContact}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Rating:</span>
                <div className="flex gap-1">
                  {getRatingStars(contact.rating)}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{contact.totalDeals}</p>
                  <p className="text-xs text-gray-500">Deals</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{contact.dealValue}</p>
                  <p className="text-xs text-gray-500">Value</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{contact.interactions}</p>
                  <p className="text-xs text-gray-500">Interactions</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Notes */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">{contact.notes}</p>
              </div>

              {/* Action Buttons */}
              
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleContactAction(contact.id, 'call')}>
              <Phone className="w-3 h-3 mr-1" />
              Call
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleContactAction(contact.id, 'email')}>
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleContactAction(contact.id, 'whatsapp')}>
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleViewContact(contact.id)}>
              <Eye className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleEditContact(contact.id)}>
              <Edit className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDeleteContact(contact.id)} className="text-red-600">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
