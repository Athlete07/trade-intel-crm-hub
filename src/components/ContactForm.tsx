
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Linkedin,
  MessageSquare,
  Star,
  Save,
  X
} from "lucide-react";

interface ContactFormProps {
  contactId?: string;
  onSave: (contactData: any) => void;
  onCancel: () => void;
}

export function ContactForm({ contactId, onSave, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    linkedin: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    category: 'Buyer',
    rating: 3,
    notes: '',
    tags: '',
    preferredContact: 'Email',
    language: 'English',
    timezone: 'UTC+0'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in name and email');
      return;
    }
    
    const contactData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      id: contactId || `C${Date.now().toString().slice(-3)}`
    };
    
    onSave(contactData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {contactId ? 'Edit Contact' : 'Add New Contact'}
        </h1>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Designation</label>
                <Input
                  value={formData.designation}
                  onChange={(e) => updateField('designation', e.target.value)}
                  placeholder="Job title or position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company *</label>
                <Input
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="Technical">Technical Expert</option>
                  <option value="Finance">Finance Contact</option>
                  <option value="Logistics">Logistics Contact</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onClick={() => updateField('rating', star)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="email@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="www.company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                <select 
                  value={formData.preferredContact}
                  onChange={(e) => updateField('preferredContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Address Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State/Province</label>
                <Input
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  placeholder="State or Province"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <Input
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Postal Code</label>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  placeholder="Postal Code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select 
                  value={formData.language}
                  onChange={(e) => updateField('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select 
                  value={formData.timezone}
                  onChange={(e) => updateField('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="UTC-12">UTC-12 (Baker Island)</option>
                  <option value="UTC-8">UTC-8 (PST)</option>
                  <option value="UTC-5">UTC-5 (EST)</option>
                  <option value="UTC+0">UTC+0 (GMT)</option>
                  <option value="UTC+1">UTC+1 (CET)</option>
                  <option value="UTC+5:30">UTC+5:30 (IST)</option>
                  <option value="UTC+8">UTC+8 (CST)</option>
                  <option value="UTC+9">UTC+9 (JST)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <Input
                value={formData.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                placeholder="VIP, Regular Customer, Technical Expert"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Additional notes about this contact..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {contactId ? 'Update Contact' : 'Save Contact'}
          </Button>
        </div>
      </form>
    </div>
  );
}
